"use client";

import { InstagramIcon } from "@/components/brand/instagram-icon";
import { useI18n } from "@/components/i18n/locale-provider";
import { studioInstagramUrl } from "@/lib/studio-contact";

export function InstagramDock() {
  const { dict } = useI18n();

  return (
    <a
      href={studioInstagramUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={dict.contact.instagram}
      className="pointer-events-auto fixed right-5 bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] z-50 inline-flex size-12 items-center justify-center bg-foam text-deep transition-colors hover:bg-ember hover:text-foam focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:right-8 md:bottom-8 lg:right-10"
    >
      <InstagramIcon className="size-5" />
    </a>
  );
}
