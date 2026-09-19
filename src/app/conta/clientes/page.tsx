import Link from "next/link";
import { Panel } from "@/components/portal/shell";
import { StudioPageIntro } from "@/components/portal/studio-shell";
import { statusLabel } from "@/components/portal/studio-project-card";
import { prisma } from "@/lib/db";
import { requireStudioPage } from "@/lib/portal/session";

export const metadata = {
  title: "Clientes",
  robots: { index: false, follow: false },
};

export default async function ClientesPage() {
  await requireStudioPage();

  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      mustChangePassword: true,
      memberships: {
        include: {
          project: {
            select: { id: true, name: true, status: true },
          },
        },
      },
    },
  });

  return (
    <div>
      <StudioPageIntro eyebrow="Estúdio" title="Clientes">
        Quem tem acesso. O projeto deles fica em Projetos.
      </StudioPageIntro>

      {clients.length === 0 ? (
        <Panel title="Nenhum ainda">
          <p className="text-ink/60">
            <Link href="/conta/novo-cliente" className="text-ember">
              Novo cliente
            </Link>{" "}
            cria a conta e o projeto juntos.
          </p>
        </Panel>
      ) : (
        <ul className="grid gap-4">
          {clients.map((client) => (
            <li key={client.id} className="border border-line bg-paper/80 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl">{client.name}</h2>
                  <p className="mt-1 text-sm text-ink/55">{client.email}</p>
                </div>
                <span className="text-[0.65rem] tracking-[0.16em] text-stone uppercase">
                  {client.mustChangePassword
                    ? "Senha provisória"
                    : "Acesso ativo"}
                </span>
              </div>
              {client.memberships.length === 0 ? (
                <p className="mt-4 text-sm text-ink/50">Sem projeto vinculado.</p>
              ) : (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {client.memberships.map((membership) => (
                    <li key={membership.id}>
                      <Link
                        href={`/conta/projetos/${membership.project.id}`}
                        className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-[0.7rem] tracking-[0.12em] uppercase transition-colors hover:border-ink/30"
                      >
                        {membership.project.name}
                        <span className="text-stone">
                          {statusLabel(membership.project.status)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
