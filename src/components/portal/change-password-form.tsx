"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setOfficialPasswordAction } from "@/lib/portal/actions";
import { btnPrimary, Field, fieldClass, Panel } from "@/components/portal/shell";

export function ChangePasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    start(async () => {
      setError(null);
      try {
        await setOfficialPasswordAction({
          password: String(fd.get("password") ?? ""),
          confirm: String(fd.get("confirm") ?? ""),
        });
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Não deu pra gravar a senha."
        );
      }
    });
  }

  return (
    <Panel title="Troca a senha provisória">
      <p className="mb-6 max-w-md text-sm leading-relaxed text-ink/65">
        Essa senha é só sua. Mínimo 10 caracteres.
      </p>
      <form onSubmit={onSubmit} className="flex max-w-sm flex-col gap-5">
        <Field label="Nova senha">
          <input
            className={fieldClass}
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={10}
          />
        </Field>
        <Field label="De novo">
          <input
            className={fieldClass}
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={10}
          />
        </Field>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
        <button type="submit" className={btnPrimary} disabled={pending}>
          {pending ? "Gravando…" : "Guardar senha"}
        </button>
      </form>
    </Panel>
  );
}
