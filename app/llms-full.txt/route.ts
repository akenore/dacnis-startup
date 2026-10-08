import { llmsFullTxt } from "@/lib/llms";

// Lists the open offers, which change without a deploy.
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(await llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
