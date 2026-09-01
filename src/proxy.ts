import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, localeCookie, locales } from "./lib/i18n";

function getLocale(request: NextRequest) {
  const cookie = request.cookies.get(localeCookie)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const entries = accept.split(",").map((part) => {
    const [tag, q] = part.trim().split(";q=");
    return { tag: tag ?? "", q: q ? Number(q) : 1 };
  });

  entries.sort((a, b) => b.q - a.q);

  for (const { tag } of entries) {
    if (tag.startsWith("pt")) return "pt";
    if (tag.startsWith("en")) return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
