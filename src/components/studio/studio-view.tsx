"use client";

import { useRef } from "react";
import Link from "next/link";
import { useI18n } from "@/components/i18n/locale-provider";
import { Origin } from "@/components/home/origin";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function StudioView() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const pieces = root.querySelectorAll("[data-studio-piece]");

      if (prefersReducedMotion()) {
        gsap.set(pieces, { clearProps: "all" });
        return;
      }

      gsap.set(pieces, { autoAlpha: 0, y: 22 });

      gsap.to(pieces, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.05,
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="relative overflow-hidden bg-paper text-ink">
      <div aria-hidden className="atmosphere-wash" />
      <section
        ref={rootRef}
        className="relative mx-auto flex min-h-[72vh] max-w-[1400px] flex-col justify-center px-5 py-28 md:px-10 md:py-32"
      >
        {dict.studio.eyebrow ? (
          <p
            data-studio-piece
            className="text-[0.65rem] tracking-[0.28em] text-ember/75 uppercase"
          >
            {dict.studio.eyebrow}
          </p>
        ) : null}
        <h1
          data-studio-piece
          className="mt-6 max-w-3xl font-serif text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[0.95] text-balance"
        >
          {dict.studio.headline}
        </h1>
        <p
          data-studio-piece
          className="mt-8 max-w-md text-base leading-relaxed text-ink/70"
        >
          {dict.studio.intro}
        </p>

        <div className="mt-16 flex max-w-3xl flex-col gap-12 md:flex-row md:items-start md:gap-20">
          <div data-studio-piece className="max-w-xs">
            <span aria-hidden className="mb-4 block h-px w-8 bg-ember/70" />
            <p className="font-serif text-2xl tracking-[0.06em] uppercase md:text-3xl">
              {dict.studio.creative}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              {dict.studio.creativeCopy}
            </p>
          </div>
          <div data-studio-piece className="max-w-xs md:pt-10">
            <span aria-hidden className="mb-4 block h-px w-8 bg-ember/70" />
            <p className="font-serif text-3xl tracking-[0.06em] uppercase md:text-4xl">
              {dict.studio.digital}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              {dict.studio.digitalCopy}
            </p>
          </div>
        </div>

        <div data-studio-piece className="mt-16">
          <Link
            href="/contact"
            className="group inline-flex min-h-12 w-fit items-center gap-3 bg-foam px-6 py-4 text-[0.7rem] tracking-[0.22em] text-deep uppercase transition-colors hover:bg-foam/90"
          >
            {dict.studio.workWithUs}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      <Origin />
    </div>
  );
}
