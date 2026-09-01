"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";

export function Worlds() {
  const { locale, dict } = useI18n();
  const meetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = meetRef.current;
    if (!root) return;

    const marks = root.querySelectorAll("[data-meet-mark]");
    marks.forEach((m) => {
      (m as HTMLElement).style.opacity = "0";
      (m as HTMLElement).style.transform = "scaleX(0.4)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        animate(marks, {
          opacity: [0, 1],
          scaleX: [0.4, 1],
          duration: 900,
          delay: stagger(140),
          ease: "out(3)",
        });
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [locale]);

  return (
    <section className="border-y border-line bg-[#dfddd7] text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
            {dict.worlds.eyebrow}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-0">
          <Reveal
            className="md:border-r md:border-line md:pr-12 lg:pr-16"
            x={-48}
            y={0}
          >
            <p className="font-serif text-4xl tracking-[0.08em] uppercase md:text-5xl">
              {dict.worlds.creative}
            </p>
            <p className="mt-4 text-[0.7rem] tracking-[0.18em] text-stone uppercase">
              {dict.worlds.creativeTags}
            </p>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-ink/70">
              {dict.worlds.creativeCopy}
            </p>
          </Reveal>

          <Reveal delay={120} x={48} y={0} className="md:pl-12 lg:pl-16">
            <p className="font-serif text-4xl tracking-[0.08em] uppercase md:text-5xl">
              {dict.worlds.digital}
            </p>
            <p className="mt-4 text-[0.7rem] tracking-[0.18em] text-stone uppercase">
              {dict.worlds.digitalTags}
            </p>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-ink/70">
              {dict.worlds.digitalCopy}
            </p>
          </Reveal>
        </div>

        <div
          ref={meetRef}
          className="mt-16 flex flex-col items-center gap-5 md:mt-24"
        >
          <div className="flex w-full max-w-md items-center gap-3">
            <span
              data-meet-mark
              className="h-px flex-1 origin-right bg-ink/30"
            />
            <p className="font-serif text-xl tracking-[0.18em] uppercase md:text-2xl">
              {dict.worlds.meet}
            </p>
            <span
              data-meet-mark
              className="h-px flex-1 origin-left bg-ink/30"
            />
          </div>
          <p className="max-w-md text-center text-sm leading-relaxed text-ink/75">
            {dict.worlds.meetCopy}
          </p>
        </div>
      </div>
    </section>
  );
}
