"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArchiveLink } from "@/components/work/archive-gate";
import { useI18n } from "@/components/i18n/locale-provider";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const letters = ["Y", "O", "P", "H", "I"] as const;

export function Hero() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const wash = root.querySelector("[data-hero-wash]");
      const glyphs = root.querySelectorAll<HTMLElement>("[data-hero-glyph]");
      const mark = root.querySelector("[data-hero-mark]");
      const tagline = root.querySelector("[data-hero-tag]");
      const line = root.querySelectorAll("[data-hero-line]");
      const copy = root.querySelectorAll("[data-hero-copy]");
      const meta = root.querySelectorAll("[data-hero-meta]");
      const head = root.querySelector("[data-hero-head]");
      const glows = root.querySelectorAll("[data-hero-glow]");
      const formMeta = root.querySelector("[data-form-meta]");
      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set(
          [wash, glyphs, mark, tagline, line, copy, meta, head, glows, formMeta],
          { clearProps: "all" }
        );
        return;
      }

      gsap.set(glyphs, {
        autoAlpha: 0,
        y: (i) => (i === 2 ? 40 : 20),
        x: (i) => (i < 2 ? -24 : i > 2 ? 24 : 0),
      });
      gsap.set(tagline, { autoAlpha: 0, y: 10 });
      gsap.set(line, { autoAlpha: 0, y: 24 });
      gsap.set(copy, { autoAlpha: 0, y: 16 });
      gsap.set(meta, { autoAlpha: 0, y: 14 });
      gsap.set(head, {
        autoAlpha: 0,
        scale: 0.9,
        filter: "blur(10px) brightness(0.55)",
        transformOrigin: "50% 55%",
      });
      gsap.set(glows, { autoAlpha: 0, scale: 0.7 });
      gsap.set(formMeta, { autoAlpha: 0, y: 12 });
      gsap.set(mark, { autoAlpha: 0 });
      gsap.set(wash, { autoAlpha: 0.7 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(wash, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, 0)
        .to(mark, { autoAlpha: 0.14, duration: 1 }, 0.05)
        .to(
          glyphs,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            stagger: { each: 0.07, from: "center" },
          },
          0.08
        )
        .to(tagline, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.45)
        .to(glows, { autoAlpha: 1, scale: 1, duration: 1.1, stagger: 0.08 }, 0.2)
        .to(
          head,
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: 1.35,
            ease: "expo.out",
          },
          0.22
        )
        .to(line, { autoAlpha: 1, y: 0, duration: 0.95 }, 0.55)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.7)
        .to(meta, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.85)
        .to(formMeta, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.9);

      gsap.to(wash, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-headline"
      className="relative h-dvh overflow-hidden bg-deep text-ink"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/hero/atmosphere.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.58] brightness-[0.42] contrast-[1.05] saturate-[0.65]"
        />
        <div className="absolute inset-0 bg-deep/55" />
        <div
          data-hero-wash
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_28%,rgba(201,106,62,0.14),transparent_48%),radial-gradient(ellipse_at_18%_72%,rgba(61,74,86,0.12),transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(0,0,0,0.75),transparent_55%)] will-change-transform"
        />
        <svg
          data-hero-mark
          className="absolute top-[14%] right-[12%] hidden h-[48vh] w-auto opacity-[0.14] md:block"
          viewBox="0 0 72 92"
          fill="none"
          aria-hidden
        >
          <path
            d="M10 12 L40 20 L40 74 L10 82 Z"
            stroke="currentColor"
            strokeWidth="1.25"
            fill="none"
          />
          <path
            d="M40 18 L64 14 L64 80 L40 76 Z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
      </div>

      <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-1 px-5 pb-8 pt-24 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-6 md:px-10 md:pb-12 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-5 h-[52%] bg-[linear-gradient(to_top,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.5)_36%,transparent_100%)] md:hidden"
        />
        <div className="relative z-10 flex min-h-0 flex-col justify-end gap-3.5 md:col-start-1 md:row-start-1 md:justify-center md:gap-7">
          <div className="flex flex-col">
            <p
              className="font-serif text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.9] tracking-[0.08em] uppercase"
              aria-hidden
            >
              {letters.map((letter) => (
                <span
                  key={letter}
                  data-hero-glyph
                  className="inline-block will-change-transform"
                >
                  {letter}
                </span>
              ))}
            </p>
            <p
              data-hero-tag
              className="mt-1.5 font-serif text-[0.85rem] italic leading-none tracking-[0.22em] text-ink/70 md:mt-2 md:text-[1.05rem]"
            >
              digital studio
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h1
              id="hero-headline"
              data-hero-line
              className="font-serif text-[clamp(1.6rem,4vw,2.75rem)] leading-[1.15] text-ink"
            >
              {dict.hero.headline}
            </h1>
            <p
              data-hero-copy
              className="max-w-md text-base leading-relaxed text-ink/80 md:text-[1.05rem]"
            >
              {dict.hero.body}
            </p>
            {dict.hero.audience ? (
              <p
                data-hero-copy
                className="max-w-md text-[0.95rem] leading-relaxed text-ink/72"
              >
                {dict.hero.audience}
              </p>
            ) : null}
          </div>

          <div data-hero-meta className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-3 bg-foam px-6 py-3.5 text-[0.7rem] tracking-[0.22em] text-deep uppercase transition-colors hover:bg-foam/90"
              >
                {dict.hero.cta}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <ArchiveLink
                href="/work"
                className="inline-flex min-h-12 items-center text-[0.7rem] tracking-[0.22em] text-ink/80 uppercase transition-colors hover:text-ink"
              >
                {dict.hero.ctaSecondary}
              </ArchiveLink>
            </div>
            {dict.hero.ctaHint ? (
              <p className="max-w-sm text-[0.8rem] leading-relaxed text-ink/65">
                {dict.hero.ctaHint}
              </p>
            ) : null}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-28 z-0 flex h-[min(36dvh,22rem)] justify-center overflow-visible md:pointer-events-auto md:relative md:inset-auto md:top-auto md:col-start-2 md:row-start-1 md:h-full md:flex-col md:justify-center">
          <figure className="relative mx-auto flex h-full w-[min(88%,20rem)] items-start justify-center md:-mr-6 md:w-full md:flex-1 md:items-center lg:-mr-10">
            <div
              aria-hidden
              data-hero-glow="steel"
              className="pointer-events-none absolute top-[8%] left-[-4%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(61,74,86,0.4)_0%,transparent_68%)] blur-3xl will-change-transform"
            />
            <div
              aria-hidden
              data-hero-glow="ember"
              className="pointer-events-none absolute top-[12%] right-[-8%] h-[75%] w-[75%] rounded-full bg-[radial-gradient(circle,rgba(201,106,62,0.55)_0%,transparent_70%)] blur-3xl will-change-transform"
            />
            <div
              data-hero-head
              className="relative flex h-full w-full items-start justify-center mask-[linear-gradient(to_bottom,black_70%,transparent_100%)] md:max-h-[78vh] md:items-center md:mask-none"
            >
              <div className="relative aspect-1377/1825 h-full w-auto md:scale-[1.12]">
                <Image
                  src="/philosophy/head.webp"
                  alt={dict.philosophy.imageAlt}
                  fill
                  quality={90}
                  priority
                  sizes="(max-width: 768px) 88vw, 42vw"
                  className="object-contain object-top select-none drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </figure>

          <div
            data-form-meta
            className="relative z-10 mt-5 hidden shrink-0 items-end justify-between gap-4 border-t border-ink/15 pt-4 md:flex"
          >
            <div>
              <p className="text-[0.6rem] tracking-[0.28em] text-ink/60 uppercase">
                {dict.hero.formLabel}
              </p>
              <p className="font-serif text-2xl tracking-[0.12em] uppercase md:text-3xl">
                YOPHI
              </p>
            </div>
            <p className="max-w-[10rem] text-right text-[0.7rem] leading-relaxed tracking-[0.06em] text-ink/65">
              {dict.hero.formAside}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
