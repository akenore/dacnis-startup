import { HelpCircle, Plus } from "lucide-react";
import type { FaqItem } from "@/lib/services";

/** Native disclosure: every answer is in the server HTML, readable by crawlers and without JS. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((faq, i) => (
        <details
          key={faq.question}
          className="faq reveal glass-panel rounded-3xl p-6 group"
          style={{ "--i": i % 2 } as React.CSSProperties}
        >
          <summary className="flex justify-between items-center gap-4 cursor-pointer text-left">
            <h3 className="flex items-center gap-3 font-semibold text-white text-base">
              <HelpCircle aria-hidden className="w-5 h-5 text-cyan-400 shrink-0" />
              {faq.question}
            </h3>
            <Plus aria-hidden className="faq-icon w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200" />
          </summary>
          <p className="mt-4 pl-8 text-slate-300 text-sm leading-relaxed border-l-2 border-cyan-400">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
