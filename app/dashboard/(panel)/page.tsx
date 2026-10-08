import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { closeJobAction, deleteJobAction, togglePublishAction } from "@/app/dashboard/actions";
import ConfirmButton from "@/components/dashboard/ConfirmButton";
import { dangerButton, ghostButton, primaryButton } from "@/components/dashboard/ui";
import { formatDate, jobStatus, type JobStatus } from "@/lib/jobs";
import { href, jobRoute } from "@/lib/routes";
import { requireAdmin } from "@/lib/server/auth";
import { allJobs, listApplications } from "@/lib/server/careers";

export const metadata: Metadata = { title: "Job offers" };

const statusStyle: Record<JobStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  scheduled: { label: "Scheduled", className: "bg-sky-500/10 text-sky-300 border-sky-500/30" },
  closed: { label: "Closed", className: "bg-rose-500/10 text-rose-300 border-rose-500/30" },
  draft: { label: "Draft", className: "bg-slate-500/10 text-slate-300 border-slate-500/30" },
};

export default async function JobsDashboard({ searchParams }: PageProps<"/dashboard">) {
  await requireAdmin();
  const [jobs, applications, { saved }] = await Promise.all([allJobs(), listApplications(), searchParams]);
  const countFor = (id: string) => applications.filter((a) => a.jobId === id).length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Job offers</h1>
          <p className="text-slate-400 text-sm mt-1">
            Open offers appear on the careers page, in Google for Jobs and in llms.txt. They close automatically after their closing date.
          </p>
        </div>
        <Link href="/dashboard/jobs/new" className={primaryButton}>
          <Plus aria-hidden className="w-4 h-4" /> New offer
        </Link>
      </div>

      {saved && (
        <p role="status" className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
          Offer saved. It is live on the site right away.
        </p>
      )}

      {jobs.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-slate-300">No offers yet. Create the first one.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {jobs.map((job) => {
            const status = jobStatus(job);
            const count = countFor(job.id);
            return (
              <li key={job.id} className="glass-panel rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex flex-col gap-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className={`px-2.5 py-0.5 rounded-full border ${statusStyle[status].className}`}>{statusStyle[status].label}</span>
                    <span className="text-slate-500">
                      {formatDate("en", job.datePosted)} → {formatDate("en", job.validThrough)}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white truncate">{job.content.en.title}</h2>
                  <p className="text-slate-500 text-sm truncate">{job.content.fr.title}</p>
                  <Link href={`/dashboard/applications?job=${job.id}`} className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold w-fit">
                    {count} application{count === 1 ? "" : "s"}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <Link href={`/dashboard/jobs/${job.id}`} className={ghostButton}>
                    <Pencil aria-hidden className="w-3.5 h-3.5" /> Edit
                  </Link>
                  {(status === "open" || status === "closed") && (
                    <a href={href("en", jobRoute(job))} target="_blank" rel="noopener" className={ghostButton}>
                      <ExternalLink aria-hidden className="w-3.5 h-3.5" /> View
                    </a>
                  )}
                  <form action={togglePublishAction}>
                    <input type="hidden" name="id" value={job.id} />
                    <button type="submit" className={ghostButton}>
                      {job.published ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  {status === "open" && (
                    <form action={closeJobAction}>
                      <input type="hidden" name="id" value={job.id} />
                      <ConfirmButton
                        tone="warning"
                        title="Close this offer?"
                        message={`"${job.content.en.title}" stops accepting applications right away and moves to "Recently closed" on the careers page. You can reopen it later by editing its last day to apply.`}
                        confirmLabel="Close offer"
                        className={ghostButton}
                      >
                        Close now
                      </ConfirmButton>
                    </form>
                  )}
                  <form action={deleteJobAction}>
                    <input type="hidden" name="id" value={job.id} />
                    <ConfirmButton
                      title="Delete this offer?"
                      message={`"${job.content.en.title}" is removed from the site for good. ${
                        count === 0 ? "It has no applications." : `Its ${count} application${count === 1 ? "" : "s"} and CVs stay in Applications.`
                      }`}
                      confirmLabel="Delete offer"
                      className={dangerButton}
                    >
                      Delete
                    </ConfirmButton>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
