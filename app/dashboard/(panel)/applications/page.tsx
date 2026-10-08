import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";
import { deleteApplicationAction } from "@/app/dashboard/actions";
import ConfirmButton from "@/components/dashboard/ConfirmButton";
import { dangerButton, ghostButton } from "@/components/dashboard/ui";
import { requireAdmin } from "@/lib/server/auth";
import { allJobs, listApplications } from "@/lib/server/careers";

export const metadata: Metadata = { title: "Applications" };

const dateTime = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Tunis" });
const waNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 8 ? `216${digits}` : digits;
};

export default async function ApplicationsPage({ searchParams }: PageProps<"/dashboard/applications">) {
  await requireAdmin();
  const [{ job: jobFilter }, all, jobs] = await Promise.all([searchParams, listApplications(), allJobs()]);
  const filter = typeof jobFilter === "string" ? jobFilter : "";
  const applications = filter === "spontaneous" ? all.filter((a) => !a.jobId) : filter ? all.filter((a) => a.jobId === filter) : all;

  const tabs = [
    { id: "", label: `All (${all.length})` },
    ...jobs.map((j) => ({ id: j.id, label: `${j.content.en.title} (${all.filter((a) => a.jobId === j.id).length})` })),
    { id: "spontaneous", label: `Spontaneous (${all.filter((a) => !a.jobId).length})` },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black text-white">Applications</h1>
        <p className="text-slate-400 text-sm mt-1">Each application is also emailed to hr@dacnis.tn with the CV attached.</p>
      </div>

      <nav aria-label="Filter by offer" className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id || "all"}
            href={tab.id ? `/dashboard/applications?job=${tab.id}` : "/dashboard/applications"}
            aria-current={filter === tab.id ? "page" : undefined}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${
              filter === tab.id ? "border-cyan-400 bg-cyan-500/10 text-cyan-300" : "border-white/10 text-slate-300 hover:bg-white/5"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {applications.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-slate-300">No applications yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {applications.map((a) => (
            <li key={a.id} className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500">
                    {dateTime.format(new Date(a.createdAt))} · {a.locale.toUpperCase()}
                    {!a.emailSent && <span className="ml-2 text-amber-300">email not delivered</span>}
                  </p>
                  <h2 className="text-lg font-bold text-white">{a.name}</h2>
                  <p className="text-sm text-cyan-300">{a.position}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`/dashboard/cv/${a.id}`} className={ghostButton}>
                    <Download aria-hidden className="w-3.5 h-3.5" /> CV
                  </a>
                  <a href={`mailto:${a.email}`} className={ghostButton}>
                    <Mail aria-hidden className="w-3.5 h-3.5" /> {a.email}
                  </a>
                  {a.phone && (
                    <>
                      <a href={`tel:${a.phone.replace(/\s/g, "")}`} className={ghostButton}>
                        <Phone aria-hidden className="w-3.5 h-3.5" /> {a.phone}
                      </a>
                      <a href={`https://wa.me/${waNumber(a.phone)}`} target="_blank" rel="noopener" className={ghostButton}>
                        <MessageCircle aria-hidden className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </>
                  )}
                  {/^https?:\/\//i.test(a.link) && (
                    <a href={a.link} target="_blank" rel="noopener noreferrer" className={ghostButton}>
                      <ExternalLink aria-hidden className="w-3.5 h-3.5" /> Profile
                    </a>
                  )}
                </div>
              </div>
              {a.message && <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line border-l-2 border-white/10 pl-4">{a.message}</p>}
              <form action={deleteApplicationAction} className="self-end">
                <input type="hidden" name="id" value={a.id} />
                <ConfirmButton
                  title="Delete this application?"
                  message={`${a.name}'s application and CV are deleted permanently. This cannot be undone.`}
                  confirmLabel="Delete application"
                  className={dangerButton}
                >
                  Delete
                </ConfirmButton>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
