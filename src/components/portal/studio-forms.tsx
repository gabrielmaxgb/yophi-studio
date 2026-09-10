"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  btnPrimary,
  Field,
  fieldClass,
  Panel,
} from "@/components/portal/shell";
import {
  createAccessAction,
  createApprovalAction,
  createAssetAction,
  createContentAction,
  createRequestAction,
  setRequestStatusAction,
  updateBriefAction,
  updateProjectStatusAction,
} from "@/lib/portal/actions";
import { PROJECT_STATUSES } from "@/lib/portal/catalog";
import { cn } from "@/lib/utils";

function useActionFeedback() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  function run(fn: () => Promise<void>) {
    start(async () => {
      setError(null);
      setOk(false);
      try {
        await fn();
        setOk(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro.");
      }
    });
  }

  return { pending, error, ok, run };
}

export function StatusEditor({
  projectId,
  status,
  statusNow,
  statusWaiting,
  statusNext,
  statusDueAt,
}: {
  projectId: string;
  status: string;
  statusNow: string;
  statusWaiting: string;
  statusNext: string;
  statusDueAt: string | null;
}) {
  const { pending, error, ok, run } = useActionFeedback();

  return (
    <Panel title="Status do projeto">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          run(() =>
            updateProjectStatusAction({
              projectId,
              status: String(fd.get("status")),
              statusNow: String(fd.get("statusNow") ?? ""),
              statusWaiting: String(fd.get("statusWaiting") ?? ""),
              statusNext: String(fd.get("statusNext") ?? ""),
              statusDueAt: String(fd.get("statusDueAt") ?? ""),
            })
          );
        }}
      >
        <Field label="Estado (fixo)">
          <select className={fieldClass} name="status" defaultValue={status}>
            {PROJECT_STATUSES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Agora">
          <input className={fieldClass} name="statusNow" defaultValue={statusNow} />
        </Field>
        <Field label="Falta do cliente">
          <input
            className={fieldClass}
            name="statusWaiting"
            defaultValue={statusWaiting}
          />
        </Field>
        <Field label="Próximo passo">
          <input className={fieldClass} name="statusNext" defaultValue={statusNext} />
        </Field>
        <Field label="Prazo (ISO, opcional)">
          <input
            className={fieldClass}
            name="statusDueAt"
            type="datetime-local"
            defaultValue={statusDueAt ?? ""}
          />
        </Field>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        {ok ? <p className="text-sm text-ink/60">Salvo.</p> : null}
        <button className={btnPrimary} disabled={pending}>
          Atualizar status
        </button>
      </form>
    </Panel>
  );
}

export function BriefEditor(props: {
  projectId: string;
  briefAudience: string;
  briefTone: string;
  briefDo: string;
  briefDont: string;
}) {
  const { pending, error, ok, run } = useActionFeedback();
  return (
    <Panel title="Brief e decisões">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          run(() =>
            updateBriefAction({
              projectId: props.projectId,
              briefAudience: String(fd.get("briefAudience") ?? ""),
              briefTone: String(fd.get("briefTone") ?? ""),
              briefDo: String(fd.get("briefDo") ?? ""),
              briefDont: String(fd.get("briefDont") ?? ""),
            })
          );
        }}
      >
        <Field label="Público">
          <textarea
            className={cn(fieldClass, "min-h-20")}
            name="briefAudience"
            defaultValue={props.briefAudience}
          />
        </Field>
        <Field label="Tom">
          <textarea
            className={cn(fieldClass, "min-h-20")}
            name="briefTone"
            defaultValue={props.briefTone}
          />
        </Field>
        <Field label="Fazer">
          <textarea
            className={cn(fieldClass, "min-h-24")}
            name="briefDo"
            defaultValue={props.briefDo}
          />
        </Field>
        <Field label="Não fazer">
          <textarea
            className={cn(fieldClass, "min-h-24")}
            name="briefDont"
            defaultValue={props.briefDont}
          />
        </Field>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        {ok ? <p className="text-sm text-ink/60">Salvo.</p> : null}
        <button className={btnPrimary} disabled={pending}>
          Salvar brief
        </button>
      </form>
    </Panel>
  );
}

export function ApprovalCreator({ projectId }: { projectId: string }) {
  const { pending, error, ok, run } = useActionFeedback();
  return (
    <Panel title="Nova aprovação">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          run(async () => {
            await createApprovalAction({
              projectId,
              title: String(fd.get("title") ?? ""),
              kind: String(fd.get("kind") ?? "OTHER"),
              body: String(fd.get("body") ?? ""),
              previewUrl: String(fd.get("previewUrl") ?? ""),
            });
            (e.target as HTMLFormElement).reset();
          });
        }}
      >
        <Field label="Título">
          <input className={fieldClass} name="title" required />
        </Field>
        <Field label="Tipo">
          <select className={fieldClass} name="kind" defaultValue="TEXT">
            <option value="TEXT">Texto</option>
            <option value="LAYOUT">Layout</option>
            <option value="SITE">Site</option>
            <option value="OTHER">Outro</option>
          </select>
        </Field>
        <Field label="Contexto">
          <textarea className={cn(fieldClass, "min-h-20")} name="body" />
        </Field>
        <Field label="Link preview (opcional)">
          <input className={fieldClass} name="previewUrl" type="url" />
        </Field>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        {ok ? <p className="text-sm text-ink/60">Criada.</p> : null}
        <button className={btnPrimary} disabled={pending}>
          Pedir aprovação
        </button>
      </form>
    </Panel>
  );
}

export function AssetCreator({ projectId }: { projectId: string }) {
  const { pending, error, ok, run } = useActionFeedback();
  return (
    <Panel title="Item no arquivo">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          run(async () => {
            await createAssetAction({
              projectId,
              label: String(fd.get("label") ?? ""),
              url: String(fd.get("url") ?? ""),
              kind: String(fd.get("kind") ?? "OTHER"),
              status: String(fd.get("status") ?? "LIVE"),
            });
            (e.target as HTMLFormElement).reset();
          });
        }}
      >
        <Field label="Rótulo">
          <input className={fieldClass} name="label" required />
        </Field>
        <Field label="URL">
          <input className={fieldClass} name="url" type="url" required />
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Tipo">
            <select className={fieldClass} name="kind" defaultValue="SITE">
              <option value="SITE">Site</option>
              <option value="DOMAIN">Domínio</option>
              <option value="SOCIAL">Social</option>
              <option value="FILE">Arquivo</option>
              <option value="OTHER">Outro</option>
            </select>
          </Field>
          <Field label="Status">
            <select className={fieldClass} name="status" defaultValue="LIVE">
              <option value="LIVE">No ar</option>
              <option value="APPROVED">Aprovado</option>
              <option value="DRAFT">Rascunho</option>
            </select>
          </Field>
        </div>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        {ok ? <p className="text-sm text-ink/60">Adicionado.</p> : null}
        <button className={btnPrimary} disabled={pending}>
          Salvar no arquivo
        </button>
      </form>
    </Panel>
  );
}

export function AccessCreator({ projectId }: { projectId: string }) {
  const { pending, error, ok, run } = useActionFeedback();
  return (
    <Panel title="Mapa de acessos">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          run(async () => {
            await createAccessAction({
              projectId,
              label: String(fd.get("label") ?? ""),
              holder: String(fd.get("holder") ?? ""),
              status: String(fd.get("status") ?? "MISSING"),
              notes: String(fd.get("notes") ?? ""),
            });
            (e.target as HTMLFormElement).reset();
          });
        }}
      >
        <Field label="Acesso">
          <input
            className={fieldClass}
            name="label"
            placeholder="Domínio, Analytics…"
            required
          />
        </Field>
        <Field label="Quem tem">
          <input className={fieldClass} name="holder" />
        </Field>
        <Field label="Status">
          <select className={fieldClass} name="status" defaultValue="MISSING">
            <option value="OK">Ok</option>
            <option value="PENDING">Pendente</option>
            <option value="MISSING">Falta</option>
          </select>
        </Field>
        <Field label="Notas">
          <input className={fieldClass} name="notes" />
        </Field>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        {ok ? <p className="text-sm text-ink/60">Adicionado.</p> : null}
        <button className={btnPrimary} disabled={pending}>
          Salvar acesso
        </button>
      </form>
    </Panel>
  );
}

export function ContentCreator({ projectId }: { projectId: string }) {
  const { pending, error, ok, run } = useActionFeedback();
  return (
    <Panel title="Peça de conteúdo">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          run(async () => {
            await createContentAction({
              projectId,
              title: String(fd.get("title") ?? ""),
              channel: String(fd.get("channel") ?? ""),
              status: String(fd.get("status") ?? "DRAFT"),
              scheduledAt: String(fd.get("scheduledAt") ?? ""),
            });
            (e.target as HTMLFormElement).reset();
          });
        }}
      >
        <Field label="Título">
          <input className={fieldClass} name="title" required />
        </Field>
        <Field label="Canal">
          <input className={fieldClass} name="channel" placeholder="Instagram" />
        </Field>
        <Field label="Status">
          <select className={fieldClass} name="status" defaultValue="DRAFT">
            <option value="DRAFT">Rascunho</option>
            <option value="WAITING_CLIENT">Aguardando cliente</option>
            <option value="APPROVED">Aprovado</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="PAUSED">Pausado</option>
          </select>
        </Field>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        {ok ? <p className="text-sm text-ink/60">Adicionado.</p> : null}
        <button className={btnPrimary} disabled={pending}>
          Salvar peça
        </button>
      </form>
    </Panel>
  );
}

export function RequestCreator({ projectId }: { projectId: string }) {
  const { pending, error, ok, run } = useActionFeedback();
  return (
    <Panel title="Novo pedido">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          run(async () => {
            await createRequestAction({
              projectId,
              title: String(fd.get("title") ?? ""),
              body: String(fd.get("body") ?? ""),
              priority: String(fd.get("priority") ?? "NORMAL"),
            });
            (e.target as HTMLFormElement).reset();
          });
        }}
      >
        <Field label="O que precisa">
          <input className={fieldClass} name="title" required />
        </Field>
        <Field label="Detalhe">
          <textarea className={cn(fieldClass, "min-h-20")} name="body" />
        </Field>
        <Field label="Prioridade">
          <select className={fieldClass} name="priority" defaultValue="NORMAL">
            <option value="NORMAL">Normal</option>
            <option value="URGENT">Urgente</option>
          </select>
        </Field>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        {ok ? <p className="text-sm text-ink/60">Enviado.</p> : null}
        <button className={btnPrimary} disabled={pending}>
          Abrir pedido
        </button>
      </form>
    </Panel>
  );
}

export function RequestStatusButtons({
  requestId,
  status,
}: {
  requestId: string;
  status: string;
}) {
  const { pending, run } = useActionFeedback();
  return (
    <div className="flex flex-wrap gap-2">
      {(["OPEN", "DOING", "DONE"] as const).map((s) => (
        <button
          key={s}
          type="button"
          disabled={pending || status === s}
          className={cn(
            "px-2 py-1 text-[0.65rem] tracking-[0.14em] uppercase",
            status === s ? "bg-foam text-deep" : "border border-line text-ink/70"
          )}
          onClick={() => run(() => setRequestStatusAction(requestId, s))}
        >
          {s === "OPEN" ? "Aberto" : s === "DOING" ? "Andamento" : "Feito"}
        </button>
      ))}
    </div>
  );
}
