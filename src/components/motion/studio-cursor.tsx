"use client";

import { useEffect, useRef } from "react";
import { createAnimatable } from "animejs";
import { YophiMark } from "@/components/brand/yophi-logo";
import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

type Tone = "dark" | "light";

function parseRgba(color: string): [number, number, number, number] | null {
  const match = color.match(
    /rgba?\(\s*([\d.]+)(?:\s*,\s*|\s+)([\d.]+)(?:\s*,\s*|\s+)([\d.]+)(?:\s*(?:[,/]\s*)([\d.]+%?))?\s*\)/i
  );
  if (!match) return null;
  const alpha =
    match[4] == null
      ? 1
      : match[4].endsWith("%")
        ? parseFloat(match[4]) / 100
        : parseFloat(match[4]);
  return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), alpha];
}

function luminance(r: number, g: number, b: number) {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function isPaintedMedia(el: Element) {
  return (
    el instanceof HTMLImageElement ||
    el instanceof HTMLVideoElement ||
    el instanceof HTMLCanvasElement ||
    el instanceof SVGImageElement
  );
}

function toneFromElement(el: Element): Tone | null {
  if (isPaintedMedia(el)) return "dark";

  const style = getComputedStyle(el);
  const image = style.backgroundImage;
  const rgba = parseRgba(style.backgroundColor);
  const opaque = rgba && rgba[3] >= 0.2;

  if (image && image !== "none") {
    if (rgba && rgba[3] >= 0.6) {
      return luminance(rgba[0], rgba[1], rgba[2]) < 0.45 ? "dark" : "light";
    }
    return "dark";
  }

  if (!opaque || !rgba) return null;

  const paperBehind: [number, number, number] = [232, 230, 225];
  const a = rgba[3];
  const r = rgba[0] * a + paperBehind[0] * (1 - a);
  const g = rgba[1] * a + paperBehind[1] * (1 - a);
  const b = rgba[2] * a + paperBehind[2] * (1 - a);
  return luminance(r, g, b) < 0.45 ? "dark" : "light";
}

function toneUnderPoint(x: number, y: number): Tone {
  const stack = document.elementsFromPoint(x, y);
  for (const el of stack) {
    if (el instanceof HTMLElement && el.closest("[data-cursor-mark]")) continue;
    const tone = toneFromElement(el);
    if (tone) return tone;
  }
  return "light";
}

export function StudioCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion() || !isFinePointer()) return;

    const mark = root.querySelector<HTMLElement>("[data-cursor-mark]");
    if (!mark) return;

    const follow = createAnimatable(mark, {
      x: 140,
      y: 140,
      opacity: 240,
    });

    let visible = false;
    let tone: Tone | null = null;
    let sampleX = 0;
    let sampleY = 0;
    let sampleFrame = 0;

    const applyTone = (next: Tone) => {
      if (next === tone) return;
      tone = next;
      mark.dataset.tone = next;
    };

    const sample = () => {
      sampleFrame = 0;
      applyTone(toneUnderPoint(sampleX, sampleY));
    };

    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true;
        follow.opacity(0.78);
      }
      follow.x(event.clientX + 10);
      follow.y(event.clientY + 12);
      sampleX = event.clientX;
      sampleY = event.clientY;
      if (!sampleFrame) {
        sampleFrame = requestAnimationFrame(sample);
      }
    };

    const onLeave = () => {
      visible = false;
      follow.opacity(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (sampleFrame) cancelAnimationFrame(sampleFrame);
      follow.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-80 hidden md:block"
    >
      <span
        data-cursor-mark
        data-tone="dark"
        className="absolute top-0 left-0 text-ink opacity-0 transition-colors duration-200 ease-out data-[tone=dark]:text-paper"
      >
        <YophiMark className="h-7 w-auto" />
      </span>
    </div>
  );
}
