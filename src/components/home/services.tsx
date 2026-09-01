"use client";

import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal, StaggerReveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { prefersReducedMotion } from "@/lib/motion";

export function Services() {
  const { dict } = useI18n();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root || prefersReducedMotion()) return;

    const rows = root.querySelectorAll<HTMLElement>("[data-service]");
    const cleanups: Array<() => void> = [];

    rows.forEach((row) => {
      const number = row.querySelector<HTMLElement>("[data-service-num]");
      const rule = row.querySelector<HTMLElement>("[data-service-rule]");
      const original = number?.textContent ?? "";

      const enter = () => {
        if (number) {
          animate(number, {
            text: scrambleText({
              text: original,
              chars: "numbers",
              from: "left",
            }),
            duration: 520,
          });
        }
        if (rule) {
          animate(rule, {
            scaleX: [0, 1],
            duration: 640,
            ease: "out(3)",
          });
        }
      };

      const leave = () => {
        if (rule) {
          animate(rule, {
            scaleX: 0,
            duration: 380,
            ease: "in(2)",
          });
        }
      };

      row.addEventListener("pointerenter", enter);
      row.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        row.removeEventListener("pointerenter", enter);
        row.removeEventListener("pointerleave", leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [dict.services.items]);

  return (
    <section className="bg-deep text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-[0.65rem] tracking-[0.28em] text-paper/70 uppercase">
                {dict.services.eyebrow}
              </p>
              <SplitHeadline className="font-serif text-[clamp(2.2rem,5vw,4rem)] leading-none">
                {`${dict.services.headline} ${dict.services.headlineBreak}`}
              </SplitHeadline>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-paper/75">
              {dict.services.aside}
            </p>
          </div>
        </Reveal>

        <StaggerReveal className="mt-16 grid gap-0 border-t border-paper/15 md:mt-24">
          <div ref={listRef}>
            {dict.services.items.map((service) => (
              <div
                key={service.number}
                data-reveal-item
                data-service
                className="relative grid gap-4 border-b border-paper/15 py-8 md:grid-cols-[7rem_1fr_1.2fr] md:items-baseline md:gap-8 md:py-10"
              >
                <span
                  data-service-rule
                  className="bg-paper/35 absolute inset-x-0 bottom-0 h-px origin-left scale-x-0"
                />
                <p
                  data-service-num
                  className="editorial-num text-[0.75rem] tracking-[0.2em] text-paper/65"
                >
                  {service.number}
                </p>
                <p className="font-serif text-3xl tracking-[0.04em] uppercase md:text-4xl">
                  {service.title}
                </p>
                <p className="text-sm tracking-[0.08em] text-paper/75 uppercase md:text-right">
                  {service.items.join(" / ")}
                </p>
              </div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}
