import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!/^\/(pt|en)(\/|$)/.test(pathname)) return;

  request.nextUrl.pathname = pathname.replace(/^\/(pt|en)/, "") || "/";
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
