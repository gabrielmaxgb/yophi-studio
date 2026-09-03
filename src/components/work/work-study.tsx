"use client";

import { YophiSignature } from "@/components/brand/yophi-logo";
import Link from "next/link";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudyCover } from "@/components/work/case-study-cover";
import { caseStudyBase, getCaseStudy, type CaseStudySlug } from "@/lib/content";

export function WorkStudy({ slug }: { slug: CaseStudySlug }) {
  const { dict } = useI18n();
  const study = getCaseStudy(slug);
  const copy = dict.work.studies[slug];
  const index = caseStudyBase.findIndex((item) => item.slug === slug);
  const impactIsPlaceholder = copy.impact.startsWith("[");

  return (
    <div className="bg-paper text-ink">
      <article className="mx-auto max-w-[1400px] px-5 pt-28 pb-28 md:px-10 md:pt-36">
        <Reveal>
          <Link
            href="/work"
            className="group inline-flex min-h-11 items-center gap-3 text-[0.65rem] tracking-[0.22em] uppercase"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            {dict.work.back}
          </Link>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <CaseStudyCover
            src={study.image}
            alt={`${study.client} — ${copy.sector}`}
            sizes="(max-width: 768px) 100vw, 1400px"
            priority
            className={
              study.cover === "wide"
                ? "aspect-[40/21] w-full"
                : "aspect-[3/4] w-full"
            }
          >
            <div className="absolute inset-6 z-10 flex flex-col justify-between border border-paper/20 px-6 pt-5 pb-8 text-paper md:inset-10 md:px-8 md:pt-6 md:pb-10">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.65rem] leading-none tracking-[0.24em] text-paper/80 uppercase">
                  {copy.sector}
                </p>
                <p className="editorial-num text-[0.65rem] leading-none tracking-[0.24em] text-paper/80">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <h1 className="font-serif text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.88] tracking-[0.04em]">
                {study.client}
              </h1>
            </div>
          </CaseStudyCover>
        </Reveal>

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-[0.9fr_1.2fr] md:gap-16">
          <Reveal>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-[0.65rem] tracking-[0.22em] text-stone uppercase">
                  {dict.work.disciplines}
                </p>
                <p className="text-sm tracking-[0.12em] uppercase">
                  {copy.disciplines.join(" / ")}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[0.65rem] tracking-[0.22em] text-stone uppercase">
                  {dict.work.outcomes}
                </p>
                <p className="text-sm">{copy.outcomes.join(" · ")}</p>
              </div>
              {study.url ? (
                <a
                  href={study.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-fit min-h-11 items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase"
                >
                  {dict.work.visit}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <p className="text-[0.65rem] tracking-[0.22em] text-stone uppercase">
                  {dict.work.challenge}
                </p>
                <p className="text-lg leading-relaxed text-ink/80">
                  {copy.problem}
                </p>
              </div>

              <div className="flex items-center gap-3 text-stone">
                <span aria-hidden>↓</span>
                <YophiSignature />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[0.65rem] tracking-[0.22em] text-stone uppercase">
                  {dict.work.intervention}
                </p>
                <p className="font-serif text-2xl leading-snug md:text-3xl">
                  {copy.solution}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-line pt-8">
                <p className="text-[0.65rem] tracking-[0.22em] text-stone uppercase">
                  {dict.work.impact}
                </p>
                <p
                  className={
                    impactIsPlaceholder
                      ? "font-serif text-xl text-stone md:text-2xl"
                      : "font-serif text-xl md:text-2xl"
                  }
                >
                  {copy.impact}
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex w-fit min-h-12 items-center gap-3 bg-deep px-6 py-4 text-[0.7rem] tracking-[0.22em] text-paper uppercase transition-colors hover:bg-deep/90"
              >
                {dict.work.cta}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </div>
  );
}
