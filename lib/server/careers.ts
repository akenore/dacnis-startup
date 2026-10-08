import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Locale } from "@/lib/i18n";
import { jobStatus, type Job, type StoredJob } from "@/lib/jobs";
import { seedJobs } from "@/lib/jobs-seed";
import { frenchSpacing } from "@/lib/typography";

/*
 * Careers store: one JSON file plus a folder of CVs, in DATA_DIR.
 * Traffic is low and the site runs as one Node process, so a file is enough: every write
 * goes through one queue and lands atomically (temp file + rename), and reads are cached
 * until the file changes. Point DATA_DIR outside the app folder in production so a
 * redeploy never erases offers or applications, and back that folder up.
 */

export interface Application {
  id: string;
  /** null for a spontaneous application. */
  jobId: string | null;
  position: string;
  name: string;
  email: string;
  phone: string;
  link: string;
  message: string;
  locale: Locale;
  cv: { file: string; name: string; size: number; type: string };
  createdAt: string;
  emailSent: boolean;
}

interface StoreData {
  version: 1;
  jobs: StoredJob[];
  applications: Application[];
}

// The data folder is chosen at runtime and lives outside the build: turbopackIgnore keeps the
// build from tracing (and shipping) the whole project because of this dynamic path.
export const dataDir = () =>
  path.resolve(/* turbopackIgnore: true */ process.env.DATA_DIR || path.join(/* turbopackIgnore: true */ process.cwd(), ".data"));
const storeFile = () => path.join(/* turbopackIgnore: true */ dataDir(), "careers.json");
const cvDir = () => path.join(/* turbopackIgnore: true */ dataDir(), "cv");
/** basename() keeps a stored file name from pointing outside the CV folder. */
const cvPath = (file: string) => path.join(/* turbopackIgnore: true */ cvDir(), path.basename(file));

/** Saves an uploaded CV under a random name and returns that name. */
export async function saveCv(extension: string, bytes: Buffer) {
  const file = `${randomUUID()}.${extension}`;
  await fs.mkdir(cvDir(), { recursive: true });
  await fs.writeFile(cvPath(file), bytes);
  return file;
}

export const readCv = (file: string) => fs.readFile(cvPath(file));

// Shared through globalThis: route handlers and pages can be bundled as separate modules.
const shared = globalThis as typeof globalThis & {
  __careersStore?: { queue: Promise<unknown>; cache: { mtimeMs: number; data: StoreData } | null; seeding?: Promise<void> };
};
const state = (shared.__careersStore ??= { queue: Promise.resolve(), cache: null });

function seed(): StoreData {
  const now = new Date().toISOString();
  return { version: 1, jobs: seedJobs.map((job) => ({ ...job, published: true, createdAt: now, updatedAt: now })), applications: [] };
}

async function persist(data: StoreData) {
  await fs.mkdir(dataDir(), { recursive: true });
  const tmp = `${storeFile()}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, storeFile());
  state.cache = null;
}

async function load(): Promise<StoreData> {
  try {
    const { mtimeMs } = await fs.stat(storeFile());
    if (state.cache?.mtimeMs === mtimeMs) return state.cache.data;
    const data = JSON.parse(await fs.readFile(storeFile(), "utf8")) as StoreData;
    state.cache = { mtimeMs, data };
    return data;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    // First start: create the store once, even when several requests arrive together.
    await (state.seeding ??= persist(seed()));
    return load();
  }
}

/** Runs one change on a copy of the store and saves it. Writes never overlap. */
function mutate<T>(change: (data: StoreData) => T): Promise<T> {
  const run = state.queue.then(async () => {
    const data = structuredClone(await load());
    const result = change(data);
    await persist(data);
    return result;
  });
  state.queue = run.catch(() => undefined);
  return run;
}

/** French text gets no-break spaces before ? ! : ; at read time, so editors type normal spaces. */
const display = (job: StoredJob): StoredJob => ({ ...job, content: { ...job.content, fr: frenchSpacing(job.content.fr) } });

/* ---------- Public site ---------- */

/** Published offers that have started, newest first, with their status. */
async function visibleJobs(now = new Date()) {
  const { jobs } = await load();
  return jobs
    .filter((job) => job.published && jobStatus(job, now) !== "scheduled")
    .sort((a, b) => b.datePosted.localeCompare(a.datePosted))
    .map(display);
}

export async function openJobs(now = new Date()) {
  return (await visibleJobs(now)).filter((job) => jobStatus(job, now) === "open");
}

/** Closed offers stay listed for six months, marked as closed, then drop off the page. */
export async function recentlyClosedJobs(now = new Date()) {
  const cutoff = new Date(now.getTime() - 183 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return (await visibleJobs(now)).filter((job) => jobStatus(job, now) === "closed" && job.validThrough >= cutoff);
}

/** A visible offer by its English or French slug (open or closed). */
export async function findVisibleJob(slug: string) {
  return (await visibleJobs()).find((job) => job.slug.en === slug || job.slug.fr === slug) ?? null;
}

/* ---------- Dashboard ---------- */

export async function allJobs() {
  const { jobs } = await load();
  return [...jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getJob(id: string) {
  return (await load()).jobs.find((job) => job.id === id) ?? null;
}

/** Slug taken by another offer in this locale. */
export async function slugTaken(locale: Locale, slug: string, exceptId?: string) {
  return (await load()).jobs.some((job) => job.id !== exceptId && job.slug[locale] === slug);
}

export function saveJob(input: Job & { published: boolean }) {
  return mutate((data) => {
    const now = new Date().toISOString();
    const index = data.jobs.findIndex((job) => job.id === input.id);
    if (index === -1) {
      data.jobs.push({ ...input, createdAt: now, updatedAt: now });
    } else {
      data.jobs[index] = { ...input, createdAt: data.jobs[index].createdAt, updatedAt: now };
    }
  });
}

export function updateJob(id: string, patch: Partial<Pick<StoredJob, "published" | "datePosted" | "validThrough">>) {
  return mutate((data) => {
    const job = data.jobs.find((j) => j.id === id);
    if (job) Object.assign(job, patch, { updatedAt: new Date().toISOString() });
  });
}

/** Deletes the offer. Its applications are kept, with the position title they were sent for. */
export function deleteJob(id: string) {
  return mutate((data) => {
    data.jobs = data.jobs.filter((job) => job.id !== id);
  });
}

export async function listApplications() {
  const { applications } = await load();
  return [...applications].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getApplication(id: string) {
  return (await load()).applications.find((a) => a.id === id) ?? null;
}

export function addApplication(application: Omit<Application, "id" | "createdAt">) {
  return mutate((data) => {
    const record: Application = { ...application, id: randomUUID(), createdAt: new Date().toISOString() };
    data.applications.push(record);
    return record;
  });
}

export function markApplicationEmailed(id: string) {
  return mutate((data) => {
    const record = data.applications.find((a) => a.id === id);
    if (record) record.emailSent = true;
  });
}

export async function deleteApplication(id: string) {
  const record = await getApplication(id);
  await mutate((data) => {
    data.applications = data.applications.filter((a) => a.id !== id);
  });
  if (record) await fs.rm(cvPath(record.cv.file), { force: true });
}

export const newId = () => randomUUID();
