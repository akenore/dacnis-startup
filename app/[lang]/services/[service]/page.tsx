import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ServiceIcon from "@/components/ui/ServiceIcon";
import Faq from "@/components/ui/Faq";
import JsonLd from "@/components/seo/JsonLd";
import { fill, getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href, serviceKeys, serviceSlugs, type ServiceKey } from "@/lib/routes";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { services } from "@/lib/services";

export const dynamicParams = false;

/** Each locale only builds its own slugs: /fr/services/developpement-web, never /fr/services/web-development. */
export function generateStaticParams() {
  return locales.flatMap((lang) => serviceKeys.map((key) => ({ lang, service: serviceSlugs[key][lang] })));
}

function resolve(lang: string, slug: string) {
  if (!hasLocale(lang)) return null;
  const key = serviceKeys.find((k) => serviceSlugs[k][lang] === slug);
  return key ? { lang, key } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[service]">): Promise<Metadata> {
  const { lang, service } = await params;
  const match = resolve(lang, service);
  if (!match) return {};
  const content = services[match.key].content[match.lang];
  return pageMetadata({
    locale: match.lang,
    route: `service:${match.key}`,
    title: fill(getDictionary(match.lang).servicePage.metaTitle, { service: content.title }),
    description: content.short,
    card: match.key,
  });
}

export default async function ServiceDetails({ params }: PageProps<"/[lang]/services/[service]">) {
  const { lang: rawLang, service: slug } = await params;
  const match = resolve(rawLang, slug);
  if (!match) notFound();
  const { lang, key } = match;
  const dict = getDictionary(lang);
  const t = dict.servicePage;
  const service = services[key];
  const content = service.content[lang];
  const route = `service:${key}` as const;
  const related = serviceKeys.filter((k): k is ServiceKey => k !== key);

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      <JsonLd
        data={graph(
          webPageSchema(lang, "WebPage", { name: content.title, route, description: content.short }),
          serviceSchema(lang, key),
          breadcrumbSchema(lang, dict, [
            { name: dict.nav.services, route: "services" },
            { name: content.title, route },
          ]),
          faqSchema(lang, route, content.faqs),
        )}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div
        className="blob top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] opacity-20"
        style={{ "--blob": service.accent } as React.CSSProperties}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <nav aria-label="Breadcrumb" className="rise mb-10">
          <Link href={href(lang, "services")} className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold transition-colors">
            <ArrowLeft aria-hidden className="w-4 h-4" />
            {t.back}
          </Link>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className={`rise inline-flex p-3 rounded-2xl w-fit bg-gradient-to-r ${service.theme} text-white shadow-md`}>
              <ServiceIcon name={service.icon} className="w-6 h-6" />
            </span>
            <h1 className="rise text-4xl sm:text-5xl font-black text-white leading-tight" style={{ "--d": "80ms" } as React.CSSProperties}>
              {content.title}
            </h1>
            <p className="rise text-slate-300 text-lg leading-relaxed max-w-3xl" style={{ "--d": "160ms" } as React.CSSProperties}>
              {content.long}
            </p>
            <div className="rise flex gap-4 mt-2" style={{ "--d": "240ms" } as React.CSSProperties}>
              <Link
                href={`${href(lang, "hire")}?service=${key}`}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold tracking-wide shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform"
              >
                {t.hireFor}
                <ArrowRight aria-hidden className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <aside className="rise lg:col-span-4 flex flex-col gap-5 p-6 rounded-2xl bg-white/5 border border-white/5" style={{ "--d": "300ms" } as React.CSSProperties}>
            <h2 className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t.stackLabel}</h2>
            <ul className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <li key={tech} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-200 font-mono text-xs font-semibold">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="h-px bg-white/5 my-1" />
            <p className="text-slate-400 text-xs leading-relaxed">{fill(t.stackNote, { service: content.title })}</p>
          </aside>
        </section>

        <section aria-labelledby="capabilities-title" className="mb-28">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-cyan-400">{t.capabilitiesEyebrow}</p>
            <h2 id="capabilities-title" className="text-3xl font-black text-white">
              {t.capabilitiesTitle}
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.map((feat, index) => (
              <li key={feat} className="reveal" style={{ "--i": index % 3 } as React.CSSProperties}>
                <GlassCard className="h-full hover:border-white/20 p-6 flex flex-col gap-4">
                  <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 w-fit">
                    <CheckCircle aria-hidden className="w-5 h-5" />
                  </span>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-semibold">{feat}</p>
                </GlassCard>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="process-title" className="mb-28">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-purple-400">{t.processEyebrow}</p>
            <h2 id="process-title" className="text-3xl font-black text-white">
              {t.processTitle}
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {content.process.map((step, index) => (
              <li key={step.title} className="reveal" style={{ "--i": index % 5 } as React.CSSProperties}>
                <GlassCard className="h-full hover:border-white/10 p-6 flex flex-col gap-4 relative">
                  <span aria-hidden className="absolute top-4 right-4 text-xs font-bold font-mono text-slate-600">
                    0{index + 1}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">{step.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                </GlassCard>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-title" className="mb-12 max-w-4xl mx-auto">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-indigo-400">{t.faqEyebrow}</p>
            <h2 id="faq-title" className="text-3xl font-black text-white">
              {t.faqTitle}
            </h2>
          </div>
          <Faq items={content.faqs} />
        </section>

        <section aria-labelledby="related-title" className="mt-20 max-w-5xl mx-auto">
          <h2 id="related-title" className="text-center text-slate-400 text-xs uppercase tracking-widest font-bold mb-6">
            {t.relatedTitle}
          </h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {related.map((k) => (
              <li key={k}>
                <Link
                  href={href(lang, `service:${k}`)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-sm transition-colors"
                >
                  <ServiceIcon name={services[k].icon} className="w-4 h-4 text-cyan-400" />
                  {services[k].content[lang].title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 text-center max-w-4xl mx-auto reveal">
          <GlassCard className="p-10 border-white/5 flex flex-col items-center gap-6" glowColor="cyan" hoverable={false}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{fill(t.ctaTitle, { service: content.title })}</h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">{t.ctaBody}</p>
            <Link
              href={`${href(lang, "hire")}?service=${key}`}
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
