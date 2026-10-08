"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveJobAction } from "@/app/dashboard/actions";
import { ghostButton, input, label, primaryButton } from "@/components/dashboard/ui";
import { employmentTypes, workplaces, type StoredJob } from "@/lib/jobs";

const typeLabels = { INTERN: "Internship", FULL_TIME: "Full-time", PART_TIME: "Part-time", CONTRACTOR: "Contract / freelance" };
const workplaceLabels = { onsite: "On site", hybrid: "Hybrid", remote: "Remote" };

const listFields = [
  { key: "responsibilities", en: "What you will do", hint: "One item per line" },
  { key: "requirements", en: "What we are looking for", hint: "One item per line" },
  { key: "niceToHave", en: "Nice to have", hint: "Optional, one item per line" },
  { key: "offer", en: "What we offer", hint: "One item per line" },
] as const;

/** Create or edit an offer. After a failed save the form keeps what was typed. */
export default function JobEditor({ job, today, inAMonth }: { job?: StoredJob; today: string; inAMonth: string }) {
  const [state, action, pending] = useActionState(saveJobAction, undefined);

  // Typed values win after a failed save; otherwise the saved offer; otherwise defaults.
  const value = (name: string, fallback = "") => state?.values?.[name] ?? fallback;
  const text = (locale: "en" | "fr", key: string) => {
    const content = job?.content[locale] as unknown as Record<string, string | string[] | undefined> | undefined;
    const saved = content?.[key];
    return value(`${locale}.${key}`, Array.isArray(saved) ? saved.join("\n") : (saved ?? ""));
  };
  const published = state?.values ? state.values.published === "on" : (job?.published ?? true);

  return (
    <form action={action} key={JSON.stringify(state?.values ?? {})} className="flex flex-col gap-8">
      {job && <input type="hidden" name="id" value={job.id} />}

      <section className="glass-panel rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="employmentType" className={label}>
            Contract type
          </label>
          <select id="employmentType" name="employmentType" defaultValue={value("employmentType", job?.employmentType ?? "INTERN")} className={input}>
            {employmentTypes.map((t) => (
              <option key={t} value={t}>
                {typeLabels[t]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="workplace" className={label}>
            Workplace
          </label>
          <select id="workplace" name="workplace" defaultValue={value("workplace", job?.workplace ?? "hybrid")} className={input}>
            {workplaces.map((w) => (
              <option key={w} value={w}>
                {workplaceLabels[w]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="datePosted" className={label}>
            Publish from
          </label>
          <input id="datePosted" name="datePosted" type="date" required defaultValue={value("datePosted", job?.datePosted ?? today)} className={`${input} [color-scheme:dark]`} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="validThrough" className={label}>
            Last day to apply
          </label>
          <input id="validThrough" name="validThrough" type="date" required defaultValue={value("validThrough", job?.validThrough ?? inAMonth)} className={`${input} [color-scheme:dark]`} />
        </div>
        <label className="md:col-span-2 lg:col-span-4 flex items-center gap-3 text-sm text-slate-300">
          <input type="checkbox" name="published" defaultChecked={published} className="w-4 h-4 accent-cyan-500" />
          Published (uncheck to keep it as a draft, visible only here)
        </label>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(["en", "fr"] as const).map((locale) => (
          <section key={locale} lang={locale} className="glass-panel rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-white">{locale === "en" ? "English" : "Français"}</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${locale}.title`} className={label}>
                Title *
              </label>
              <input id={`${locale}.title`} name={`${locale}.title`} required defaultValue={text(locale, "title")} className={input} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${locale}.slug`} className={label}>
                URL slug <span className="text-slate-500 font-normal">(optional, made from the title)</span>
              </label>
              <input
                id={`${locale}.slug`}
                name={`${locale}.slug`}
                defaultValue={value(`${locale}.slug`, job?.slug[locale] ?? "")}
                placeholder={locale === "en" ? "web-developer-intern" : "stage-developpeur-web"}
                className={`${input} font-mono`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${locale}.summary`} className={label}>
                Summary *
              </label>
              <textarea id={`${locale}.summary`} name={`${locale}.summary`} required rows={3} defaultValue={text(locale, "summary")} className={`${input} resize-y`} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${locale}.duration`} className={label}>
                Duration <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                id={`${locale}.duration`}
                name={`${locale}.duration`}
                defaultValue={text(locale, "duration")}
                placeholder={locale === "en" ? "4 to 6 months, end-of-studies project (PFE)" : "4 à 6 mois, projet de fin d'études (PFE)"}
                className={input}
              />
            </div>
            {listFields.map((f) => (
              <div key={f.key} className="flex flex-col gap-2">
                <label htmlFor={`${locale}.${f.key}`} className={label}>
                  {f.en} <span className="text-slate-500 font-normal">({f.hint})</span>
                </label>
                <textarea id={`${locale}.${f.key}`} name={`${locale}.${f.key}`} rows={4} defaultValue={text(locale, f.key)} className={`${input} resize-y`} />
              </div>
            ))}
          </section>
        ))}
      </div>

      {state?.error && (
        <p role="alert" className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          {state.error}
        </p>
      )}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? "Saving..." : job ? "Save changes" : "Create offer"}
        </button>
        <Link href="/dashboard" className={ghostButton}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
