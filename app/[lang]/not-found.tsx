import Link from "next/link";
import { Compass } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { getDictionary } from "@/lib/dictionaries";

/** not-found.tsx gets no params, so the message is shown in both languages. */
export default function NotFound() {
  const en = getDictionary("en").notFound;
  const fr = getDictionary("fr").notFound;
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 px-6 text-center">
      <GlassCard className="max-w-md p-10 flex flex-col items-center gap-5" glowColor="purple" hoverable={false}>
        <Compass aria-hidden className="w-14 h-14 text-purple-400" />
        <p className="text-xs uppercase tracking-widest font-black text-cyan-400">404</p>
        <h1 className="text-2xl font-black text-white">{en.title}</h1>
        <p lang="fr" className="text-slate-300 text-lg">
          {fr.title}
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">{en.body}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Link href="/en" hrefLang="en" className="px-5 py-2.5 rounded-full bg-cyan-600 text-white text-xs font-bold">
            {en.home}
          </Link>
          <Link href="/fr" hrefLang="fr" lang="fr" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white text-xs font-bold">
            {fr.home}
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
