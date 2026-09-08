"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  once = true,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { clearProps: "all" });
        return;
      }

      gsap.set(el, {
        autoAlpha: 0,
        x,
        y,
        scale,
      });

      gsap.to(el, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay: delay / 1000,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
        },
      });
    },
    { dependencies: [delay, once, x, y, scale], revertOnUpdate: true }
  );

  const Component = Tag as React.ElementType;

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  itemSelector?: string;
  delay?: number;
};

export function StaggerReveal({
  children,
  className,
  itemSelector = "[data-reveal-item]",
  delay = 0,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const items = root.querySelectorAll<HTMLElement>(itemSelector);
      if (!items.length) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { clearProps: "all" });
        return;
      }

      gsap.set(items, { autoAlpha: 0, y: 24 });

      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        delay: delay / 1000,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 84%",
          once: true,
        },
      });
    },
    { dependencies: [delay, itemSelector], revertOnUpdate: true }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
