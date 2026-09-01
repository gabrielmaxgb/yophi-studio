export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeCookie = "NEXT_LOCALE";

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(pt|en)(?=\/|$)/, "");
  return stripped || "/";
}

export function persistLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}
