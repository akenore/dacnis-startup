import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, CalendarClock, CheckCircle2, Clock, Lock, MapPin } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ApplyForm from "@/components/forms/ApplyForm";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { formatDate, jobStatus } from "@/lib/jobs";
import { pageMetadata } from "@/lib/metadata";
import { href, jobRoute, pageKeyFromSlug } from "@/lib/routes";
import { breadcrumbSchema, graph, jobPostingSchema, webPageSchema } from "@/lib/schema";
import { findVisibleJob } from "@/lib/server/careers";
import { site } from "@/lib/site";

// Offers are added, edited and expire without a deploy: render on every request.
export const dynamic = "force-dynamic";
// Overrides the [lang] layout's `false`: offers are not known at build time.
export const dynamicParams = true;

/** Any locale's careers slug and job slug are accepted; the page then redirects to the canonical URL. */
async function resolve(lang: string, page: string, slug: string) {
  if (!hasLocale(lang) || pageKeyFromSlug(page) !== "careers") return null;
  const job = await findVisibleJob(decodeURIComponent(slug));
  return job ? { lang, job, closed: jobStatus(job) === "closed" } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[page]/[slug]">): Promise<Metadata> {
  const { lang, page, slug } = await params;
  const match = await resolve(lang, page, slug);
  if (!match) return {};
  const c = match.job.content[match.lang];
  const metadata = pageMetadata({ locale: match.lang, route: jobRoute(match.job), title: c.title, description: c.summary, card: "careers" });
  // A closed offer stays readable for people but leaves search results and Google for Jobs.
  return match.closed ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}

export default async function JobPage({ params }: PageProps<"/[lang]/[page]/[slug]">) {
  const { lang: rawLang, page, slug } = await params;
  const match = await resolve(rawLang, page, slug);
  if (!match) notFound();
  const { lang, job, closed } = match;
  const route = jobRoute(job);
  const canonical = href(lang, route);
  if (`/${rawLang}/${page}/${slug}` !== canonical) permanentRedirect(canonical);

  const dict = getDictionary(lang);
  const t = dict.careers;
  const c = job.content[lang];

  const lists = [
    { title: t.responsibilities, items: c.responsibilities },
    { title: t.requirements, items: c.requirements },
    { title: t.niceToHave, items: c.niceToHave },
    { title: t.offer, items: c.offer },
  ].filter((l) => l.items.length);

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      <JsonLd
        data={graph(
          webPageSchema(lang, "WebPage", { name: c.title, route, description: c.summary }),
          ...(closed ? [] : [jobPostingSchema(lang, dict, job)]),
          breadcrumbSchema(lang, dict, [
            { name: dict.nav.careers, route: "careers" },
            { name: c.title, route },
          ]),
        )}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="blob top-0 right-0 w-[700px] h-[700px] [--blob:rgba(16,185,129,0.1)]" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link href={href(lang, "careers")} className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold transition-colors">
            <ArrowLeft aria-hidden className="w-4 h-4" />
            {t.back}
          </Link>
        </nav>

        <header className="flex flex-col gap-5 mb-12">
          <div className="rise flex flex-wrap gap-2 text-xs font-semibold">
            {closed && <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">{t.closedBadge}</span>}
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{t.types[job.employmentType]}</span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">{t.workplaces[job.workplace]}</span>
          </div>
          <h1 className="rise text-3xl sm:text-5xl font-black text-white leading-tight" style={{ "--d": "80ms" } as React.CSSProperties}>
            {c.title}
          </h1>
          <ul className="rise flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400" style={{ "--d": "160ms" } as React.CSSProperties}>
            <li className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden className="w-4 h-4 text-emerald-400" />
              {t.location}
            </li>
            {c.duration && (
              <li className="inline-flex items-center gap-1.5">
                <Clock aria-hidden className="w-4 h-4 text-emerald-400" />
                {c.duration}
              </li>
            )}
            <li className="inline-flex items-center gap-1.5">
              <CalendarClock aria-hidden className="w-4 h-4 text-emerald-400" />
              <span>
                {t.posted} <time dateTime={job.datePosted}>{formatDate(lang, job.datePosted)}</time>
                {" · "}
                {t.deadline} <time dateTime={job.validThrough}>{formatDate(lang, job.validThrough)}</time>
              </span>
            </li>
          </ul>
        </header>

        {closed && (
          <div role="status" className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
            <p className="flex items-center gap-3 text-rose-200 font-semibold">
              <Lock aria-hidden className="w-5 h-5 shrink-0" />
              {t.closedNotice}
            </p>
            <Link href={href(lang, "careers")} className="shrink-0 text-sm font-semibold text-white underline underline-offset-4">
              {t.closedCta}
            </Link>
          </div>
        )}

        <GlassCard className={`p-8 md:p-12 mb-12 ${closed ? "opacity-70" : ""}`} hoverable={false}>
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">{t.summaryTitle}</h2>
            <p className="text-slate-300 leading-relaxed">{c.summary}</p>
          </section>
          <div className="flex flex-col gap-10">
            {lists.map((list) => (
              <section key={list.title}>
                <h2 className="text-xl font-bold text-white mb-4">{list.title}</h2>
                <ul className="flex flex-col gap-3">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                      <CheckCircle2 aria-hidden className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </GlassCard>

        {!closed && (
          <section id="apply" aria-labelledby="apply-title" className="scroll-mt-28">
            <GlassCard className="p-8 md:p-12" hoverable={false}>
              <h2 id="apply-title" className="text-2xl font-black text-white">
                {t.applyTitle}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mt-2 mb-8">{t.applyIntro}</p>
              <ApplyForm copy={t.form} locale={lang} jobId={job.id} position={c.title} whatsapp={site.whatsapp} />
            </GlassCard>
          </section>
        )}
      </div>
    </div>
  );
}
