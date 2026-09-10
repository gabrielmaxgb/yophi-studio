"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { YophiLogo } from "@/components/brand/yophi-logo";
import { ArchiveLink } from "@/components/work/archive-gate";
import { useI18n } from "@/components/i18n/locale-provider";
import { prefersReducedMotion } from "@/lib/motion";

export function SiteFooter() {
  const { dict } = useI18n();
  const pathname = usePathname();

  if (pathname === "/work") return null;

  return (
    <footer className="relative overflow-hidden border-line border-t bg-deep text-ink">
      <div aria-hidden className="atmosphere-wash atmosphere-wash-flip" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-20">
        <div className="flex flex-col gap-5">
          <YophiLogo
            layout="stack"
            className="items-start text-left"
            markClassName="h-14 md:h-16"
            wordmarkClassName="text-4xl tracking-[0.16em] md:text-5xl"
            studioClassName="text-[0.7rem] tracking-[0.22em] text-ink/70"
          />
          <p className="max-w-sm text-sm leading-relaxed text-ink/80">
            {dict.footer.blurb}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[0.65rem] tracking-[0.24em] text-ember/70 uppercase">
            {dict.footer.navigate}
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="/#servicos"
              onClick={() => {
                if (pathname !== "/") return;
                document.getElementById("servicos")?.scrollIntoView({
                  behavior: prefersReducedMotion() ? "auto" : "smooth",
                });
              }}
              className="inline-flex min-h-11 items-center text-ink/85 transition-colors hover:text-ink"
            >
              {dict.nav.services}
            </Link>
            <ArchiveLink
              href="/work"
              className="inline-flex min-h-11 items-center text-ink/85 transition-colors hover:text-ink"
            >
              {dict.nav.work}
            </ArchiveLink>
            <Link
              href="/studio"
              className="inline-flex min-h-11 items-center text-ink/85 transition-colors hover:text-ink"
            >
              {dict.nav.studio}
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center text-ink/85 transition-colors hover:text-ink"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-end md:text-right">
          <p className="text-[0.65rem] tracking-[0.24em] text-ember/70 uppercase">
            {dict.footer.presence}
          </p>
          <p className="font-serif text-2xl leading-snug text-ink/90">
            {dict.footer.presenceLine}
            <br />
            {dict.footer.presenceLine2}
          </p>
        </div>
      </div>

      <div className="relative border-ink/10 mx-auto flex max-w-[1400px] flex-col gap-2 border-t px-5 py-6 text-[0.65rem] tracking-[0.16em] text-ink/60 uppercase md:flex-row md:items-center md:justify-between md:px-10">
        <span>
          © {new Date().getFullYear()} {dict.footer.copyright}
        </span>
        <span>{dict.footer.tag}</span>
      </div>
    </footer>
  );
}
