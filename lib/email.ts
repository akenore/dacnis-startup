import "server-only";

/*
 * Form emails through the Resend REST API. Every value from a visitor is escaped before it
 * goes into the HTML body, and the visitor's address is set as reply-to.
 */

export const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;

/** Trimmed string, cut to a sane length so a form cannot be used to send huge emails. */
export const text = (value: unknown, max = 200) => String(value ?? "").trim().slice(0, max);

export function emailLayout(title: string, rows: Array<[string, string]>, body?: { title: string; text: string }) {
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 0;font-weight:bold;width:150px;color:#71717a;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;">${value || "-"}</td></tr>`,
    )
    .join("");
  const bodyBlock = body
    ? `<div style="margin-top:25px;border-top:1px solid #e4e4e7;padding-top:15px;"><h3 style="margin-top:0;color:#18181b;font-size:16px;">${escapeHtml(body.title)}</h3><p style="background:#f4f4f5;padding:15px;border-left:4px solid #0891b2;border-radius:4px;margin:10px 0;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#27272a;">${escapeHtml(body.text)}</p></div>`
    : "";
  return `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #e4e4e7;border-radius:12px;background:#fafafa;color:#18181b;"><h2 style="color:#0891b2;border-bottom:2px solid #e4e4e7;padding-bottom:10px;margin-top:0;">${escapeHtml(title)}</h2><table style="width:100%;border-collapse:collapse;margin-top:15px;">${tableRows}</table>${bodyBlock}<div style="font-size:11px;color:#a1a1aa;text-align:center;margin-top:30px;border-top:1px solid #e4e4e7;padding-top:10px;">Sent from the dacnis.com website.</div></div>`;
}

export async function sendEmail(payload: {
  /** Defaults to the general inbox. */
  to?: string;
  subject: string;
  html: string;
  replyTo: string;
  attachments?: Array<{ filename: string; content: string }>;
}) {
  const apiKey = process.env.RESEND_API;
  if (!apiKey) {
    console.error("Missing RESEND_API environment variable.");
    return false;
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Dacnis Website <hello@dacnis.tn>",
      to: payload.to ?? "contact@dacnis.tn",
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      ...(payload.attachments ? { attachments: payload.attachments } : {}),
    }),
  });
  if (!response.ok) {
    console.error("Resend API error:", response.status, await response.text());
    return false;
  }
  return true;
}
