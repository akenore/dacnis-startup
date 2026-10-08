import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutView from "@/components/pages/AboutView";
import CareersView from "@/components/pages/CareersView";
import HireView from "@/components/pages/HireView";
import LegalView from "@/components/pages/LegalView";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/i18n";
import { pageMetadata, type OgCard } from "@/lib/metadata";
import { pageKeys, pageSlugs, type PageKey } from "@/lib/routes";

// Careers is not prebuilt: it renders on its first request, then is regenerated at most every
// 60 seconds (so an offer that just expired disappears quickly). Dashboard changes refresh it at once.
export const dynamicParams = true;
export const revalidate = 60;

/**
 * Each locale only builds its own slugs: /fr/a-propos exists, /fr/about redirects in proxy.ts.
 * Careers is left out: it lists offers from the careers store, so it renders on every request
 * (unknown slugs still 404 in resolve()).
 */
export function generateStaticParams() {
  return locales.flatMap((lang) => pageKeys.filter((key) => key !== "careers").map((key) => ({ lang, page: pageSlugs[key][lang] })));
}

function resolve(lang: string, slug: string) {
  if (!hasLocale(lang)) return null;
  const key = pageKeys.find((k) => pageSlugs[k][lang] === slug);
  return key ? { lang, key } : null;
}

const cards: Partial<Record<PageKey, OgCard>> = { about: "about", hire: "hire", careers: "careers" };

export async function generateMetadata({ params }: PageProps<"/[lang]/[page]">): Promise<Metadata> {
  const { lang, page } = await params;
  const match = resolve(lang, page);
  if (!match) return {};
  const t = getDictionary(match.lang)[match.key];
  return pageMetadata({
    locale: match.lang,
    route: match.key,
    title: t.metaTitle,
    description: t.metaDescription,
    card: cards[match.key] ?? "home",
  });
}

export default async function Page({ params }: PageProps<"/[lang]/[page]">) {
  const { lang, page } = await params;
  const match = resolve(lang, page);
  if (!match) notFound();
  const dict = getDictionary(match.lang);

  switch (match.key) {
    case "about":
      return <AboutView locale={match.lang} dict={dict} />;
    case "hire":
      return <HireView locale={match.lang} dict={dict} />;
    case "careers":
      return <CareersView locale={match.lang} dict={dict} />;
    case "privacy":
    case "terms":
      return <LegalView locale={match.lang} dict={dict} page={match.key} />;
  }
}
