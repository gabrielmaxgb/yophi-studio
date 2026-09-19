import { YophiMark } from "@/components/brand/yophi-logo";
import { SignOutButton } from "@/components/portal/sign-out-button";
import { StudioNav } from "@/components/portal/studio-nav";
import type { SessionUser } from "@/lib/auth";

export function StudioShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-deep text-ink">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-40 bg-[linear-gradient(to_bottom,rgba(201,106,62,0.12),transparent)]" />
      <header className="relative z-10 border-b border-line/80 bg-deep/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 md:px-8 md:pl-28">
          <div className="flex items-center gap-3">
            <YophiMark className="h-7 w-auto" />
            <div>
              <p className="font-serif text-lg leading-none">Conta</p>
              <p className="mt-1 text-[0.65rem] tracking-[0.16em] text-stone uppercase">
                Estúdio · {user.email}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </header>
      <StudioNav />
      <main className="relative z-10 mx-auto max-w-[1200px] px-5 py-8 pb-28 md:px-8 md:py-10 md:pr-8 md:pl-28">
        {children}
      </main>
    </div>
  );
}

export function StudioPageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="text-[0.65rem] tracking-[0.2em] text-ember uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-serif text-3xl md:text-4xl">{title}</h1>
      {children ? (
        <div className="mt-3 max-w-xl text-sm leading-relaxed text-ink/60">
          {children}
        </div>
      ) : null}
    </div>
  );
}
