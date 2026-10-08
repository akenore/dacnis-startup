export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

/** Used for x-default, for crawlers without Accept-Language, and for the old unprefixed URLs. */
export const defaultLocale: Locale = "en";

/** switchTo is written in the target language, as the switcher reads it aloud in that language. */
export const localeMeta: Record<Locale, { label: string; short: string; og: string; switchTo: string }> = {
  en: { label: "English", short: "EN", og: "en_US", switchTo: "View this page in English" },
  fr: { label: "Français", short: "FR", og: "fr_FR", switchTo: "Voir cette page en français" },
};

export function hasLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

// In the Maghreb, business French is more widely read than English.
const frenchLeaningArabicRegions = new Set(["tn", "dz", "ma"]);

/** Best supported locale for an Accept-Language header, e.g. "fr-TN,fr;q=0.9,en;q=0.8" -> "fr". */
export function negotiateLocale(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...rest] = part.trim().toLowerCase().split(";");
      const q = rest.find((p) => p.trim().startsWith("q="));
      return { tag, q: q ? Number.parseFloat(q.trim().slice(2)) : 1 };
    })
    .filter((r) => r.tag && !Number.isNaN(r.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const [language, region] = tag.split("-");
    if (hasLocale(language)) return language;
    if (language === "ar" && region && frenchLeaningArabicRegions.has(region)) return "fr";
  }
  return defaultLocale;
}
