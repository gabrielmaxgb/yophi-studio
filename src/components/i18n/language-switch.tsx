"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { persistLocale, localizedPath, stripLocale, type Locale } from "@/lib/i18n";
import { useI18n } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";

const options: { locale: Locale; label: string }[] = [
  { locale: "pt", label: "PT" },
  { locale: "en", label: "EN" },
];

export function LanguageSwitchInk({ className }: { className?: string }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const rest = stripLocale(pathname);

  return (
    <nav
      aria-label={dict.nav.language}
      className={cn("flex items-center gap-2", className)}
    >
      {options.map((option, i) => (
        <span key={option.locale} className="flex items-center gap-2">
          {i > 0 && <span className="text-ink/20">/</span>}
          <Link
            href={localizedPath(option.locale, rest)}
            hrefLang={option.locale === "pt" ? "pt-BR" : "en"}
            onClick={() => persistLocale(option.locale)}
            className={cn(
              "text-[0.65rem] tracking-[0.2em] uppercase transition-colors",
              locale === option.locale ? "text-ink" : "text-ink/35 hover:text-ink"
            )}
            aria-current={locale === option.locale ? "true" : undefined}
          >
            {option.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
