"use client";

import { useState, useTransition } from "react";
import { devSignInStudioAction } from "@/lib/portal/dev-login";
import { btnPrimary } from "@/components/portal/shell";

export function DevStudioLogin() {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <button
        type="button"
        className={`${btnPrimary} w-full`}
        disabled={pending}
        onClick={() => {
          start(async () => {
            setError(null);
            const result = await devSignInStudioAction();
            if (result?.error) setError(result.error);
          });
        }}
      >
        {pending ? "Entrando…" : "Entrar como YOPHI"}
      </button>
      {error ? <p className="text-sm text-ember">{error}</p> : null}
    </div>
  );
}
