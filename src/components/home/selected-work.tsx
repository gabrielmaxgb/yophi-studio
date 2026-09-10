"use client";

import { useRef } from "react";
import { ArchiveLink } from "@/components/work/archive-gate";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/components/i18n/locale-provider";
import { prefersReducedMotion } from "@/lib/motion";

export function SelectedWork() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const pieces = root.querySelectorAll("[data-sw-piece]");

      if (prefersReducedMotion()) {
        gsap.set(pieces, { clearProps: "all" });
        return;
      }

      gsap.set(pieces, { autoAlpha: 0, y: 22 });

      gsap.to(pieces, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-paper text-ink">
      <div aria-hidden className="atmosphere-wash atmosphere-wash-flip" />
      <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] flex-col justify-center px-5 py-20 md:px-10 md:py-24">
        <h2
          data-sw-piece
          className="max-w-3xl font-serif text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.95]"
        >
          {dict.selectedWork.headline}
        </h2>
        <p
          data-sw-piece
          className="mt-5 max-w-md text-base leading-relaxed text-ink/75"
        >
          {dict.selectedWork.invite}
        </p>

        {dict.selectedWork.proofs.length > 0 ? (
          <ul
            data-sw-piece
            className="mt-10 flex flex-col gap-4 border-t border-line pt-8 md:mt-12"
          >
            {dict.selectedWork.proofs.map((proof) => (
              <li
                key={proof.domain}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 max-w-lg"
              >
                <span className="font-serif text-xl md:text-2xl">
                  {proof.name}
                </span>
                <span className="text-[0.75rem] tracking-[0.12em] text-ember/75 uppercase">
                  {proof.domain}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div data-sw-piece className="mt-14 md:mt-16">
          <ArchiveLink
            href="/work"
            className="group inline-flex min-h-11 flex-col items-start gap-8"
          >
            <span
              className="relative flex h-16 w-44 items-center justify-between"
              aria-hidden
            >
              <span className="size-16 rounded-full border border-ember/30 transition-colors group-hover:border-ember" />
              <span className="size-16 rounded-full border border-ember/30 transition-colors group-hover:border-ember" />
            </span>
            <span className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase">
              {dict.selectedWork.all}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </ArchiveLink>
        </div>
      </div>
    </section>
  );
}
