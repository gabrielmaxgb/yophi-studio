"use client";

import { useState, useTransition } from "react";
import { sendContact } from "@/lib/contact/actions";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studioWhatsAppUrl } from "@/lib/studio-contact";

const whatsappHref = `${studioWhatsAppUrl}?text=${encodeURIComponent(
  "Oi. Quero marcar uma conversa."
)}`;

export function ContactForm() {
  const { dict } = useI18n();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    start(async () => {
      setError(null);
      const result = await sendContact({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        presence: String(fd.get("presence") ?? ""),
        trap: String(fd.get("company") ?? ""),
      });

      if (result.status === "sent") {
        setSent(true);
        return;
      }

      if (result.status === "mailto") {
        window.location.assign(result.href);
        return;
      }

      setError(result.message || dict.contact.sendError);
    });
  }

  return (
    <section className="relative mx-auto grid max-w-[1400px] gap-14 px-5 pt-28 pb-24 md:grid-cols-[1fr_1.05fr] md:gap-20 md:px-10 md:pt-36 md:pb-32">
      <div>
        {dict.contact.eyebrow ? (
          <Reveal>
            <p className="text-[0.65rem] tracking-[0.28em] text-ember/75 uppercase">
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
        <Reveal delay={200} className="mt-10">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-12 w-fit items-center gap-3 bg-foam px-6 py-3.5 text-[0.7rem] tracking-[0.22em] text-deep uppercase transition-colors hover:bg-foam/90"
          >
            {dict.contact.whatsapp}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
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
                  minLength={2}
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
                minLength={2}
                className="border-line bg-transparent"
              />
              <p className="text-[0.75rem] leading-relaxed text-ink/50">
                {dict.contact.presenceHint}
              </p>
            </div>

            <p className="sr-only" aria-hidden>
              <label htmlFor="company">
                Company
                <input
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </p>

            {error ? (
              <p className="text-sm text-ember">{error}</p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className="h-12 w-fit rounded-none bg-foam px-8 text-[0.7rem] tracking-[0.22em] text-deep uppercase hover:bg-foam/90"
            >
              {pending ? "Mandando…" : `${dict.contact.submit} →`}
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
