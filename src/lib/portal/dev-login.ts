"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isDevStudioLoginEnabled } from "@/lib/dev-access";

export async function devSignInStudioAction(): Promise<{ error: string } | void> {
  if (!isDevStudioLoginEnabled()) {
    return { error: "Indisponível." };
  }

  const email = process.env.STUDIO_EMAIL?.trim().toLowerCase();
  const password = process.env.STUDIO_PASSWORD;
  if (!email || !password) {
    return { error: "STUDIO_EMAIL ou STUDIO_PASSWORD faltando no .env." };
  }

  try {
    await auth.api.signInEmail({
      body: { email, password, rememberMe: true },
      headers: await headers(),
    });
  } catch {
    return { error: "Não entrou. Roda o seed e tenta de novo." };
  }

  redirect("/conta");
}
