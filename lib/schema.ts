import type { Dictionary } from "@/lib/dictionaries";
import { brandUrl, type Brand } from "@/lib/brands";
import { locales, type Locale } from "@/lib/i18n";
import type { Job } from "@/lib/jobs";
import { href, jobRoute, serviceKeys, type RouteKey, type ServiceKey } from "@/lib/routes";
import type { FaqItem } from "@/lib/services";
import { services } from "@/lib/services";
import { fielmedina, site } from "@/lib/site";

/*
 * JSON-LD for search engines and AI assistants. Every page outputs one @graph; nodes link
 * to each other by @id so the company, the website, the app and each page form one entity.
 */

export const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const appId = `${site.url}/#fielmedina`;

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

const postalAddress = (locale: Locale) => ({
  "@type": "PostalAddress",
  streetAddress: locale === "fr" ? site.address.streetFr : site.address.street,
  postalCode: site.address.postalCode,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  addressCountry: site.address.countryCode,
});

/** The company, shared by every page. NAP matches the footer and the contact page exactly. */
export function organizationSchema(locale: Locale, dict: Dictionary) {
  const logo = absoluteUrl("/images/logo.png");
  return {
    "@type": "ProfessionalService",
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl(href(locale, "home")),
    logo: { "@type": "ImageObject", url: logo, width: 896, height: 567 },
    image: absoluteUrl(`/og/${locale}/home`),
    description: dict.meta.description,
    email: site.email,
    telephone: site.phone.e164,
    address: postalAddress(locale),
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    hasMap: site.mapsUrl,
    foundingDate: site.foundingDate,
    foundingLocation: { "@type": "Place", name: "Sousse, Tunisia" },
    areaServed: [
      { "@type": "Country", name: "Tunisia" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Place", name: "North America" },
      { "@type": "Place", name: "Middle East" },
    ],
    knowsLanguage: ["fr", "en", "ar"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone.e164,
      availableLanguage: ["French", "English", "Arabic"],
    },
    knowsAbout: [
      ...serviceKeys.map((key) => services[key].content[locale].title),
      "Next.js",
      "React",
      "Flutter",
      "Generative Engine Optimization",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.nav.services,
      itemListElement: serviceKeys.map((key) => ({
        "@type": "Offer",
        itemOffered: { "@id": `${absoluteUrl(href(locale, `service:${key}`))}#service` },
      })),
    },
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: [...locales],
    publisher: { "@id": orgId },
  };
}

/** FielMedina, the flagship app built by Dacnis. */
export function fielmedinaSchema(dict: Dictionary) {
  return {
    "@type": "MobileApplication",
    "@id": appId,
    name: fielmedina.name,
    url: fielmedina.url,
    description: dict.home.fielmedinaBody,
    operatingSystem: "iOS, Android",
    applicationCategory: "TravelApplication",
    creator: { "@id": orgId },
    publisher: { "@id": orgId },
  };
}

function brandSchema(brand: Brand, locale: Locale) {
  return {
    "@type": "Organization",
    name: brand.name,
    url: brandUrl(brand, locale),
    ...(brand.activity ? { description: brand.activity[locale] } : {}),
  };
}

/** Clients or partners as a named list, so assistants can tell the two relationships apart. */
export function brandListSchema(locale: Locale, id: "clients" | "partners", name: string, brands: Brand[], description?: string) {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(href(locale, "home"))}#${id}`,
    name,
    ...(description ? { description } : {}),
    itemListElement: brands.map((brand, i) => ({ "@type": "ListItem", position: i + 1, item: brandSchema(brand, locale) })),
  };
}

export function breadcrumbSchema(locale: Locale, dict: Dictionary, items: Array<{ name: string; route: RouteKey }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: dict.ui.homeCrumb, route: "home" as RouteKey }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(href(locale, item.route)),
    })),
  };
}

export function serviceSchema(locale: Locale, key: ServiceKey) {
  const content = services[key].content[locale];
  const url = absoluteUrl(href(locale, `service:${key}`));
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: content.title,
    serviceType: content.title,
    description: content.long,
    url,
    inLanguage: locale,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "Tunisia" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: content.title,
      itemListElement: content.features.map((feature) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: feature },
      })),
    },
  };
}

export function faqSchema(locale: Locale, route: RouteKey, faqs: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(href(locale, route))}#faq`,
    inLanguage: locale,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function webPageSchema(
  locale: Locale,
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage",
  page: { name: string; route: RouteKey; description: string; mentions?: object[] },
) {
  const url = absoluteUrl(href(locale, page.route));
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    description: page.description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    ...(page.mentions ? { mentions: page.mentions } : {}),
  };
}

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Google for Jobs. The description is HTML, built from the same content the page shows. */
export function jobPostingSchema(locale: Locale, dict: Dictionary, job: Job) {
  const c = job.content[locale];
  const t = dict.careers;
  const list = (title: string, items: string[]) =>
    items.length ? `<h3>${escapeHtml(title)}</h3><ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>` : "";
  const description = [
    `<p>${escapeHtml(c.summary)}</p>`,
    c.duration ? `<p>${escapeHtml(c.duration)}</p>` : "",
    list(t.responsibilities, c.responsibilities),
    list(t.requirements, c.requirements),
    list(t.niceToHave, c.niceToHave),
    list(t.offer, c.offer),
  ].join("");
  const url = absoluteUrl(href(locale, jobRoute(job)));

  return {
    "@type": "JobPosting",
    "@id": `${url}#job`,
    title: c.title,
    description,
    url,
    inLanguage: locale,
    identifier: { "@type": "PropertyValue", name: site.name, value: job.id },
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59+01:00`,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      sameAs: site.url,
      logo: absoluteUrl("/images/logo.png"),
    },
    jobLocation: { "@type": "Place", address: postalAddress(locale) },
    ...(job.workplace === "remote"
      ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Tunisia" } }
      : {}),
    directApply: true,
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
