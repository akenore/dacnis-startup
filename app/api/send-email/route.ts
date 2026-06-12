import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, services, budget, description } = await request.json();

    const resendApiKey = process.env.RESEND_API;
    if (!resendApiKey) {
      console.error("Missing RESEND_API environment variable.");
      return NextResponse.json(
        { error: "Email configuration error on the server. Please call or email directly." },
        { status: 500 }
      );
    }

    const emailContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 12px; background: #fafafa; color: #18181b;">
        <h2 style="color: #0891b2; border-bottom: 2px solid #e4e4e7; padding-bottom: 10px; margin-top: 0;">New Project Inquiry - Dacnis</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 150px; color: #71717a;">Name:</td>
            <td style="padding: 6px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Email:</td>
            <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0891b2; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Phone:</td>
            <td style="padding: 6px 0;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Company:</td>
            <td style="padding: 6px 0;">${company || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Services:</td>
            <td style="padding: 6px 0;">${services && services.length > 0 ? services.join(", ") : "None selected"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Budget Scope:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #18181b;">${budget}</td>
          </tr>
        </table>
        
        <div style="margin-top: 25px; border-top: 1px solid #e4e4e7; padding-top: 15px;">
          <h3 style="margin-top: 0; color: #18181b; font-size: 16px;">Project Description</h3>
          <p style="background: #f4f4f5; padding: 15px; border-left: 4px solid #0891b2; border-radius: 4px; margin: 10px 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #27272a;">${description}</p>
        </div>

        <div style="font-size: 11px; color: #a1a1aa; text-align: center; margin-top: 30px; border-top: 1px solid #e4e4e7; padding-top: 10px;">
          This email was sent dynamically from the Dacnis Startup contact form.
        </div>
      </div>
    `;

    // Resend REST API fetch request
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Dacnis Contact Form <hello@dacnis.tn>",
        to: "contact@dacnis.tn",
        subject: `New Project Inquiry from ${name}`,
        html: emailContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API response error:", data);
      return NextResponse.json(
        { error: data.message || "Resend email submission failed." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Failed to send email handler error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected system error occurred." },
      { status: 500 }
    );
  }
}
