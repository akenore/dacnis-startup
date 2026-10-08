import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/i18n";
import type { OgCard } from "@/lib/metadata";
import { renderOg } from "@/lib/og";
import { serviceKeys, type ServiceKey } from "@/lib/routes";
import { services } from "@/lib/services";

export const dynamicParams = false;

const pageCards = ["home", "about", "services", "careers", "hire"] as const;
const cards: OgCard[] = [...pageCards, ...serviceKeys];

/** Social cards for every locale, rendered once at build time. */
export function generateStaticParams() {
  return locales.flatMap((lang) => cards.map((card) => ({ lang, card })));
}

export async function GET(_request: Request, { params }: RouteContext<"/og/[lang]/[card]">) {
  const { lang, card } = await params;
  if (!hasLocale(lang) || !cards.includes(card as OgCard)) return new Response("Not found", { status: 404 });
  const dict = getDictionary(lang);
  const place = dict.careers.location;
  if ((serviceKeys as readonly string[]).includes(card)) {
    const content = services[card as ServiceKey].content[lang];
    return renderOg({ kicker: dict.og.services.kicker, title: content.title, place });
  }
  return renderOg({ ...dict.og[card as (typeof pageCards)[number]], place });
}
