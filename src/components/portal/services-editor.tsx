"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  btnPrimary,
  Field,
  fieldClass,
  Panel,
} from "@/components/portal/shell";
import { updateProjectServicesAction } from "@/lib/portal/actions";
import { SERVICE_CATALOG } from "@/lib/portal/catalog";
import { cn } from "@/lib/utils";

type DraftService = {
  serviceKey: string;
  customTitle: string;
  customBody: string;
  customNotes: string;
};

type ExistingService = {
  serviceKey: string;
  customTitle: string | null;
  customBody: string | null;
  customNotes: string;
};

export function ServicesEditor({
  projectId,
  services,
}: {
  projectId: string;
  services: ExistingService[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [selected, setSelected] = useState<Record<string, DraftService>>(() => {
    const initial: Record<string, DraftService> = {};
    for (const s of services) {
      initial[s.serviceKey] = {
        serviceKey: s.serviceKey,
        customTitle: s.customTitle ?? "",
        customBody: s.customBody ?? "",
        customNotes: s.customNotes ?? "",
      };
    }
    return initial;
  });

  const selectedList = useMemo(() => Object.values(selected), [selected]);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else {
        next[key] = {
          serviceKey: key,
          customTitle: "",
          customBody: "",
          customNotes: "",
        };
      }
      return next;
    });
  }

  function onSave() {
    start(async () => {
      setError(null);
      setOk(false);
      try {
        await updateProjectServicesAction({
          projectId,
          services: selectedList.map((s) => ({
            serviceKey: s.serviceKey,
            customTitle: s.customTitle || undefined,
            customBody: s.customBody || undefined,
            customNotes: s.customNotes || undefined,
          })),
        });
        setOk(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao salvar.");
      }
    });
  }

  return (
    <Panel title="Serviços do contrato">
      <p className="mb-4 text-sm text-ink/55">
        O que está ativo libera módulos no dashboard do cliente. Cada item pode
        ter título e texto custom.
      </p>
      <div className="grid gap-3">
        {SERVICE_CATALOG.map((service) => {
          const on = Boolean(selected[service.key]);
          const draft = selected[service.key];
          return (
            <div
              key={service.key}
              className={cn(
                "border border-line p-4 transition-colors",
                on ? "border-ember/50 bg-mist/40" : "bg-transparent"
              )}
            >
              <button
                type="button"
                onClick={() => toggle(service.key)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <span>
                  <span className="block font-serif text-lg">{service.title}</span>
                  <span className="mt-1 block text-sm text-ink/60">
                    {service.body}
                  </span>
                </span>
                <span className="text-[0.65rem] tracking-[0.16em] text-ember uppercase">
                  {on ? "Ativo" : "Off"}
                </span>
              </button>
              {on && draft ? (
                <div className="mt-4 grid gap-3 border-t border-line pt-4 md:grid-cols-2">
                  <Field label="Título custom">
                    <input
                      className={fieldClass}
                      value={draft.customTitle}
                      placeholder={service.title}
                      onChange={(ev) =>
                        setSelected((prev) => ({
                          ...prev,
                          [service.key]: {
                            ...draft,
                            customTitle: ev.target.value,
                          },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Notas internas">
                    <input
                      className={fieldClass}
                      value={draft.customNotes}
                      onChange={(ev) =>
                        setSelected((prev) => ({
                          ...prev,
                          [service.key]: {
                            ...draft,
                            customNotes: ev.target.value,
                          },
                        }))
                      }
                    />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Descrição custom">
                      <textarea
                        className={cn(fieldClass, "min-h-20")}
                        value={draft.customBody}
                        placeholder={service.body}
                        onChange={(ev) =>
                          setSelected((prev) => ({
                            ...prev,
                            [service.key]: {
                              ...draft,
                              customBody: ev.target.value,
                            },
                          }))
                        }
                      />
                    </Field>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {error ? <p className="mt-4 text-sm text-ember">{error}</p> : null}
      {ok ? <p className="mt-4 text-sm text-ink/60">Contrato atualizado.</p> : null}
      <button
        type="button"
        className={cn(btnPrimary, "mt-5")}
        disabled={pending || selectedList.length === 0}
        onClick={onSave}
      >
        {pending ? "Salvando…" : "Salvar serviços"}
      </button>
    </Panel>
  );
}
