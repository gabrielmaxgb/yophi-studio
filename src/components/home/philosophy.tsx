"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/components/i18n/locale-provider";
import { SplitHeadline } from "@/components/motion/split-headline";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const formPanels = [
  {
    src: "/hero/01.jpg",
    className: "col-span-4 row-span-4",
    sizes: "(max-width: 768px) 70vw, 32vw",
  },
  {
    src: "/hero/02.jpg",
    className: "col-span-2 row-span-3 col-start-5",
    sizes: "(max-width: 768px) 35vw, 16vw",
  },
  {
    src: "/hero/03.jpg",
    className: "col-span-2 row-span-3 col-start-5 row-start-4",
    sizes: "(max-width: 768px) 35vw, 16vw",
  },
  {
    src: "/hero/04.jpg",
    className: "col-span-2 row-span-2 row-start-5",
    sizes: "(max-width: 768px) 35vw, 16vw",
  },
  {
    src: "/hero/05.jpg",
    className: "col-span-2 row-span-2 col-start-3 row-start-5",
    sizes: "(max-width: 768px) 35vw, 16vw",
  },
] as const;

export function Philosophy() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const frame = frameRef.current;
      if (!root || !frame) return;

      const body = root.querySelector<HTMLElement>("[data-body]");
      const closing = root.querySelector<HTMLElement>("[data-closing]");
      const panels = frame.querySelectorAll<HTMLElement>("[data-form-panel]");

      if (prefersReducedMotion()) {
        gsap.set([frame, body, closing, panels], { clearProps: "all" });
        return;
      }

      gsap.set(panels, { autoAlpha: 0, y: 24, scale: 0.96 });
      gsap.set([body, closing], { autoAlpha: 0, y: 20 });

      const enter = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 76%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      enter
        .to(
          panels,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.07,
          },
          0
        )
        .to(body, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.25)
        .to(closing, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.4);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-x-clip bg-paper text-ink"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-24 md:grid-cols-12 md:gap-12 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <SplitHeadline className="max-w-xl font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.05] text-balance">
            {dict.philosophy.headline}
          </SplitHeadline>
          <p
            data-body
            className="mt-10 max-w-md font-serif text-[clamp(1.25rem,2.2vw,1.7rem)] leading-snug text-ink/75"
          >
            {dict.philosophy.body}
          </p>
          <p
            data-closing
            className="mt-8 max-w-sm text-[0.7rem] tracking-[0.22em] text-stone uppercase"
          >
            {dict.philosophy.closing}
          </p>
        </div>

        <div
          ref={frameRef}
          className="relative mx-auto w-full md:col-span-7"
          aria-hidden
        >
          <div className="relative grid min-h-[280px] grid-cols-6 grid-rows-6 gap-2 md:min-h-[420px]">
            {formPanels.map((panel) => (
              <div
                key={panel.src}
                data-form-panel
                className={cn(
                  panel.className,
                  "relative overflow-hidden will-change-transform"
                )}
              >
                <Image
                  src={panel.src}
                  alt=""
                  fill
                  sizes={panel.sizes}
                  className="object-cover saturate-[0.45] contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-deep/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
