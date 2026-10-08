import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, negotiateLocale } from "@/lib/i18n";
import { href, resolveRoute } from "@/lib/routes";

/*
 * - "/" picks a language from Accept-Language (temporary redirect, varies by header).
 * - The previous unprefixed URLs (/about, /services/seo, /hire-us...) redirect permanently to
 *   the English page, so the links and rankings they earned move to one stable URL.
 * - A slug from the other language (/fr/about) redirects to this language's slug (/fr/a-propos).
 */
/** Redirect target on this origin, keeping the query string (e.g. ?service=seo). */
function to(path: string, request: NextRequest) {
  const url = new URL(path, request.url);
  url.search = request.nextUrl.search;
  return url;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  if (hasLocale(first)) {
    const key = resolveRoute(rest);
    if (!key) return;
    const target = href(first, key);
    if (target === pathname) return;
    return NextResponse.redirect(to(target, request), 308);
  }

  if (segments.length === 0) {
    const locale = negotiateLocale(request.headers.get("accept-language"));
    const response = NextResponse.redirect(to(`/${locale}`, request), 307);
    response.headers.set("Vary", "Accept-Language");
    return response;
  }

  const legacy = resolveRoute(segments);
  if (legacy) return NextResponse.redirect(to(href(defaultLocale, legacy), request), 308);
}

export const config = {
  // Skip Next internals, the form APIs, generated images and every file with an extension
  // (icons, sitemap.xml, robots.txt, llms.txt...).
  matcher: ["/((?!_next|api/|og/|.*\\..*).*)"],
};
