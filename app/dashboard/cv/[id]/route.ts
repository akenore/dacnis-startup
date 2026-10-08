import { promises as fs } from "node:fs";
import path from "node:path";
import { isSignedIn } from "@/lib/server/auth";
import { cvDir, getApplication } from "@/lib/server/careers";

// The type comes from the extension, never from what the candidate's browser reported.
const types: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/** CV download, for the signed-in admin only. */
export async function GET(_request: Request, { params }: RouteContext<"/dashboard/cv/[id]">) {
  if (!(await isSignedIn())) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const application = await getApplication(id);
  if (!application) return new Response("Not found", { status: 404 });
  try {
    const file = await fs.readFile(path.join(cvDir(), path.basename(application.cv.file)));
    const filename = encodeURIComponent(application.cv.name);
    return new Response(file, {
      headers: {
        "Content-Type": types[path.extname(application.cv.file).slice(1)] ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename*=UTF-8''${filename}`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("CV file missing", { status: 404 });
  }
}
