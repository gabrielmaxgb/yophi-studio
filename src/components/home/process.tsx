"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, scrambleText, stagger } from "animejs";
import { useI18n } from "@/components/i18n/locale-provider";
import { SplitHeadline } from "@/components/motion/split-headline";
import { processKeys } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";

export function Process() {
  const { locale, dict } = useI18n();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>("[data-step]");
    const line = root.querySelector<HTMLElement>("[data-process-line]");
    const keys = root.querySelectorAll<HTMLElement>("[data-step-key]");

    if (prefersReducedMotion()) {
      items.forEach((item) => {
        item.style.opacity = "1";
      });
      if (line) line.style.transform = "scaleX(1)";
      return;
    }

    items.forEach((item) => {
      item.style.opacity = "0.28";
    });

    const observers: { revert: () => unknown }[] = [];

    if (line) {
      observers.push(
        animate(line, {
          scaleX: [0, 1],
          ease: "linear",
          autoplay: onScroll({
            target: root,
            enter: "top bottom-=20%",
            leave: "bottom top+=20%",
            sync: 0.12,
          }),
        })
      );
    }

    observers.push(
      onScroll({
        target: root,
        enter: "top bottom-=15%",
        leave: "bottom top+=10%",
        sync: true,
        onUpdate: (observer) => {
          const progress = observer.progress;
          items.forEach((item, i) => {
            const start = i / items.length;
            const lit = progress >= start - 0.04;
            item.style.opacity = lit ? "1" : "0.28";
          });
        },
        onEnter: () => {
          animate(keys, {
            text: scrambleText({ chars: "uppercase", from: "left" }),
            duration: 900,
            delay: stagger(90),
          });
        },
        repeat: false,
      })
    );

    return () => {
      observers.forEach((item) => item.revert());
    };
  }, [locale]);

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-4">
          <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
            {dict.process.eyebrow}
          </p>
          <SplitHeadline className="font-serif text-[clamp(2.2rem,5vw,4rem)] leading-none max-w-3xl">
            {dict.process.headline}
          </SplitHeadline>
        </div>

        <div ref={listRef} className="relative mt-16 md:mt-24">
          <span
            data-process-line
            className="bg-ink/70 absolute top-0 right-0 left-0 hidden h-px origin-left md:block"
          />
          <div className="grid gap-0 md:grid-cols-5">
            {processKeys.map((key, index) => (
              <div
                key={key}
                data-step
                className="border-line flex flex-col gap-5 border-t py-8 md:border-t-0 md:border-l md:px-5 md:pt-8 md:pb-0 md:first:border-l-0 md:first:pl-0"
              >
                <p className="editorial-num text-[0.65rem] tracking-[0.22em] text-stone">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  data-step-key
                  className="font-serif text-3xl tracking-[0.1em] uppercase md:text-[1.75rem] lg:text-3xl"
                >
                  {key}
                </p>
                <p className="text-sm leading-relaxed text-ink/80">
                  {dict.process.steps[key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
