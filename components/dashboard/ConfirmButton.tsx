"use client";

import { useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { AlertTriangle, Loader2, Lock } from "lucide-react";

type Tone = "danger" | "warning";

const tones: Record<Tone, { icon: typeof Lock; badge: string; confirm: string }> = {
  danger: {
    icon: AlertTriangle,
    badge: "bg-rose-500/15 text-rose-400 ring-rose-500/30",
    confirm: "bg-rose-600 hover:bg-rose-500 focus-visible:outline-rose-400",
  },
  warning: {
    icon: Lock,
    badge: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
    confirm: "bg-amber-500 hover:bg-amber-400 text-slate-950 focus-visible:outline-amber-300",
  },
};

/** The confirm button submits the surrounding form; it shows a spinner while the action runs. */
function ConfirmSubmit({ label, className }: { label: string; className: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 ${className}`}
    >
      {pending && <Loader2 aria-hidden className="w-4 h-4 animate-spin" />}
      {label}
    </button>
  );
}

/**
 * Button that asks for confirmation in a modal before submitting its form. Place it inside
 * the <form> of the action. Built on the native <dialog>: focus stays in the modal, Esc and
 * a click on the backdrop cancel, and focus returns to the button on close.
 */
export default function ConfirmButton({
  title,
  message,
  confirmLabel,
  tone = "danger",
  className,
  children,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const { icon: Icon, badge, confirm } = tones[tone];
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" className={className} onClick={() => dialogRef.current?.showModal()}>
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-message`}
        // A click on the backdrop lands on the <dialog> itself, outside the panel.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="fixed inset-0 m-auto h-fit w-[calc(100%-2rem)] max-w-md rounded-2xl border border-white/10 bg-slate-900 p-0 text-left text-slate-100 shadow-2xl shadow-black/60 backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm transition duration-200 starting:open:scale-95 starting:open:opacity-0"
      >
        <div className="flex gap-4 p-6">
          <span className={`grid size-11 shrink-0 place-items-center rounded-full ring-1 ${badge}`}>
            <Icon aria-hidden className="w-5 h-5" />
          </span>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <h2 id={`${id}-title`} className="text-base font-bold text-white">
              {title}
            </h2>
            <p id={`${id}-message`} className="text-sm leading-relaxed text-slate-400">
              {message}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-2 border-t border-white/10 bg-slate-950/40 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            autoFocus
            onClick={close}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <ConfirmSubmit label={confirmLabel} className={confirm} />
        </div>
      </dialog>
    </>
  );
}
