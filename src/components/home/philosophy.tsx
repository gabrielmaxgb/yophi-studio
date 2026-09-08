"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/components/i18n/locale-provider";
import { SplitHeadline } from "@/components/motion/split-headline";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function Philosophy() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const frame = frameRef.current;
      if (!root || !frame) return;

      const glowWarm = root.querySelector<HTMLElement>("[data-glow-warm]");
      const glowCool = root.querySelector<HTMLElement>("[data-glow-cool]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]", root);
      const closing = root.querySelector<HTMLElement>("[data-closing]");
      const eyebrow = root.querySelector<HTMLElement>("[data-eyebrow]");
      const rule = root.querySelector<HTMLElement>("[data-rule]");

      if (prefersReducedMotion()) {
        gsap.set(
          [frame, glowWarm, glowCool, lines, closing, eyebrow, rule],
          { clearProps: "all" }
        );
        return;
      }

      gsap.set(eyebrow, { autoAlpha: 0, y: 12 });
      gsap.set(frame, {
        autoAlpha: 0,
        scale: 0.72,
        rotateY: -28,
        rotateX: 10,
        filter: "blur(18px) brightness(0.35) saturate(0.4)",
        transformOrigin: "50% 55%",
      });
      gsap.set([glowWarm, glowCool], { autoAlpha: 0, scale: 0.45 });
      gsap.set(lines, { autoAlpha: 0, y: 36, rotateX: 18 });
      gsap.set(closing, { autoAlpha: 0, y: 24 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      const enter = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      enter
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
        .to(
          [glowWarm, glowCool],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.4,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.05
        )
        .to(
          frame,
          {
            autoAlpha: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            filter: "blur(0px) brightness(1) saturate(1)",
            duration: 1.7,
            ease: "expo.out",
          },
          0.08
        )
        .to(
          lines,
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.95,
            stagger: 0.11,
            ease: "power3.out",
          },
          0.45
        )
        .to(rule, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 0.95)
        .to(
          closing,
          { autoAlpha: 1, y: 0, duration: 0.95, ease: "power3.out" },
          1.05
        );

      const img = frame.querySelector("img");
      const onLoad = () => ScrollTrigger.refresh();
      img?.addEventListener("load", onLoad, { once: true });

      return () => {
        img?.removeEventListener("load", onLoad);
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-x-clip bg-paper text-ink"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-32 lg:gap-16">
        <header className="md:col-span-5 md:col-start-1 md:row-start-1">
          <p
            data-eyebrow
            className="text-[0.65rem] tracking-[0.28em] text-stone uppercase"
          >
            {dict.philosophy.eyebrow}
          </p>
          <SplitHeadline className="mt-8 max-w-xl font-serif text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.05] text-balance">
            {dict.philosophy.headline}
          </SplitHeadline>
        </header>

        <figure
          ref={frameRef}
          className="relative mx-auto w-full max-w-[18rem] md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:max-w-[30rem] lg:max-w-[34rem]"
        >
          <div
            aria-hidden
            data-glow-cool
            className="pointer-events-none absolute top-[12%] left-[4%] h-[58%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(61,74,86,0.28)_0%,transparent_68%)] blur-2xl will-change-transform"
          />
          <div
            aria-hidden
            data-glow-warm
            className="pointer-events-none absolute top-[18%] right-[-2%] h-[62%] w-[62%] rounded-full bg-[radial-gradient(circle,rgba(201,106,62,0.48)_0%,transparent_70%)] blur-2xl will-change-transform"
          />

          <div className="relative">
            <Image
              src="/philosophy/head.webp"
              alt={dict.philosophy.imageAlt}
              width={1377}
              height={1825}
              quality={90}
              sizes="(max-width: 768px) 18rem, (max-width: 1024px) 30rem, 34rem"
              className="relative z-10 h-auto w-full select-none drop-shadow-[0_28px_60px_rgba(12,10,16,0.3)]"
            />
          </div>
        </figure>

        <div className="md:col-span-5 md:col-start-1 md:row-start-2 [perspective:800px]">
          <div className="grid max-w-md gap-4 md:gap-5">
            {dict.philosophy.lines.map((line) => (
              <p
                key={line}
                data-line
                className="font-serif text-[clamp(1.35rem,2.4vw,1.85rem)] leading-snug text-ink/80 will-change-transform"
              >
                {line}
              </p>
            ))}
          </div>

          <div
            data-closing
            className="mt-14 flex max-w-md flex-col gap-4 md:mt-16"
          >
            <div
              data-rule
              className="h-px w-full origin-left bg-line"
              aria-hidden
            />
            <p className="pt-8 text-[0.65rem] tracking-[0.28em] text-stone uppercase">
              {dict.philosophy.label}
            </p>
            <p className="font-serif text-[clamp(1.25rem,2.4vw,1.7rem)] leading-snug text-ink">
              {dict.philosophy.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
