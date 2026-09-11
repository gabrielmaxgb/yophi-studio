"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { safeNextPath } from "@/lib/safe-path";

export async function requestMagicLinkAction(input: {
  email: string;
  next?: string | null;
}): Promise<{ status: "sent" } | { status: "error"; message: string }> {
  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
    return { status: "error", message: "Confere o e-mail." };
  }

  const ip = clientIp(await headers());
  if (!rateLimit(`magic:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return { status: "error", message: "Tenta de novo daqui a pouco." };
  }

  const callbackURL = safeNextPath(input.next) ?? "/conta";

  try {
    await auth.api.signInMagicLink({
      body: { email, callbackURL },
      headers: await headers(),
    });
  } catch {
    // Same response whether the account exists or not.
  }

  return { status: "sent" };
}
