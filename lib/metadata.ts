import type { Metadata } from "next";
import { defaultLocale, localeMeta, locales, type Locale } from "@/lib/i18n";
import { href, type RouteKey, type ServiceKey } from "@/lib/routes";
import { site } from "@/lib/site";

export type OgCard = "home" | "about" | "services" | "careers" | "hire" | ServiceKey;

export const ogImagePath = (locale: Locale, card: OgCard) => `/og/${locale}/${card}`;

/** Canonical plus the full hreflang set: every locale, itself included, and x-default. */
export function alternatesFor(locale: Locale, route: RouteKey): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = href(l, route);
  languages["x-default"] = href(defaultLocale, route);
  return { canonical: href(locale, route), languages };
}

/**
 * Complete per-page metadata. Next.js replaces (not merges) openGraph and alternates from
 * parent layouts, so every page gets the full set here.
 */
export function pageMetadata({
  locale,
  route,
  title,
  description,
  card = "home",
  absoluteTitle = false,
  type = "website",
}: {
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
  card?: OgCard;
  absoluteTitle?: boolean;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const image = { url: ogImagePath(locale, card), width: 1200, height: 630, alt: fullTitle, type: "image/png" };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, route),
    openGraph: {
      type,
      siteName: site.name,
      locale: localeMeta[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].og),
      url: href(locale, route),
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
