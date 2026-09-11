"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { studioEmail } from "@/lib/studio-contact";

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="9" y="9" width="13" height="13" rx="1.5" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type StudioEmailProps = {
  className?: string;
  linkClassName?: string;
  align?: "start" | "end";
};

export function StudioEmail({
  className,
  linkClassName,
  align = "start",
}: StudioEmailProps) {
  const { dict } = useI18n();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(studioEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5",
        align === "end" && "justify-end",
        className
      )}
    >
      <a
        href={`mailto:${studioEmail}`}
        className={cn(
          "py-1 text-sm tracking-normal text-ink/85 transition-colors hover:text-ink",
          linkClassName
        )}
      >
        {studioEmail}
      </a>
      <button
        type="button"
        onClick={copyEmail}
        aria-label={copied ? dict.contact.emailCopied : dict.contact.copyEmail}
        title={copied ? dict.contact.emailCopied : dict.contact.copyEmail}
        className="inline-flex size-7 shrink-0 items-center justify-center text-ink/55 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {copied ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </button>
    </div>
  );
}
