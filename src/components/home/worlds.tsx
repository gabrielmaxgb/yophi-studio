"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/components/i18n/locale-provider";
import { prefersReducedMotion } from "@/lib/motion";

export function Worlds() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const eyebrow = root.querySelector("[data-w-eyebrow]");
      const creative = root.querySelector("[data-w-creative]");
      const digital = root.querySelector("[data-w-digital]");

      if (prefersReducedMotion()) {
        gsap.set([eyebrow, creative, digital], { clearProps: "all" });
        return;
      }

      gsap.set(eyebrow, { autoAlpha: 0, y: 12 });
      gsap.set(creative, { autoAlpha: 0, y: 24 });
      gsap.set(digital, { autoAlpha: 0, y: 24 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
        .to(creative, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.1)
        .to(digital, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.22);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-y border-line bg-mist text-ink"
    >
      <div aria-hidden className="atmosphere-wash atmosphere-wash-flip" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <p
          data-w-eyebrow
          className="text-[0.65rem] tracking-[0.28em] text-ember/75 uppercase"
        >
          {dict.worlds.eyebrow}
        </p>

        <div className="mt-12 flex flex-col gap-14 md:mt-16 md:gap-20">
          <div data-w-creative className="max-w-sm md:max-w-md">
            <span aria-hidden className="mb-4 block h-px w-8 bg-ember/70" />
            <p className="font-serif text-3xl tracking-[0.06em] uppercase md:text-4xl">
              {dict.worlds.creative}
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink/70">
              {dict.worlds.creativeCopy}
            </p>
          </div>

          <div
            data-w-digital
            className="max-w-md self-end md:max-w-lg md:text-right"
          >
            <span
              aria-hidden
              className="mb-4 block h-px w-8 bg-ember/70 md:ml-auto"
            />
            <p className="font-serif text-4xl tracking-[0.06em] uppercase md:text-5xl">
              {dict.worlds.digital}
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink/70 md:ml-auto md:max-w-sm">
              {dict.worlds.digitalCopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
