"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { employmentTypes, slugify, todayIso, workplaces, type EmploymentType, type JobContent, type Workplace } from "@/lib/jobs";
import { locales, type Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { checkCredentials, endSession, requireAdmin, startSession } from "@/lib/server/auth";
import { deleteApplication, deleteJob, getJob, newId, saveJob, slugTaken, updateJob } from "@/lib/server/careers";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

export type FormState = { error?: string; values?: Record<string, string> } | undefined;

const field = (data: FormData, name: string) => String(data.get(name) ?? "").trim();
/** One item per line; leading "-", "*" or "•" bullets are removed. */
const lines = (data: FormData, name: string) =>
  field(data, name)
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);
const echo = (data: FormData) =>
  Object.fromEntries([...data.entries()].filter(([k, v]) => typeof v === "string" && !k.startsWith("$")).map(([k, v]) => [k, String(v)]));
/** Refreshes the dashboard and the public careers lists (regenerated pages, see app/[lang]/[page]). */
function refresh() {
  revalidatePath("/dashboard", "layout");
  for (const locale of locales) revalidatePath(href(locale, "careers"));
}

const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

/* ---------- Session ---------- */

export async function login(_prev: FormState, data: FormData): Promise<FormState> {
  const ip = clientIp(await headers());
  if (!rateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return { error: "Too many attempts. Wait 15 minutes and try again." };
  }
  if (!checkCredentials(field(data, "email"), String(data.get("password") ?? ""))) {
    return { error: "Wrong email or password.", values: { email: field(data, "email") } };
  }
  await startSession();
  redirect("/dashboard");
}

export async function logout() {
  await endSession();
  redirect("/dashboard/login");
}

/* ---------- Job offers ---------- */

export async function saveJobAction(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin();
  const values = echo(data);
  const fail = (error: string) => ({ error, values });

  const id = field(data, "id") || newId();
  const content = {} as Record<Locale, JobContent>;
  const slug = {} as Record<Locale, string>;
  for (const locale of ["en", "fr"] as const) {
    const label = locale === "en" ? "English" : "French";
    const title = field(data, `${locale}.title`);
    const summary = field(data, `${locale}.summary`);
    if (!title) return fail(`The ${label} title is required.`);
    if (!summary) return fail(`The ${label} summary is required.`);
    content[locale] = {
      title,
      summary,
      duration: field(data, `${locale}.duration`) || undefined,
      responsibilities: lines(data, `${locale}.responsibilities`),
      requirements: lines(data, `${locale}.requirements`),
      niceToHave: lines(data, `${locale}.niceToHave`),
      offer: lines(data, `${locale}.offer`),
    };
    slug[locale] = slugify(field(data, `${locale}.slug`) || title);
    if (!slug[locale]) return fail(`The ${label} URL slug is empty.`);
    if (await slugTaken(locale, slug[locale], id)) return fail(`Another offer already uses the ${label} URL "${slug[locale]}".`);
  }
  if (slug.en === slug.fr && content.en.title !== content.fr.title) slug.fr = `${slug.fr}-fr`;

  const datePosted = field(data, "datePosted");
  const validThrough = field(data, "validThrough");
  if (!isDate(datePosted) || !isDate(validThrough)) return fail("Both dates are required.");
  if (validThrough < datePosted) return fail("The closing date must be on or after the publishing date.");

  const employmentType = field(data, "employmentType") as EmploymentType;
  const workplace = field(data, "workplace") as Workplace;
  if (!employmentTypes.includes(employmentType) || !workplaces.includes(workplace)) return fail("Choose a contract type and a workplace.");

  await saveJob({
    id,
    slug,
    employmentType,
    workplace,
    datePosted,
    validThrough,
    content,
    published: data.get("published") === "on",
  });
  refresh();
  redirect("/dashboard?saved=1");
}

/** Closes applications now: the closing date becomes yesterday. */
export async function closeJobAction(data: FormData) {
  await requireAdmin();
  const job = await getJob(field(data, "id"));
  if (!job) return;
  const yesterday = todayIso(new Date(Date.now() - 24 * 60 * 60 * 1000));
  await updateJob(job.id, { validThrough: yesterday, datePosted: job.datePosted > yesterday ? yesterday : job.datePosted });
  refresh();
  redirect("/dashboard");
}

export async function togglePublishAction(data: FormData) {
  await requireAdmin();
  const job = await getJob(field(data, "id"));
  if (job) await updateJob(job.id, { published: !job.published });
  refresh();
  redirect("/dashboard");
}

export async function deleteJobAction(data: FormData) {
  await requireAdmin();
  await deleteJob(field(data, "id"));
  refresh();
  redirect("/dashboard");
}

/* ---------- Applications ---------- */

export async function deleteApplicationAction(data: FormData) {
  await requireAdmin();
  await deleteApplication(field(data, "id"));
  refresh();
}
