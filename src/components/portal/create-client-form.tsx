"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  btnPrimary,
  btnGhost,
  Field,
  fieldClass,
  Panel,
} from "@/components/portal/shell";
import { createClientAction } from "@/lib/portal/actions";
import { SERVICE_CATALOG } from "@/lib/portal/catalog";
import { cn } from "@/lib/utils";

export function CreateClientForm() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, true>>({});

  const selectedKeys = useMemo(() => Object.keys(selected), [selected]);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const form = e.currentTarget;

    start(async () => {
      setError(null);
      setOk(null);
      try {
        const result = await createClientAction({
          companyName: String(fd.get("companyName") ?? ""),
          contactName: String(fd.get("contactName") ?? ""),
          contactEmail: String(fd.get("contactEmail") ?? ""),
          temporaryPassword: String(fd.get("temporaryPassword") ?? ""),
          services: selectedKeys.map((serviceKey) => ({ serviceKey })),
        });
        setOk(`Cliente criado. Projeto /${result.slug}`);
        router.refresh();
        form.reset();
        setSelected({});
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao criar cliente.");
      }
    });
  }

  return (
    <Panel title="Novo cliente">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Empresa">
            <input className={fieldClass} name="companyName" required />
          </Field>
          <Field label="Contato">
            <input className={fieldClass} name="contactName" required />
          </Field>
          <Field label="E-mail de acesso">
            <input
              className={fieldClass}
              name="contactEmail"
              type="email"
              required
              autoComplete="off"
            />
          </Field>
          <Field label="Senha temporária (≥10)">
            <input
              className={fieldClass}
              name="temporaryPassword"
              type="text"
              required
              minLength={10}
              autoComplete="new-password"
            />
          </Field>
        </div>

        <div>
          <p className="mb-3 text-[0.65rem] tracking-[0.18em] text-stone uppercase">
            O que contratam — libera o dashboard
          </p>
          <div className="grid gap-3">
            {SERVICE_CATALOG.map((service) => {
              const on = Boolean(selected[service.key]);
              return (
                <button
                  key={service.key}
                  type="button"
                  onClick={() => toggle(service.key)}
                  className={cn(
                    "flex w-full items-start justify-between gap-4 border border-line p-4 text-left transition-colors",
                    on ? "border-ember/50 bg-mist/40" : "bg-transparent"
                  )}
                >
                  <span>
                    <span className="block font-serif text-lg">{service.title}</span>
                    <span className="mt-1 block text-sm text-ink/60">
                      {service.body}
                    </span>
                  </span>
                  <span className="text-[0.65rem] tracking-[0.16em] text-ember uppercase">
                    {on ? "Selecionado" : "Selecionar"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {error ? <p className="text-sm text-ember">{error}</p> : null}
        {ok ? <p className="text-sm text-ink/70">{ok}</p> : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className={btnPrimary}
            disabled={pending || selectedKeys.length === 0}
          >
            {pending ? "Criando…" : "Cadastrar cliente"}
          </button>
          <button
            type="button"
            className={btnGhost}
            onClick={() => setSelected({})}
            disabled={pending}
          >
            Limpar serviços
          </button>
        </div>
      </form>
    </Panel>
  );
}
