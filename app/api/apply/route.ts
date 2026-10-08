import { NextResponse } from "next/server";
import { emailLayout, escapeHtml, isEmail, sendEmail, text } from "@/lib/email";
import { hasLocale } from "@/lib/i18n";
import { jobStatus } from "@/lib/jobs";
import { addApplication, getJob, markApplicationEmailed, saveCv } from "@/lib/server/careers";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { alertNewApplication } from "@/lib/server/whatsapp";
import { site } from "@/lib/site";

/** Keep in sync with components/forms/ApplyForm.tsx. */
const MAX_CV_BYTES = 4 * 1024 * 1024;
const CV_EXTENSIONS = /\.(pdf|doc|docx)$/i;

/**
 * Job application: checks the offer is still open, saves the application and its CV in the
 * careers store (visible in /dashboard/applications), emails it to HR with the CV attached,
 * then sends the optional WhatsApp alert. Once saved, a failed email or alert is only logged.
 */
export async function POST(request: Request) {
  if (!rateLimit(`apply:${clientIp(request.headers)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many applications." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled: answer like a success so bots learn nothing.
  if (text(form.get("website"))) return NextResponse.json({ success: true });

  const name = text(form.get("name"), 120);
  const email = text(form.get("email"), 254);
  const cv = form.get("cv");
  if (!name || !isEmail(email) || !(cv instanceof File) || cv.size === 0) {
    return NextResponse.json({ error: "Name, a valid email and a CV are required." }, { status: 400 });
  }
  if (!CV_EXTENSIONS.test(cv.name) || cv.size > MAX_CV_BYTES) {
    return NextResponse.json({ error: "The CV must be a PDF or Word file under 4 MB." }, { status: 400 });
  }

  const rawLocale = text(form.get("locale"), 5);
  const locale = hasLocale(rawLocale) ? rawLocale : "en";

  // An offer must exist, be published and still open: closed offers accept no application.
  const jobId = text(form.get("jobId"), 64) || null;
  let position = locale === "fr" ? "Candidature spontanée" : "Spontaneous application";
  if (jobId) {
    const job = await getJob(jobId);
    if (!job || jobStatus(job) !== "open") return NextResponse.json({ error: "This offer is closed." }, { status: 410 });
    position = job.content[locale].title;
  }

  const extension = cv.name.split(".").pop()?.toLowerCase() ?? "pdf";
  const bytes = Buffer.from(await cv.arrayBuffer());
  const file = await saveCv(extension, bytes);

  const phone = text(form.get("phone"), 40);
  const link = text(form.get("link"), 300);
  const message = text(form.get("message"), 5000);
  const application = await addApplication({
    jobId,
    position,
    name,
    email,
    phone,
    link,
    message,
    locale,
    cv: { file, name: cv.name.slice(0, 200), size: cv.size, type: cv.type || "application/octet-stream" },
    emailSent: false,
  });

  const safeLink = /^https?:\/\//i.test(link) ? `<a href="${escapeHtml(link)}" style="color:#0891b2;">${escapeHtml(link)}</a>` : escapeHtml(link);
  const html = emailLayout(
    `Job application: ${position}`,
    [
      ["Position", escapeHtml(position)],
      ["Name", escapeHtml(name)],
      ["Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0891b2;">${escapeHtml(email)}</a>`],
      ["Phone", escapeHtml(phone)],
      ["Profile", safeLink],
      ["Language", escapeHtml(locale)],
      ["Dashboard", `<a href="${site.url}/dashboard/applications" style="color:#0891b2;">${site.url}/dashboard/applications</a>`],
    ],
    { title: "Message", text: message || "-" },
  );
  const filename = `CV - ${name.replace(/[^\p{L}\p{N} .-]/gu, "").slice(0, 60)}.${extension}`;

  const emailed = await sendEmail({
    to: site.hrEmail,
    subject: `Job application: ${position} - ${name}`,
    html,
    replyTo: email,
    attachments: [{ filename, content: bytes.toString("base64") }],
  });
  if (emailed) await markApplicationEmailed(application.id);

  await alertNewApplication({ name, position, email, phone });
  return NextResponse.json({ success: true });
}
