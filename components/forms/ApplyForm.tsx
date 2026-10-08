"use client";

import { useRef, useState } from "react";
import { CheckCircle, FileText, MessageCircle, Send } from "lucide-react";

export interface ApplyFormCopy {
  name: string;
  email: string;
  phone: string;
  link: string;
  position: string;
  spontaneous: string;
  message: string;
  messagePlaceholder: string;
  cv: string;
  cvHint: string;
  optional: string;
  submit: string;
  submitting: string;
  required: string;
  fileType: string;
  fileSize: string;
  error: string;
  closed: string;
  tooMany: string;
  successTitle: string;
  successBody: string;
  whatsappHint: string;
  whatsappCta: string;
  whatsappMessage: string;
}

/** Keep in sync with app/api/apply/route.ts. */
const MAX_CV_BYTES = 4 * 1024 * 1024;
const CV_EXTENSIONS = /\.(pdf|doc|docx)$/i;

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");

const inputClass =
  "px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 text-sm";

/**
 * Sends the application (CV included) to the careers API, which stores it and emails it to HR.
 * Then, as on mustacheprod.com, the candidate can confirm on WhatsApp: the message is prefilled
 * and leaves from their own WhatsApp, so it needs no setup on our side.
 */
export default function ApplyForm({
  copy,
  locale,
  jobId,
  position,
  whatsapp,
}: {
  copy: ApplyFormCopy;
  locale: string;
  /** null for a spontaneous application. */
  jobId: string | null;
  position: string;
  /** wa.me link of the HR WhatsApp number. */
  whatsapp: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const cv = data.get("cv");

    if (!name || !email || !(cv instanceof File) || cv.size === 0) return setErrorMsg(copy.required);
    if (!CV_EXTENSIONS.test(cv.name)) return setErrorMsg(copy.fileType);
    if (cv.size > MAX_CV_BYTES) return setErrorMsg(copy.fileSize);

    data.set("jobId", jobId ?? "");
    data.set("locale", locale);
    setStatus("sending");
    try {
      const response = await fetch("/api/apply", { method: "POST", body: data });
      if (response.status === 410) {
        setErrorMsg(copy.closed);
        setStatus("idle");
        return;
      }
      if (response.status === 429) {
        setErrorMsg(copy.tooMany);
        setStatus("idle");
        return;
      }
      if (!response.ok) throw new Error();
      setSentTo({ name, email });
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      setErrorMsg(copy.error);
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-center text-center gap-4 py-10">
        <span className="rise w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 border-2 border-emerald-400/40 flex items-center justify-center">
          <CheckCircle aria-hidden className="w-7 h-7" />
        </span>
        <h3 className="rise text-2xl font-black text-white">{copy.successTitle}</h3>
        <p className="rise text-slate-300 text-sm max-w-md leading-relaxed">{fill(copy.successBody, sentTo)}</p>
        <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 max-w-md">
          <p className="text-slate-400 text-xs leading-relaxed">{copy.whatsappHint}</p>
          <a
            href={`${whatsapp}?text=${encodeURIComponent(fill(copy.whatsappMessage, { ...sentTo, position }))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-slate-950 text-sm font-bold hover:brightness-110 transition"
          >
            <MessageCircle aria-hidden className="w-4 h-4" />
            {copy.whatsappCta}
          </a>
        </div>
      </div>
    );
  }

  const label = (text: string, required: boolean) => (
    <>
      {text} {required ? <span className="text-rose-500">*</span> : <span className="text-slate-500 font-normal">({copy.optional})</span>}
    </>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left relative">
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="md:col-span-2 text-xs text-slate-400">
        {copy.position}: <strong className="text-slate-200">{position}</strong>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="apply-name" className="text-slate-300 text-sm font-bold">
          {label(copy.name, true)}
        </label>
        <input id="apply-name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="apply-email" className="text-slate-300 text-sm font-bold">
          {label(copy.email, true)}
        </label>
        <input id="apply-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="apply-phone" className="text-slate-300 text-sm font-bold">
          {label(copy.phone, false)}
        </label>
        <input id="apply-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="apply-link" className="text-slate-300 text-sm font-bold">
          {label(copy.link, false)}
        </label>
        <input id="apply-link" name="link" type="url" inputMode="url" placeholder="https://" className={inputClass} />
      </div>

      <div className="md:col-span-2 flex flex-col gap-2">
        <label htmlFor="apply-message" className="text-slate-300 text-sm font-bold">
          {label(copy.message, false)}
        </label>
        <textarea id="apply-message" name="message" rows={4} placeholder={copy.messagePlaceholder} className={`${inputClass} resize-none`} />
      </div>

      <div className="md:col-span-2 flex flex-col gap-2">
        <span className="text-slate-300 text-sm font-bold">{label(copy.cv, true)}</span>
        <label
          htmlFor="apply-cv"
          className="flex items-center gap-3 px-4 py-4 rounded-xl border border-dashed border-white/15 bg-slate-900 hover:border-cyan-400/40 cursor-pointer transition-colors focus-within:border-cyan-400/60"
        >
          <FileText aria-hidden className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-sm text-slate-300 truncate">{fileName || copy.cvHint}</span>
          <input
            id="apply-cv"
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </div>

      <div className="md:col-span-2 flex flex-col gap-4 mt-2">
        {errorMsg && (
          <p role="alert" className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold tracking-wide shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === "sending" ? (
            copy.submitting
          ) : (
            <>
              {copy.submit}
              <Send aria-hidden className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
