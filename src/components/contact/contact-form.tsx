"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const { dict } = useI18n();
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="mx-auto grid max-w-[1400px] gap-16 px-5 pt-28 pb-24 md:grid-cols-[1fr_1.05fr] md:gap-20 md:px-10 md:pt-36 md:pb-32">
      <div>
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.28em] text-stone uppercase">
            {dict.contact.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80} className="mt-6">
          <h1 className="font-serif text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] text-balance">
            {dict.contact.headline}
          </h1>
        </Reveal>
        <Reveal delay={140} className="mt-8 max-w-md">
          <p className="text-base leading-relaxed text-ink/80">
            {dict.contact.intro}
          </p>
        </Reveal>
        <Reveal
          delay={200}
          className="mt-12 flex flex-col gap-2 text-sm text-stone"
        >
          <p className="tracking-[0.16em] uppercase">{dict.contact.email}</p>
          <p>{dict.contact.tag}</p>
        </Reveal>
      </div>

      <Reveal delay={120}>
        {sent ? (
          <div className="border border-line bg-[#dfddd7] p-10 md:p-14">
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
            className="flex flex-col gap-7 border border-line bg-[#f2f0eb] p-7 md:p-10"
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
                  required
                  className="border-line bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="company"
                className="text-[0.65rem] tracking-[0.18em] uppercase"
              >
                {dict.contact.company}
              </Label>
              <Input
                id="company"
                name="company"
                className="border-line bg-transparent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="message"
                className="text-[0.65rem] tracking-[0.18em] uppercase"
              >
                {dict.contact.message}
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                className="border-line min-h-36 bg-transparent"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-12 w-fit rounded-none bg-deep px-8 text-[0.7rem] tracking-[0.22em] uppercase hover:bg-deep/90"
            >
              {dict.contact.submit} →
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
