import Link from "next/link";
import { Panel } from "@/components/portal/shell";
import { StudioPageIntro } from "@/components/portal/studio-shell";
import { StudioProjectCard } from "@/components/portal/studio-project-card";
import { prisma } from "@/lib/db";
import { PROJECT_STATUSES } from "@/lib/portal/catalog";
import { requireStudioPage } from "@/lib/portal/session";

export async function StudioDashboard() {
  await requireStudioPage();

  const [
    projects,
    clientCount,
    pendingCount,
    requestCount,
    pendingApprovals,
    openRequests,
  ] = await Promise.all([
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        services: { where: { active: true } },
        members: {
          include: { user: { select: { email: true, name: true } } },
        },
      },
    }),
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.approval.count({ where: { status: "PENDING" } }),
    prisma.clientRequest.count({
      where: { status: { in: ["OPEN", "DOING"] } },
    }),
    prisma.approval.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { project: { select: { id: true, name: true } } },
    }),
    prisma.clientRequest.findMany({
      where: { status: { in: ["OPEN", "DOING"] } },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { project: { select: { id: true, name: true } } },
    }),
  ]);

  const byStatus = PROJECT_STATUSES.map((status) => ({
    ...status,
    count: projects.filter((project) => project.status === status.key).length,
  }));

  const recent = projects.slice(0, 6);

  return (
    <div>
      <StudioPageIntro eyebrow="Estúdio" title="Dashboard">
        Projetos, clientes e pedidos em curso.
      </StudioPageIntro>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Projetos" value={projects.length} />
        <Stat label="Clientes" value={clientCount} />
        <Stat
          label="Aprovações"
          value={pendingCount}
          hint="Pedindo resposta"
        />
        <Stat
          label="Pedidos"
          value={requestCount}
          hint="Abertos ou em curso"
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {byStatus.map((status) => (
          <div key={status.key} className="border border-line bg-paper/60 px-4 py-3">
            <p className="text-[0.65rem] tracking-[0.16em] text-stone uppercase">
              {status.label}
            </p>
            <p className="mt-1 font-serif text-2xl">{status.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl">Projetos recentes</h2>
            <Link
              href="/conta/projetos"
              className="text-[0.65rem] tracking-[0.16em] text-stone uppercase hover:text-ink"
            >
              Ver todos
            </Link>
          </div>
          {recent.length === 0 ? (
            <Panel title="Nenhum projeto">
              <p className="text-ink/60">
                Ainda não tem cliente cadastrado.{" "}
                <Link href="/conta/novo-cliente" className="text-ember">
                  Novo cliente
                </Link>
                .
              </p>
            </Panel>
          ) : (
            <div className="grid gap-4">
              {recent.map((project) => (
                <StudioProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-col gap-6">
          <Panel title="Aprovações em aberto">
            {pendingApprovals.length === 0 ? (
              <p className="text-ink/55">Nada pedindo resposta.</p>
            ) : (
              <ul className="grid gap-3">
                {pendingApprovals.map((approval) => (
                  <li key={approval.id}>
                    <Link
                      href={`/conta/projetos/${approval.project.id}`}
                      className="block border border-line p-3 transition-colors hover:border-ink/25"
                    >
                      <p className="font-serif text-lg">{approval.title}</p>
                      <p className="mt-1 text-sm text-ink/55">
                        {approval.project.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Pedidos em curso">
            {openRequests.length === 0 ? (
              <p className="text-ink/55">Nenhum pedido aberto.</p>
            ) : (
              <ul className="grid gap-3">
                {openRequests.map((request) => (
                  <li key={request.id}>
                    <Link
                      href={`/conta/projetos/${request.project.id}`}
                      className="block border border-line p-3 transition-colors hover:border-ink/25"
                    >
                      <p className="font-serif text-lg">{request.title}</p>
                      <p className="mt-1 text-sm text-ink/55">
                        {request.project.name} · {request.priority} ·{" "}
                        {request.status}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="border border-line bg-paper/80 p-5">
      <p className="text-[0.65rem] tracking-[0.18em] text-stone uppercase">
        {label}
      </p>
      <p className="mt-3 font-serif text-4xl text-ink">{value}</p>
      {hint ? <p className="mt-2 text-sm text-ink/50">{hint}</p> : null}
    </div>
  );
}
