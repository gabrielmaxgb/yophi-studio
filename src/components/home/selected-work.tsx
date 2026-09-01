"use client";

import { YophiSignature } from "@/components/brand/yophi-logo";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal, StaggerReveal } from "@/components/motion/reveal";
import { CaseStudyCover } from "@/components/work/case-study-cover";
import { caseStudyBase } from "@/lib/content";

export function SelectedWork() {
  const { dict } = useI18n();

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex flex-col gap-4">
              <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
                {dict.selectedWork.eyebrow}
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] leading-none">
                {dict.selectedWork.headline}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <LocaleLink
              href="/work"
              className="group inline-flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase"
            >
              {dict.selectedWork.all}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </LocaleLink>
          </Reveal>
        </div>

        <StaggerReveal className="mt-14 flex flex-col gap-8 md:mt-20 md:gap-12">
          {caseStudyBase.map((study, index) => {
            const copy = dict.work.studies[study.slug];
            return (
              <article
                key={study.slug}
                data-reveal-item
                className="grid gap-0 overflow-hidden md:grid-cols-[1.35fr_1fr]"
              >
                <LocaleLink
                  href={`/work#${study.slug}`}
                  className={
                    study.cover === "wide"
                      ? "group relative block aspect-[40/21] w-full"
                      : "group relative block aspect-[3/4] w-full"
                  }
                >
                  <CaseStudyCover
                    src={study.image}
                    alt={study.client}
                    sizes="(max-width: 768px) 100vw, 58vw"
                    priority={index === 0}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-6 z-10 flex flex-col justify-end border border-paper/20 px-6 pb-8 md:inset-10 md:px-8 md:pb-10">
                      <div className="flex items-end justify-between gap-4 text-paper">
                        <span className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.88] tracking-[0.04em]">
                          {study.client}
                        </span>
                        <span className="editorial-num pb-[0.2em] text-[0.65rem] leading-none tracking-[0.24em] text-paper/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </CaseStudyCover>
                </LocaleLink>

                <div className="flex flex-col justify-between gap-8 border border-t-0 border-line p-7 md:border-t md:border-l-0 md:p-10">
                  <div className="flex flex-col gap-5">
                    <p className="text-[0.65rem] tracking-[0.22em] text-stone uppercase">
                      {copy.sector}
                    </p>
                    <p className="text-[0.7rem] tracking-[0.16em] uppercase">
                      {copy.disciplines.join(" / ")}
                    </p>
                    <p className="text-base leading-relaxed text-ink/70">
                      {copy.problem}
                    </p>
                    <div className="flex items-center gap-3 text-stone">
                      <span className="text-xs">↓</span>
                      <YophiSignature />
                    </div>
                    <p className="font-serif text-xl leading-snug md:text-2xl">
                      {copy.solution}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-[0.7rem] tracking-[0.14em] text-stone uppercase">
                      {copy.outcomes.join(" · ")}
                    </p>
                    {study.url && (
                      <a
                        href={study.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase"
                      >
                        {dict.work.visit}
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
