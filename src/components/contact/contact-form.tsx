"use client";

import { useState, useTransition } from "react";
import { sendContact } from "@/lib/contact/actions";
import { useI18n } from "@/components/i18n/locale-provider";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstagramIcon } from "@/components/brand/instagram-icon";
import { StudioEmail } from "@/components/contact/studio-email";
import { studioInstagramUrl, studioWhatsAppUrl } from "@/lib/studio-contact";

const whatsappHref = `${studioWhatsAppUrl}?text=${encodeURIComponent(
  "Oi. Quero marcar uma conversa."
)}`;

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="size-4 shrink-0 fill-current"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

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
        <Reveal delay={200} className="mt-10 flex flex-col items-start gap-5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-12 w-fit items-center gap-3 bg-foam px-6 py-3.5 text-[0.7rem] tracking-[0.22em] text-deep uppercase transition-colors hover:bg-foam/90"
          >
            <WhatsAppIcon />
            {dict.contact.whatsapp}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <div className="flex flex-col items-start gap-2">
            <a
              href={studioInstagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-10 w-fit items-center gap-2.5 text-[0.7rem] tracking-[0.22em] text-ink/70 uppercase transition-colors hover:text-ink"
            >
              <InstagramIcon className="size-4" />
              {dict.contact.instagram}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <StudioEmail linkClassName="text-ink/70 hover:text-ink" />
          </div>
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
