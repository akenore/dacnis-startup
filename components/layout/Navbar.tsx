"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { localeMeta, locales, type Locale } from "@/lib/i18n";
import { switchLocalePath } from "@/lib/routes";

export interface NavCopy {
  links: { href: string; label: string }[];
  homeHref: string;
  hireHref: string;
  cta: string;
  ctaMobile: string;
  navigation: string;
  openMenu: string;
  closeMenu: string;
  language: string;
}

export default function Navbar({ locale, copy }: { locale: Locale; copy: NavCopy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu when the page changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setIsOpen(false);
  }

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => (href === copy.homeHref ? pathname === href : pathname.startsWith(href));

  const languageLinks = (className: string) =>
    locales.map((l) => (
      <Link
        key={l}
        href={switchLocalePath(pathname, l)}
        hrefLang={l}
        lang={l}
        aria-current={l === locale ? "true" : undefined}
        aria-label={localeMeta[l].switchTo}
        className={`${className} ${l === locale ? "text-cyan-400" : "text-slate-400 hover:text-white"}`}
      >
        {localeMeta[l].short}
      </Link>
    ));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,border-color] duration-300 border-b ${
          scrolled ? "bg-slate-950/85 backdrop-blur-md border-white/10 py-3" : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href={copy.homeHref} className="flex items-center gap-2 relative z-50" aria-label="Dacnis">
            <Image
              src="/images/logo-light.png"
              alt="Dacnis"
              width={480}
              height={301}
              priority
              sizes="102px"
              className="h-14 sm:h-16 w-auto"
            />
          </Link>

          <nav aria-label={copy.navigation} className="hidden md:flex items-center gap-8">
            {copy.links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    active ? "text-cyan-400" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 rounded-full" />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <div role="group" aria-label={copy.language} className="flex items-center gap-1 text-xs font-bold">
              {languageLinks("px-2 py-1 rounded-md transition-colors")}
            </div>
            <Link
              href={copy.hireHref}
              className="group relative px-6 py-2.5 rounded-full overflow-hidden text-sm font-semibold tracking-wide text-white border border-cyan-500/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                {copy.cta}
                <ArrowRight aria-hidden className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white transition-colors"
            aria-label={isOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden
      />

      <div
        id="mobile-menu"
        inert={!isOpen}
        className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-[80vw] bg-slate-950 border-l border-white/10 z-40 md:hidden flex flex-col justify-between pt-28 pb-10 px-8 gap-6 transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav aria-label={copy.navigation} className="flex flex-col gap-6">
          <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold mb-2">{copy.navigation}</p>
          <div className="flex flex-col gap-5 text-xl font-bold">
            {copy.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`transition-colors duration-200 ${isActive(link.href) ? "text-cyan-400" : "text-slate-300 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-6">
          <div role="group" aria-label={copy.language} className="flex items-center gap-2 text-sm font-bold">
            {languageLinks("px-3 py-1.5 rounded-lg border border-white/10 transition-colors")}
          </div>
          <div className="h-[1px] bg-white/10" />
          <Link
            href={copy.hireHref}
            className="flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/10 text-sm"
          >
            {copy.ctaMobile}
            <ArrowRight aria-hidden className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
