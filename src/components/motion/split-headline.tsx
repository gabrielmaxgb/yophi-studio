"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;

      el.setAttribute("aria-label", children);
      el.textContent = "";

      const units =
        mode === "chars"
          ? [...children]
          : children.split(/\s+/).filter(Boolean);

      const inners: HTMLElement[] = [];

      units.forEach((unit, index) => {
        const outer = document.createElement("span");
        outer.style.display = "inline-block";
        outer.style.overflow = "hidden";
        outer.style.verticalAlign = "bottom";
        if (mode === "words" && index < units.length - 1) {
          outer.style.marginRight = "0.22em";
        }

        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.style.willChange = "transform";
        inner.setAttribute("aria-hidden", "true");
        inner.textContent = unit;

        outer.appendChild(inner);
        el.appendChild(outer);
        inners.push(inner);
      });

      gsap.set(inners, { yPercent: 110 });

      gsap.to(inners, {
        yPercent: 0,
        duration: 1.05,
        stagger: mode === "chars" ? 0.028 : 0.055,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    },
    { dependencies: [children, mode], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
