import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { brandUrl, clients, partners } from "@/lib/brands";
import type { Locale } from "@/lib/i18n";

/** Client logos. Each tile links to the client's live site. */
export function ClientLogos({ locale, newTab }: { locale: Locale; newTab: string }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {clients.map((client, i) => (
        <li key={client.name} className="reveal" style={{ "--i": i % 3 } as React.CSSProperties}>
          <a
            href={brandUrl(client, locale)}
            target="_blank"
            rel="noopener"
            aria-label={`${client.name} (${newTab})`}
            className="group flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08]"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={client.width}
              height={client.height}
              sizes="160px"
              className="max-h-14 w-auto max-w-full object-contain opacity-75 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Partners get a card with what they do: the relationship is explained, not just shown. */
export function PartnerCards({ locale, visit, newTab }: { locale: Locale; visit: string; newTab: string }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {partners.map((partner, i) => {
        const url = brandUrl(partner, locale);
        return (
          <li key={partner.name} className="reveal" style={{ "--i": i } as React.CSSProperties}>
            <a
              href={url}
              target="_blank"
              rel="noopener"
              className="glass-panel glass-panel-hover group flex h-full flex-col gap-6 rounded-3xl p-8 hover:border-cyan-500/30"
            >
              <div className="flex h-16 items-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  sizes="260px"
                  className="max-h-14 w-auto object-contain"
                />
              </div>
              {partner.activity && <p className="text-slate-300 text-sm leading-relaxed first-letter:uppercase">{partner.activity[locale]}</p>}
              <span className="mt-auto inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                {visit} {new URL(url).hostname.replace(/^www\./, "")}
                <ArrowUpRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">({newTab})</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
