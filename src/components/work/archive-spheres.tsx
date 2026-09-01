"use client";

import { startTransition, useEffect, useLayoutEffect, useRef, useState } from "react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useI18n } from "@/components/i18n/locale-provider";
import { caseStudyBase, type CaseStudySlug } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";

const SPHERE_COUNT = 2;
const SLOTS_PER_SPHERE = 4;
const COLS = 18;
const LON_SPAN = 54;
const D_LON = LON_SPAN / COLS;
const DEG_PER_PX = 0.16;
const SMOOTH = 4.4;

const SPIN = [
  { y: 1.08, yDir: 1, offsetY: 16, offsetX: 0, nod: 0 },
  { y: 1.02, yDir: -1, offsetY: -22, offsetX: 0, nod: 0 },
] as const;

const SLOT_POSES = [
  [
    { lon: 0, lat: 0 },
    { lon: 90, lat: 0 },
    { lon: 180, lat: 0 },
    { lon: 270, lat: 0 },
  ],
  [
    { lon: 45, lat: 0 },
    { lon: 135, lat: 0 },
    { lon: 225, lat: 0 },
    { lon: 315, lat: 0 },
  ],
] as const;

type Pose = { lon: number; lat: number };

function createRng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rng: () => number) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function occupiedSlugs(
  slots: string[][],
  skipSphere: number,
  skipSlot: number
) {
  const used = new Set<string>();
  slots.forEach((row, sphereIndex) => {
    row.forEach((slug, slotIndex) => {
      if (sphereIndex === skipSphere && slotIndex === skipSlot) return;
      used.add(slug);
    });
  });
  return used;
}

function seedSlots(slugs: string[]) {
  const rng = createRng(0x59a11);
  const shuffled = shuffle(slugs, rng);
  const allowSimul = SPHERE_COUNT > slugs.length;
  const slots: string[][] = Array.from({ length: SPHERE_COUNT }, () => []);

  if (allowSimul) {
    shuffled.forEach((slug, index) => {
      slots[index % SPHERE_COUNT].push(slug);
    });
    slots.forEach((row, index) => {
      if (!row.length) slots[index] = [shuffled[0]];
    });
    return slots;
  }

  let next = 0;
  for (let sphereIndex = 0; sphereIndex < SPHERE_COUNT; sphereIndex += 1) {
    for (let slotIndex = 0; slotIndex < SLOTS_PER_SPHERE; slotIndex += 1) {
      if (next >= shuffled.length) break;
      slots[sphereIndex].push(shuffled[next]);
      next += 1;
    }
  }

  return slots;
}

function pickProject(
  slugs: string[],
  sphereIndex: number,
  slotIndex: number,
  slots: string[][]
) {
  const current = slots[sphereIndex][slotIndex];
  const used = occupiedSlugs(slots, sphereIndex, slotIndex);
  const allowSimul = SPHERE_COUNT > slugs.length;
  const onThisSphere = new Set(
    slots[sphereIndex].filter((_, index) => index !== slotIndex)
  );

  const pool = slugs.filter((slug) => {
    if (onThisSphere.has(slug)) return false;
    if (!allowSimul && used.has(slug)) return false;
    return true;
  });

  if (!pool.length) return current;

  const fresh = pool.filter((slug) => slug !== current);
  const choices = fresh.length ? fresh : pool;
  return choices[Math.floor(Math.random() * choices.length)] ?? current;
}

function facingOf(rotateX: number, rotateY: number, pose: Pose) {
  return (
    Math.cos(((rotateY + pose.lon) * Math.PI) / 180) *
    Math.cos(((rotateX + pose.lat) * Math.PI) / 180)
  );
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function scaleFromFacing(facing: number) {
  const t = clamp01(facing);
  const eased = t * t * (3 - 2 * t);
  return 0.56 + eased * 0.62;
}

const SLICE_HIDE = -0.08;
const SLICE_FULL = 0.02;

function syncCardFacing(
  core: HTMLElement,
  rotateX: number,
  rotateY: number
) {
  core.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
    const pose = {
      lon: Number(card.dataset.lon),
      lat: Number(card.dataset.lat),
    };
    const facing = facingOf(rotateX, rotateY, pose);
    card.style.setProperty("--card-scale", String(scaleFromFacing(facing)));
    card.style.zIndex = String(Math.round(40 + facing * 60));
    card.style.pointerEvents = facing > 0.2 ? "auto" : "none";

    card.querySelectorAll<HTMLElement>("[data-slice]").forEach((slice) => {
      const sliceFacing = facingOf(rotateX, rotateY, {
        lon: pose.lon + Number(slice.dataset.delta),
        lat: pose.lat,
      });
      const show = sliceFacing > SLICE_HIDE;
      slice.style.opacity = show
        ? String(smoothstep(SLICE_HIDE, SLICE_FULL, sliceFacing))
        : "0";
      slice.style.visibility = show ? "visible" : "hidden";
    });
  });
}

function applySpin(core: HTMLElement, index: number, pixels: number) {
  const spin = SPIN[index];
  const rotateY = spin.offsetY + pixels * DEG_PER_PX * spin.y * spin.yDir;
  const rotateX =
    spin.offsetX + Math.sin(pixels * 0.0018) * 9 * spin.nod;
  core.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  syncCardFacing(core, rotateX, rotateY);
  return { rotateX, rotateY };
}

function CurvedProjectCard({
  slug,
  pose,
  openLabel,
}: {
  slug: string;
  pose: Pose;
  openLabel: string;
}) {
  const { dict } = useI18n();
  const study = caseStudyBase.find((item) => item.slug === slug);
  if (!study) return null;

  const copy = dict.work.studies[study.slug as CaseStudySlug];
  const number = String(
    caseStudyBase.findIndex((item) => item.slug === slug) + 1
  ).padStart(2, "0");

  return (
    <LocaleLink
      href={`/work/${study.slug}`}
      aria-label={`${study.client} — ${openLabel}`}
      data-card=""
      data-lon={String(pose.lon)}
      data-lat={String(pose.lat)}
      className="absolute inset-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span
        className="absolute top-1/2 left-1/2"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${pose.lon}deg) rotateX(${pose.lat}deg) translateZ(var(--sphere-r))`,
        }}
      >
        <span
          className="absolute"
          style={{
            transformStyle: "preserve-3d",
            transform:
              "scale3d(var(--card-scale, 1), var(--card-scale, 1), 1)",
          }}
        >
          {Array.from({ length: COLS }, (_, col) => {
            const delta = -LON_SPAN / 2 + (col + 0.5) * D_LON;
            const deltaRad = (delta * Math.PI) / 180;
            return (
              <span
                key={col}
                data-slice=""
                data-delta={String(delta)}
                className="absolute overflow-hidden [backface-visibility:hidden]"
                style={{
                  width: "calc(var(--cell-w) + 0.7px)",
                  height: "var(--cell-h)",
                  left: "calc(var(--cell-w) / -2)",
                  top: "calc(var(--cell-h) / -2)",
                  borderRadius:
                    col === 0
                      ? "var(--card-r) 0 0 var(--card-r)"
                      : col === COLS - 1
                        ? "0 var(--card-r) var(--card-r) 0"
                        : undefined,
                  transform: `translate3d(calc(var(--sphere-r) * ${Math.sin(deltaRad)}), 0, calc(var(--sphere-r) * ${Math.cos(deltaRad) - 1})) rotateY(${delta}deg)`,
                  opacity: 0,
                  visibility: "hidden",
                }}
              >
                <span
                  className="absolute top-0 left-0 block bg-deep bg-cover bg-center [backface-visibility:hidden]"
                  style={{
                    width: `calc(var(--cell-w) * ${COLS})`,
                    height: "var(--cell-h)",
                    transform: `translateX(calc(var(--cell-w) * ${-col}))`,
                    backgroundImage: `url(${study.image})`,
                  }}
                >
                  <span className="absolute inset-0 bg-linear-to-t from-deep/75 via-deep/5 to-deep/10" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-[8%] pb-[8%] text-paper">
                    <span className="min-w-0">
                      <span className="block font-serif text-[1.35rem] leading-[0.88] tracking-[0.04em] md:text-[1.7rem]">
                        {study.client}
                      </span>
                      <span className="mt-1 block text-[0.5rem] tracking-[0.18em] text-paper/70 uppercase">
                        {copy.sector}
                      </span>
                    </span>
                    <span className="editorial-num pb-0.5 text-[0.5rem] tracking-[0.2em] text-paper/55">
                      {number}
                    </span>
                  </span>
                </span>
              </span>
            );
          })}
        </span>
      </span>
    </LocaleLink>
  );
}

function GlobeRings() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span
        className="absolute inset-0 rounded-full border border-ink/20 backface-hidden"
        style={{ transform: "rotateX(90deg)" }}
      />
      <span
        className="absolute inset-0 rounded-full border border-ink/15 backface-hidden"
        style={{ transform: "rotateY(90deg)" }}
      />
    </div>
  );
}

function SphereShell({
  sphereIndex,
  slugs,
  openLabel,
}: {
  sphereIndex: number;
  slugs: string[];
  openLabel: string;
}) {
  const spin = SPIN[sphereIndex];
  const poses = SLOT_POSES[sphereIndex];

  return (
    <div
      className="relative size-[calc(var(--sphere-r)*2)] perspective-[1600px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        aria-hidden
        className="absolute inset-[-8%] rounded-full"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 50% 62%, rgba(18,20,26,0.1) 0%, transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(circle at 32% 28%, #f4f2ec 0%, #e8e6e1 34%, #c9c5bc 68%, #9e9a91 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(18,20,26,0.1), 0 36px 50px -32px rgba(18,20,26,0.28)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.55) 0%, transparent 32%), radial-gradient(circle at 70% 76%, rgba(18,20,26,0.18) 0%, transparent 42%)",
        }}
      />

      <div
        data-sphere-core
        className="absolute inset-0 will-change-transform"
        style={{
          zIndex: 1,
          transformStyle: "preserve-3d",
          transform: `rotateX(${spin.offsetX}deg) rotateY(${spin.offsetY}deg)`,
        }}
      >
        <GlobeRings />
        {slugs.map((slug, slotIndex) => (
          <CurvedProjectCard
            key={slotIndex}
            slug={slug}
            pose={poses[slotIndex]}
            openLabel={openLabel}
          />
        ))}
      </div>
    </div>
  );
}

export function ArchiveSpheres() {
  const { dict, locale } = useI18n();
  const stageRef = useRef<HTMLElement | null>(null);
  const slotsRef = useRef<string[][]>([]);
  const hiddenRef = useRef(
    Array.from({ length: SPHERE_COUNT }, () =>
      Array.from({ length: SLOTS_PER_SPHERE }, () => false)
    )
  );
  const pixelsRef = useRef(0);
  const [slots, setSlots] = useState(() =>
    seedSlots(caseStudyBase.map((study) => study.slug))
  );

  slotsRef.current = slots;

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.classList.add("archive-lock");
    return () => html.classList.remove("archive-lock");
  }, []);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.querySelectorAll<HTMLElement>("[data-sphere-core]").forEach((core, index) => {
      applySpin(core, index, pixelsRef.current);
    });
  }, [slots]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const cores = [
      ...stage.querySelectorAll<HTMLElement>("[data-sphere-core]"),
    ];
    cores.forEach((core, index) => applySpin(core, index, 0));

    if (prefersReducedMotion()) return;

    const slugs = caseStudyBase.map((study) => study.slug);
    const motion = { target: 0, current: 0 };
    let frame = 0;
    let last = performance.now();
    let touching = false;
    let touchY = 0;

    const recycle = (pixels: number) => {
      pixelsRef.current = pixels;
      const next = slotsRef.current.map((row) => [...row]);
      let changed = false;

      cores.forEach((core, index) => {
        const { rotateX, rotateY } = applySpin(core, index, pixels);
        core.querySelectorAll<HTMLElement>("[data-card]").forEach((card, slot) => {
          const facing = facingOf(rotateX, rotateY, {
            lon: Number(card.dataset.lon),
            lat: Number(card.dataset.lat),
          });

          if (facing < -0.14 && !hiddenRef.current[index][slot]) {
            hiddenRef.current[index][slot] = true;
            const picked = pickProject(slugs, index, slot, next);
            if (picked !== next[index][slot]) {
              next[index][slot] = picked;
              changed = true;
            }
          } else if (facing > 0.24) {
            hiddenRef.current[index][slot] = false;
          }
        });
      });

      if (changed) {
        slotsRef.current = next;
        startTransition(() => setSlots(next));
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k = 1 - Math.exp(-dt * SMOOTH);
      motion.current += (motion.target - motion.current) * k;
      recycle(motion.current);
      frame = requestAnimationFrame(tick);
    };

    const addDelta = (delta: number) => {
      motion.target += delta;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      addDelta(event.deltaY);
    };

    const onTouchStart = (event: TouchEvent) => {
      touching = true;
      touchY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touching) return;
      event.preventDefault();
      const y = event.touches[0]?.clientY ?? touchY;
      addDelta(touchY - y);
      touchY = y;
    };

    const onTouchEnd = () => {
      touching = false;
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        addDelta(120);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        addDelta(-120);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [locale]);

  return (
    <section
      ref={stageRef}
      className="flex h-dvh flex-col overflow-hidden bg-paper text-ink overscroll-none [--card-r:1.5rem] [--cell-h:calc(var(--sphere-r)*2*tan(26deg))] [--cell-w:calc(var(--sphere-r)*2*tan(1.5deg))] [--sphere-r:6.25rem] sm:[--sphere-r:8rem] md:[--card-r:1.75rem] md:[--sphere-r:12.5rem] lg:[--sphere-r:15rem] xl:[--sphere-r:16.5rem]"
    >
      <div className="pointer-events-none relative z-10 flex flex-col items-center px-5 pt-24 text-center md:pt-28">
        <h1 className="font-serif text-[clamp(1.7rem,3.4vw,2.6rem)] leading-none">
          {dict.work.headline}
        </h1>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-[6vw] px-3 pb-8 md:gap-[8vw] md:px-8">
        {slots.map((slugs, sphereIndex) => (
          <SphereShell
            key={sphereIndex}
            sphereIndex={sphereIndex}
            slugs={slugs}
            openLabel={dict.work.open}
          />
        ))}
      </div>
    </section>
  );
}
