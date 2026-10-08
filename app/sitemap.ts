import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/lib/i18n";
import { openJobs } from "@/lib/server/careers";
import { href, jobRoute, pageKeys, serviceKeys, type RouteKey } from "@/lib/routes";
import { contentUpdated, site } from "@/lib/site";

const absolute = (path: string) => new URL(path, site.url).toString();

/*
 * Every page in both languages, each with its hreflang alternates. The same alternates are
 * declared in each page's <head>; repeating them here helps crawlers pair EN and FR quickly.
 */
// Open offers change without a deploy, so the sitemap is built on request.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await openJobs();
  const routes: Array<{ key: RouteKey; priority: number; lastModified?: Date }> = [
    { key: "home", priority: 1 },
    { key: "services", priority: 0.9 },
    ...serviceKeys.map((key) => ({ key: `service:${key}` as RouteKey, priority: 0.9 })),
    ...pageKeys.map((key) => ({
      key: key as RouteKey,
      priority: key === "hire" ? 0.8 : key === "privacy" || key === "terms" ? 0.3 : 0.7,
    })),
    ...jobs.map((job) => ({ key: jobRoute(job), priority: 0.6, lastModified: new Date(job.updatedAt) })),
  ];

  return routes.flatMap(({ key, priority, lastModified }) => {
    const languages = Object.fromEntries([
      ...locales.map((l) => [l, absolute(href(l, key))]),
      ["x-default", absolute(href(defaultLocale, key))],
    ]);
    return locales.map((locale) => ({
      url: absolute(href(locale, key)),
      lastModified: lastModified ?? contentUpdated,
      changeFrequency: key.startsWith("job:") || key === "careers" ? ("weekly" as const) : ("monthly" as const),
      priority,
      alternates: { languages },
    }));
  });
}
