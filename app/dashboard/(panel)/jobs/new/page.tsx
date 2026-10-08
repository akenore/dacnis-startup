import type { Metadata } from "next";
import JobEditor from "@/components/dashboard/JobEditor";
import { todayIso } from "@/lib/jobs";
import { requireAdmin } from "@/lib/server/auth";

export const metadata: Metadata = { title: "New offer" };

export default async function NewJobPage() {
  await requireAdmin();
  const now = new Date();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-black text-white">New job offer</h1>
      <JobEditor today={todayIso(now)} inAMonth={todayIso(new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000))} />
    </div>
  );
}
