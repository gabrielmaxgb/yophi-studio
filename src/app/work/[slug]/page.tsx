import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkStudy } from "@/components/work/work-study";
import { caseStudyBase, getCaseStudy, isCaseStudySlug } from "@/lib/content";
import { dict } from "@/lib/dictionary";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyBase.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) return {};

  const study = getCaseStudy(slug);
  const copy = dict.work.studies[slug];

  return {
    title: study.client,
    description: copy.problem,
    openGraph: {
      title: study.client,
      description: copy.problem,
      type: "article",
      images: [
        {
          url: study.image,
          alt: study.client,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.client,
      description: copy.problem,
      images: [study.image],
    },
    alternates: {
      canonical: `/work/${slug}`,
    },
  };
}

export default async function WorkStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCaseStudySlug(slug)) notFound();

  return <WorkStudy slug={slug} />;
}
