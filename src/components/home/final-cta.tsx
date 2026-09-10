"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/components/i18n/locale-provider";
import { SplitHeadline } from "@/components/motion/split-headline";
import { prefersReducedMotion } from "@/lib/motion";

export function FinalCta() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const body = root.querySelector("[data-cta-body]");
      const button = root.querySelector("[data-cta-button]");

      if (prefersReducedMotion()) {
        gsap.set([body, button], { clearProps: "all" });
        return;
      }

      gsap.set([body, button], { autoAlpha: 0, y: 18 });

      gsap.to([body, button], {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-deep text-ink">
      <div
        aria-hidden
        className="atmosphere-wash atmosphere-wash-flip atmosphere-wash-strong"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SplitHeadline className="max-w-4xl font-serif text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.98] text-balance">
          {dict.finalCta.headline}
        </SplitHeadline>

        <div className="mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-center md:gap-10">
          <p
            data-cta-body
            className="max-w-md text-sm leading-relaxed text-ink/70"
          >
            {dict.finalCta.body}
          </p>
          <Link
            data-cta-button
            href="/contact"
            className="group inline-flex min-h-12 w-fit items-center gap-3 bg-foam px-6 py-4 text-[0.7rem] tracking-[0.22em] text-deep uppercase transition-colors hover:bg-foam/90"
          >
            {dict.finalCta.cta}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
