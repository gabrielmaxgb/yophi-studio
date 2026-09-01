"use client";

import { LocaleLink } from "@/components/i18n/locale-link";
import { useI18n } from "@/components/i18n/locale-provider";
import { Origin } from "@/components/home/origin";
import { Reveal } from "@/components/motion/reveal";

export function StudioView() {
  const { dict } = useI18n();

  return (
    <div className="bg-paper text-ink">
      <section className="mx-auto max-w-[1400px] px-5 pt-28 pb-20 md:px-10 md:pt-36 md:pb-28">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
            {dict.studio.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80} className="mt-6 max-w-4xl">
          <h1 className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95]">
            {dict.studio.headline}
          </h1>
        </Reveal>
        <Reveal delay={140} className="mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-ink/65">
            {dict.studio.intro}
          </p>
        </Reveal>
      </section>

      <section className="border-y border-line bg-[#dfddd7]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
          <Reveal>
            <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
              {dict.studio.how}
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
              {dict.studio.howHeadline}
            </h2>
          </Reveal>
          <Reveal
            delay={100}
            className="flex flex-col gap-6 text-base leading-relaxed text-ink/70"
          >
            <p>{dict.studio.p1}</p>
            <p>{dict.studio.p2}</p>
            <p>{dict.studio.p3}</p>
          </Reveal>
        </div>
      </section>

      <Origin />

      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
              {dict.studio.team}
            </p>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl">
              {dict.studio.teamHeadline}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal className="border-t border-line pt-8">
              <p className="font-serif text-3xl tracking-[0.06em] uppercase">
                {dict.studio.creative}
              </p>
              <p className="mt-3 text-[0.7rem] tracking-[0.18em] text-stone uppercase">
                {dict.studio.creativeTags}
              </p>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/65">
                {dict.studio.creativeCopy}
              </p>
            </Reveal>
            <Reveal delay={100} className="border-t border-line pt-8">
              <p className="font-serif text-3xl tracking-[0.06em] uppercase">
                {dict.studio.digital}
              </p>
              <p className="mt-3 text-[0.7rem] tracking-[0.18em] text-stone uppercase">
                {dict.studio.digitalTags}
              </p>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/65">
                {dict.studio.digitalCopy}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="mt-16">
            <LocaleLink
              href="/contact"
              className="group inline-flex min-h-12 w-fit items-center gap-3 bg-deep px-6 py-4 text-[0.7rem] tracking-[0.22em] text-paper uppercase transition-colors hover:bg-deep/90"
            >
              {dict.studio.workWithUs}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </LocaleLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
