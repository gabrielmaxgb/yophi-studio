import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  getSessionUser,
  isProjectId,
  requireStudioPage,
} from "@/lib/portal/session";
import { StudioProjectWorkspace } from "@/components/portal/studio-workspace";

const privateMeta = { robots: { index: false, follow: false } as const };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (user?.role !== "STUDIO") {
    return { title: "Conta", ...privateMeta };
  }

  const { id } = await params;
  if (!isProjectId(id)) {
    return { title: "Projeto", ...privateMeta };
  }

  const project = await prisma.project.findUnique({
    where: { id },
    select: { name: true },
  });
  return {
    title: project?.name ?? "Projeto",
    ...privateMeta,
  };
}

export default async function ProjetoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStudioPage();
  const { id } = await params;
  if (!isProjectId(id)) redirect("/conta/projetos");
  return <StudioProjectWorkspace projectId={id} />;
}
