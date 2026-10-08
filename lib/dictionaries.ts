import { en, type Dictionary } from "@/dictionaries/en";
import { fr } from "@/dictionaries/fr";
import type { Locale } from "@/lib/i18n";
import { frenchSpacing } from "@/lib/typography";

const dictionaries: Record<Locale, Dictionary> = { en, fr: frenchSpacing(fr) };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Fill {placeholders} in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export type { Dictionary };
