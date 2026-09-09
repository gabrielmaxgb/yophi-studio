"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const { dict } = useI18n();
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="mx-auto grid max-w-[1400px] gap-14 px-5 pt-28 pb-24 md:grid-cols-[1fr_1.05fr] md:gap-20 md:px-10 md:pt-36 md:pb-32">
      <div>
        {dict.contact.eyebrow ? (
          <Reveal>
            <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
              {dict.contact.eyebrow}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={80} className={dict.contact.eyebrow ? "mt-6" : undefined}>
          <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[0.95] text-balance">
            {dict.contact.headline}
          </h1>
        </Reveal>
        <Reveal delay={140} className="mt-6 max-w-sm">
          <p className="text-base leading-relaxed text-ink/70">
            {dict.contact.intro}
          </p>
        </Reveal>
        <Reveal
          delay={200}
          className="mt-10 flex flex-col gap-2 text-sm text-stone"
        >
          <a
            href={`mailto:${dict.contact.email}`}
            className="w-fit tracking-[0.16em] uppercase transition-colors hover:text-ink"
          >
            {dict.contact.email}
          </a>
          <p>{dict.contact.tag}</p>
        </Reveal>
      </div>

      <Reveal delay={120}>
        {sent ? (
          <div className="border border-line bg-mist p-10 md:p-14">
            <p className="font-serif text-3xl leading-snug md:text-4xl">
              {dict.contact.successTitle}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/65">
              {dict.contact.successBody}
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-7 border border-line bg-card p-7 md:p-10"
          >
            <div className="grid gap-7 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="text-[0.65rem] tracking-[0.18em] uppercase"
                >
                  {dict.contact.name}
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className="border-line bg-transparent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-[0.65rem] tracking-[0.18em] uppercase"
                >
                  {dict.contact.emailLabel}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="border-line bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="presence"
                className="text-[0.65rem] tracking-[0.18em] uppercase"
              >
                {dict.contact.presence}
              </Label>
              <Input
                id="presence"
                name="presence"
                autoComplete="url"
                required
                className="border-line bg-transparent"
              />
              <p className="text-[0.75rem] leading-relaxed text-ink/50">
                {dict.contact.presenceHint}
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-12 w-fit rounded-none bg-foam px-8 text-[0.7rem] tracking-[0.22em] text-deep uppercase hover:bg-foam/90"
            >
              {dict.contact.submit} →
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
