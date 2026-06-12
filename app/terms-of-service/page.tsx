import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale, FileText, CheckCircle, HelpCircle, ShieldAlert } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the Terms of Service for using the Dacnis website and engineering consultation forms.",
};

export default function TermsOfService() {
  const lastUpdated = "June 12, 2026";

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Title */}
        <div className="flex flex-col gap-3 mb-12">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Terms of Service
          </h1>
          <p className="text-slate-500 text-sm font-mono">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <GlassCard className="p-8 md:p-12 hover:border-white/10 flex flex-col gap-8" hoverable={false}>
          {/* Section 1: Acceptance of Terms */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="w-5 h-5 text-purple-400" />
              1. Acceptance & Agreement
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              These Terms of Service govern your access to and use of the website operated by <strong>Dacnis Startup</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), including any contact forms, dynamic contents, and associated service scopes.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              By accessing our website, submitting a contact form, or ordering consulting briefs, you agree to be bound by these terms. If you do not agree to all terms, you must discontinue website access immediately.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 2: Scope of Consulting Services */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-purple-400" />
              2. Scope of Services
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Dacnis provides specialized professional digital consulting, engineering, and digital marketing services, including:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base space-y-2 pl-2">
              <li>Web and Application Development (React, Next.js, Node.js, databases)</li>
              <li>Mobile App Engineering (Native iOS, Android, and cross-platform architectures)</li>
              <li>Artificial Intelligence integration and workflow design</li>
              <li>Cybersecurity auditing and compliance setups</li>
              <li>Search Engine Optimization (SEO) and Digital Marketing campaigns</li>
            </ul>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-1">
              All inquiries submitted through our Hire Us form are checked, but submission does not guarantee contract initiation. Formal engagement requires a separate signed Service Agreement.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 3: Intellectual Property */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <Scale className="w-5 h-5 text-purple-400" />
              3. Intellectual Property Rights
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Unless otherwise indicated, this website, its source code, design elements, animations (GSAP configurations), text, logos, illustrations, and images are the exclusive property of Dacnis and protected by copyright and intellectual property laws of Tunisia and international treaties.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Furthermore, <strong>Dacnis is the sole creator and developer of the Fielmedina App</strong>, and all associated brands, assets, and technologies displayed remain our proprietary intellectual property unless otherwise agreed.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 4: Acceptable Use */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              4. User Obligations & Conduct
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              By using our platform or submitting inquiries, you agree:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base space-y-2.5 pl-2">
              <li>To provide accurate, current, and complete personal and business details in the form submissions.</li>
              <li>To use the forms and site strictly for lawful business communication.</li>
              <li>Not to submit spam, malicious scripts, injections, or code intended to damage or disrupt our mail endpoints.</li>
              <li>Not to attempt unauthorized access to our hosting, databases, or API microservices.</li>
            </ul>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 5: Limitation of Liability */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-purple-400" />
              5. Disclaimer & Limitation of Liability
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Our website contents are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranty of any kind, either express or implied. While we strive to maintain uninterrupted service and accurate descriptive briefs, we do not warrant that the website is free of minor errors, timeouts, or temporary connectivity disruptions.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Under no circumstances shall Dacnis, its founders, or team members be liable for any indirect, incidental, special, or consequential damages resulting from the use of, or inability to use, this website or the contact services.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 6: Governing Law */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              6. Governing Law & Dispute Resolution
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              These Terms of Service and any relationship established between you and Dacnis regarding website usage are governed by, and construed in accordance with, the laws of the **Republic of Tunisia**.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Any dispute arising out of or in connection with these Terms, which cannot be resolved amicably, shall be subject to the exclusive jurisdiction of the competent courts of **Sousse, Tunisia**.
            </p>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
