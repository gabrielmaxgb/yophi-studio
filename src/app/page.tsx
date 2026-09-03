import type { Metadata } from "next";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Origin } from "@/components/home/origin";
import { Philosophy } from "@/components/home/philosophy";
import { Process } from "@/components/home/process";
import { SelectedWork } from "@/components/home/selected-work";
import { Services } from "@/components/home/services";
import { Worlds } from "@/components/home/worlds";
import { dict } from "@/lib/dictionary";
import { defaultOgImage, siteName } from "@/lib/site";

export const metadata: Metadata = {
  openGraph: {
    title: dict.meta.title,
    description: dict.meta.ogDescription,
    type: "website",
    locale: "pt-BR",
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
