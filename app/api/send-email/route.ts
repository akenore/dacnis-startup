import { NextResponse } from "next/server";
import { emailLayout, escapeHtml, isEmail, sendEmail, text } from "@/lib/email";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled: answer like a success so bots learn nothing.
  if (text(data.website)) return NextResponse.json({ success: true });

  const name = text(data.name, 120);
  const email = text(data.email, 254);
  const description = text(data.description, 5000);
  if (!name || !isEmail(email) || !description) {
    return NextResponse.json({ error: "Name, a valid email and a description are required." }, { status: 400 });
  }

  const services = Array.isArray(data.services) ? data.services.slice(0, 10).map((s) => text(s, 80)) : [];
  const html = emailLayout(
    "New project inquiry",
    [
      ["Name", escapeHtml(name)],
      ["Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0891b2;">${escapeHtml(email)}</a>`],
      ["Phone", escapeHtml(text(data.phone, 40))],
      ["Company", escapeHtml(text(data.company, 120))],
      ["Services", escapeHtml(services.join(", "))],
      ["Budget", escapeHtml(text(data.budget, 60))],
      ["Language", escapeHtml(text(data.locale, 5))],
    ],
    { title: "Project description", text: description },
  );

  const sent = await sendEmail({ subject: `New project inquiry from ${name}`, html, replyTo: email });
  if (!sent) return NextResponse.json({ error: "Email could not be sent." }, { status: 502 });
  return NextResponse.json({ success: true });
}
