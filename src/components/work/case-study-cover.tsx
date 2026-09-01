"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, onScroll } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CaseStudyCoverProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  sizes: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export function CaseStudyCover({
  src,
  alt,
  className,
  imageClassName,
  overlayClassName,
  sizes,
  priority,
  children,
}: CaseStudyCoverProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    el.style.clipPath = "inset(100% 0 0 0)";

    const animation = animate(el, {
      clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
      duration: 1400,
      ease: "out(4)",
      autoplay: onScroll({
        target: el,
        enter: "bottom-=8% top",
        repeat: false,
      }),
    });

    return () => {
      animation.revert();
    };
  }, [src]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-deep", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]",
          imageClassName
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-ink/15 to-ink/20",
          overlayClassName
        )}
      />
      {children}
    </div>
  );
}
