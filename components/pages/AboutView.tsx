import Link from "next/link";
import { ArrowRight, Heart, Shield, Star } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import JsonLd from "@/components/seo/JsonLd";
import { PartnerCards } from "@/components/home/Brands";
import { brandUrl, partners } from "@/lib/brands";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";

const valueStyles = [
  { icon: Star, color: "text-cyan-400", bg: "rgba(6, 182, 212, 0.1)" },
  { icon: Shield, color: "text-emerald-400", bg: "rgba(16, 185, 129, 0.1)" },
  { icon: Heart, color: "text-purple-400", bg: "rgba(139, 92, 246, 0.1)" },
];

export default function AboutView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.about;
  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      <JsonLd
        data={graph(
          webPageSchema(locale, "AboutPage", {
            name: t.metaTitle,
            route: "about",
            description: t.metaDescription,
            mentions: partners.map((p) => ({ "@type": "Organization", name: p.name, url: brandUrl(p, locale) })),
          }),
          breadcrumbSchema(locale, dict, [{ name: dict.nav.about, route: "about" }]),
        )}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="blob top-1/4 -right-40 w-[600px] h-[600px] [--blob:rgba(147,51,234,0.12)]" />
      <div className="blob bottom-1/4 -left-40 w-[600px] h-[600px] [--blob:rgba(8,145,178,0.12)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <header className="text-center flex flex-col items-center gap-4 mb-20">
          <p className="rise text-xs uppercase tracking-widest font-black text-cyan-400">{t.eyebrow}</p>
          <h1 className="rise text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight" style={{ "--d": "80ms" } as React.CSSProperties}>
            {t.titleA} <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">{t.titleB}</span>
          </h1>
          <p className="rise text-slate-400 text-lg max-w-2xl leading-relaxed mt-2" style={{ "--d": "160ms" } as React.CSSProperties}>
            {t.intro}
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-28">
          {[
            { title: t.missionTitle, body: t.mission },
            { title: t.cultureTitle, body: t.culture },
          ].map((block, i) => (
            <div key={block.title} className="reveal" style={{ "--i": i } as React.CSSProperties}>
              <GlassCard className="p-8 h-full hover:border-white/10" hoverable={false}>
                <h2 className="text-2xl font-bold text-white mb-4">{block.title}</h2>
                <p className="text-slate-300 text-base leading-relaxed">{block.body}</p>
              </GlassCard>
            </div>
          ))}
        </section>

        <section aria-labelledby="journey-title" className="mb-28">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-purple-400">{t.journeyEyebrow}</p>
            <h2 id="journey-title" className="text-3xl font-black text-white">
              {t.journeyTitle}
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto py-8">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-800" />
            <div className="draw-line absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600" />

            <ol className="flex flex-col gap-16">
              {t.milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <li key={milestone.date} className={`reveal flex items-center relative pl-12 md:pl-0 ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 z-10" />
                    <div className={`w-full md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                      <GlassCard className="p-6">
                        <time className="inline-block text-xs font-bold font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 mb-3">
                          {milestone.date}
                        </time>
                        <h3 className="text-lg font-bold text-white mb-2">{milestone.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{milestone.description}</p>
                      </GlassCard>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section aria-labelledby="values-title" className="mb-28">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-emerald-400">{t.valuesEyebrow}</p>
            <h2 id="values-title" className="text-3xl font-black text-white">
              {t.valuesTitle}
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.map((val, idx) => {
              const { icon: Icon, color, bg } = valueStyles[idx];
              return (
                <li key={val.title} className="reveal" style={{ "--i": idx } as React.CSSProperties}>
                  <GlassCard className="h-full hover:border-white/20 p-8 flex flex-col gap-6">
                    <span className={`inline-block p-4 rounded-2xl w-fit ${color}`} style={{ backgroundColor: bg }}>
                      <Icon aria-hidden className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{val.description}</p>
                    </div>
                  </GlassCard>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="partners-title" className="mb-12">
          <div className="text-center flex flex-col items-center gap-3 mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-cyan-400">{t.partnersEyebrow}</p>
            <h2 id="partners-title" className="text-3xl font-black text-white">
              {t.partnersTitle}
            </h2>
            <p className="text-slate-400 text-base max-w-2xl leading-relaxed">{t.partnersIntro}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <PartnerCards locale={locale} visit={dict.ui.visitSite} newTab={dict.ui.newTab} />
          </div>
        </section>

        <section className="mt-20 text-center max-w-4xl mx-auto reveal">
          <GlassCard className="p-10 border-white/5 flex flex-col items-center gap-6" hoverable={false}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.ctaTitle}</h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">{t.ctaBody}</p>
            <Link
              href={href(locale, "hire")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold tracking-wide shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              {t.ctaButton}
              <ArrowRight aria-hidden className="w-4 h-4" />
            </Link>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
