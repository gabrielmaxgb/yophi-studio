"use client";

import { useRef } from "react";
import Image from "next/image";
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

      const photo = root.querySelector("[data-w-photo]");
      const parallax = root.querySelector("[data-w-parallax]");
      const eyebrow = root.querySelector("[data-w-eyebrow]");
      const creative = root.querySelector("[data-w-creative]");
      const digital = root.querySelector("[data-w-digital]");

      if (prefersReducedMotion()) {
        gsap.set([photo, parallax, eyebrow, creative, digital], {
          clearProps: "all",
        });
        return;
      }

      gsap.set(photo, { scale: 1.08 });
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
        .to(photo, { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.12)
        .to(creative, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.2)
        .to(digital, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.32);

      gsap.fromTo(
        parallax,
        { yPercent: -4 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden border-y border-line bg-deep text-ink"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          data-w-parallax
          className="absolute inset-[-12%] will-change-transform"
        >
          <div data-w-photo className="absolute inset-0 will-change-transform">
            <Image
              src="/worlds/theme.jpg"
              alt={dict.worlds.imageAlt}
              fill
              sizes="100vw"
              className="object-cover object-[center_42%] brightness-[0.82] saturate-[0.82] contrast-[1.08]"
            />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 bg-deep/28" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_28%,rgba(5,5,5,0.56)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-deep/62 via-deep/10 to-deep/70"
        />
        <div aria-hidden className="atmosphere-wash atmosphere-wash-flip" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh max-w-[1400px] flex-col justify-between px-5 pt-28 pb-16 md:min-h-[92vh] md:px-10 md:pt-32 md:pb-20">
        <p
          data-w-eyebrow
          className="text-[0.65rem] tracking-[0.28em] text-ember/80 uppercase"
        >
          {dict.worlds.eyebrow}
        </p>

        <div className="flex flex-1 flex-col justify-between gap-10 py-8 md:gap-0 md:py-16">
          <div data-w-creative className="relative max-w-sm md:max-w-md">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.78),transparent_72%)]"
            />
            <div className="relative">
              <span aria-hidden className="mb-4 block h-px w-8 bg-ember/70" />
              <p className="font-serif text-3xl tracking-[0.06em] text-foam uppercase md:text-4xl">
                {dict.worlds.creative}
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink/80">
                {dict.worlds.creativeCopy}
              </p>
            </div>
          </div>

          <div
            data-w-digital
            className="relative max-w-[16rem] self-end text-right md:mr-14 md:max-w-lg lg:mr-16"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.78),transparent_72%)]"
            />
            <div className="relative">
              <span
                aria-hidden
                className="mb-4 ml-auto block h-px w-8 bg-ember/70"
              />
              <p className="font-serif text-4xl tracking-[0.06em] text-foam uppercase md:text-5xl">
                {dict.worlds.digital}
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink/80 md:max-w-sm md:ml-auto">
                {dict.worlds.digitalCopy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
