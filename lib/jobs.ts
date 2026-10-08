import type { Locale } from "@/lib/i18n";

/*
 * Job offers. They live in the careers store (lib/server/careers.ts) and are managed from
 * /dashboard: no code change or redeploy is needed to post, edit or close an offer.
 * This file only holds the shared types and pure helpers.
 */

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "INTERN" | "CONTRACTOR";
export type Workplace = "onsite" | "hybrid" | "remote";

export const employmentTypes: EmploymentType[] = ["INTERN", "FULL_TIME", "PART_TIME", "CONTRACTOR"];
export const workplaces: Workplace[] = ["onsite", "hybrid", "remote"];

export interface JobContent {
  title: string;
  summary: string;
  /** Shown next to the type, e.g. "4 to 6 months, end-of-studies project (PFE)". */
  duration?: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  offer: string[];
}

export interface Job {
  id: string;
  slug: Record<Locale, string>;
  employmentType: EmploymentType;
  workplace: Workplace;
  /** First day the offer is shown (YYYY-MM-DD). A future date schedules it. */
  datePosted: string;
  /** Last day applications are accepted (YYYY-MM-DD, Tunis time). */
  validThrough: string;
  content: Record<Locale, JobContent>;
}

export interface StoredJob extends Job {
  /** Unpublished offers are drafts: only visible in the dashboard. */
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = "draft" | "scheduled" | "open" | "closed";

/** Offers end at 23:59:59 Tunis time (UTC+1, no daylight saving) on their last day. */
const endOfDay = (iso: string) => new Date(`${iso}T23:59:59+01:00`);
const startOfDay = (iso: string) => new Date(`${iso}T00:00:00+01:00`);

export function jobStatus(job: StoredJob, now = new Date()): JobStatus {
  if (!job.published) return "draft";
  if (startOfDay(job.datePosted) > now) return "scheduled";
  return endOfDay(job.validThrough) >= now ? "open" : "closed";
}

/** Today in Tunis as YYYY-MM-DD. */
export function todayIso(now = new Date()) {
  return new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 10);
}

/** "31 January 2027" / "31 janvier 2027". Noon avoids any timezone shifting the day. */
export const formatDate = (locale: Locale, iso: string) =>
  new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { dateStyle: "long", timeZone: "Africa/Tunis" }).format(
    new Date(`${iso}T12:00:00Z`),
  );

/** "Stagiaire Développeur Web" -> "stagiaire-developpeur-web". */
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
