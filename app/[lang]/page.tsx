import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Briefcase, CheckCircle, Cpu, MapPin, Smartphone } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ServiceIcon from "@/components/ui/ServiceIcon";
import CountUp from "@/components/ui/CountUp";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/seo/JsonLd";
import { ClientLogos, PartnerCards } from "@/components/home/Brands";
import { clients, partners } from "@/lib/brands";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href, serviceKeys } from "@/lib/routes";
import { brandListSchema, faqSchema, fielmedinaSchema, graph, webPageSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { fielmedina } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({ locale: lang, route: "home", title: dict.meta.title, description: dict.meta.description, absoluteTitle: true });
}

const glowFor = (key: string) => (key === "security" ? "emerald" : key === "ai" ? "cyan" : "purple");
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = getDictionary(lang);
  const h = dict.home;
  const statColors = ["text-cyan-400", "text-purple-400", "text-pink-400", "text-emerald-400"];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      <JsonLd
        data={graph(
          webPageSchema(lang, "WebPage", { name: dict.meta.title, route: "home", description: dict.meta.description }),
          fielmedinaSchema(dict),
          brandListSchema(lang, "clients", h.clientsTitle, clients),
          brandListSchema(lang, "partners", h.partnersTitle, partners, h.partnersIntro),
          faqSchema(lang, "home", h.faqs),
        )}
      />

      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="blob top-0 left-1/4 w-[700px] h-[700px] -translate-x-1/2 [--blob:rgba(99,102,241,0.14)]" />
      <div className="blob top-1/4 right-0 w-[800px] h-[800px] [--blob:rgba(6,182,212,0.12)]" />
      <div className="blob bottom-1/4 left-1/3 w-[700px] h-[700px] [--blob:rgba(168,85,247,0.12)]" />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <p className="rise inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {h.badge}
            </p>

            <h1 className="rise text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]" style={delay(80)}>
              {h.titleA} <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">{h.titleB}</span>
            </h1>

            <p className="rise text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl" style={delay(160)}>
              {h.intro}
            </p>

            <div className="rise flex flex-wrap gap-4 mt-2" style={delay(240)}>
              <Link
                href={href(lang, "hire")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-[box-shadow,transform] duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                {h.ctaPrimary}
                <ArrowRight aria-hidden className="w-5 h-5" />
              </Link>
              <Link
                href={href(lang, "services")}
                className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold tracking-wide hover:bg-white/10 hover:border-white/20 transition-colors duration-300 flex items-center gap-2"
              >
                {h.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center h-[400px]" aria-hidden>
            <div className="blob w-[420px] h-[420px] [--blob:rgba(139,92,246,0.35)]" />

            <a
              href={fielmedina.url}
              target="_blank"
              rel="noopener"
              tabIndex={-1}
              className="rise float-a absolute z-20 left-4 top-10 w-60 p-5 rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl hover:border-purple-500/30 transition-colors block"
              style={delay(300)}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Smartphone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-wide">{h.featuredApp}</p>
                  <p className="text-white font-black text-sm">{fielmedina.name}</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">{h.fielmedinaCard}</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[95%] h-full bg-purple-500 rounded-full" />
              </div>
            </a>

            <div
              className="rise float-b absolute z-10 right-4 bottom-10 w-64 p-5 rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl"
              style={delay(420)}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-wide">{h.aiLabel}</p>
                  <p className="text-white font-black text-sm">{h.aiTitle}</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">{h.aiCard}</p>
              <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                <span>{h.aiModel}</span>
                <span>{h.aiStatus}</span>
              </div>
            </div>

            <div className="absolute w-[350px] h-[350px] border border-white/5 rounded-3xl rotate-12 scale-90 pointer-events-none" />
            <div className="absolute w-[350px] h-[350px] border border-white/5 rounded-3xl -rotate-12 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* IN BRIEF: short, quotable facts for readers and AI assistants */}
      <section aria-labelledby="brief-title" className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto pb-16">
        <div className="reveal rounded-3xl border border-white/5 bg-white/[0.03] p-8 md:p-10 grid gap-6 lg:grid-cols-12">
          <h2 id="brief-title" className="lg:col-span-3 text-xs uppercase tracking-widest font-black text-cyan-400">
            {h.summaryTitle}
          </h2>
          <div className="lg:col-span-9 flex flex-col gap-3 text-slate-300 text-base leading-relaxed">
            {h.summary.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section aria-labelledby="clients-title" className="py-16 border-y border-white/5 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">{h.clientsEyebrow}</p>
            <h2 id="clients-title" className="text-slate-200 text-xl sm:text-2xl font-bold">
              {h.clientsTitle}
            </h2>
          </div>
          <ClientLogos locale={lang} newTab={dict.ui.newTab} />
        </div>
      </section>

      {/* SERVICES */}
      <section aria-labelledby="services-title" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <p className="text-xs uppercase tracking-widest font-black text-cyan-400">{h.servicesEyebrow}</p>
          <h2 id="services-title" className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            {h.servicesTitle}
          </h2>
          <p className="text-slate-400 text-base max-w-2xl">{h.servicesIntro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceKeys.map((key, i) => {
            const service = services[key];
            const content = service.content[lang];
            return (
              <Link key={key} href={href(lang, `service:${key}`)} className="reveal block" style={stagger(i % 3)}>
                <GlassCard className="h-full group hover:border-white/20" glowColor={glowFor(key)}>
                  <div className="flex flex-col gap-6 justify-between h-full">
                    <div>
                      <span className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${service.theme} text-white mb-6 shadow-md`}>
                        <ServiceIcon name={service.icon} className="w-6 h-6" />
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{content.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">{content.short}</p>
                    </div>
                    <span className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      {dict.ui.learnMore}
                      <ArrowRight aria-hidden className="w-4 h-4" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PARTNERS */}
      <section aria-labelledby="partners-title" className="pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest font-black text-purple-400">{h.partnersEyebrow}</p>
            <h2 id="partners-title" className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {h.partnersTitle}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">{h.partnersIntro}</p>
          </div>
          <div className="lg:col-span-8">
            <PartnerCards locale={lang} visit={dict.ui.visitSite} newTab={dict.ui.newTab} />
          </div>
        </div>
      </section>

      {/* FIELMEDINA SPOTLIGHT */}
      <section aria-labelledby="fielmedina-title" className="py-20 px-6 md:px-12 bg-slate-900/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative flex justify-center" aria-hidden>
            <div className="reveal w-[280px] h-[520px] rounded-[40px] border-4 border-slate-700 bg-slate-950 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-700 rounded-b-xl mx-auto w-32 z-30" />
              <div className="absolute inset-0 bg-slate-900 flex flex-col justify-between p-6 pt-10">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">FielMedina</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="h-44 rounded-2xl bg-slate-800 border border-white/5 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-6 left-12 w-2 h-16 bg-slate-700/60 rotate-45" />
                    <div className="absolute top-10 left-6 w-2 h-20 bg-slate-700/60 -rotate-45" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <span className="relative z-10 p-3 rounded-full bg-purple-500/20 text-purple-400 ring-4 ring-purple-500/10">
                      <MapPin className="w-6 h-6 motion-safe:animate-bounce" />
                    </span>
                  </div>
                  <p className="text-white text-base font-bold">{h.screenTitle}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{h.screenBody}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-slate-400 text-center font-mono">{h.developedBy}</span>
                  <span className="h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xs font-bold">{h.getApp}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Award aria-hidden className="w-4 h-4" />
              {h.fielmedinaEyebrow}
            </p>
            <h2 id="fielmedina-title" className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {h.fielmedinaTitleA} <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">{h.fielmedinaTitleB}</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{h.fielmedinaBody}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {h.fielmedinaPoints.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <CheckCircle aria-hidden className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">
                    <strong className="text-white">{point.title}:</strong> {point.body}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={fielmedina.url}
              target="_blank"
              rel="noopener"
              className="w-fit px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-colors flex items-center gap-2"
            >
              {h.getApp}: fielmedina.com
              <ArrowRight aria-hidden className="w-4 h-4" />
              <span className="sr-only">({dict.ui.newTab})</span>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section aria-label={h.summaryTitle} className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {h.stats.map((stat, i) => (
            <div key={stat.label} className="reveal text-center flex flex-col-reverse gap-2 p-6 rounded-2xl bg-white/5 border border-white/5" style={stagger(i)}>
              <dt className="text-xs uppercase font-semibold text-slate-500 tracking-wider">{stat.label}</dt>
              <dd>
                <CountUp value={stat.value} suffix={stat.suffix} className={`text-3xl sm:text-4xl md:text-5xl font-black ${statColors[i]}`} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="pb-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 w-full">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <p className="text-xs uppercase tracking-widest font-bold text-indigo-400">{h.faqEyebrow}</p>
          <h2 id="faq-title" className="text-3xl font-black text-white">
            {h.faqTitle}
          </h2>
        </div>
        <Faq items={h.faqs} />
      </section>

      {/* CAREERS TEASER */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto relative z-10 w-full">
        <div className="reveal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Briefcase aria-hidden className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">{h.careersTitle}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mt-1 max-w-xl">{h.careersBody}</p>
            </div>
          </div>
          <Link
            href={href(lang, "careers")}
            className="shrink-0 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-sm font-semibold transition-colors flex items-center gap-2"
          >
            {h.careersLink}
            <ArrowRight aria-hidden className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 px-6 md:px-12 relative z-10 max-w-5xl mx-auto text-center w-full">
        <div className="reveal">
          <GlassCard className="relative overflow-hidden glow-cyan border-white/10 p-12 md:p-16 flex flex-col items-center gap-8" hoverable={false}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl">
              {h.ctaTitleA} <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">{h.ctaTitleB}</span>
            </h2>
            <p className="text-slate-300 text-base max-w-lg leading-relaxed">{h.ctaBody}</p>
            <Link
              href={href(lang, "hire")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2"
            >
              {h.ctaButton}
              <ArrowRight aria-hidden className="w-5 h-5" />
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
