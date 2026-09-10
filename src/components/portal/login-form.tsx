"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { btnPrimary, fieldClass, Field } from "@/components/portal/shell";

function safeNextPath(raw: string | null): string | null {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return null;
  if (raw.includes("\\") || raw.includes("@")) return null;
  return raw;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim().toLowerCase();
    const password = String(fd.get("password") ?? "");
    const next = safeNextPath(searchParams.get("next"));

    start(async () => {
      setError(null);
      const { error: err } = await authClient.signIn.email({
        email,
        password,
      });
      if (err) {
        setError("E-mail ou senha inválidos.");
        return;
      }
      router.replace(next ?? "/conta");
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-5">
      <Field label="E-mail">
        <input
          className={fieldClass}
          name="email"
          type="email"
          autoComplete="username"
          required
        />
      </Field>
      <Field label="Senha">
        <input
          className={fieldClass}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={10}
        />
      </Field>
      {error ? <p className="text-sm text-ember">{error}</p> : null}
      <button type="submit" className={btnPrimary} disabled={pending}>
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
