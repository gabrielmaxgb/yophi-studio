import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type SessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  modulesForServices,
  type PortalModule,
} from "@/lib/portal/catalog";

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return null;
  const row = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      role: true,
      banned: true,
      emailVerified: true,
      mustChangePassword: true,
    },
  });
  if (!row || row.banned) return null;
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: row.role === "STUDIO" ? "STUDIO" : "CLIENT",
    banned: row.banned,
    emailVerified: row.emailVerified,
    mustChangePassword: row.mustChangePassword,
  };
});

export async function requireUser(opts?: {
  allowPendingPassword?: boolean;
}): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/entrar");
  if (
    !opts?.allowPendingPassword &&
    user.role === "CLIENT" &&
    user.mustChangePassword
  ) {
    throw new Error("Troca a senha provisória antes de continuar.");
  }
  return user;
}

/** Studio-only mutations. Same portal URL — different capabilities. */
export async function requireStudio(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "STUDIO") {
    throw new Error("Apenas o estúdio pode fazer isso.");
  }
  return user;
}

/** Studio pages. Clients go back to /conta. */
export async function requireStudioPage(): Promise<SessionUser> {
  const user = await requireUser({ allowPendingPassword: true });
  if (user.role !== "STUDIO") redirect("/conta");
  return user;
}

/** Prisma cuid() — blocks path traversal in /conta/projetos/[id]. */
export function isProjectId(id: string): boolean {
  return /^c[a-z0-9]{20,31}$/i.test(id);
}

/** Prevents IDOR: client may only touch projects they belong to. */
export async function assertProjectAccess(
  user: SessionUser,
  projectId: string
): Promise<void> {
  if (user.role === "STUDIO") {
    const exists = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true },
    });
    if (!exists) throw new Error("Projeto não encontrado.");
    return;
  }

  const membership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: { projectId, userId: user.id },
    },
    select: { id: true },
  });
  if (!membership) throw new Error("Sem acesso a este projeto.");
}

/** Client may only use modules unlocked by active contracted services. */
export async function assertModuleAccess(
  user: SessionUser,
  projectId: string,
  module: PortalModule
): Promise<void> {
  await assertProjectAccess(user, projectId);
  if (user.role === "STUDIO") return;

  const services = await prisma.projectService.findMany({
    where: { projectId, active: true },
    select: { serviceKey: true },
  });
  const unlocked = modulesForServices(services.map((s) => s.serviceKey));
  if (!unlocked.includes(module)) {
    throw new Error("Este módulo não está no contrato.");
  }
}

export async function getClientProjectIds(userId: string): Promise<string[]> {
  const rows = await prisma.projectMember.findMany({
    where: { userId },
    select: { projectId: true },
  });
  return rows.map((r) => r.projectId);
}
