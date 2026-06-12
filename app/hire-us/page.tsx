"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  HelpCircle,
  Building,
  User,
  Plus
} from "lucide-react";
import { servicesData } from "@/lib/services-data";
import GlassCard from "@/components/ui/GlassCard";

// Inner form component that accesses searchParams
function HireUsForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  
  // State variables for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: [] as string[],
    budget: "$10,000 - $25,000",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-select service based on URL search query
  useEffect(() => {
    const serviceSlug = searchParams.get("service");
    if (serviceSlug) {
      const match = servicesData.find((s) => s.slug === serviceSlug);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          services: [match.title],
        }));
      }
    }
  }, [searchParams]);

  // GSAP animation for form entrance
  useGSAP(() => {
    gsap.fromTo(
      ".hire-anim-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: formRef });

  const handleCheckboxChange = (serviceTitle: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceTitle);
      if (exists) {
        return {
          ...prev,
          services: prev.services.filter((t) => t !== serviceTitle),
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, serviceTitle],
        };
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Basic Validation
    if (!formData.name || !formData.email || !formData.description) {
      setErrorMsg("Please fill out all required fields (Name, Email, Description).");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit project request. Please try again.");
      }

      setIsSubmitting(false);
      setSubmitted(true);
      
      // Success GSAP animation
      setTimeout(() => {
        gsap.fromTo(
          ".success-anim-item",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" }
        );
      }, 50);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || "Connection error. Please contact us directly via phone or email.");
    }
  };

  const budgetOptions = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <GlassCard className="p-10 flex flex-col items-center gap-6 border-white/10 glow-cyan" hoverable={false}>
          <div className="success-anim-item w-16 h-16 rounded-full bg-cyan-950 text-cyan-400 border-2 border-cyan-400/40 flex items-center justify-center">
            <CheckCircle className="w-8 h-8" />
          </div>
          
          <h2 className="success-anim-item text-3xl font-black text-white">
            Thank you, {formData.name}!
          </h2>
          
          <p className="success-anim-item text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
            Your brief has been submitted successfully. A Dacnis software architect will review your project scope and contact you at <strong>{formData.email}</strong> within 1 business day.
          </p>

          <div className="success-anim-item h-px bg-white/10 w-full my-2" />

          <div className="success-anim-item flex flex-col gap-3 text-slate-400 text-xs sm:text-sm">
            <span className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              hello@dacnis.tn
            </span>
            <span className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              +216 24 203 141
            </span>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                services: [],
                budget: "$10,000 - $25,000",
                description: "",
              });
            }}
            className="success-anim-item px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-wide mt-4"
          >
            Submit another project
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      
      {/* Left inputs */}
      <div className="flex flex-col gap-5">
        <div className="hire-anim-item flex flex-col gap-2">
          <label htmlFor="name" className="text-slate-300 text-sm font-bold flex items-center gap-1.5">
            <User className="w-4 h-4 text-cyan-400" />
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 text-sm"
          />
        </div>

        <div className="hire-anim-item flex flex-col gap-2">
          <label htmlFor="email" className="text-slate-300 text-sm font-bold flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-cyan-400" />
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 text-sm"
          />
        </div>

        <div className="hire-anim-item flex flex-col gap-2">
          <label htmlFor="phone" className="text-slate-300 text-sm font-bold flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-cyan-400" />
            Phone Number (Optional)
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+216 20 000 000"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 text-sm"
          />
        </div>

        <div className="hire-anim-item flex flex-col gap-2">
          <label htmlFor="company" className="text-slate-300 text-sm font-bold flex items-center gap-1.5">
            <Building className="w-4 h-4 text-cyan-400" />
            Company Name (Optional)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="My Startup LLC"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 text-sm"
          />
        </div>
      </div>

      {/* Right inputs */}
      <div className="flex flex-col gap-5">
        <div className="hire-anim-item flex flex-col gap-2">
          <label className="text-slate-300 text-sm font-bold">
            Services Required
          </label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {servicesData.map((s) => {
              const isChecked = formData.services.includes(s.title);
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => handleCheckboxChange(s.title)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all duration-200 ${
                    isChecked
                      ? "bg-cyan-500/10 border-cyan-400 text-cyan-400"
                      : "bg-slate-900 border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200"
                  }`}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="hire-anim-item flex flex-col gap-2">
          <label htmlFor="budget" className="text-slate-300 text-sm font-bold">
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-100 focus:outline-none focus:border-cyan-400/40 text-sm"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-950 text-slate-300">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="hire-anim-item flex flex-col gap-2">
          <label htmlFor="description" className="text-slate-300 text-sm font-bold">
            Project Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell us about the features, goals, and technical stacks needed."
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/40 text-sm resize-none"
          />
        </div>
      </div>

      {/* Error & Submit button */}
      <div className="md:col-span-2 flex flex-col gap-4 mt-2">
        {errorMsg && (
          <div className="hire-anim-item px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="hire-anim-item w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            "Analyzing scope..."
          ) : (
            <>
              Submit project brief
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
      
    </form>
  );
}

export default function HireUs() {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* TITLE */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs uppercase tracking-widest font-black text-cyan-400">Collaboration</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Start With Us
          </h1>
          <p className="text-slate-400 text-base max-w-xl leading-relaxed mt-2">
            Send us your request, and our technical leads will review it. Let's engineer a solution for your brand.
          </p>
        </div>

        {/* Contact details + Glass form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <GlassCard className="p-8 hover:border-white/10" hoverable={false}>
              <h2 className="text-white font-bold text-lg mb-6">Direct Contact</h2>
              
              <div className="flex flex-col gap-5 text-sm">
                <div className="flex items-start gap-4">
                  <span className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-400/20">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold">General Inquiry</p>
                    <a href="mailto:hello@dacnis.tn" className="text-white font-bold hover:text-cyan-400 transition-colors">
                      hello@dacnis.tn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-400/20">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold">Call Our Office</p>
                    <a href="tel:+21624203141" className="text-white font-bold hover:text-cyan-400 transition-colors">
                      +216 24 203 141
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-400/20">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-slate-400 text-xs font-semibold">HQ Location</p>
                    <span className="text-white font-bold leading-relaxed block text-sm">
                      Avenue Ibn El Jazzar<br />
                      Avicenne Building, Apt B101, 1st Floor<br />
                      Sousse 4000, Tunisia
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <div className="text-slate-500 text-xs italic px-2">
              All submissions are encrypted and handled securely in compliance with privacy guidelines.
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-8">
            <GlassCard className="p-8 md:p-12 hover:border-white/10" hoverable={false}>
              <Suspense fallback={<div className="text-white text-center py-6">Loading form variables...</div>}>
                <HireUsForm />
              </Suspense>
            </GlassCard>
          </div>

        </div>

      </div>
    </div>
  );
}
