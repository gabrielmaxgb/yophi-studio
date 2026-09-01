import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { ArchiveGate } from "@/components/work/archive-gate";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StudioCursor } from "@/components/motion/studio-cursor";
import { getDictionary } from "@/lib/dictionary";
import { htmlLang, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

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

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const prefix = isLocale(lang) ? `/${lang}` : "/pt";

  return {
    title: {
      default: dict.meta.title,
      template: "%s · YOPHI",
    },
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      type: "website",
      locale: isLocale(lang) ? htmlLang[lang] : "pt-BR",
    },
    alternates: {
      canonical: prefix,
      languages: {
        "pt-BR": "/pt",
        en: "/en",
        "x-default": "/pt",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html
      lang={htmlLang[lang]}
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable}`}
    >
      <body className="min-h-dvh flex flex-col" suppressHydrationWarning>
        <LocaleProvider locale={lang} dict={dict}>
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
