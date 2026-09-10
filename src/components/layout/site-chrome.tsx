"use client";

import { usePathname } from "next/navigation";
import { ArchiveGate } from "@/components/work/archive-gate";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StudioCursor } from "@/components/motion/studio-cursor";
import { useI18n } from "@/components/i18n/locale-provider";

const APP_PREFIXES = ["/entrar", "/conta", "/api/auth"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const { dict } = useI18n();
  const isApp = APP_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isApp) {
    return <>{children}</>;
  }

  return (
    <ArchiveGate>
      <a href="#conteudo" className="skip-link">
        {dict.nav.skip}
      </a>
      <StudioCursor />
      <SiteHeader />
      <main id="conteudo" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </ArchiveGate>
  );
}
