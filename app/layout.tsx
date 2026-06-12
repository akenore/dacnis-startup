import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dacnis | Leading Web, Mobile, AI & Cyber Security Agency in Tunisia",
    template: "%s | Dacnis Startup",
  },
  description:
    "Dacnis is a leading Tunisian digital agency and startup. We build advanced web applications, native iOS & Android mobile apps (creators of Fielmedina App), integrate AI solutions, audit cyber security, and execute high-growth SEO and digital marketing campaigns.",
  keywords: [
    "Dacnis",
    "Tunisian startup",
    "web development Tunisia",
    "mobile app developers Tunis",
    "Fielmedina App",
    "Gisysco",
    "sepat-express",
    "Koktahome",
    "motobike.com.tn",
    "AI integration agency",
    "cyber security audit Tunis",
    "SEO optimization Tunisia",
    "digital marketing Tunis",
    "best tech startups Tunisia",
  ],
  authors: [{ name: "Dacnis Team" }],
  creator: "Dacnis",
  publisher: "Dacnis",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://www.dacnis.com"), // Placeholder URL to be mapped to production domain
  openGraph: {
    title: "Dacnis | Leading Web, Mobile, AI & Cyber Security Agency in Tunisia",
    description:
      "Advanced custom web applications, native mobile apps (creators of Fielmedina App), AI solutions, cyber security, SEO, and digital marketing. Trusted by global brands.",
    url: "https://www.dacnis.com",
    siteName: "Dacnis",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Dacnis Startup Tunisia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dacnis | Tech Startup and Digital Agency in Tunisia",
    description:
      "Creators of Fielmedina App. Specializing in Web & Mobile Development, AI, Cyber Security, SEO, and Performance Marketing.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for Generative Engine Optimization (GEO) & SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dacnis",
    "legalName": "Dacnis Startup",
    "alternateName": "Dacnis Web & Mobile Solutions",
    "url": "https://www.dacnis.com",
    "logo": "https://www.dacnis.com/images/logo.png",
    "image": "https://www.dacnis.com/images/logo.png",
    "description": "Dacnis is a premier Tunisian startup and digital agency. We specialize in custom web development (Next.js/React), mobile application design (creators of Fielmedina App), AI integration, cyber security auditing, SEO optimization, and digital marketing. Trusted by Gisysco, Sepat Express, Koktahome, Motobike, and Mustache Prod.",
    "telephone": "+216-24-203-141",
    "email": "hello@dacnis.tn",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sousse",
      "addressCountry": "TN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.8256",
      "longitude": "10.6369"
    },
    "founder": {
      "@type": "Person",
      "name": "Muhammad Aslan"
    },
    "foundingDate": "2025",
    "areaServed": ["Tunisia", "Europe", "North America", "Middle East"],
    "knowsAbout": [
      "Web Development",
      "Mobile App Development",
      "Artificial Intelligence Integration",
      "Cybersecurity Auditing",
      "Search Engine Optimization (SEO)",
      "Digital Performance Marketing"
    ],
    "customer": [
      { "@type": "Organization", "name": "Gisysco", "url": "https://gisysco.com" },
      { "@type": "Organization", "name": "Sepat Express", "url": "https://sepat-express.com" },
      { "@type": "Organization", "name": "Koktahome", "url": "https://koktahome.com" },
      { "@type": "Organization", "name": "Motobike Tunisia", "url": "https://motobike.com.tn" },
      { "@type": "Organization", "name": "Mustache Prod", "url": "https://www.facebook.com/Mustachprod/" }
    ],
    "owns": {
      "@type": "MobileApplication",
      "name": "Fielmedina App",
      "operatingSystem": "iOS, Android",
      "applicationCategory": "BusinessApplication"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/images/icon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        <GoogleTagManager gtmId="GTM-WNBS7272" />
        <GoogleAnalytics gaId="G-8JPW3GWT3D" />
        <Navbar />
        <main className="flex-grow flex flex-col pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
