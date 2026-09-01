"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  x = 0,
  once = true,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = `translate(${x}px, ${y}px)`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        if (once && played.current) return;
        played.current = true;

        animate(el, {
          opacity: [0, 1],
          translateX: [x, 0],
          translateY: [y, 0],
          duration: 1100,
          delay,
          ease: "out(3)",
        });

        if (once) observer.disconnect();
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once, x, y]);

  const Component = Tag as React.ElementType;

  return (
    <Component ref={ref} className={className}>
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
  const played = useRef(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>(itemSelector);
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(28px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played.current) return;
        played.current = true;

        animate(items, {
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 900,
          delay: stagger(90, { start: delay }),
          ease: "out(3)",
        });

        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [delay, itemSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
