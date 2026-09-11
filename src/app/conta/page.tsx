import { YophiMark } from "@/components/brand/yophi-logo";
import { ApprovalResponse } from "@/components/portal/approval-response";
import { StudioWorkspace } from "@/components/portal/studio-workspace";
import { ChangePasswordForm } from "@/components/portal/change-password-form";
import { RequestCreator } from "@/components/portal/studio-forms";
import {
  Panel,
  PortalNavLink,
  PortalShell,
} from "@/components/portal/shell";
import { SignOutButton } from "@/components/portal/sign-out-button";
import {
  MODULE_META,
  PROJECT_STATUSES,
  getService,
  type PortalModule,
} from "@/lib/portal/catalog";
import { getPortalBootstrap } from "@/lib/portal/actions";
import { requireUser } from "@/lib/portal/session";

export const metadata = {
  title: "Conta",
  robots: { index: false, follow: false },
};

export default async function ContaPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string; p?: string }>;
}) {
  const user = await requireUser({ allowPendingPassword: true });
  const params = await searchParams;

  if (user.role === "CLIENT" && user.mustChangePassword) {
    return (
      <PortalShell
        brand={
          <div className="flex items-center gap-3">
            <YophiMark className="h-7 w-auto" />
            <span className="font-serif tracking-[0.16em] uppercase">Conta</span>
          </div>
        }
        aside={<SignOutButton />}
        nav={<p className="text-sm text-ink/55">Primeiro acesso</p>}
      >
        <ChangePasswordForm />
      </PortalShell>
    );
  }

  // Same URL for everyone — studio sees admin tools, clients see their dashboard.
  if (user.role === "STUDIO") {
    return <StudioWorkspace user={user} projectId={params.p} />;
  }

  const { project, modules } = await getPortalBootstrap();
  const activeMod = (params.m as PortalModule | undefined) ?? "status";
  const allowed = modules as PortalModule[];
  const current = allowed.includes(activeMod) ? activeMod : "status";

  if (!project) {
    return (
      <PortalShell
        brand={
          <div className="flex items-center gap-3">
            <YophiMark className="h-7 w-auto" />
            <span className="font-serif tracking-[0.16em] uppercase">Conta</span>
          </div>
        }
        aside={<SignOutButton />}
        nav={<p className="text-sm text-ink/55">Sem projeto vinculado.</p>}
      >
        <Panel title="Olá">
          <p className="text-ink/70">
            Sua conta existe, mas ainda não há projeto liberado. Fale com a
            YOPHI.
          </p>
        </Panel>
      </PortalShell>
    );
  }

  const statusLabel =
    PROJECT_STATUSES.find((s) => s.key === project.status)?.label ??
    project.status;

  return (
    <PortalShell
      brand={
        <div className="flex items-center gap-3">
          <YophiMark className="h-7 w-auto" />
          <div>
            <p className="font-serif text-lg leading-none">{project.name}</p>
            <p className="mt-1 text-[0.65rem] tracking-[0.16em] text-stone uppercase">
              {user.email}
            </p>
          </div>
        </div>
      }
      aside={<SignOutButton />}
      nav={
        <nav className="flex flex-col gap-1">
          {allowed.map((mod) => (
            <PortalNavLink
              key={mod}
              href={`/conta?m=${mod}`}
              active={current === mod}
            >
              {MODULE_META[mod].label}
            </PortalNavLink>
          ))}
        </nav>
      }
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[0.65rem] tracking-[0.2em] text-ember uppercase">
            {MODULE_META[current].label}
          </p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl">
            {MODULE_META[current].description}
          </h1>
        </div>

        {current === "status" ? (
          <Panel title="Onde estamos">
            <p className="text-[0.65rem] tracking-[0.18em] text-stone uppercase">
              Estado · {statusLabel}
            </p>
            <dl className="mt-5 grid gap-4">
              <div>
                <dt className="text-stone text-[0.7rem] uppercase tracking-[0.14em]">
                  Agora
                </dt>
                <dd className="mt-1 font-serif text-xl">
                  {project.statusNow || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-stone text-[0.7rem] uppercase tracking-[0.14em]">
                  Falta de vocês
                </dt>
                <dd className="mt-1 text-ink/80">
                  {project.statusWaiting || "Nada no momento."}
                </dd>
              </div>
              <div>
                <dt className="text-stone text-[0.7rem] uppercase tracking-[0.14em]">
                  Próximo passo
                </dt>
                <dd className="mt-1 text-ink/80">
                  {project.statusNext || "—"}
                </dd>
              </div>
              {project.statusDueAt ? (
                <div>
                  <dt className="text-stone text-[0.7rem] uppercase tracking-[0.14em]">
                    Prazo
                  </dt>
                  <dd className="mt-1 text-ink/80">
                    {new Date(project.statusDueAt).toLocaleString("pt-BR")}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-[0.65rem] tracking-[0.18em] text-stone uppercase">
                Serviços contratados
              </p>
              <ul className="mt-3 grid gap-3">
                {project.services.map((s) => {
                  const base = getService(s.serviceKey);
                  return (
                    <li key={s.id} className="border border-line p-3">
                      <p className="font-serif text-lg">
                        {s.customTitle || base?.title || s.serviceKey}
                      </p>
                      <p className="mt-1 text-sm text-ink/60">
                        {s.customBody || base?.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Panel>
        ) : null}

        {current === "brief" ? (
          <Panel title="O que foi combinado">
            <div className="grid gap-5">
              <Block label="Público" value={project.briefAudience} />
              <Block label="Tom" value={project.briefTone} />
              <Block label="Fazer" value={project.briefDo} />
              <Block label="Não fazer" value={project.briefDont} />
            </div>
          </Panel>
        ) : null}

        {current === "approvals" ? (
          <div className="grid gap-4">
            {project.approvals.length === 0 ? (
              <Panel title="Aprovações">
                <p className="text-ink/60">Nada pedindo resposta agora.</p>
              </Panel>
            ) : (
              project.approvals.map((a) => (
                <Panel key={a.id} title={a.title}>
                  <p className="text-[0.65rem] tracking-[0.16em] text-stone uppercase">
                    {a.kind}
                  </p>
                  {a.body ? (
                    <p className="mt-3 whitespace-pre-wrap text-ink/75">{a.body}</p>
                  ) : null}
                  {a.previewUrl ? (
                    <a
                      href={a.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-ember underline"
                    >
                      Abrir preview
                    </a>
                  ) : null}
                  <ApprovalResponse approvalId={a.id} />
                </Panel>
              ))
            )}
          </div>
        ) : null}

        {current === "archive" ? (
          <Panel title="Arquivo vivo">
            {project.assets.length === 0 ? (
              <p className="text-ink/60">Ainda sem links oficiais.</p>
            ) : (
              <ul className="divide-y divide-line">
                {project.assets.map((asset) => (
                  <li
                    key={asset.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-3"
                  >
                    <span className="font-serif text-lg">{asset.label}</span>
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.7rem] tracking-[0.14em] text-stone uppercase"
                    >
                      {asset.url.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        ) : null}

        {current === "requests" ? (
          <div className="grid gap-6">
            <RequestCreator projectId={project.id} />
            <Panel title="Em aberto">
              {project.requests.length === 0 ? (
                <p className="text-ink/60">Nenhum pedido aberto.</p>
              ) : (
                <ul className="grid gap-3">
                  {project.requests.map((r) => (
                    <li key={r.id} className="border border-line p-3">
                      <p className="font-serif text-lg">{r.title}</p>
                      <p className="mt-1 text-sm text-ink/60">
                        {r.priority} · {r.status}
                      </p>
                      {r.body ? (
                        <p className="mt-2 text-sm text-ink/75">{r.body}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        ) : null}

        {current === "access" ? (
          <Panel title="Acessos">
            <p className="mb-4 text-sm text-ink/55">
              Mapa de quem controla o quê — sem senhas nesta tela.
            </p>
            {project.accessMaps.length === 0 ? (
              <p className="text-ink/60">Nada cadastrado ainda.</p>
            ) : (
              <ul className="grid gap-3">
                {project.accessMaps.map((a) => (
                  <li key={a.id} className="border border-line p-3">
                    <p className="font-serif text-lg">{a.label}</p>
                    <p className="mt-1 text-sm text-ink/65">
                      {a.holder || "—"} · {a.status}
                    </p>
                    {a.notes ? (
                      <p className="mt-2 text-sm text-ink/55">{a.notes}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        ) : null}

        {current === "content" ? (
          <Panel title="Fila de conteúdo">
            {project.contentItems.length === 0 ? (
              <p className="text-ink/60">Fila vazia.</p>
            ) : (
              <ul className="grid gap-3">
                {project.contentItems.map((c) => (
                  <li key={c.id} className="border border-line p-3">
                    <p className="font-serif text-lg">{c.title}</p>
                    <p className="mt-1 text-sm text-ink/60">
                      {c.channel} · {c.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        ) : null}
      </div>
    </PortalShell>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.65rem] tracking-[0.16em] text-stone uppercase">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-ink/80">
        {value || "Ainda não definido."}
      </p>
    </div>
  );
}
