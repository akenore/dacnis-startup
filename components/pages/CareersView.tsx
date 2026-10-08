import Link from "next/link";
import { ArrowRight, Briefcase, CalendarClock, GraduationCap, MapPin, Rocket, Users } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ApplyForm from "@/components/forms/ApplyForm";
import JsonLd from "@/components/seo/JsonLd";
import { fill, type Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { formatDate, type StoredJob } from "@/lib/jobs";
import { href, jobRoute } from "@/lib/routes";
import { absoluteUrl, breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { openJobs, recentlyClosedJobs } from "@/lib/server/careers";
import { site } from "@/lib/site";

const whyIcons = [Rocket, Users, GraduationCap];

function JobCard({ job, locale, t, closed }: { job: StoredJob; locale: Locale; t: Dictionary["careers"]; closed: boolean }) {
  const c = job.content[locale];
  return (
    <Link
      href={href(locale, jobRoute(job))}
      className={`glass-panel glass-panel-hover group flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl p-7 ${
        closed ? "opacity-60 hover:opacity-90" : "hover:border-emerald-500/30"
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {closed ? (
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">{t.closedBadge}</span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{t.types[job.employmentType]}</span>
          )}
          <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">{t.workplaces[job.workplace]}</span>
        </div>
        <h3 className={`text-xl font-bold text-white transition-colors ${closed ? "" : "group-hover:text-emerald-300"}`}>{c.title}</h3>
        {!closed && <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{c.summary}</p>}
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden className="w-3.5 h-3.5 text-emerald-400" />
            {t.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock aria-hidden className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {t.deadline} <time dateTime={job.validThrough}>{formatDate(locale, job.validThrough)}</time>
            </span>
          </span>
        </p>
      </div>
      {!closed && (
        <span className="shrink-0 inline-flex items-center gap-2 text-emerald-300 text-sm font-semibold">
          {t.viewOffer}
          <ArrowRight aria-hidden className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </Link>
  );
}

export default async function CareersView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.careers;
  const [jobs, closedJobs] = await Promise.all([openJobs(), recentlyClosedJobs()]);

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      <JsonLd
        data={graph(
          webPageSchema(locale, "CollectionPage", { name: t.metaTitle, route: "careers", description: t.metaDescription }),
          breadcrumbSchema(locale, dict, [{ name: dict.nav.careers, route: "careers" }]),
          {
            "@type": "ItemList",
            name: t.openingsTitle,
            itemListElement: jobs.map((job, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: job.content[locale].title,
              url: absoluteUrl(href(locale, jobRoute(job))),
            })),
          },
        )}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="blob top-1/4 -right-40 w-[600px] h-[600px] [--blob:rgba(16,185,129,0.1)]" />
      <div className="blob bottom-1/3 -left-40 w-[600px] h-[600px] [--blob:rgba(8,145,178,0.12)]" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <header className="text-center flex flex-col items-center gap-4 mb-20">
          <p className="rise text-xs uppercase tracking-widest font-black text-emerald-400">{t.eyebrow}</p>
          <h1 className="rise text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight max-w-4xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            {t.title}
          </h1>
          <p className="rise text-slate-400 text-lg max-w-2xl leading-relaxed mt-2" style={{ "--d": "160ms" } as React.CSSProperties}>
            {t.intro}
          </p>
        </header>

        <section aria-labelledby="why-title" className="mb-24">
          <h2 id="why-title" className="sr-only">
            {t.whyTitle}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.why.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <li key={item.title} className="reveal" style={{ "--i": i } as React.CSSProperties}>
                  <GlassCard className="h-full p-7 flex flex-col gap-4" hoverable={false}>
                    <span className="p-3 rounded-2xl w-fit bg-emerald-500/10 text-emerald-400">
                      <Icon aria-hidden className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.body}</p>
                  </GlassCard>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="openings-title" className="mb-24 scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 id="openings-title" className="text-3xl font-black text-white">
              {t.openingsTitle}
            </h2>
            <div className="flex items-center gap-5 text-sm">
              {jobs.length > 0 && <p className="text-slate-400">{fill(t.openingsCount, { count: jobs.length })}</p>}
              <a href="#spontaneous" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                {t.spontaneousButton}
              </a>
            </div>
          </div>

          {jobs.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-slate-300">{t.empty}</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {jobs.map((job) => (
                <li key={job.id} className="reveal">
                  <JobCard job={job} locale={locale} t={t} closed={false} />
                </li>
              ))}
            </ul>
          )}

          {closedJobs.length > 0 && (
            <div className="mt-14">
              <h3 className="text-lg font-bold text-slate-300 mb-5">{t.closedTitle}</h3>
              <ul className="flex flex-col gap-4">
                {closedJobs.map((job) => (
                  <li key={job.id}>
                    <JobCard job={job} locale={locale} t={t} closed />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section id="spontaneous" aria-labelledby="spontaneous-title" className="scroll-mt-28">
          <GlassCard className="p-8 md:p-12" hoverable={false}>
            <div className="flex items-start gap-4 mb-8">
              <span className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                <Briefcase aria-hidden className="w-6 h-6" />
              </span>
              <div>
                <h2 id="spontaneous-title" className="text-2xl font-black text-white">
                  {t.spontaneousTitle}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mt-2 max-w-2xl">{t.spontaneousBody}</p>
              </div>
            </div>
            <ApplyForm copy={t.form} locale={locale} jobId={null} position={t.form.spontaneous} whatsapp={site.whatsapp} />
          </GlassCard>
          <p className="text-slate-500 text-sm text-center mt-6">
            {t.hrNote}{" "}
            <a href={`mailto:${site.hrEmail}`} className="text-cyan-400 hover:text-cyan-300">
              {site.hrEmail}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
