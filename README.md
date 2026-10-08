# Dacnis website

Website of Dacnis, software and digital agency in Sousse, Tunisia: www.dacnis.com.
Next.js 16 (App Router), React 19, Tailwind CSS 4. English and French, built for search
engines (SEO) and AI assistants (GEO), with a careers section managed from a dashboard.

## Getting started

```bash
pnpm install
cp .env.example .env   # then fill in the values
pnpm dev
```

Production (Plesk): `pnpm install`, `pnpm build`, then start `server.js`.

`pnpm-lock.yaml` pins the exact versions that were built and tested: commit it, so the server
installs the same ones. `pnpm-workspace.yaml` tells pnpm which install scripts may run
(`sharp` yes, `unrs-resolver` no); without it, pnpm 10.26+ stops with `ERR_PNPM_IGNORED_BUILDS`.
If a future dependency adds an install script, pnpm will stop the same way: add it under
`allowBuilds` (`true` to run it, `false` to skip it).

## Structure

```text
app/
  [lang]/                 Public site, /en and /fr
    page.tsx              Home
    [page]/               about, hire-us, careers, privacy, terms (French slugs on /fr)
    [page]/[slug]/        Job offer pages
    services/             Services index and one page per service
  dashboard/              Careers dashboard (job offers, applications), English only
  api/send-email          "Start with us" form -> contact@dacnis.tn
  api/apply               Job applications -> careers store + hr@dacnis.tn
  og/[lang]/[card]        Social preview images
  sitemap.ts, robots.ts, llms.txt/, llms-full.txt/
proxy.ts                  Language detection on "/" and redirects from the old URLs
dictionaries/en.ts, fr.ts All page text, per language
lib/
  routes.ts               Every URL, per language (French slugs)
  services.ts             Service content, both languages
  brands.ts               Clients and partners
  site.ts                 Company facts (address, phone, emails): keep them identical everywhere
  schema.ts, metadata.ts  JSON-LD and per-page metadata (canonical, hreflang, Open Graph)
  server/careers.ts       Careers store (JSON file + CV folder)
```

## Careers: posting a job

1. Open `/dashboard` and sign in (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).
2. **New offer**: fill English and French, the publishing date and the last day to apply.
   List fields take one item per line. Leave "Published" unchecked to keep a draft.
3. Save. The offer is live at once on `/en/careers` and `/fr/carrieres`, in the sitemap,
   in `llms.txt` and as a JobPosting for Google for Jobs. No deploy is needed.

An offer closes by itself after its last day (Tunis time): it moves to "Recently closed"
for six months, its page shows a "closed" notice without a form, it leaves the sitemap,
`llms.txt` and Google for Jobs, and the API refuses applications to it.
**Close now** ends it immediately. A publishing date in the future schedules the offer.

Each application is:

- saved with its CV and listed in **Applications** (filter by offer, download the CV, reply
  by email or WhatsApp, delete);
- emailed to **hr@dacnis.tn** with the CV attached (needs `RESEND_API`);
- followed, for the candidate, by a **Confirm on WhatsApp** button that opens WhatsApp with
  a prefilled message to +216 24 203 141 (as on mustacheprod.com; no setup needed);
- optionally announced by an automatic WhatsApp alert (below).

### Data and backups

Offers, applications and CVs live in `DATA_DIR` (default `./.data`): `careers.json` and a
`cv/` folder. In production, set `DATA_DIR` to a folder outside the app directory so a
redeploy never deletes it, and back it up. On first start with an empty folder, two sample
internship offers are created (`lib/jobs-seed.ts`); edit or delete them in the dashboard.

### WhatsApp alerts (optional)

Same setup as amelbenbrahim.com, through the official WhatsApp Business Cloud API (Meta):

1. In Meta Business and developers.facebook.com, create a Business app with the WhatsApp
   product, and add and verify a sending number (a dedicated number, not one used in the
   WhatsApp app).
2. In WhatsApp Manager, create a **Utility** template named `nouvelle_candidature`,
   language French, for example:
   `Nouvelle candidature sur dacnis.com : {{1}} pour le poste {{2}}. E-mail : {{3}}, téléphone : {{4}}.`
3. Create a system user token with `whatsapp_business_messaging` -> `WHATSAPP_TOKEN`,
   copy the phone number ID -> `WHATSAPP_PHONE_NUMBER_ID`, and set the receiving numbers in
   `WHATSAPP_ALERT_TO` (e.g. `21624203141`).
4. Restart the server. A failed alert never blocks an application: it is only logged.

## SEO and GEO

- Every page: localized title and description, canonical URL, hreflang (en, fr, x-default),
  Open Graph image from `app/og`.
- JSON-LD graph on every page (company, website, FielMedina, services, FAQ, breadcrumbs,
  clients and partners, job postings).
- `robots.txt` allows search engines and AI crawlers; only `/api/` and `/dashboard` are blocked.
- `llms.txt` and `llms-full.txt` are generated from the same data as the pages.
- Animations are CSS only (`app/globals.css`): no animation library ships to the browser.

After deploying, submit `https://www.dacnis.com/sitemap.xml` in Google Search Console and
Bing Webmaster Tools.
