"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { localizedPath } from "@/lib/i18n";
import { useI18n } from "@/components/i18n/locale-provider";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useI18n();
  return <Link href={localizedPath(locale, href)} {...props} />;
}
