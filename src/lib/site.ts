export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yophi.studio"
).replace(/\/$/, "");

export const siteName = "YOPHI";

/** Static share card — WhatsApp/iMessage need a real .png URL, not a route. */
export const defaultOgImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "YOPHI Studio",
} as const;
