"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, onScroll } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const VIEW_W = 1440;
const VIEW_H = 900;

type CaseStudyCoverProps = {
  src?: string;
  url?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  sizes: string;
  priority?: boolean;
  eager?: boolean;
  children?: React.ReactNode;
};

export function CaseStudyCover({
  src,
  url,
  alt,
  className,
  imageClassName,
  overlayClassName,
  sizes,
  priority,
  eager,
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

    return () => animation.revert();
  }, [src, url]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-deep", className)}
    >
      {url ? (
        <div className="absolute inset-0 overflow-hidden @container-size">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <iframe
              src={url}
              title={alt}
              loading={eager || priority ? "eager" : "lazy"}
              tabIndex={-1}
              className="pointer-events-none absolute top-1/2 left-1/2 origin-center border-0"
              style={{
                width: VIEW_W,
                height: VIEW_H,
                transform: `translate(-50%, -50%) scale(max(100cqi / ${VIEW_W}, 100cqh / ${VIEW_H}))`,
              }}
            />
          </div>
        </div>
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]",
            imageClassName
          )}
        />
      ) : null}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/30",
          overlayClassName
        )}
      />
      {children}
    </div>
  );
}
