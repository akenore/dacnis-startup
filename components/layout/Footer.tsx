import Link from "next/image";
import NextLink from "next/link";
import { Mail, Phone, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Hire Us / Start With Us", href: "/hire-us" },
  ];

  const services = [
    { name: "Web Development", href: "/services/web-development" },
    { name: "Mobile Development", href: "/services/mobile-development" },
    { name: "AI Integration", href: "/services/ai" },
    { name: "Cyber Security", href: "/services/cyber-security" },
    { name: "SEO Optimization", href: "/services/seo" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
  ];

  const partners = [
    { name: "Gisysco", href: "https://www.gisysco.com" },
    { name: "Mustache Prod", href: "https://share.google/57s1V7S4jFVYJtv9e" },
    { name: "Sepat Express", href: "https://www.sepat-express.com" },
    { name: "Koktahome", href: "https://www.koktahome.com" },
    { name: "Motobike TN", href: "https://www.motobike.com.tn" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Grid background effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* Decorative Glow */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <NextLink href="/">
              <Image
                src="/images/logo-light.png"
                alt="Dacnis Logo"
                width={220}
                height={55}
                className="w-auto h-11 object-contain"
              />
            </NextLink>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dacnis is a leading Tunisian startup and digital agency. We design, build, and optimize next-generation software, apps, and marketing channels. Creators of the Fielmedina App.
            </p>
            <div className="flex flex-col gap-3 text-slate-300 text-sm">
              <a href="mailto:contact@dacnis.tn" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4 text-cyan-400" />
                contact@dacnis.tn
              </a>
              <a href="tel:+21624203141" className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                <Phone className="w-4 h-4 text-cyan-400" />
                +216 24 203 141
              </a>
              <span className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Avenue Ibn El Jazzar<br />
                  Avicenne Building, Apt B101, 1st Floor<br />
                  Sousse 4000, Tunisia
                </span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Company</h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <NextLink
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-200" />
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Our Services</h3>
            <ul className="grid grid-cols-1 gap-3">
              {services.map((service) => (
                <li key={service.name}>
                  <NextLink
                    href={service.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    {service.name}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Trusted By / Clients */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Trusted By</h3>
            <ul className="flex flex-col gap-3">
              {partners.map((partner) => (
                <li key={partner.name}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    {partner.name}
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </a>
                </li>
              ))}
              <li className="mt-2 text-xs text-slate-500 italic">
                Proud founder & development partner of the Fielmedina App.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {currentYear} Dacnis. All rights reserved. Made in Tunisia.
          </p>
          <div className="flex gap-6 text-slate-500 text-xs">
            <NextLink href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </NextLink>
            <NextLink href="/terms-of-service" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
