"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, splitText, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitHeadlineProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  mode?: "chars" | "words";
};

export function SplitHeadline({
  children,
  className,
  as: Tag = "h2",
  mode = "words",
}: SplitHeadlineProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const splitter = splitText(el, {
      chars: mode === "chars",
      words: mode === "words",
      accessible: true,
    });

    const units = mode === "chars" ? splitter.chars : splitter.words;
    units.forEach((unit: HTMLElement) => {
      unit.style.display = "inline-block";
      unit.style.overflow = "hidden";
      const inner = unit.firstElementChild as HTMLElement | null;
      if (inner) {
        inner.style.display = "inline-block";
        inner.style.transform = "translateY(110%)";
      } else {
        const wrap = document.createElement("span");
        wrap.style.display = "inline-block";
        wrap.style.transform = "translateY(110%)";
        while (unit.firstChild) wrap.appendChild(unit.firstChild);
        unit.appendChild(wrap);
      }
    });

    const inners = units.map((unit: HTMLElement) => unit.firstElementChild);

    const animation = animate(inners, {
      translateY: ["110%", "0%"],
      duration: 1100,
      delay: stagger(mode === "chars" ? 38 : 55, { from: "first" }),
      ease: "out(3)",
      autoplay: onScroll({
        target: el,
        enter: "bottom-=12% top",
        repeat: false,
      }),
    });

    return () => {
      animation.revert();
      splitter.revert();
    };
  }, [children, mode]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
