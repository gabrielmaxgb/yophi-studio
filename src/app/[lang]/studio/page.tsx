import type { Metadata } from "next";
import { StudioView } from "@/components/studio/studio-view";
import { getDictionary } from "@/lib/dictionary";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const prefix = isLocale(lang) ? `/${lang}` : "/pt";

  return {
    title: dict.studio.metaTitle,
    description: dict.studio.metaDescription,
    alternates: {
      canonical: `${prefix}/studio`,
      languages: {
        "pt-BR": "/pt/studio",
        en: "/en/studio",
        "x-default": "/pt/studio",
      },
    },
  };
}

export default function StudioPage() {
  return <StudioView />;
}
