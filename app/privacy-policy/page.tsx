import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, Globe } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Dacnis collects, stores, and protects personal data from our contact forms and web analytics in compliance with Tunisian and international regulations.",
};

export default function PrivacyPolicy() {
  const lastUpdated = "June 12, 2026";

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 py-16">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

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
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            Security & Trust
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm font-mono">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <GlassCard className="p-8 md:p-12 hover:border-white/10 flex flex-col gap-8" hoverable={false}>
          {/* Section 1: Overview */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <Eye className="w-5 h-5 text-cyan-400" />
              1. Overview & Scope
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              At <strong>Dacnis</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we prioritize the protection of your personal information. This Privacy Policy outlines our procedures for gathering, processing, storing, and safeguarding data provided when you submit forms, visit our site, or utilize our digital services.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              By using our website, you agree to the collection and use of information in accordance with this policy. We conform to international data protection frameworks, including the General Data Protection Regulation (<strong>GDPR</strong>) and the Tunisian National Authority for the Protection of Personal Data (<strong>INPDP</strong>) standards.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 2: Data Collection */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="w-5 h-5 text-cyan-400" />
              2. Information We Collect
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We collect information in two main ways: directly from your submissions and automatically through web diagnostics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Direct Submissions</span>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  When you submit our <strong>Hire Us / Start With Us</strong> project brief, we ask for your name, email, phone number, company name, project budget, and description.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Automated Analytics</span>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  We collect basic interaction analytics through <strong>Google Analytics</strong> and <strong>Google Tag Manager</strong>, including your device characteristics, page visit durations, and referrer pathways.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 3: Data Use */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              3. How We Use Your Data
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Dacnis uses the collected personal data exclusively for technical and marketing operations, specifically:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base space-y-2.5 pl-2">
              <li>Evaluating your technical requirement brief and preparing design estimates.</li>
              <li>Directly communicating with you regarding your project inquiry.</li>
              <li>Analyzing and optimizing our website speed, content relevance, and general user experience.</li>
              <li>Ensuring security against spam submissions and unauthorized infrastructure access.</li>
            </ul>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-1">
              <strong>We do not sell, rent, or trade your personal data.</strong> Your information is handled internally by authorized team members and forwarded securely using modern mail services (such as Resend APIs).
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 4: Storage and Security */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <Lock className="w-5 h-5 text-cyan-400" />
              4. Data Retention & Protection
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We retain project inquiries and communications for the period required to evaluate business prospects or fulfill active contract obligations. 
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To secure your data, we enforce strong server-side security measures. All communications between your browser and our platform are encrypted in transit using Secure Socket Layer/Transport Layer Security (SSL/TLS). Additionally, API endpoints processing forms are checked for injection threats.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 5: User Rights */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <Shield className="w-5 h-5 text-cyan-400" />
              5. Your Rights (GDPR & INPDP)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Depending on your location, you have the following rights concerning your personal information:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base space-y-2.5 pl-2">
              <li><strong>Access:</strong> The right to request copies of your personal information collected by us.</li>
              <li><strong>Correction:</strong> The right to ask us to correct information you believe is inaccurate or incomplete.</li>
              <li><strong>Deletion:</strong> The right to request that we erase your personal data under certain conditions.</li>
              <li><strong>Data Portability:</strong> The right to request that we transfer the data that we have collected to another organization.</li>
            </ul>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-1">
              To exercise any of these rights, please contact us at <a href="mailto:contact@dacnis.tn" className="text-cyan-400 hover:underline">contact@dacnis.tn</a>. We will respond to your request within 30 days.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {/* Section 6: Contact */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              6. Contact Information
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              If you have any questions about this Privacy Policy, our data practices, or wish to make an inquiry regarding your data, please contact our legal representative:
            </p>
            <div className="p-6 rounded-xl bg-slate-900 border border-white/5 text-sm flex flex-col gap-3 w-fit">
              <span className="font-bold text-white">Dacnis Startup HQ</span>
              <span className="text-slate-400">Avenue Ibn El Jazzar, Avicenne Building, Apt B101</span>
              <span className="text-slate-400">Sousse 4000, Tunisia</span>
              <span className="text-slate-400">Email: <a href="mailto:contact@dacnis.tn" className="text-cyan-400 hover:underline">contact@dacnis.tn</a></span>
              <span className="text-slate-400">Phone: +216 24 203 141</span>
            </div>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
