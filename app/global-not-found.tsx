import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "404 | Dacnis",
  description: "This page does not exist. Cette page n'existe pas.",
  robots: { index: false },
};

/** URLs outside a locale that match nothing: one bilingual page, since the language is unknown. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="grid min-h-dvh place-items-center bg-slate-950 px-6 text-slate-100">
        <main className="w-full max-w-2xl py-24 text-center">
          <p className="text-xs uppercase tracking-widest font-black text-cyan-400">404</p>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black text-white leading-tight">This page does not exist.</h1>
          <p lang="fr" className="mt-4 text-xl text-slate-300">
            Cette page n&apos;existe pas.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/en" hrefLang="en" className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white">
              English site
            </Link>
            <Link href="/fr" hrefLang="fr" lang="fr" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white">
              Site en français
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
