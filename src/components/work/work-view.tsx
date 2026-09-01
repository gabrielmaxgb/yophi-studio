"use client";

import { YophiSignature } from "@/components/brand/yophi-logo";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal, StaggerReveal } from "@/components/motion/reveal";
import { CaseStudyCover } from "@/components/work/case-study-cover";
import { caseStudyBase } from "@/lib/content";

export function WorkView() {
  const { dict } = useI18n();

  return (
    <div className="bg-paper text-ink">
      <section className="mx-auto max-w-[1400px] px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
            {dict.work.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80} className="mt-6 max-w-3xl">
          <h1 className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95]">
            {dict.work.headline}
          </h1>
        </Reveal>
        <Reveal delay={140} className="mt-6 max-w-md">
          <p className="text-base leading-relaxed text-ink/65">
            {dict.work.intro}
          </p>
        </Reveal>
      </section>

      <StaggerReveal className="mx-auto flex max-w-[1400px] flex-col gap-20 px-5 pb-28 md:gap-28 md:px-10">
        {caseStudyBase.map((study, index) => {
          const copy = dict.work.studies[study.slug];
          return (
            <article
              key={study.slug}
              id={study.slug}
              data-reveal-item
              className="scroll-mt-28"
            >
              <CaseStudyCover
                src={study.image}
                url={study.url}
                alt={study.client}
                sizes="(max-width: 768px) 100vw, 1400px"
                priority={index === 0}
                eager={index === 0}
                className="min-h-[68vw] w-full md:min-h-[72vh]"
              >
                <div className="absolute inset-6 border border-paper/20 md:inset-12" />
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-paper md:p-14">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[0.65rem] tracking-[0.24em] uppercase text-paper/70">
                      {copy.sector}
                    </p>
                    <p className="editorial-num text-[0.7rem] tracking-[0.24em] text-paper/70">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <h2 className="font-serif text-[clamp(3rem,10vw,7rem)] leading-none tracking-[0.04em]">
                    {study.client}
                  </h2>
                </div>
              </CaseStudyCover>

              <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
                <div className="flex flex-col gap-4">
                  <p className="text-[0.65rem] tracking-[0.22em] text-stone uppercase">
                    {dict.work.disciplines}
                  </p>
                  <p className="text-sm tracking-[0.12em] uppercase">
                    {copy.disciplines.join(" / ")}
                  </p>
                  <p className="mt-4 text-[0.7rem] tracking-[0.18em] text-stone uppercase">
                    {dict.work.outcomes}
                  </p>
                  <p className="text-sm">{copy.outcomes.join(" · ")}</p>
                  {study.url && (
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-2 inline-flex w-fit items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase"
                    >
                      {dict.work.visit}
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-lg leading-relaxed text-ink/70">
                    {copy.problem}
                  </p>
                  <div className="flex items-center gap-3 text-stone">
                    <span>↓</span>
                    <YophiSignature />
                  </div>
                  <p className="font-serif text-2xl leading-snug md:text-3xl">
                    {copy.solution}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </StaggerReveal>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-serif text-3xl md:text-4xl">{dict.work.cta}</p>
          <LocaleLink
            href="/contact"
            className="group inline-flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase"
          >
            {dict.work.ctaLink}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </LocaleLink>
        </div>
      </section>
    </div>
  );
}
