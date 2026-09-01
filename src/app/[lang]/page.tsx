import type { Metadata } from "next";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Origin } from "@/components/home/origin";
import { Philosophy } from "@/components/home/philosophy";
import { Process } from "@/components/home/process";
import { SelectedWork } from "@/components/home/selected-work";
import { Services } from "@/components/home/services";
import { Worlds } from "@/components/home/worlds";
import { getDictionary } from "@/lib/dictionary";
import { htmlLang, isLocale } from "@/lib/i18n";
import { defaultOgImage, siteName } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return {
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      type: "website",
      locale: isLocale(lang) ? htmlLang[lang] : "pt-BR",
      siteName,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      images: [defaultOgImage],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Worlds />
      <SelectedWork />
      <Services />
      <Process />
      <Origin />
      <FinalCta />
    </>
  );
}
