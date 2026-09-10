"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { btnGhost, btnPrimary, Field, fieldClass } from "@/components/portal/shell";
import { respondApprovalAction } from "@/lib/portal/actions";
import { cn } from "@/lib/utils";

export function ApprovalResponse({ approvalId }: { approvalId: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  function decide(decision: "APPROVED" | "CHANGES") {
    start(async () => {
      setError(null);
      try {
        await respondApprovalAction({
          approvalId,
          decision,
          clientNote: note,
        });
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro.");
      }
    });
  }

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
      <Field label="Nota (se pedir ajuste)">
        <textarea
          className={cn(fieldClass, "min-h-16")}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Field>
      {error ? <p className="text-sm text-ember">{error}</p> : null}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={btnPrimary}
          disabled={pending}
          onClick={() => decide("APPROVED")}
        >
          Aprovar
        </button>
        <button
          type="button"
          className={btnGhost}
          disabled={pending}
          onClick={() => decide("CHANGES")}
        >
          Pedir ajuste
        </button>
      </div>
    </div>
  );
}
