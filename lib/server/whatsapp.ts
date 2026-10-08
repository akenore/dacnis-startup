import "server-only";

/*
 * Optional server-side WhatsApp alert for each new application, through the official
 * WhatsApp Business Cloud API (Meta), as on amelbenbrahim.com. Off until WHATSAPP_TOKEN,
 * WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ALERT_TO are set (setup steps in README.md).
 * A message started by a business must use a template approved by Meta, with four
 * variables: {{1}} name, {{2}} position, {{3}} email, {{4}} phone.
 */

function config() {
  const token = process.env.WHATSAPP_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const recipients = (process.env.WHATSAPP_ALERT_TO ?? "")
    .split(",")
    .map((n) => n.replace(/\D/g, ""))
    .filter(Boolean);
  if (!token || !phoneNumberId || !recipients.length) return null;
  return {
    token,
    phoneNumberId,
    recipients,
    template: process.env.WHATSAPP_TEMPLATE?.trim() || "nouvelle_candidature",
    language: process.env.WHATSAPP_TEMPLATE_LANG?.trim() || "fr",
  };
}

/** Template variables may not contain line breaks, tabs or long runs of spaces. */
const param = (value: string) => (value.replace(/\s+/g, " ").trim() || "-").slice(0, 160);

/** Never throws: the application is already saved and emailed when this runs. */
export async function alertNewApplication(values: { name: string; position: string; email: string; phone: string }) {
  const c = config();
  if (!c) return;
  await Promise.all(
    c.recipients.map(async (to) => {
      try {
        const res = await fetch(`https://graph.facebook.com/v23.0/${c.phoneNumberId}/messages`, {
          method: "POST",
          headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to,
            type: "template",
            template: {
              name: c.template,
              language: { code: c.language },
              components: [
                {
                  type: "body",
                  parameters: [values.name, values.position, values.email, values.phone].map((text) => ({ type: "text", text: param(text) })),
                },
              ],
            },
          }),
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) console.error(`[whatsapp] alert to ${to} failed:`, res.status, await res.text());
      } catch (error) {
        console.error(`[whatsapp] alert to ${to} failed:`, error);
      }
    }),
  );
}
