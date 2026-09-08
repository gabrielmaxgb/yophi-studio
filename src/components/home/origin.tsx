"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/components/i18n/locale-provider";
import { prefersReducedMotion } from "@/lib/motion";

const glyphs = ["יֹ", "פ", "י"] as const;

export function Origin() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const letters = root.querySelectorAll<HTMLElement>("[data-origin-glyph]");
      const latin = root.querySelector("[data-origin-latin]");
      const note = root.querySelector("[data-origin-rest]");

      if (prefersReducedMotion()) {
        gsap.set([letters, latin, note], { clearProps: "all" });
        return;
      }

      gsap.set(letters, { autoAlpha: 0, y: 28 });
      gsap.set([latin, note], { autoAlpha: 0, y: 14 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .to(letters, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
        })
        .to(latin, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.45")
        .to(note, { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.5");
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="border-t border-line bg-mist text-ink">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 py-16 text-center md:px-10 md:py-20">
        <p
          className="text-[clamp(3rem,10vw,6rem)] leading-none tracking-[0.2em]"
          lang="he"
          dir="rtl"
        >
          {glyphs.map((glyph) => (
            <span
              key={glyph}
              data-origin-glyph
              className="inline-block will-change-transform"
            >
              {glyph}
            </span>
          ))}
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <p
            data-origin-latin
            className="font-serif text-2xl tracking-[0.16em] uppercase md:text-3xl"
          >
            YOPHI
          </p>
          <p
            data-origin-rest
            className="max-w-xs text-[0.8rem] leading-relaxed text-ink/65"
          >
            {dict.origin.note}
          </p>
        </div>
      </div>
    </section>
  );
}
