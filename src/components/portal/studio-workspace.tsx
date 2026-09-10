import Link from "next/link";
import { redirect } from "next/navigation";
import { YophiMark } from "@/components/brand/yophi-logo";
import { CreateClientForm } from "@/components/portal/create-client-form";
import { ServicesEditor } from "@/components/portal/services-editor";
import {
  AccessCreator,
  ApprovalCreator,
  AssetCreator,
  BriefEditor,
  ContentCreator,
  RequestStatusButtons,
  StatusEditor,
} from "@/components/portal/studio-forms";
import { Panel, PortalShell } from "@/components/portal/shell";
import { SignOutButton } from "@/components/portal/sign-out-button";
import { prisma } from "@/lib/db";
import { getService, PROJECT_STATUSES } from "@/lib/portal/catalog";
import type { SessionUser } from "@/lib/auth";

export async function StudioWorkspace({
  user,
  projectId,
}: {
  user: SessionUser;
  projectId?: string;
}) {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      services: { where: { active: true } },
      members: { include: { user: { select: { email: true, name: true } } } },
      approvals: { orderBy: { createdAt: "desc" }, take: 8 },
      requests: { orderBy: { createdAt: "desc" }, take: 8 },
      assets: { orderBy: { createdAt: "desc" }, take: 8 },
      accessMaps: { orderBy: { createdAt: "desc" }, take: 8 },
      contentItems: { orderBy: { createdAt: "desc" }, take: 8 },
    },
  });

  const active =
    projects.find((project) => project.id === projectId) ?? projects[0] ?? null;

  if (projectId && !active) redirect("/conta");

  return (
    <PortalShell
      brand={
        <div className="flex items-center gap-3">
          <YophiMark className="h-7 w-auto" />
          <div>
            <p className="font-serif text-lg leading-none">Conta</p>
            <p className="mt-1 text-[0.65rem] tracking-[0.16em] text-stone uppercase">
              Estúdio · {user.email}
            </p>
          </div>
        </div>
      }
      aside={<SignOutButton />}
      nav={
        <nav className="flex flex-col gap-1">
          <p className="mb-2 px-3 text-[0.6rem] tracking-[0.2em] text-stone uppercase">
            Projetos
          </p>
          {projects.length === 0 ? (
            <p className="px-3 text-sm text-ink/50">Nenhum ainda.</p>
          ) : (
            projects.map((project) => (
              <Link
                key={project.id}
                href={`/conta?p=${project.id}`}
                className={
                  active?.id === project.id
                    ? "border-l-2 border-ember px-3 py-2 text-sm text-ink"
                    : "border-l-2 border-transparent px-3 py-2 text-sm text-ink/55 hover:text-ink"
                }
              >
                {project.name}
              </Link>
            ))
          )}
        </nav>
      }
    >
      <div className="flex flex-col gap-8">
        <CreateClientForm />

        {active ? (
          <>
            <Panel title={active.name}>
              <p className="text-sm text-ink/60">
                Contato:{" "}
                {active.members
                  .map((m) => `${m.user.name} · ${m.user.email}`)
                  .join(" / ") || "—"}
              </p>
              <p className="mt-2 text-[0.65rem] tracking-[0.16em] text-stone uppercase">
                {PROJECT_STATUSES.find((s) => s.key === active.status)?.label} · /
                {active.slug}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {active.services.map((s) => (
                  <li
                    key={s.id}
                    className="border border-line px-2 py-1 text-[0.65rem] tracking-[0.12em] uppercase"
                  >
                    {s.customTitle ||
                      getService(s.serviceKey)?.title ||
                      s.serviceKey}
                  </li>
                ))}
              </ul>
            </Panel>

            <ServicesEditor
              key={active.id}
              projectId={active.id}
              services={active.services.map((s) => ({
                serviceKey: s.serviceKey,
                customTitle: s.customTitle,
                customBody: s.customBody,
                customNotes: s.customNotes,
              }))}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <StatusEditor
                projectId={active.id}
                status={active.status}
                statusNow={active.statusNow}
                statusWaiting={active.statusWaiting}
                statusNext={active.statusNext}
                statusDueAt={
                  active.statusDueAt
                    ? new Date(active.statusDueAt).toISOString().slice(0, 16)
                    : null
                }
              />
              <BriefEditor
                projectId={active.id}
                briefAudience={active.briefAudience}
                briefTone={active.briefTone}
                briefDo={active.briefDo}
                briefDont={active.briefDont}
              />
              <ApprovalCreator projectId={active.id} />
              <AssetCreator projectId={active.id} />
              <AccessCreator projectId={active.id} />
              <ContentCreator projectId={active.id} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Panel title="Aprovações recentes">
                {active.approvals.length === 0 ? (
                  <p className="text-ink/55">Nenhuma.</p>
                ) : (
                  <ul className="grid gap-2 text-sm">
                    {active.approvals.map((a) => (
                      <li key={a.id} className="border border-line p-3">
                        {a.title} · {a.status}
                        {a.clientNote ? (
                          <span className="mt-1 block text-ink/55">
                            Nota: {a.clientNote}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
              <Panel title="Pedidos">
                {active.requests.length === 0 ? (
                  <p className="text-ink/55">Nenhum.</p>
                ) : (
                  <ul className="grid gap-3">
                    {active.requests.map((r) => (
                      <li key={r.id} className="border border-line p-3">
                        <p className="font-serif text-lg">{r.title}</p>
                        <p className="mt-1 text-sm text-ink/55">
                          {r.priority} · {r.status}
                        </p>
                        <div className="mt-3">
                          <RequestStatusButtons
                            requestId={r.id}
                            status={r.status}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>
          </>
        ) : null}
      </div>
    </PortalShell>
  );
}
