import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CheckCircle2, Code2, Layers, Settings } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ServiceIcon from "@/components/ui/ServiceIcon";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href, serviceKeys } from "@/lib/routes";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { services } from "@/lib/services";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).servicesPage;
  return pageMetadata({ locale: lang, route: "services", title: t.metaTitle, description: t.metaDescription, card: "services" });
}

const workflowIcons = [Layers, Code2, Settings];

export default async function ServicesIndex({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const dict = getDictionary(lang);
  const t = dict.servicesPage;

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      <JsonLd
        data={graph(
          webPageSchema(lang, "CollectionPage", { name: t.metaTitle, route: "services", description: t.metaDescription }),
          breadcrumbSchema(lang, dict, [{ name: dict.nav.services, route: "services" }]),
          ...serviceKeys.map((key) => serviceSchema(lang, key)),
        )}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="blob top-1/4 left-0 w-[700px] h-[700px] [--blob:rgba(147,51,234,0.12)]" />
      <div className="blob bottom-1/4 right-0 w-[700px] h-[700px] [--blob:rgba(8,145,178,0.12)]" />

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

        <section className="flex flex-col gap-12 mb-28">
          {serviceKeys.map((key, idx) => {
            const service = services[key];
            const content = service.content[lang];
            const isEven = idx % 2 === 0;
            return (
              <article key={key} className="reveal" aria-labelledby={`service-${key}`}>
                <GlassCard className="p-8 md:p-12 hover:border-white/10" hoverable={false}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className={`lg:col-span-7 flex flex-col gap-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <span className={`inline-flex p-3 rounded-2xl w-fit bg-gradient-to-r ${service.theme} text-white shadow-md`}>
                        <ServiceIcon name={service.icon} className="w-6 h-6" />
                      </span>
                      <h2 id={`service-${key}`} className="text-2xl sm:text-3xl font-black text-white">
                        <Link href={href(lang, `service:${key}`)} className="hover:text-cyan-400 transition-colors">
                          {content.title}
                        </Link>
                      </h2>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{content.long}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {content.features.slice(0, 4).map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-slate-400 text-xs sm:text-sm">
                            <CheckCircle2 aria-hidden className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <Link
                          href={href(lang, `service:${key}`)}
                          className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-white transition-colors flex items-center gap-2"
                        >
                          {t.viewDetail}
                          <span className="sr-only">: {content.title}</span>
                          <ChevronRight aria-hidden className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`${href(lang, "hire")}?service=${key}`}
                          className="px-5 py-2.5 rounded-full bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/35 border border-cyan-500/30 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
                        >
                          {t.hireFor}
                        </Link>
                      </div>
                    </div>

                    <div className={`lg:col-span-5 flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">{t.stackLabel}</p>
                      <ul className="flex flex-wrap gap-2">
                        {service.techStack.map((tech) => (
                          <li key={tech} className="px-3 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-300 font-mono text-xs">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </article>
            );
          })}
        </section>

        <section aria-labelledby="workflow-title" className="mb-12">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <p className="text-xs uppercase tracking-widest font-bold text-purple-400">{t.workflowEyebrow}</p>
            <h2 id="workflow-title" className="text-3xl font-black text-white">
              {t.workflowTitle}
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.workflow.map((step, idx) => {
              const Icon = workflowIcons[idx];
              return (
                <li key={step.title} className="reveal" style={{ "--i": idx } as React.CSSProperties}>
                  <GlassCard className="h-full hover:border-white/20 p-8 flex flex-col gap-6">
                    <span className="inline-block p-4 rounded-2xl w-fit bg-purple-500/10 text-purple-400">
                      <Icon aria-hidden className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </GlassCard>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </div>
  );
}
