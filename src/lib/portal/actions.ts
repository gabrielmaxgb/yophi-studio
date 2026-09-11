"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { hashPassword } from "better-auth/crypto";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { modulesForServices } from "@/lib/portal/catalog";
import { generateTemporaryPassword } from "@/lib/portal/password";
import {
  createAccessSchema,
  createApprovalSchema,
  createAssetSchema,
  createClientSchema,
  createContentSchema,
  createRequestSchema,
  respondApprovalSchema,
  officialPasswordSchema,
  slugify,
  updateBriefSchema,
  updateServicesSchema,
  updateStatusSchema,
} from "@/lib/portal/schemas";
import {
  assertModuleAccess,
  assertProjectAccess,
  requireStudio,
  requireUser,
} from "@/lib/portal/session";
import { createCredentialUser } from "@/lib/portal/users";

function fail(message: string): never {
  throw new Error(message);
}

function parseOrFail<T>(schema: { parse: (input: unknown) => T }, input: unknown): T {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      fail(error.issues[0]?.message ?? "Dados inválidos.");
    }
    throw error;
  }
}

export async function createClientAction(input: unknown) {
  const studio = await requireStudio();
  const data = parseOrFail(createClientSchema, input);

  const existing = await prisma.user.findUnique({
    where: { email: data.contactEmail },
    select: { id: true },
  });
  if (existing) fail("Já existe um usuário com este e-mail.");

  const temporaryPassword = generateTemporaryPassword();

  let baseSlug = slugify(data.companyName) || "cliente";
  let slug = baseSlug;
  let i = 1;
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`;
  }

  const user = await createCredentialUser({
    email: data.contactEmail,
    name: data.contactName,
    password: temporaryPassword,
    role: "CLIENT",
  });

  const project = await prisma.project.create({
    data: {
      name: data.companyName,
      slug,
      status: "BRIEF",
      statusNow: "Projeto aberto. Brief em andamento.",
      statusWaiting: "",
      statusNext: "Alinhar o que entra no ar primeiro.",
      createdById: studio.id,
      services: {
        create: data.services.map((s) => ({
          serviceKey: s.serviceKey,
          customTitle: s.customTitle || null,
          customBody: s.customBody || null,
          customNotes: s.customNotes ?? "",
        })),
      },
      members: {
        create: {
          userId: user.id,
          memberRole: "CLIENT_CONTACT",
        },
      },
    },
    include: { services: true },
  });

  let emailSent = false;
  try {
    await auth.api.signInMagicLink({
      body: {
        email: data.contactEmail,
        callbackURL: "/conta",
        metadata: {
          name: data.contactName,
          password: temporaryPassword,
        },
      },
      headers: await headers(),
    });
    emailSent = true;
  } catch (error) {
    console.error("Failed to send client magic link:", error);
  }

  return {
    projectId: project.id,
    slug: project.slug,
    email: data.contactEmail,
    temporaryPassword,
    emailSent,
    modules: modulesForServices(project.services.map((s) => s.serviceKey)),
  };
}

export async function setOfficialPasswordAction(input: unknown) {
  const user = await requireUser({ allowPendingPassword: true });
  if (!user.mustChangePassword) fail("A senha já foi definida.");

  const data = parseOrFail(officialPasswordSchema, input);
  const passwordHash = await hashPassword(data.password);

  const authSession = await auth.api.getSession({
    headers: await headers(),
  });
  const keepToken = authSession?.session?.token;

  const account = await prisma.account.findFirst({
    where: { userId: user.id, providerId: "credential" },
    select: { id: true },
  });

  await prisma.$transaction(async (tx) => {
    if (account) {
      await tx.account.update({
        where: { id: account.id },
        data: { password: passwordHash },
      });
    } else {
      await tx.account.create({
        data: {
          userId: user.id,
          accountId: user.id,
          providerId: "credential",
          password: passwordHash,
        },
      });
    }

    await tx.user.update({
      where: { id: user.id },
      data: { mustChangePassword: false, emailVerified: true },
    });
    await tx.verification.deleteMany({
      where: { identifier: user.email },
    });
    await tx.session.deleteMany({
      where: keepToken
        ? { userId: user.id, token: { not: keepToken } }
        : { userId: user.id },
    });
  });

  revalidatePath("/conta");
}

export async function updateProjectServicesAction(input: unknown) {
  const studio = await requireStudio();
  const data = parseOrFail(updateServicesSchema, input);
  await assertProjectAccess(studio, data.projectId);

  const selectedKeys = data.services.map((s) => s.serviceKey);

  await prisma.$transaction(async (tx) => {
    await tx.projectService.updateMany({
      where: {
        projectId: data.projectId,
        serviceKey: { notIn: selectedKeys },
      },
      data: { active: false },
    });

    for (const service of data.services) {
      await tx.projectService.upsert({
        where: {
          projectId_serviceKey: {
            projectId: data.projectId,
            serviceKey: service.serviceKey,
          },
        },
        create: {
          projectId: data.projectId,
          serviceKey: service.serviceKey,
          customTitle: service.customTitle || null,
          customBody: service.customBody || null,
          customNotes: service.customNotes ?? "",
          active: true,
        },
        update: {
          customTitle: service.customTitle || null,
          customBody: service.customBody || null,
          customNotes: service.customNotes ?? "",
          active: true,
        },
      });
    }
  });

  
  revalidatePath("/conta");
}

export async function updateProjectStatusAction(input: unknown) {
  const studio = await requireStudio();
  const data = parseOrFail(updateStatusSchema, input);
  await assertProjectAccess(studio, data.projectId);

  await prisma.project.update({
    where: { id: data.projectId },
    data: {
      status: data.status,
      statusNow: data.statusNow,
      statusWaiting: data.statusWaiting,
      statusNext: data.statusNext,
      statusDueAt: data.statusDueAt ? new Date(data.statusDueAt) : null,
    },
  });

  
  revalidatePath("/conta");
}

export async function updateBriefAction(input: unknown) {
  const studio = await requireStudio();
  const data = parseOrFail(updateBriefSchema, input);
  await assertProjectAccess(studio, data.projectId);

  await prisma.project.update({
    where: { id: data.projectId },
    data: {
      briefAudience: data.briefAudience,
      briefTone: data.briefTone,
      briefDo: data.briefDo,
      briefDont: data.briefDont,
    },
  });

  
  revalidatePath("/conta");
}

export async function createApprovalAction(input: unknown) {
  const studio = await requireStudio();
  const data = parseOrFail(createApprovalSchema, input);
  await assertProjectAccess(studio, data.projectId);

  await prisma.approval.create({
    data: {
      projectId: data.projectId,
      title: data.title,
      kind: data.kind,
      body: data.body ?? "",
      previewUrl: data.previewUrl,
      status: "PENDING",
    },
  });

  
  revalidatePath("/conta");
}

export async function respondApprovalAction(input: unknown) {
  const user = await requireUser();
  const data = parseOrFail(respondApprovalSchema, input);

  const approval = await prisma.approval.findUnique({
    where: { id: data.approvalId },
  });
  if (!approval) fail("Aprovação não encontrada.");
  await assertModuleAccess(user, approval.projectId, "approvals");

  if (user.role === "CLIENT" && approval.status !== "PENDING") {
    fail("Esta aprovação já foi respondida.");
  }

  await prisma.approval.update({
    where: { id: approval.id },
    data: {
      status: data.decision,
      clientNote: data.clientNote ?? "",
    },
  });

  revalidatePath("/conta");
  
}

export async function createRequestAction(input: unknown) {
  const user = await requireUser();
  const data = parseOrFail(createRequestSchema, input);
  await assertModuleAccess(user, data.projectId, "requests");

  await prisma.clientRequest.create({
    data: {
      projectId: data.projectId,
      title: data.title,
      body: data.body ?? "",
      priority: data.priority,
      dueAt: data.dueAt ? new Date(data.dueAt) : null,
      status: "OPEN",
    },
  });

  revalidatePath("/conta");
  
}

export async function setRequestStatusAction(
  requestId: string,
  status: "OPEN" | "DOING" | "DONE"
) {
  const studio = await requireStudio();
  const request = await prisma.clientRequest.findUnique({
    where: { id: requestId },
  });
  if (!request) fail("Pedido não encontrado.");
  await assertProjectAccess(studio, request.projectId);

  await prisma.clientRequest.update({
    where: { id: requestId },
    data: { status },
  });

  
  revalidatePath("/conta");
}

export async function createAssetAction(input: unknown) {
  const studio = await requireStudio();
  const data = parseOrFail(createAssetSchema, input);
  await assertProjectAccess(studio, data.projectId);

  await prisma.archiveAsset.create({
    data: {
      projectId: data.projectId,
      label: data.label,
      url: data.url,
      kind: data.kind,
      status: data.status,
    },
  });

  
  revalidatePath("/conta");
}

export async function createAccessAction(input: unknown) {
  const studio = await requireStudio();
  const data = parseOrFail(createAccessSchema, input);
  await assertProjectAccess(studio, data.projectId);

  await prisma.accessMap.create({
    data: {
      projectId: data.projectId,
      label: data.label,
      holder: data.holder,
      status: data.status,
      notes: data.notes ?? "",
    },
  });

  
  revalidatePath("/conta");
}

export async function createContentAction(input: unknown) {
  const studio = await requireStudio();
  const data = parseOrFail(createContentSchema, input);
  await assertProjectAccess(studio, data.projectId);

  await prisma.contentItem.create({
    data: {
      projectId: data.projectId,
      title: data.title,
      channel: data.channel,
      status: data.status,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
    },
  });

  
  revalidatePath("/conta");
}

export async function getPortalBootstrap() {
  const user = await requireUser();
  const membership = await prisma.projectMember.findFirst({
    where: { userId: user.id },
    include: {
      project: {
        include: {
          services: { where: { active: true } },
          approvals: {
            where: { status: "PENDING" },
            orderBy: { createdAt: "desc" },
          },
          requests: {
            where: { status: { not: "DONE" } },
            orderBy: { createdAt: "desc" },
            take: 5,
          },
          assets: { orderBy: { createdAt: "desc" }, take: 8 },
          contentItems: {
            where: { status: { in: ["WAITING_CLIENT", "DRAFT"] } },
            orderBy: { createdAt: "desc" },
            take: 5,
          },
          accessMaps: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });

  if (!membership) return { user, project: null, modules: [] as string[] };

  const keys = membership.project.services.map((s) => s.serviceKey);
  return {
    user,
    project: membership.project,
    modules: modulesForServices(keys),
  };
}
