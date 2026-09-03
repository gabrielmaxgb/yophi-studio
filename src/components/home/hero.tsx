"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  createAnimatable,
  createDrawable,
  createTimeline,
  scrambleText,
  stagger,
} from "animejs";
import Link from "next/link";
import { ArchiveLink } from "@/components/work/archive-gate";
import { useI18n } from "@/components/i18n/locale-provider";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const letters = ["Y", "O", "P", "H", "I"] as const;

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

export function Hero() {
  const { dict } = useI18n();
  const { stages } = dict.hero;
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLParagraphElement | null>(null);
  const formsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const glyphs = root.querySelectorAll<HTMLElement>("[data-hero-glyph]");
    const line = root.querySelectorAll("[data-hero-line]");
    const copy = root.querySelectorAll("[data-hero-copy]");
    const meta = root.querySelectorAll("[data-hero-meta]");
    const panels = formsRef.current?.querySelectorAll<HTMLElement>(
      "[data-form-panel]"
    );
    const marks = root.querySelectorAll<SVGElement>("[data-hero-draw]");
    const reduced = prefersReducedMotion();

    if (reduced) {
      glyphs.forEach((g) => {
        g.style.opacity = "1";
        g.style.transform = "none";
      });
      [...line, ...copy, ...meta].forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
      });
      panels?.forEach((p) => {
        p.style.opacity = "1";
      });
      return;
    }

    glyphs.forEach((g, i) => {
      const fromX = i < 2 ? -28 : i > 2 ? 28 : 0;
      const fromY = i === 2 ? 40 : 18;
      g.style.opacity = "0";
      g.style.transform = `translate(${fromX}px, ${fromY}px) rotate(${i === 2 ? 8 : 0}deg)`;
    });

    const tl = createTimeline({ defaults: { ease: "out(3)" } });

    tl.add(glyphs, {
      opacity: [0, 1],
      x: 0,
      y: 0,
      rotate: 0,
      duration: 1400,
      delay: stagger(90, { from: "center" }),
    })
      .add(
        line,
        {
          opacity: [0, 1],
          y: [28, 0],
          duration: 1000,
        },
        "-=900"
      )
      .add(
        copy,
        {
          opacity: [0, 1],
          y: [16, 0],
          duration: 900,
        },
        "-=700"
      )
      .add(
        meta,
        {
          opacity: [0, 1],
          duration: 800,
        },
        "-=550"
      );

    if (marks.length) {
      createDrawable(marks);
      animate(marks, {
        draw: ["0 0", "0 1"],
        duration: 1800,
        ease: "inOut(3)",
        delay: stagger(180, { start: 200 }),
      });
    }

    if (panels?.length) {
      animate(panels, {
        opacity: [0, 1],
        scale: [0.88, 1],
        duration: 1500,
        delay: stagger(100, { start: 280, from: "first" }),
        ease: "out(4)",
      });
    }

    let index = 0;
    const stageEl = stageRef.current;
    let intervalId: number | undefined;
    const animatables: ReturnType<typeof createAnimatable>[] = [];

    if (stageEl) {
      intervalId = window.setInterval(() => {
        index = (index + 1) % stages.length;
        const next = stages[index] ?? "YOPHI";
        animate(stageEl, {
          text: scrambleText({
            text: next,
            chars: "uppercase",
            from: "center",
          }),
          duration: 900,
          ease: "out(2)",
        });

        if (panels?.length) {
          panels.forEach((panel, i) => {
            const active = i === index % panels.length;
            animate(panel, {
              opacity: active ? 1 : 0.38,
              scale: active ? 1.02 : 0.97,
              duration: 780,
              ease: "out(3)",
            });
          });
        }
      }, 2800);
    }

    if (panels?.length && isFinePointer()) {
      const field = formsRef.current;
      panels.forEach((panel, i) => {
        const lag = 140 + i * 55;
        animatables.push(
          createAnimatable(panel, {
            rotateX: lag,
            rotateY: lag,
            x: lag,
            y: lag,
          })
        );
      });

      const onMove = (event: PointerEvent) => {
        if (!field) return;
        const rect = field.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        animatables.forEach((item, i) => {
          const depth = (i + 1) * 6;
          item.rotateY(nx * depth);
          item.rotateX(-ny * depth);
          item.x(nx * depth * 1.4);
          item.y(ny * depth * 1.4);
        });
      };

      const onLeave = () => {
        animatables.forEach((item) => {
          item.rotateX(0);
          item.rotateY(0);
          item.x(0);
          item.y(0);
        });
      };

      field?.addEventListener("pointermove", onMove);
      field?.addEventListener("pointerleave", onLeave);

      return () => {
        if (intervalId) window.clearInterval(intervalId);
        field?.removeEventListener("pointermove", onMove);
        field?.removeEventListener("pointerleave", onLeave);
        animatables.forEach((item) => item.revert());
        tl.revert();
      };
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      tl.revert();
    };
  }, [stages]);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-headline"
      className="relative min-h-dvh overflow-hidden bg-deep text-paper"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(42,74,107,0.45),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(18,20,26,0.9),transparent_50%)]" />
        <svg
          className="absolute top-[18%] right-[8%] h-[38vh] w-auto opacity-[0.14] md:top-[14%] md:right-[12%] md:h-[48vh]"
          viewBox="0 0 72 92"
          fill="none"
          aria-hidden
        >
          <path
            data-hero-draw
            d="M10 12 L40 20 L40 74 L10 82 Z"
            stroke="currentColor"
            strokeWidth="1.25"
            fill="none"
          />
          <path
            data-hero-draw
            d="M40 18 L64 14 L64 80 L40 76 Z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-dvh max-w-[1400px] grid-cols-1 items-end gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10 md:pb-20 md:pt-24">
        <div className="flex flex-col gap-8 md:gap-10">
          <p
            className="font-serif text-[clamp(3.5rem,12vw,8.5rem)] leading-[0.9] tracking-[0.08em] uppercase"
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

          <div className="flex flex-col gap-4">
            <h1
              id="hero-headline"
              data-hero-line
              className="font-serif text-[clamp(1.6rem,4vw,2.75rem)] leading-[1.15] text-paper opacity-0"
            >
              {dict.hero.headline}
            </h1>
            <p
              data-hero-copy
              className="max-w-md text-base leading-relaxed text-paper/80 opacity-0 md:text-[1.05rem]"
            >
              {dict.hero.body}
            </p>
            <p
              data-hero-copy
              className="max-w-md text-[0.95rem] leading-relaxed text-paper/72 opacity-0"
            >
              {dict.hero.audience}
            </p>
          </div>

          <div data-hero-meta className="flex flex-col gap-3 opacity-0">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-3 bg-paper px-6 py-3.5 text-[0.7rem] tracking-[0.22em] text-deep uppercase transition-colors hover:bg-paper/90"
              >
                {dict.hero.cta}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <ArchiveLink
                href="/work"
                className="inline-flex min-h-12 items-center text-[0.7rem] tracking-[0.22em] text-paper/80 uppercase transition-colors hover:text-paper"
              >
                {dict.hero.ctaSecondary}
              </ArchiveLink>
            </div>
            <p className="max-w-sm text-[0.8rem] leading-relaxed text-paper/65">
              {dict.hero.ctaHint}
            </p>
          </div>
        </div>

        <div className="relative flex min-h-[42vh] flex-col justify-end md:min-h-[60vh]">
          <div
            ref={formsRef}
            className="relative grid h-full min-h-[320px] grid-cols-6 grid-rows-6 gap-2 [perspective:1200px] [transform-style:preserve-3d] md:min-h-[480px]"
            aria-hidden
          >
            {formPanels.map((panel) => (
              <div
                key={panel.src}
                data-form-panel
                className={cn(
                  panel.className,
                  "relative origin-center overflow-hidden opacity-0 will-change-transform"
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

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-paper/15 pt-4">
            <div>
              <p className="text-[0.6rem] tracking-[0.28em] text-paper/60 uppercase">
                {dict.hero.formLabel}
              </p>
              <p
                ref={stageRef}
                className="font-serif text-2xl tracking-[0.12em] uppercase md:text-3xl"
              >
                Yophi
              </p>
            </div>
            <p className="max-w-[10rem] text-right text-[0.7rem] leading-relaxed tracking-[0.06em] text-paper/65">
              {dict.hero.formAside}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
