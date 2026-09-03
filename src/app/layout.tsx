import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { ArchiveGate } from "@/components/work/archive-gate";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StudioCursor } from "@/components/motion/studio-cursor";
import { dict } from "@/lib/dictionary";
import { defaultOgImage, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: dict.meta.title,
    template: "%s · YOPHI",
  },
  description: dict.meta.description,
  openGraph: {
    type: "website",
    locale: "pt-BR",
    siteName,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable}`}
    >
      <body className="min-h-dvh flex flex-col" suppressHydrationWarning>
        <LocaleProvider dict={dict}>
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
        </LocaleProvider>
      </body>
    </html>
  );
}
