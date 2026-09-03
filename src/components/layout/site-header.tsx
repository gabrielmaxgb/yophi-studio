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
import { YophiLogo } from "@/components/brand/yophi-logo";
import { cn } from "@/lib/utils";

const plate =
  "pointer-events-auto border border-ink/14 bg-[#f4f2ec]/90 text-ink shadow-[0_22px_56px_-22px_rgba(13,31,51,0.5)] backdrop-blur-md";

export function SiteHeader() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || prefersReducedMotion()) return;
    const plates = header.querySelectorAll<HTMLElement>("[data-nav-plate]");
    plates.forEach((plate) => {
      plate.style.opacity = "0";
      plate.style.transform = "translateY(-18px)";
    });
    animate(plates, {
      opacity: [0, 1],
      y: [-18, 0],
      duration: 900,
      delay: stagger(70, { start: 180 }),
      ease: "out(4)",
    });
  }, []);

  const links = [
    { href: "/work", label: dict.nav.work, index: "01" },
    { href: "/studio", label: dict.nav.studio, index: "02" },
    { href: "/contact", label: dict.nav.contact, index: "03" },
  ];

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 p-4 md:p-6 lg:px-10 lg:pt-7"
    >
      <Link
        href="/"
        aria-label="YOPHI Studio"
        data-nav-plate
        className={cn(plate, "flex h-12 items-center px-3.5 md:h-14 md:px-4")}
      >
        <YophiLogo
          showStudio={false}
          className="gap-2"
          markClassName="h-6 md:h-7"
          wordmarkClassName="text-[1.05rem] tracking-[0.2em] md:text-lg"
        />
      </Link>

      <div className="flex items-start gap-2 md:gap-3">
        <nav
          data-nav-plate
          className={cn(plate, "hidden h-14 items-stretch md:flex")}
        >
          {links.map((link) => {
            const active = pathname === link.href;
            const isContact = link.href === "/contact";
            const LinkTag = link.href === "/work" ? ArchiveLink : Link;

            return (
              <LinkTag
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center gap-2.5 px-5 text-[0.65rem] tracking-[0.2em] uppercase transition-colors",
                  isContact && "border-l border-ink/10",
                  active ? "text-ink" : "text-ink/70 hover:text-ink"
                )}
              >
                <span className="editorial-num text-[0.58rem] text-ink/35">
                  {link.index}
                </span>
                <span
                  className={cn(
                    "border-b pb-0.5",
                    active
                      ? "border-ink"
                      : "border-transparent group-hover:border-ink/30"
                  )}
                >
                  {link.label}
                </span>
              </LinkTag>
            );
          })}
        </nav>

        <div
          data-nav-plate
          className={cn(plate, "flex h-12 items-center px-3 md:hidden")}
        >
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="text-[0.65rem] tracking-[0.22em] uppercase"
              aria-label={dict.nav.openMenu}
            >
              Menu
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-line bg-paper w-[min(100%,22rem)] p-0"
            >
              <SheetHeader className="border-line border-b px-6 py-5">
                <SheetTitle className="text-left font-normal text-ink">
                  <YophiLogo
                    layout="stack"
                    className="items-start text-left"
                    markClassName="h-9"
                    wordmarkClassName="text-2xl tracking-[0.16em]"
                    studioClassName="text-[0.55rem] tracking-[0.46em]"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 py-8">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 font-serif text-3xl"
                >
                  {dict.nav.home}
                </Link>
                {links.map((link) => {
                  const LinkTag =
                    link.href === "/work" ? ArchiveLink : Link;
                  return (
                    <LinkTag
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 px-2 py-3"
                    >
                      <span className="editorial-num text-[0.7rem] tracking-[0.18em] text-stone">
                        {link.index}
                      </span>
                      <span className="font-serif text-3xl">{link.label}</span>
                    </LinkTag>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
