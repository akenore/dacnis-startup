import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { brandUrl, partners } from "@/lib/brands";
import { fill, type Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { href, serviceKeys } from "@/lib/routes";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const companyLinks = [
    { name: dict.nav.about, href: href(locale, "about") },
    { name: dict.nav.services, href: href(locale, "services") },
    { name: dict.nav.careers, href: href(locale, "careers") },
    { name: dict.nav.ctaMobile, href: href(locale, "hire") },
  ];
  const externalList = (items: typeof partners) => (
    <ul className="flex flex-col gap-3">
      {items.map((brand) => (
        <li key={brand.name}>
          <a
            href={brandUrl(brand, locale)}
            target="_blank"
            rel="noopener"
            className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group"
          >
            {brand.name}
            <ExternalLink aria-hidden className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* One row on desktop: brand, then Company, Services and Partners side by side. */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-8 gap-y-10 mb-12">
          {/* NAP block: identical to the JSON-LD organization and llms.txt */}
          <div className="col-span-2 md:col-span-3 lg:col-span-5 flex flex-col gap-6">
            <Link href={href(locale, "home")} aria-label="Dacnis">
              <Image src="/images/logo-light.png" alt="Dacnis" width={480} height={301} sizes="90px" className="h-14 w-auto" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{t.blurb}</p>
            <address className="not-italic flex flex-col gap-3 text-slate-300 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Mail aria-hidden className="w-4 h-4 text-cyan-400" />
                {site.email}
              </a>
              <a href={site.phone.href} className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Phone aria-hidden className="w-4 h-4 text-cyan-400" />
                {site.phone.display}
              </a>
              <a href={site.mapsUrl} target="_blank" rel="noopener" className="flex items-start gap-3 hover:text-cyan-400 transition-colors">
                <MapPin aria-hidden className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  {locale === "fr" ? site.address.streetFr : site.address.street}
                  <br />
                  {site.address.locality} {site.address.postalCode}, {locale === "fr" ? site.address.countryFr : site.address.country}
                </span>
              </a>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{t.company}</h2>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{t.services}</h2>
            <ul className="flex flex-col gap-3">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <Link href={href(locale, `service:${key}`)} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {services[key].content[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{t.partners}</h2>
            {externalList(partners)}
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">{fill(t.rights, { year: new Date().getFullYear() })}</p>
          <div className="flex gap-6 text-slate-500 text-xs">
            <Link href={href(locale, "privacy")} className="hover:text-slate-300 transition-colors">
              {t.privacy}
            </Link>
            <Link href={href(locale, "terms")} className="hover:text-slate-300 transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
