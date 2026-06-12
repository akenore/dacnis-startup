"use client";

import { useRef } from "react";
import Link from "next/link";
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
  ArrowRight,
  ChevronRight,
  Layers,
  Settings,
  Code2,
  CheckCircle2
} from "lucide-react";
import { servicesData } from "@/lib/services-data";
import GlassCard from "@/components/ui/GlassCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesIndex() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const iconMap = {
    Globe: Globe,
    Smartphone: Smartphone,
    Cpu: Cpu,
    ShieldAlert: ShieldAlert,
    Search: Search,
    Megaphone: Megaphone,
  };

  useGSAP(() => {
    // Title animations
    gsap.fromTo(
      ".services-title-anim",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // List animation
    gsap.fromTo(
      ".service-list-item",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-list-trigger",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );

    // Process section cards
    gsap.fromTo(
      ".process-step-anim",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-trigger",
          start: "top 80%"
        }
      }
    );
  }, { scope: containerRef });

  const methodology = [
    {
      icon: Layers,
      title: "1. Strategy & Architecture",
      description: "We work directly with your stakeholders to outline the scope, target user base, design tokens, and scalability requirements.",
    },
    {
      icon: Code2,
      title: "2. Clean Code & CI/CD",
      description: "Our development team designs robust APIs, native apps, or web systems with automated testing and continuous integration pipelines.",
    },
    {
      icon: Settings,
      title: "3. Auditing & Launch",
      description: "Rigorous cyber security audits, performance reviews, and SEO setups ensure your platform launches with maximum velocity and zero risk.",
    },
  ];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-slate-950 py-16">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* HERO TITLE */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <span className="services-title-anim text-xs uppercase tracking-widest font-black text-cyan-400">Our Services</span>
          <h1 className="services-title-anim text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            High-Performance <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Digital Engineering
            </span>
          </h1>
          <p className="services-title-anim text-slate-400 text-lg max-w-2xl leading-relaxed mt-2">
            We cover the entire tech stack and online marketing channel setup. Learn about our services below or click for a deep-dive analysis.
          </p>
        </div>

        {/* DETAILED SERVICES SHOWCASE */}
        <section className="services-list-trigger flex flex-col gap-12 mb-28">
          {servicesData.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Globe;
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={service.slug}
                className="service-list-item"
              >
                <GlassCard className="p-8 md:p-12 hover:border-white/10" glowColor="none">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
                    
                    {/* Content Column */}
                    <div className={`lg:col-span-7 flex flex-col gap-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <span className={`inline-flex p-3 rounded-2xl w-fit bg-gradient-to-r ${service.themeColor} text-white shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white">{service.title}</h2>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{service.longDescription}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {service.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-4 mt-4">
                        <Link
                          href={`/services/${service.slug}`}
                          className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all flex items-center gap-2"
                        >
                          View service detail
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/hire-us"
                          className="px-5 py-2.5 rounded-full bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/35 border border-cyan-500/30 text-xs sm:text-sm font-semibold tracking-wide transition-all"
                        >
                          Hire us for this
                        </Link>
                      </div>
                    </div>

                    {/* Quick Specs Column */}
                    <div className={`lg:col-span-5 flex flex-col gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}>
                      <div>
                        <h4 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-3">Core Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.techStack.map((tech) => (
                            <span 
                              key={tech} 
                              className="px-3 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-300 font-mono text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-3">Audience & Reach</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Tailored for enterprise grade deployment, supporting custom security controls, low-latency scaling, and Generative Engine indexability.
                        </p>
                      </div>
                    </div>

                  </div>
                </GlassCard>
              </div>
            );
          })}
        </section>

        {/* METHODOLOGY SECTION */}
        <section className="process-trigger mb-12">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-purple-400">Our Workflow</span>
            <h2 className="text-3xl font-black text-white">How We Deliver Results</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodology.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="process-step-anim">
                  <GlassCard className="h-full hover:border-white/20 p-8 flex flex-col gap-6">
                    <span className="inline-block p-4 rounded-2xl w-fit bg-purple-500/10 text-purple-400">
                      <Icon className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
