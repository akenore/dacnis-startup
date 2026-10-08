import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import HireForm from "@/components/forms/HireForm";
import JsonLd from "@/components/seo/JsonLd";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { href, serviceKeys, serviceSlugs } from "@/lib/routes";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function HireView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hire;
  const details = [
    { icon: Mail, label: t.emailLabel, value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: t.phoneLabel, value: site.phone.display, href: site.phone.href },
    {
      icon: MapPin,
      label: t.addressLabel,
      value: `${locale === "fr" ? site.address.streetFr : site.address.street}, ${site.address.locality} ${site.address.postalCode}, ${locale === "fr" ? site.address.countryFr : site.address.country}`,
      href: site.mapsUrl,
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      <JsonLd
        data={graph(
          webPageSchema(locale, "ContactPage", { name: t.metaTitle, route: "hire", description: t.metaDescription }),
          breadcrumbSchema(locale, dict, [{ name: t.title, route: "hire" }]),
        )}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="blob top-1/4 -right-40 w-[600px] h-[600px] [--blob:rgba(147,51,234,0.12)]" />
      <div className="blob bottom-1/4 -left-40 w-[600px] h-[600px] [--blob:rgba(8,145,178,0.12)]" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <header className="text-center flex flex-col items-center gap-4 mb-16">
          <p className="rise text-xs uppercase tracking-widest font-black text-cyan-400">{t.eyebrow}</p>
          <h1 className="rise text-4xl sm:text-5xl font-black text-white leading-tight" style={{ "--d": "80ms" } as React.CSSProperties}>
            {t.title}
          </h1>
          <p className="rise text-slate-400 text-base max-w-xl leading-relaxed mt-2" style={{ "--d": "160ms" } as React.CSSProperties}>
            {t.intro}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <GlassCard className="p-8 hover:border-white/10" hoverable={false}>
              <h2 className="text-white font-bold text-lg mb-6">{t.directTitle}</h2>
              <address className="not-italic flex flex-col gap-5 text-sm">
                {details.map(({ icon: Icon, label, value, href: link }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-400/20">
                      <Icon aria-hidden className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-slate-400 text-xs font-semibold">{label}</p>
                      <a href={link} className="text-white font-bold hover:text-cyan-400 transition-colors leading-relaxed">
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
              </address>
            </GlassCard>
            <p className="text-slate-500 text-xs px-2">
              <Link href={href(locale, "privacy")} className="hover:text-slate-300 underline-offset-2 hover:underline">
                {t.note}
              </Link>
            </p>
          </div>

          <div className="lg:col-span-8">
            <GlassCard className="p-8 md:p-12 hover:border-white/10 relative" hoverable={false}>
              <HireForm
                copy={t.form}
                budgets={t.budgets}
                locale={locale}
                contact={{ email: site.email, phone: site.phone.display }}
                // Old links used the English slug (?service=web-development), new ones the key (?service=web).
                services={serviceKeys.map((key) => ({
                  key,
                  title: services[key].content[locale].title,
                  aliases: [key, serviceSlugs[key].en, serviceSlugs[key].fr],
                }))}
              />
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
