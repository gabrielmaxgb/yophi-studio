import type { Metadata } from "next";
import { WorkView } from "@/components/work/work-view";
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
    title: dict.work.metaTitle,
    description: dict.work.metaDescription,
    alternates: {
      canonical: `${prefix}/work`,
      languages: {
        "pt-BR": "/pt/work",
        en: "/en/work",
        "x-default": "/pt/work",
      },
    },
  };
}

export default function WorkPage() {
  return <WorkView />;
}
