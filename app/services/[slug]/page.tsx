"use client";

import { use, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  ShieldAlert, 
  Search, 
  Megaphone,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle,
  HelpCircle,
  Compass
} from "lucide-react";
import { servicesData, Service } from "@/lib/services-data";
import GlassCard from "@/components/ui/GlassCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetails({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find current service
  const service = servicesData.find((s) => s.slug === slug);
  
  // State for Accordion FAQs
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Icon Mapping
  const iconMap = {
    Globe: Globe,
    Smartphone: Smartphone,
    Cpu: Cpu,
    ShieldAlert: ShieldAlert,
    Search: Search,
    Megaphone: Megaphone,
  };

  useGSAP(() => {
    if (!service) return;

    // Hero content entrance
    gsap.fromTo(
      ".detail-hero-anim",
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" }
    );

    // Feature cards trigger
    gsap.fromTo(
      ".detail-feature-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".detail-features-trigger",
          start: "top 80%"
        }
      }
    );

    // Process nodes trigger
    gsap.fromTo(
      ".detail-process-node",
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".detail-process-trigger",
          start: "top 80%"
        }
      }
    );
  }, { scope: containerRef, dependencies: [slug, service] });

  // Handle case where service is invalid
  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 px-6 text-center">
        <GlassCard className="max-w-md p-10 flex flex-col items-center gap-6" glowColor="purple">
          <Compass className="w-16 h-16 text-purple-400 animate-spin" />
          <h2 className="text-2xl font-black text-white">Service Not Found</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            The requested service segment does not exist. Choose from our standard capabilities.
          </p>
          <Link
            href="/services"
            className="px-6 py-2.5 rounded-full bg-cyan-600 text-white text-xs font-bold tracking-wide flex items-center gap-2 hover:scale-[1.02] transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to services
          </Link>
        </GlassCard>
      </div>
    );
  }

  const IconComponent = iconMap[service.iconName] || Globe;

  const toggleFaq = (index: number) => {
    if (openFaqIdx === index) {
      setOpenFaqIdx(null);
    } else {
      setOpenFaqIdx(index);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-slate-950 py-16">
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: service.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/services"
          className="detail-hero-anim inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to services Catalog
        </Link>

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className={`detail-hero-anim inline-flex p-3 rounded-2xl w-fit bg-gradient-to-r ${service.themeColor} text-white shadow-md`}>
              <IconComponent className="w-6 h-6" />
            </span>
            <h1 className="detail-hero-anim text-4xl sm:text-5xl font-black text-white leading-tight">
              {service.title}
            </h1>
            <p className="detail-hero-anim text-slate-300 text-lg leading-relaxed max-w-3xl">
              {service.longDescription}
            </p>
            <div className="detail-hero-anim flex gap-4 mt-2">
              <Link
                href={`/hire-us?service=${service.slug}`}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold tracking-wide shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform"
              >
                Hire us for this
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 detail-hero-anim">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider font-bold">Tech Stack Deployed</h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-200 font-mono text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="h-px bg-white/5 my-1" />
            <p className="text-slate-400 text-xs leading-relaxed">
              We leverage modern platforms to ensure your {service.title} solution stays reliable, maintainable, and audit-proof.
            </p>
          </div>
        </section>

        {/* CAPABILITIES / FEATURES */}
        <section className="detail-features-trigger mb-28">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-cyan-400">Capabilities</span>
            <h2 className="text-3xl font-black text-white">What We Deliver</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feat, index) => (
              <div key={index} className="detail-feature-card">
                <GlassCard className="h-full hover:border-white/20 p-6 flex flex-col gap-4">
                  <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 w-fit">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-semibold">
                    {feat}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>

        {/* DETAILED PROCESS SECTION */}
        <section className="detail-process-trigger mb-28">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-purple-400">Implementation</span>
            <h2 className="text-3xl font-black text-white">Our Step-by-Step Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.process.map((step, index) => (
              <div key={index} className="detail-process-node">
                <GlassCard className="h-full hover:border-white/10 p-6 flex flex-col gap-4 relative">
                  <span className="absolute top-4 right-4 text-xs font-bold font-mono text-slate-600">
                    0{index + 1}
                  </span>
                  <h4 className="text-base font-bold text-white mt-2">
                    {step.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICE SPECIFIC FAQS */}
        <section className="mb-12 max-w-4xl mx-auto">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">FAQs</span>
            <h2 className="text-3xl font-black text-white">Common Questions</h2>
          </div>

          <div className="flex flex-col gap-4">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaqIdx === index;
              return (
                <GlassCard
                  key={index}
                  className="p-6 cursor-pointer hover:border-white/15"
                  hoverable={false}
                >
                  <div 
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center gap-4 text-left"
                  >
                    <span className="flex items-center gap-3 font-semibold text-white text-base">
                      <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                      {faq.question}
                    </span>
                    <span className="text-slate-400">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="mt-4 pl-8 text-slate-300 text-sm leading-relaxed border-l-2 border-cyan-400 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center max-w-4xl mx-auto">
          <GlassCard className="p-10 border-white/5 flex flex-col items-center gap-6" glowColor="cyan">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to start your {service.title} project?
            </h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              We look forward to developing your web/mobile services and securing your database systems. Let's start a business discussion.
            </p>
            <Link
              href={`/hire-us?service=${service.slug}`}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold tracking-wide shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Start project with us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </section>

      </div>
    </div>
  );
}
