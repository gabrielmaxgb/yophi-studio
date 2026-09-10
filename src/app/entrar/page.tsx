import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { YophiMark } from "@/components/brand/yophi-logo";
import { LoginForm } from "@/components/portal/login-form";
import { getSessionUser } from "@/lib/portal/session";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function EntrarPage() {
  const user = await getSessionUser();
  if (user) redirect("/conta");

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-deep px-5 text-ink">
      <Link
        href="/"
        aria-label="YOPHI"
        className="mb-10 flex flex-col items-center gap-3"
      >
        <YophiMark className="h-10 w-auto" />
        <p className="font-serif text-sm tracking-[0.28em] uppercase">Yophi</p>
      </Link>
      <Suspense fallback={<p className="text-sm text-ink/50">Carregando…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
