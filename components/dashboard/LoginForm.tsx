"use client";

import { useActionState } from "react";
import { login } from "@/app/dashboard/actions";
import { input, label, primaryButton } from "@/components/dashboard/ui";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="username" defaultValue={state?.values?.email} className={input} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={input} />
      </div>
      {state?.error && (
        <p role="alert" className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
