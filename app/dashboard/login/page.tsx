import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "@/components/dashboard/LoginForm";
import { authConfigured, isSignedIn } from "@/lib/server/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await isSignedIn()) redirect("/dashboard");
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-sm glass-panel rounded-3xl p-8 flex flex-col gap-6">
        <Image src="/images/logo-light.png" alt="Dacnis" width={480} height={301} className="h-14 w-auto self-start" priority />
        <div>
          <h1 className="text-2xl font-black text-white">Careers dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Post job offers and read applications.</p>
        </div>
        {authConfigured() ? (
          <LoginForm />
        ) : (
          <p className="px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm leading-relaxed">
            The dashboard is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD and AUTH_SECRET (32+ characters) on the server, then restart it.
          </p>
        )}
      </div>
    </main>
  );
}
