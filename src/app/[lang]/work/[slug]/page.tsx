import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkStudy } from "@/components/work/work-study";
import { caseStudyBase, getCaseStudy, isCaseStudySlug } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { isLocale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyBase.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isCaseStudySlug(slug)) return {};

  const dict = getDictionary(lang);
  const study = getCaseStudy(slug);
  const copy = dict.work.studies[slug];
  const prefix = isLocale(lang) ? `/${lang}` : "/pt";

  return {
    title: study.client,
    description: copy.problem,
    alternates: {
      canonical: `${prefix}/work/${slug}`,
      languages: {
        "pt-BR": `/pt/work/${slug}`,
        en: `/en/work/${slug}`,
        "x-default": `/pt/work/${slug}`,
      },
    },
  };
}

export default async function WorkStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) notFound();

  return <WorkStudy slug={slug} />;
}
