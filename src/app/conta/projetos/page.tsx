import Link from "next/link";
import { Panel } from "@/components/portal/shell";
import { StudioProjectCard } from "@/components/portal/studio-project-card";
import { StudioPageIntro } from "@/components/portal/studio-shell";
import { prisma } from "@/lib/db";
import { requireStudioPage } from "@/lib/portal/session";

export const metadata = {
  title: "Projetos",
  robots: { index: false, follow: false },
};

export default async function ProjetosPage() {
  await requireStudioPage();

  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      services: { where: { active: true } },
      members: { include: { user: { select: { email: true, name: true } } } },
    },
  });

  return (
    <div>
      <StudioPageIntro eyebrow="Estúdio" title="Projetos">
        Cada um abre o contrato, o status e o que o cliente vê.
      </StudioPageIntro>

      {projects.length === 0 ? (
        <Panel title="Nenhum ainda">
          <p className="text-ink/60">
            O primeiro passo é cadastrar quem contrata.{" "}
            <Link href="/conta/novo-cliente" className="text-ember">
              Novo cliente
            </Link>
            .
          </p>
        </Panel>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <StudioProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
