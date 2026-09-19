"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS: {
  href: string;
  label: string;
  icon: LucideIcon;
  match: "exact" | "prefix";
}[] = [
  { href: "/conta", label: "Início", icon: LayoutDashboard, match: "exact" },
  {
    href: "/conta/projetos",
    label: "Projetos",
    icon: FolderKanban,
    match: "prefix",
  },
  {
    href: "/conta/clientes",
    label: "Clientes",
    icon: Users,
    match: "prefix",
  },
  {
    href: "/conta/novo-cliente",
    label: "Novo cliente",
    icon: UserPlus,
    match: "exact",
  },
];

function isActive(pathname: string, href: string, match: "exact" | "prefix") {
  if (match === "exact") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function StudioNav() {
  const pathname = usePathname() || "/conta";

  return (
    <nav
      aria-label="Estúdio"
      className="fixed z-40 flex gap-2.5 max-md:bottom-5 max-md:left-1/2 max-md:-translate-x-1/2 max-md:flex-row max-md:rounded-full max-md:border max-md:border-line/80 max-md:bg-deep/90 max-md:p-2 max-md:backdrop-blur-md md:top-1/2 md:left-5 md:-translate-y-1/2 md:flex-col md:items-start"
    >
      {ITEMS.map((item) => {
        const active = isActive(pathname, item.href, item.match);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex h-12 items-center overflow-hidden rounded-full border backdrop-blur-md transition-colors duration-300",
              "focus-visible:ring-2 focus-visible:ring-ember/50 focus-visible:outline-none",
              "md:shadow-[0_12px_32px_rgba(0,0,0,0.48)]",
              active
                ? "border-ember/55 bg-mist text-ember"
                : "border-line/80 bg-paper/80 text-ink/65 hover:border-ink/25 hover:text-ink"
            )}
          >
            <span className="flex size-12 shrink-0 items-center justify-center">
              <Icon className="size-[1.15rem]" strokeWidth={1.45} />
            </span>
            <span
              aria-hidden
              className="hidden grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] md:grid"
            >
              <span className="min-w-0 overflow-hidden">
                <span className="block pr-4 text-[0.68rem] tracking-[0.14em] whitespace-nowrap uppercase">
                  {item.label}
                </span>
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
