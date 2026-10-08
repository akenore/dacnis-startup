import { locales, type Locale } from "@/lib/i18n";

/*
 * Every public URL, per locale. French pages use French slugs (better relevance and
 * click-through on French results). Canonical, hreflang, sitemap and internal links all
 * come from href(), so they can never disagree.
 */

export const serviceKeys = ["web", "mobile", "ai", "security", "seo", "marketing"] as const;
export type ServiceKey = (typeof serviceKeys)[number];

export const pageKeys = ["about", "hire", "careers", "privacy", "terms"] as const;
export type PageKey = (typeof pageKeys)[number];

/** Job routes carry both slugs ("job:<en-slug>/<fr-slug>") so links need no data lookup. */
export type RouteKey = "home" | "services" | PageKey | `service:${ServiceKey}` | `job:${string}`;

export const jobRoute = (job: { slug: Record<Locale, string> }): RouteKey => `job:${job.slug.en}/${job.slug.fr}`;

export const serviceSlugs: Record<ServiceKey, Record<Locale, string>> = {
  web: { en: "web-development", fr: "developpement-web" },
  mobile: { en: "mobile-development", fr: "developpement-mobile" },
  ai: { en: "ai", fr: "intelligence-artificielle" },
  security: { en: "cyber-security", fr: "cybersecurite" },
  seo: { en: "seo", fr: "referencement-seo" },
  marketing: { en: "digital-marketing", fr: "marketing-digital" },
};

export const pageSlugs: Record<PageKey, Record<Locale, string>> = {
  about: { en: "about", fr: "a-propos" },
  hire: { en: "hire-us", fr: "demarrer-un-projet" },
  careers: { en: "careers", fr: "carrieres" },
  privacy: { en: "privacy-policy", fr: "politique-de-confidentialite" },
  terms: { en: "terms-of-service", fr: "conditions-utilisation" },
};

export function href(locale: Locale, key: RouteKey): string {
  if (key === "home") return `/${locale}`;
  if (key === "services") return `/${locale}/services`;
  if (key.startsWith("service:")) {
    const service = key.slice("service:".length) as ServiceKey;
    return `/${locale}/services/${serviceSlugs[service][locale]}`;
  }
  if (key.startsWith("job:")) {
    const [en, fr] = key.slice("job:".length).split("/");
    return `/${locale}/${pageSlugs.careers[locale]}/${locale === "fr" ? fr : en}`;
  }
  return `/${locale}/${pageSlugs[key as PageKey][locale]}`;
}

export const serviceHref = (locale: Locale, service: ServiceKey) => href(locale, `service:${service}`);

const matchesAnyLocale = (slugs: Record<Locale, string>, value: string) => locales.some((l) => slugs[l] === value);

export function pageKeyFromSlug(slug: string): PageKey | null {
  return pageKeys.find((key) => matchesAnyLocale(pageSlugs[key], slug)) ?? null;
}

export function serviceKeyFromSlug(slug: string): ServiceKey | null {
  return serviceKeys.find((key) => matchesAnyLocale(serviceSlugs[key], slug)) ?? null;
}

/**
 * Map path segments after the locale (in any locale's slugs) back to a route key.
 * Job pages are not resolved here (offers live in the store): the job page itself
 * accepts either slug and redirects to the right one.
 */
export function resolveRoute(segments: string[]): RouteKey | null {
  const [first, second, ...rest] = segments;
  if (rest.length) return null;
  if (!first) return "home";
  if (first === "services") {
    if (!second) return "services";
    const service = serviceKeyFromSlug(second);
    return service ? `service:${service}` : null;
  }
  if (second) return null;
  return pageKeyFromSlug(first);
}

/** Equivalent URL of the current page in another locale (for the language switcher). */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const [, first, slug] = segments;
  if (slug && pageKeyFromSlug(first) === "careers") return `/${target}/${pageSlugs.careers[target]}/${slug}`;
  const key = resolveRoute(segments.slice(1));
  return href(target, key ?? "home");
}
