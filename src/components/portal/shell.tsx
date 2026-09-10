import { cn } from "@/lib/utils";

export function PortalShell({
  brand,
  nav,
  children,
  aside,
}: {
  brand: React.ReactNode;
  nav: React.ReactNode;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-deep text-ink">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-40 bg-[linear-gradient(to_bottom,rgba(201,106,62,0.12),transparent)]" />
      <header className="relative z-10 border-b border-line/80 bg-deep/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          {brand}
          {aside}
        </div>
      </header>
      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-8 px-5 py-8 md:grid-cols-[220px_1fr] md:px-8 md:py-10">
        <aside className="md:sticky md:top-8 md:self-start">{nav}</aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

export function PortalNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "block border-l-2 px-3 py-2 text-sm transition-colors",
        active
          ? "border-ember text-ink"
          : "border-transparent text-ink/55 hover:border-ink/20 hover:text-ink"
      )}
    >
      {children}
    </a>
  );
}

export function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="border border-line bg-paper/80 p-5 md:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="font-serif text-xl tracking-wide md:text-2xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-[0.65rem] tracking-[0.18em] text-stone uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export const fieldClass =
  "min-h-11 w-full border border-line bg-deep/60 px-3 py-2 text-sm text-ink outline-none focus:border-ink/40";

export const btnPrimary =
  "inline-flex min-h-11 cursor-pointer items-center justify-center bg-foam px-4 text-[0.7rem] tracking-[0.18em] text-deep uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export const btnGhost =
  "inline-flex min-h-11 cursor-pointer items-center justify-center border border-line px-4 text-[0.7rem] tracking-[0.18em] text-ink/80 uppercase transition-colors hover:border-ink/40 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50";
