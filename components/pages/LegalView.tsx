import Link from "next/link";
import { ArrowLeft, Scale, Shield } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import RichText from "@/components/ui/RichText";
import JsonLd from "@/components/seo/JsonLd";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";

export default function LegalView({ locale, dict, page }: { locale: Locale; dict: Dictionary; page: "privacy" | "terms" }) {
  const t = dict[page];
  const Icon = page === "privacy" ? Shield : Scale;

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      <JsonLd
        data={graph(
          webPageSchema(locale, "WebPage", { name: t.title, route: page, description: t.metaDescription }),
          breadcrumbSchema(locale, dict, [{ name: t.title, route: page }]),
        )}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="blob top-1/4 -right-40 w-[600px] h-[600px] [--blob:rgba(8,145,178,0.1)]" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <Link href={href(locale, "home")} className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-10 transition-colors">
          <ArrowLeft aria-hidden className="w-4 h-4" />
          {dict.ui.backHome}
        </Link>

        <header className="flex flex-col gap-4 mb-12">
          <p className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Icon aria-hidden className="w-4 h-4" />
            {t.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">{t.title}</h1>
          <p className="text-slate-500 text-sm">
            {dict.ui.lastUpdated}
            {locale === "fr" ? "\u00A0:" : ":"} {t.updated}
          </p>
        </header>

        <GlassCard className="p-8 md:p-12" hoverable={false}>
          <div className="flex flex-col gap-10">
            {t.sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    <RichText text={p} />
                  </p>
                ))}
                {section.items && (
                  <ul className="list-disc pl-6 flex flex-col gap-2 text-slate-300 text-sm sm:text-base leading-relaxed marker:text-cyan-400">
                    {section.items.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
