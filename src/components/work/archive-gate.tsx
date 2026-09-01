"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate, createTimeline, scrambleText, stagger } from "animejs";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useI18n } from "@/components/i18n/locale-provider";
import {
  preloadArchiveImages,
  wait,
  waitForPath,
} from "@/lib/archive-images";
import { localizedPath, stripLocale } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ArchiveGateValue = {
  busy: boolean;
  enter: () => void;
};

const ArchiveGateContext = createContext<ArchiveGateValue | null>(null);

export function useArchiveGate() {
  const context = useContext(ArchiveGateContext);
  if (!context) {
    throw new Error("useArchiveGate must be used within ArchiveGate");
  }
  return context;
}

export function ArchiveGate({ children }: { children: ReactNode }) {
  const { locale, dict } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(10);
  const busy = useRef(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const localeRef = useRef(locale);
  const routerRef = useRef(router);
  const labelCopy = dict.work.loading;

  localeRef.current = locale;
  routerRef.current = router;

  const enter = useCallback(() => {
    if (busy.current) return;
    if (stripLocale(pathname) === "/work") return;
    busy.current = true;
    setLoaded(0);
    setTotal(10);
    setOpen(true);
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    if (open) html.classList.add("archive-cover");
    else html.classList.remove("archive-cover");
    return () => html.classList.remove("archive-cover");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const label = labelRef.current;
    if (!overlay) return;

    const reduced = prefersReducedMotion();
    const href = localizedPath(localeRef.current, "/work");
    const shells = overlay.querySelectorAll<HTMLElement>("[data-cover-shell]");
    const marks = overlay.querySelectorAll<HTMLElement>("[data-cover-mark]");
    let cancelled = false;
    const motions: Array<{ revert: () => void }> = [];

    overlay.style.opacity = "1";

    if (!reduced) {
      overlay.style.clipPath = "inset(100% 0 0 0)";
      shells.forEach((shell) => {
        shell.style.opacity = "0";
      });
      marks.forEach((mark) => {
        mark.style.opacity = "0";
      });

      const intro = createTimeline({ defaults: { ease: "out(4)" } });
      intro
        .add(overlay, {
          clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
          duration: 720,
        })
        .add(
          shells,
          {
            opacity: [0, 1],
            duration: 800,
            delay: stagger(80),
          },
          "-=480"
        )
        .add(
          marks,
          {
            opacity: [0, 1],
            y: [18, 0],
            duration: 700,
            delay: stagger(60),
          },
          "-=560"
        );
      motions.push(intro);

      if (label) {
        motions.push(
          animate(label, {
            text: scrambleText({
              text: labelCopy,
              chars: "uppercase",
              from: "center",
            }),
            duration: 1600,
          })
        );
      }
    } else {
      overlay.style.clipPath = "inset(0 0 0 0)";
    }

    const run = async () => {
      try {
        const minHold = reduced ? 240 : 1300;
        await Promise.all([
          preloadArchiveImages((done, all) => {
            if (cancelled) return;
            setLoaded(done);
            setTotal(all);
          }),
          Promise.resolve(routerRef.current.prefetch(href)),
          wait(minHold),
        ]);
        if (cancelled) return;
        routerRef.current.push(href);
        await waitForPath("/work");
        await wait(reduced ? 40 : 200);
        if (cancelled) return;

        if (reduced) {
          setOpen(false);
          busy.current = false;
          return;
        }

        animate(overlay, {
          clipPath: ["inset(0% 0 0 0)", "inset(0 0 100% 0)"],
          duration: 820,
          ease: "inOut(3)",
        });
        await wait(840);
        if (cancelled) return;
        setOpen(false);
        busy.current = false;
      } catch {
        if (cancelled) return;
        routerRef.current.push(href);
        setOpen(false);
        busy.current = false;
      }
    };

    const failSafe = window.setTimeout(() => {
      if (!busy.current) return;
      routerRef.current.push(href);
      setOpen(false);
      busy.current = false;
    }, 12000);

    run().finally(() => {
      window.clearTimeout(failSafe);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      motions.forEach((motion) => motion.revert());
    };
  }, [open, labelCopy]);

  return (
    <ArchiveGateContext.Provider value={{ busy: open, enter }}>
      {children}
      {open ? (
        <div
          ref={overlayRef}
          role="status"
          aria-live="polite"
          aria-busy="true"
          className="pointer-events-auto fixed inset-0 z-90 flex flex-col items-center justify-center bg-deep text-paper"
        >
          <div
            className="relative h-48 w-80 md:h-56 md:w-96"
            aria-hidden
          >
            <span
              data-cover-shell
              className="absolute top-1/2 left-[18%] size-40 -translate-y-1/2 md:size-48"
            >
              <span className="block size-full rounded-full border border-paper/25 motion-safe:animate-[cover-spin_16s_linear_infinite]" />
            </span>
            <span
              data-cover-shell
              className="absolute top-1/2 right-[18%] size-40 -translate-y-1/2 md:size-48"
            >
              <span className="block size-full rounded-full border border-paper/50 motion-safe:animate-[cover-spin_12s_linear_infinite_reverse]" />
            </span>
            <span
              data-cover-shell
              className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 md:size-28"
            >
              <span className="block size-full rounded-full border border-dashed border-paper/35 motion-safe:animate-[cover-spin_7s_linear_infinite]" />
            </span>
          </div>
          <p
            ref={labelRef}
            data-cover-mark
            className="mt-8 font-serif text-3xl tracking-[0.2em] uppercase md:text-4xl"
          >
            {labelCopy}
          </p>
          <p
            data-cover-mark
            className="editorial-num mt-4 text-[0.7rem] tracking-[0.28em] text-paper/70 uppercase"
          >
            {String(loaded).padStart(2, "0")}
            <span className="text-paper/35"> / </span>
            {String(total).padStart(2, "0")}
          </p>
        </div>
      ) : null}
    </ArchiveGateContext.Provider>
  );
}

type ArchiveLinkProps = Omit<ComponentProps<typeof LocaleLink>, "href"> & {
  href?: string;
};

export function ArchiveLink({
  href = "/work",
  onClick,
  className,
  ...props
}: ArchiveLinkProps) {
  const { enter, busy } = useArchiveGate();
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (stripLocale(pathname) === "/work") return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;
    event.preventDefault();
    enter();
  };

  return (
    <LocaleLink
      href={href}
      onClick={handleClick}
      aria-busy={busy || undefined}
      className={cn(busy && "pointer-events-none", className)}
      {...props}
    />
  );
}
