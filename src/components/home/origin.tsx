"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, scrambleText, stagger } from "animejs";
import { useI18n } from "@/components/i18n/locale-provider";
import { prefersReducedMotion } from "@/lib/motion";

const glyphs = ["יֹ", "פ", "י"] as const;

export function Origin() {
  const { locale, dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);
  const latinRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const latin = latinRef.current;
    if (!root || !latin) return;

    const letters = root.querySelectorAll<HTMLElement>("[data-origin-glyph]");
    const rest = root.querySelectorAll("[data-origin-rest]");

    if (prefersReducedMotion()) {
      letters.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      rest.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      return;
    }

    letters.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px) rotate(-6deg)";
    });
    rest.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        const tl = createTimeline({ defaults: { ease: "out(3)" } });
        tl.add(letters, {
          opacity: [0, 1],
          y: [28, 0],
          rotate: [-6, 0],
          duration: 1200,
          delay: stagger(160),
        })
          .add(
            latin,
            {
              text: scrambleText({
                text: "YOPHI",
                chars: "uppercase",
                from: "center",
              }),
              duration: 1400,
            },
            "-=400"
          )
          .add(
            rest,
            {
              opacity: [0, 1],
              y: [16, 0],
              duration: 900,
              delay: stagger(80),
            },
            "-=800"
          );

        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [locale]);

  return (
    <section ref={rootRef} className="bg-[#d7d4cd] text-ink">
      <div className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-5 py-28 text-center md:px-10 md:py-36">
        <p
          className="text-[clamp(4rem,14vw,9rem)] leading-none tracking-[0.2em]"
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

        <div className="mt-10 flex flex-col gap-3">
          <p
            ref={latinRef}
            className="font-serif text-3xl tracking-[0.16em] uppercase md:text-4xl"
          >
            Yophi
          </p>
          <p
            data-origin-rest
            className="text-[0.7rem] tracking-[0.28em] text-stone uppercase"
          >
            {dict.origin.note}
          </p>
        </div>

        <div data-origin-rest className="mt-14 max-w-lg">
          <p className="font-serif text-[clamp(1.35rem,2.8vw,1.85rem)] leading-snug text-ink/80">
            {dict.origin.copy}
            <br />
            {dict.origin.copyLine2}
          </p>
        </div>
      </div>
    </section>
  );
}
