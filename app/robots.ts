import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/*
 * Search engines and AI assistants are welcome: being read and cited by ChatGPT, Claude,
 * Perplexity and Gemini is a goal of this site (GEO). They are listed by name so the intent
 * is explicit and survives any future change to the "*" rule. Only the form APIs and the admin dashboard are off limits.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "MistralAI-User",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard"] },
      { userAgent: aiCrawlers, allow: "/", disallow: ["/api/", "/dashboard"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
