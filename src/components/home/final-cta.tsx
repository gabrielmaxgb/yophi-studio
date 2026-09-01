"use client";

import { LocaleLink } from "@/components/i18n/locale-link";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";

export function FinalCta() {
  const { dict } = useI18n();

  return (
    <section className="bg-deep text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.28em] text-paper/40 uppercase">
            {dict.finalCta.eyebrow}
          </p>
        </Reveal>

        <SplitHeadline className="mt-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] text-balance">
          {dict.finalCta.headline}
        </SplitHeadline>

        <Reveal
          delay={160}
          className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-center md:gap-10"
        >
          <p className="max-w-sm text-sm leading-relaxed text-paper/55">
            {dict.finalCta.body}
          </p>
          <LocaleLink
            href="/contact"
            className="group inline-flex w-fit items-center gap-3 border border-paper/35 px-6 py-4 text-[0.7rem] tracking-[0.22em] uppercase transition-colors hover:border-paper hover:bg-paper hover:text-deep"
          >
            {dict.finalCta.cta}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </LocaleLink>
        </Reveal>
      </div>
    </section>
  );
}
