import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Dashboard | Dacnis", template: "%s | Dacnis Dashboard" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#03030d", colorScheme: "dark" };

/** Separate root layout: the dashboard is English-only and has no public header or footer. */
export default function DashboardRoot({ children }: LayoutProps<"/dashboard">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-dvh bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
