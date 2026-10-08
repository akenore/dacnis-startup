import Link from "next/link";
import Image from "next/image";
import { ExternalLink, LogOut } from "lucide-react";
import { logout } from "@/app/dashboard/actions";
import { ghostButton } from "@/components/dashboard/ui";
import { requireAdmin } from "@/lib/server/auth";

/** Every page below also calls requireAdmin(): layouts and pages render in parallel. */
export default async function PanelLayout({ children }: LayoutProps<"/dashboard">) {
  await requireAdmin();
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b border-white/10 bg-slate-950/90 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-6">
          <Link href="/dashboard" aria-label="Dashboard home">
            <Image src="/images/logo-light.png" alt="Dacnis" width={480} height={301} className="h-10 w-auto" />
          </Link>
          <nav className="flex items-center gap-5 text-sm font-semibold">
            <Link href="/dashboard" className="text-slate-300 hover:text-white">
              Job offers
            </Link>
            <Link href="/dashboard/applications" className="text-slate-300 hover:text-white">
              Applications
            </Link>
            <a href="/en/careers" target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-slate-400 hover:text-white">
              Careers page <ExternalLink aria-hidden className="w-3.5 h-3.5" />
            </a>
          </nav>
          <form action={logout} className="ml-auto">
            <button type="submit" className={ghostButton}>
              <LogOut aria-hidden className="w-3.5 h-3.5" /> Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
