import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (/^\/(pt|en)(\/|$)/.test(pathname)) {
    request.nextUrl.pathname = pathname.replace(/^\/(pt|en)/, "") || "/";
    return NextResponse.redirect(request.nextUrl);
  }

  // `/contact` starts with "conta". Match the portal path, not the prefix.
  const isProtected = pathname === "/conta" || pathname.startsWith("/conta/");

  if (isProtected) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/entrar";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
