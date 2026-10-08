/**
 * Company facts shown across the site and in structured data. The address, phone and email
 * (NAP) must stay identical everywhere: footer, contact page, JSON-LD and llms.txt.
 */
export const site = {
  name: "Dacnis",
  legalName: "Dacnis Startup",
  url: "https://www.dacnis.com",
  email: "contact@dacnis.tn",
  /** Job applications and careers questions. */
  hrEmail: "hr@dacnis.tn",
  phone: { display: "+216 24 203 141", href: "tel:+21624203141", e164: "+21624203141" },
  /** Candidates confirm their application on WhatsApp to this number (same as the phone line). */
  whatsapp: "https://wa.me/21624203141",
  address: {
    street: "Avenue Ibn El Jazzar, Avicenne Building, Apt B101, 1st Floor",
    streetFr: "Avenue Ibn El Jazzar, Immeuble Avicenne, Appt B101, 1er étage",
    postalCode: "4000",
    locality: "Sousse",
    region: "Sousse",
    country: "Tunisia",
    countryFr: "Tunisie",
    countryCode: "TN",
  },
  geo: { latitude: 35.8256, longitude: 10.6369 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Avenue%20Ibn%20El%20Jazzar%2C%20Sousse%204000%2C%20Tunisia",
  foundingDate: "2025-09",
  /** Profiles that describe the same company. Add LinkedIn, Facebook and Google Business Profile URLs here. */
  sameAs: [] as string[],
  analytics: { gtm: "GTM-WNBS7272", ga: "G-8JPW3GWT3D" },
} as const;

/** Flagship product, designed and built by Dacnis. */
export const fielmedina = {
  name: "FielMedina",
  url: "https://www.fielmedina.com",
  cities: ["Tunis", "Sousse", "Sidi Bou Saïd", "Monastir", "Yasmine Hammamet"],
};

/** Used as the sitemap lastmod. Update it when page content changes, not on every deploy. */
export const contentUpdated = new Date("2026-10-08");
