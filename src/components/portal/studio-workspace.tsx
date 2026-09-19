import Link from "next/link";
import { redirect } from "next/navigation";
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
import { Panel } from "@/components/portal/shell";
import { statusLabel } from "@/components/portal/studio-project-card";
import { prisma } from "@/lib/db";
import { getService } from "@/lib/portal/catalog";
import { isProjectId, requireStudioPage } from "@/lib/portal/session";

export async function StudioProjectWorkspace({
  projectId,
}: {
  projectId: string;
}) {
  await requireStudioPage();
  if (!isProjectId(projectId)) redirect("/conta/projetos");

  const project = await prisma.project.findUnique({
    where: { id: projectId },
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

  if (!project) redirect("/conta/projetos");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/conta/projetos"
          className="text-[0.65rem] tracking-[0.16em] text-stone uppercase hover:text-ink"
        >
          Projetos
        </Link>
        <h1 className="mt-2 font-serif text-3xl md:text-4xl">{project.name}</h1>
        <p className="mt-2 text-sm text-ink/60">
          Contato:{" "}
          {project.members
            .map((m) => `${m.user.name} · ${m.user.email}`)
            .join(" / ") || "—"}
        </p>
        <p className="mt-2 text-[0.65rem] tracking-[0.16em] text-stone uppercase">
          {statusLabel(project.status)} · /{project.slug}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.services.map((s) => (
            <li
              key={s.id}
              className="border border-line px-2 py-1 text-[0.65rem] tracking-[0.12em] uppercase"
            >
              {s.customTitle || getService(s.serviceKey)?.title || s.serviceKey}
            </li>
          ))}
        </ul>
      </div>

      <ServicesEditor
        key={project.id}
        projectId={project.id}
        services={project.services.map((s) => ({
          serviceKey: s.serviceKey,
          customTitle: s.customTitle,
          customBody: s.customBody,
          customNotes: s.customNotes,
        }))}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <StatusEditor
          projectId={project.id}
          status={project.status}
          statusNow={project.statusNow}
          statusWaiting={project.statusWaiting}
          statusNext={project.statusNext}
          statusDueAt={
            project.statusDueAt
              ? new Date(project.statusDueAt).toISOString().slice(0, 16)
              : null
          }
        />
        <BriefEditor
          projectId={project.id}
          briefAudience={project.briefAudience}
          briefTone={project.briefTone}
          briefDo={project.briefDo}
          briefDont={project.briefDont}
        />
        <ApprovalCreator projectId={project.id} />
        <AssetCreator projectId={project.id} />
        <AccessCreator projectId={project.id} />
        <ContentCreator projectId={project.id} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Aprovações recentes">
          {project.approvals.length === 0 ? (
            <p className="text-ink/55">Nenhuma.</p>
          ) : (
            <ul className="grid gap-2 text-sm">
              {project.approvals.map((a) => (
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
          {project.requests.length === 0 ? (
            <p className="text-ink/55">Nenhum.</p>
          ) : (
            <ul className="grid gap-3">
              {project.requests.map((r) => (
                <li key={r.id} className="border border-line p-3">
                  <p className="font-serif text-lg">{r.title}</p>
                  <p className="mt-1 text-sm text-ink/55">
                    {r.priority} · {r.status}
                  </p>
                  <div className="mt-3">
                    <RequestStatusButtons requestId={r.id} status={r.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
