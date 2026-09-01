"use client";

import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal, StaggerReveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";

export function Philosophy() {
  const { dict } = useI18n();

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
            {dict.philosophy.eyebrow}
          </p>
        </Reveal>

        <SplitHeadline
          className="mt-8 max-w-4xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-balance"
        >
          {dict.philosophy.headline}
        </SplitHeadline>

        <StaggerReveal className="mt-14 grid gap-3 md:mt-20 md:max-w-xl md:gap-4">
          {dict.philosophy.lines.map((line) => (
            <p
              key={line}
              data-reveal-item
              className="font-serif text-[clamp(1.35rem,2.6vw,2rem)] text-ink/75"
            >
              {line}
            </p>
          ))}
        </StaggerReveal>

        <Reveal delay={120} className="mt-16 md:mt-24">
          <div className="flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
            <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
              {dict.philosophy.label}
            </p>
            <p className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] tracking-[0.06em] uppercase">
              {dict.philosophy.closing}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
