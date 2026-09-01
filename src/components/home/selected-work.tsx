"use client";

import { LocaleLink } from "@/components/i18n/locale-link";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";

export function SelectedWork() {
  const { dict } = useI18n();

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
            {dict.selectedWork.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80} className="mt-5 max-w-3xl">
          <h2 className="font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[0.92]">
            {dict.selectedWork.headline}
          </h2>
        </Reveal>
        <Reveal delay={140} className="mt-5 max-w-md">
          <p className="text-base leading-relaxed text-ink/65">
            {dict.selectedWork.invite}
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-14 md:mt-16">
          <LocaleLink
            href="/work"
            className="group inline-flex flex-col items-start gap-8"
          >
            <span className="relative flex h-16 w-44 items-center justify-between" aria-hidden>
              <span className="size-16 rounded-full border border-line transition-colors group-hover:border-ink" />
              <span className="size-16 rounded-full border border-line transition-colors group-hover:border-ink" />
            </span>
            <span className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.22em] uppercase">
              {dict.selectedWork.all}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </LocaleLink>
        </Reveal>
      </div>
    </section>
  );
}
