"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { requestMagicLinkAction } from "@/lib/portal/login-actions";
import { safeNextPath } from "@/lib/safe-path";
import { btnGhost, btnPrimary, fieldClass, Field } from "@/components/portal/shell";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [linkSent, setLinkSent] = useState(false);
  const [pending, start] = useTransition();

  const next = safeNextPath(searchParams.get("next"));

  function onPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");

    start(async () => {
      setError(null);
      setLinkSent(false);
      const { error: err } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
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

  function onMagicLink() {
    if (!email.trim()) {
      setError("E-mail é obrigatório.");
      return;
    }

    start(async () => {
      setError(null);
      setLinkSent(false);
      const result = await requestMagicLinkAction({
        email: email.trim().toLowerCase(),
        next,
      });
      if (result.status === "error") {
        setError(result.message);
        return;
      }
      setLinkSent(true);
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <form onSubmit={onPassword} className="flex flex-col gap-5">
        <Field label="E-mail">
          <input
            className={fieldClass}
            name="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
        {linkSent ? (
          <p className="text-sm text-ink/70">Mandamos o link. Confere o e-mail.</p>
        ) : null}
        <button type="submit" className={btnPrimary} disabled={pending}>
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>

      <div className="flex flex-col gap-3">
        <p className="text-[0.65rem] tracking-[0.22em] text-ink/40 uppercase">
          ou
        </p>
        <p className="text-sm text-ink/55">
          Manda um link no e-mail. Ele confirma o endereço e entra.
        </p>
        <button
          type="button"
          className={btnGhost}
          disabled={pending}
          onClick={onMagicLink}
        >
          {pending ? "Mandando…" : "Mandar link no e-mail"}
        </button>
      </div>
    </div>
  );
}
