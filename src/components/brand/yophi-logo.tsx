import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
};

/** Open door + frame — the YOPHI mark. */
export function YophiMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 72 92"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path d="M10 12 L40 20 L40 74 L10 82 Z" fill="currentColor" />
      <path
        d="M40 18 L64 14 L64 80 L40 76 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  studioClassName?: string;
  showStudio?: boolean;
  layout?: "row" | "stack";
};

export function YophiLogo({
  className,
  markClassName,
  wordmarkClassName,
  studioClassName,
  showStudio = true,
  layout = "row",
}: LogoProps) {
  const stacked = layout === "stack";

  return (
    <span
      className={cn(
        "inline-flex",
        stacked
          ? "flex-col items-center gap-2.5 text-center"
          : "items-center gap-2.5",
        className
      )}
    >
      <YophiMark
        className={cn(
          stacked ? "h-11 w-auto md:h-14" : "h-7 w-auto",
          markClassName
        )}
      />
      <span
        className={cn(
          "flex flex-col leading-none",
          stacked ? "items-center" : "items-start justify-center"
        )}
      >
        <span
          className={cn(
            "font-serif tracking-[0.18em] uppercase",
            wordmarkClassName
          )}
        >
          Yophi
        </span>
        {showStudio ? (
          <span
            className={cn(
              "mt-[0.45em] font-sans text-[0.52em] tracking-[0.46em] uppercase",
              studioClassName
            )}
          >
            Studio
          </span>
        ) : null}
      </span>
    </span>
  );
}

export function YophiSignature({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <YophiMark className="h-4 w-auto" />
      <span className="text-[0.65rem] tracking-[0.24em] uppercase">Yophi</span>
    </span>
  );
}
