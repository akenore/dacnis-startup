import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import Navbar, { type NavCopy } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "../globals.css";

// "latin" already covers French accents.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

// Only used for small labels, so it is not preloaded and never competes with the main face.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });

// No `dynamicParams = false` here: it would also apply to the careers pages, which render on request.
// Unknown languages are rejected below with notFound().

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#03030d",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    formatDetection: { telephone: false, address: false, email: false },
    // Canonical, hreflang and Open Graph are set per page through pageMetadata(): values
    // declared here would be inherited by any route that forgot its own.
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const navCopy: NavCopy = {
    links: [
      { href: href(lang, "home"), label: dict.nav.home },
      { href: href(lang, "about"), label: dict.nav.about },
      { href: href(lang, "services"), label: dict.nav.services },
      { href: href(lang, "careers"), label: dict.nav.careers },
    ],
    homeHref: href(lang, "home"),
    hireHref: href(lang, "hire"),
    cta: dict.nav.cta,
    ctaMobile: dict.nav.ctaMobile,
    navigation: dict.nav.navigation,
    openMenu: dict.nav.openMenu,
    closeMenu: dict.nav.closeMenu,
    language: dict.nav.language,
  };

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        <GoogleTagManager gtmId={site.analytics.gtm} />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform focus:translate-y-0"
        >
          {dict.ui.skip}
        </a>
        <Navbar locale={lang} copy={navCopy} />
        <main id="main" className="flex-grow flex flex-col pt-[72px]">
          {children}
        </main>
        <Footer locale={lang} dict={dict} />
        <JsonLd data={graph(organizationSchema(lang, dict), websiteSchema())} />
        <GoogleAnalytics gaId={site.analytics.ga} />
      </body>
    </html>
  );
}
