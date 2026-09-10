"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { btnGhost } from "@/components/portal/shell";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className={btnGhost}
      onClick={async () => {
        await authClient.signOut();
        router.replace("/entrar");
        router.refresh();
      }}
    >
      Sair
    </button>
  );
}
