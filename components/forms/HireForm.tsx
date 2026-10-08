"use client";

import { useState, useSyncExternalStore } from "react";
import { Building, CheckCircle, Mail, Phone, Send, User } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export interface HireFormCopy {
  name: string;
  email: string;
  phone: string;
  company: string;
  optional: string;
  services: string;
  budget: string;
  description: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  companyPlaceholder: string;
  descriptionPlaceholder: string;
  submit: string;
  submitting: string;
  required: string;
  error: string;
  successTitle: string;
  successBody: string;
  another: string;
}

const subscribeNever = () => () => {};

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");

const inputClass =
  "px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 text-sm";

export default function HireForm({
  copy,
  services,
  budgets,
  locale,
  contact,
}: {
  copy: HireFormCopy;
  services: { key: string; title: string; aliases: string[] }[];
  budgets: string[];
  locale: string;
  contact: { email: string; phone: string };
}) {
  const empty = { name: "", email: "", phone: "", company: "", budget: budgets[2], description: "", website: "" };
  const [formData, setFormData] = useState(empty);
  // null until the visitor picks services: until then the ?service=<key> link decides.
  const [pickedServices, setPickedServices] = useState<string[] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Service pages link here with ?service=<key>. Read on the client only (the page is static).
  const search = useSyncExternalStore(subscribeNever, () => window.location.search, () => "");
  const requested = new URLSearchParams(search).get("service");
  const linked = services.find((s) => s.aliases.includes(requested ?? ""));
  const selectedServices = pickedServices ?? (linked ? [linked.title] : []);

  const toggleService = (title: string) =>
    setPickedServices(selectedServices.includes(title) ? selectedServices.filter((t) => t !== title) : [...selectedServices, title]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setErrorMsg(copy.required);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, services: selectedServices, locale }),
      });
      if (!response.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setErrorMsg(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="max-w-2xl mx-auto text-center py-12">
        <GlassCard className="p-10 flex flex-col items-center gap-6 border-white/10 glow-cyan" hoverable={false}>
          <div className="rise w-16 h-16 rounded-full bg-cyan-950 text-cyan-400 border-2 border-cyan-400/40 flex items-center justify-center">
            <CheckCircle aria-hidden className="w-8 h-8" />
          </div>
          <h2 className="rise text-3xl font-black text-white">{fill(copy.successTitle, { name: formData.name })}</h2>
          <p className="rise text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
            {fill(copy.successBody, { email: formData.email })}
          </p>
          <div className="h-px bg-white/10 w-full my-2" />
          <div className="flex flex-col gap-3 text-slate-400 text-xs sm:text-sm">
            <span className="flex items-center justify-center gap-2">
              <Mail aria-hidden className="w-4 h-4 text-cyan-400" />
              {contact.email}
            </span>
            <span className="flex items-center justify-center gap-2">
              <Phone aria-hidden className="w-4 h-4 text-cyan-400" />
              {contact.phone}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData(empty);
              setPickedServices([]);
            }}
            className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-wide mt-4"
          >
            {copy.another}
          </button>
        </GlassCard>
      </div>
    );
  }

  const label = (text: string, required: boolean) => (
    <>
      {text} {required ? <span className="text-rose-500">*</span> : <span className="text-slate-500 font-normal">({copy.optional})</span>}
    </>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      {/* Honeypot: hidden from people, filled by bots, rejected by the API. */}
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleInputChange} />
        </label>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-slate-300 text-sm font-bold flex items-center gap-1.5">
            <User aria-hidden className="w-4 h-4 text-cyan-400" />
            {label(copy.name, true)}
          </label>
          <input type="text" id="name" name="name" required autoComplete="name" value={formData.name} onChange={handleInputChange} placeholder={copy.namePlaceholder} className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-slate-300 text-sm font-bold flex items-center gap-1.5">
            <Mail aria-hidden className="w-4 h-4 text-cyan-400" />
            {label(copy.email, true)}
          </label>
          <input type="email" id="email" name="email" required autoComplete="email" value={formData.email} onChange={handleInputChange} placeholder={copy.emailPlaceholder} className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-slate-300 text-sm font-bold flex items-center gap-1.5">
            <Phone aria-hidden className="w-4 h-4 text-cyan-400" />
            {label(copy.phone, false)}
          </label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleInputChange} placeholder={copy.phonePlaceholder} className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-slate-300 text-sm font-bold flex items-center gap-1.5">
            <Building aria-hidden className="w-4 h-4 text-cyan-400" />
            {label(copy.company, false)}
          </label>
          <input type="text" id="company" name="company" autoComplete="organization" value={formData.company} onChange={handleInputChange} placeholder={copy.companyPlaceholder} className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-slate-300 text-sm font-bold mb-2">{copy.services}</legend>
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => {
              const isChecked = selectedServices.includes(s.title);
              return (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={isChecked}
                  onClick={() => toggleService(s.title)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-colors duration-200 ${
                    isChecked ? "bg-cyan-500/10 border-cyan-400 text-cyan-400" : "bg-slate-900 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200"
                  }`}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-slate-300 text-sm font-bold">
            {copy.budget}
          </label>
          <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className={inputClass}>
            {budgets.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-950 text-slate-300">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-slate-300 text-sm font-bold">
            {label(copy.description, true)}
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            value={formData.description}
            onChange={handleInputChange}
            placeholder={copy.descriptionPlaceholder}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col gap-4 mt-2">
        {errorMsg && (
          <p role="alert" className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            copy.submitting
          ) : (
            <>
              {copy.submit}
              <Send aria-hidden className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
