function hostFromEnv(value: string | undefined) {
  if (!value) return null;
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const production = hostFromEnv(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  const deployment = hostFromEnv(process.env.VERCEL_URL);

  // Prefer a host that already answers. yophi.studio is not live yet —
  // WhatsApp would request og:image there and drop the thumbnail.
  const host =
    (production?.endsWith(".vercel.app") ? production : null) ??
    deployment ??
    production ??
    "yophi-studio.vercel.app";

  return `https://${host}`;
}

export const siteUrl = resolveSiteUrl();

export const siteName = "YOPHI";

/** Absolute URL so crawlers don't resolve against a domain that isn't live. */
export const defaultOgImage = {
  url: `${siteUrl}/og.png`,
  width: 1200,
  height: 630,
  alt: "YOPHI",
  type: "image/png",
} as const;
