import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { SiteChrome } from "@/components/layout/site-chrome";
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
  style: ["normal", "italic"],
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
          <SiteChrome>{children}</SiteChrome>
        </LocaleProvider>
      </body>
    </html>
  );
}
