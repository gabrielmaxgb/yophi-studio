"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "@/lib/motion";
import { ArchiveLink } from "@/components/work/archive-gate";
import { useI18n } from "@/components/i18n/locale-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { YophiMark } from "@/components/brand/yophi-logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || prefersReducedMotion()) return;
    const parts = header.querySelectorAll<HTMLElement>("[data-nav-in]");
    parts.forEach((el) => {
      el.style.opacity = "0";
    });
    animate(parts, {
      opacity: [0, 1],
      duration: 1100,
      delay: stagger(120, { start: 200 }),
      ease: "out(3)",
    });
  }, []);

  const links = [
    { href: "/#servicos", label: dict.nav.services },
    { href: "/work", label: dict.nav.work },
    { href: "/studio", label: dict.nav.studio },
    { href: "/contact", label: dict.nav.contact },
  ];

  const goToLink = (href: string) => {
    setOpen(false);
    if (href !== "/#servicos" || pathname !== "/") return;
    document.getElementById("servicos")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <>
      {/* Soft top fade so type reads over any scene without a bar */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-36 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.72)_0%,rgba(5,5,5,0.28)_55%,transparent_100%)]"
      />

      <header
        ref={headerRef}
        className="pointer-events-none fixed inset-0 z-50"
      >
        {/* Studio bug — title-card corner */}
        <Link
          href="/"
          aria-label="YOPHI"
          data-nav-in
          className="pointer-events-auto absolute top-5 left-5 flex flex-col gap-2 md:top-8 md:left-8 lg:left-10"
        >
          <YophiMark className="h-9 w-auto text-ink md:h-11" />
          <span className="font-serif text-[0.7rem] leading-none tracking-[0.32em] text-ink/70 uppercase md:text-[0.75rem]">
            Yophi
          </span>
        </Link>

        {/* Film-credit rail — vertical type on the right edge */}
        <nav
          data-nav-in
          aria-label="Principal"
          className="pointer-events-auto absolute top-1/2 right-2 hidden -translate-y-1/2 md:right-4 md:block lg:right-6"
        >
          <ul className="relative flex flex-col items-end gap-7 pr-1 lg:gap-9">
            {links.map((link) => {
              const active = pathname === link.href;
              const LinkTag = link.href === "/work" ? ArchiveLink : Link;
              const isContact = link.href === "/contact";

              return (
                <li key={link.href}>
                  <LinkTag
                    href={link.href}
                    onClick={() => goToLink(link.href)}
                    className={cn(
                      "group relative block [writing-mode:vertical-rl] rotate-180 text-[0.78rem] tracking-[0.28em] uppercase transition-colors duration-300 md:text-[0.82rem]",
                      isContact
                        ? active
                          ? "text-foam"
                          : "text-ember/90 hover:text-foam"
                        : active
                          ? "text-ink"
                          : "text-ink/65 hover:text-ink"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-ember/70 transition-opacity duration-300",
                        active
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-40"
                      )}
                    />
                    {link.label}
                  </LinkTag>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile — raw cue, no plate */}
        <div
          data-nav-in
          className="pointer-events-auto absolute top-5 right-5 md:hidden"
        >
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="text-[0.7rem] tracking-[0.28em] text-ink/80 uppercase"
              aria-label={dict.nav.openMenu}
            >
              Menu
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-0 bg-deep/95 p-0 backdrop-blur-xl"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>{dict.nav.openMenu}</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col justify-between px-8 pt-20 pb-12">
                <nav className="flex flex-col gap-8">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl tracking-[0.08em] uppercase"
                  >
                    {dict.nav.home}
                  </Link>
                  {links.map((link) => {
                    const LinkTag =
                      link.href === "/work" ? ArchiveLink : Link;
                    const active = pathname === link.href;
                    return (
                      <LinkTag
                        key={link.href}
                        href={link.href}
                        onClick={() => goToLink(link.href)}
                        className={cn(
                          "font-serif text-4xl tracking-[0.08em] uppercase transition-colors",
                          active ? "text-ember" : "text-ink/70"
                        )}
                      >
                        {link.label}
                      </LinkTag>
                    );
                  })}
                </nav>
                <YophiMark className="h-10 w-auto text-ink/40" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
