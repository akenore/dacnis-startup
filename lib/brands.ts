import type { Locale } from "@/lib/i18n";

/*
 * Clients: companies Dacnis builds for. Partners: companies Dacnis works with on shared
 * projects (we refer work to each other and deliver joint projects). Keep the two lists
 * separate: the site, JSON-LD and llms.txt all present them differently.
 * Logos are the on-dark versions of each brand (dark ink turned white).
 */

export interface Brand {
  name: string;
  url: string | Record<Locale, string>;
  logo: string;
  width: number;
  height: number;
  /** One factual line on what the company does, used in cards and llms.txt. Leave out rather than guess. */
  activity?: Record<Locale, string>;
}

export const clients: Brand[] = [
  {
    name: "Sepat Express",
    url: "https://www.sepat-express.com/",
    logo: "/images/clients/sepat-express.png",
    width: 640,
    height: 323,
    activity: {
      en: "online marketplace for handmade Tunisian crafts",
      fr: "marketplace en ligne d'artisanat tunisien fait main",
    },
  },
  {
    name: "Top du Top",
    url: "https://top-dutop.com/",
    logo: "/images/clients/top-du-top.png",
    width: 640,
    height: 287,
    activity: { en: "travel agency", fr: "agence de voyage" },
  },
  {
    name: "Dr. Amel Ben Brahim",
    url: "https://www.amelbenbrahim.com/",
    logo: "/images/clients/amel-benbrahim.png",
    width: 256,
    height: 256,
    activity: { en: "orthodontic practice in Nabeul", fr: "cabinet d'orthodontie à Nabeul" },
  },
  {
    name: "Gisysco",
    url: "https://gisysco.com/",
    logo: "/images/clients/gisysco.svg",
    width: 300,
    height: 200,
    activity: { en: "civil engineering office", fr: "bureau d'études en génie civil" },
  },
  {
    name: "Koktahome",
    url: "https://koktahome.com/",
    logo: "/images/clients/koktahome.png",
    width: 220,
    height: 74,
    activity: { en: "online store for home appliances", fr: "boutique en ligne d'électroménager" },
  },
  {
    name: "Motobike",
    url: "https://www.motobike.com.tn/",
    logo: "/images/clients/motobike.png",
    width: 640,
    height: 145,
    activity: {
      en: "bicycle and motorcycle parts retailer",
      fr: "vente de pièces détachées pour vélos et motos",
    },
  },
];

export const partners: Brand[] = [
  {
    name: "IsTech",
    url: { en: "https://www.istech.tn/en/", fr: "https://www.istech.tn/fr/" },
    logo: "/images/partners/istech.png",
    width: 640,
    height: 200,
    activity: {
      en: "IT company in Kalaa Kebira, Sousse: cybersecurity, managed Nextcloud hosting and business servers",
      fr: "entreprise informatique à Kalaa Kebira, Sousse : cybersécurité, hébergement Nextcloud infogéré et serveurs d'entreprise",
    },
  },
  {
    name: "Mustache Prod",
    url: "https://www.mustacheprod.com/",
    logo: "/images/partners/mustache-prod.png",
    width: 640,
    height: 152,
    activity: {
      en: "video production house in Kalâa Sghira, Sousse: events, concerts, music videos, TV commercials",
      fr: "maison de production vidéo à Kalâa Sghira, Sousse : événements, concerts, clips, spots TV",
    },
  },
];

export const brandUrl = (brand: Brand, locale: Locale) => (typeof brand.url === "string" ? brand.url : brand.url[locale]);
