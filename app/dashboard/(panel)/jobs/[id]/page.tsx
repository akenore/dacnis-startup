import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobEditor from "@/components/dashboard/JobEditor";
import { todayIso } from "@/lib/jobs";
import { requireAdmin } from "@/lib/server/auth";
import { getJob } from "@/lib/server/careers";

export const metadata: Metadata = { title: "Edit offer" };

export default async function EditJobPage({ params }: PageProps<"/dashboard/jobs/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();
  const now = new Date();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-black text-white">Edit: {job.content.en.title}</h1>
      <JobEditor job={job} today={todayIso(now)} inAMonth={todayIso(new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000))} />
    </div>
  );
}
