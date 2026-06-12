"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, Heart, Shield, Award } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Title fade-in
    gsap.fromTo(
      ".about-title-anim",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Timeline line drawing
    gsap.fromTo(
      ".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-trigger",
          start: "top 70%",
          end: "bottom 80%",
          scrub: true
        }
      }
    );

    // Timeline nodes fade in
    gsap.fromTo(
      ".timeline-node",
      { x: (i) => (i % 2 === 0 ? -40 : 40), opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-trigger",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );

    // Values section grid
    gsap.fromTo(
      ".value-card-anim",
      { y: 55, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".values-trigger",
          start: "top 80%"
        }
      }
    );
  }, { scope: containerRef });

  const milestones = [
    {
      year: "Sept 2025",
      title: "Startup Founded",
      description: "Dacnis is officially incorporated in Sousse, bringing together senior software engineers and marketing consultants with over 14 years of combined industry experience.",
    },
    {
      year: "Oct 2025",
      title: "Fielmedina Partnership",
      description: "Assumed engineering and UI design ownership of the flagship Fielmedina App, optimizing its native architecture and local mapping sync.",
    },
    {
      year: "2026",
      title: "Global Projects & Trust",
      description: "Building next-generation solutions trusted by global brands and local leaders, including Gisysco, Sepat Express, Koktahome, Motobike, and Mustache Prod.",
    },
  ];

  const values = [
    {
      icon: Star,
      title: "Innovation First",
      description: "We don't follow trends; we write them. Using Next.js, AI integrations, and modern animation engines to stand out.",
      color: "text-cyan-400",
      bgGlow: "rgba(6, 182, 212, 0.1)",
    },
    {
      icon: Shield,
      title: "Absolute Security",
      description: "Cybersecurity is baked into our development lifecycle. We ensure code is audit-proof, secure, and GDPR-ready.",
      color: "text-emerald-400",
      bgGlow: "rgba(16, 185, 129, 0.1)",
    },
    {
      icon: Heart,
      title: "Client Centricity",
      description: "We form long-term partnerships. Trusted by Gisysco.com, sepat-express.com, Koktahome.com, and motobike.com.tn.",
      color: "text-purple-400",
      bgGlow: "rgba(139, 92, 246, 0.1)",
    },
  ];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-slate-950 py-16">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* HERO TITLE */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <span className="about-title-anim text-xs uppercase tracking-widest font-black text-cyan-400">About Us</span>
          <h1 className="about-title-anim text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            We are the team behind <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Dacnis Startup
            </span>
          </h1>
          <p className="about-title-anim text-slate-400 text-lg max-w-2xl leading-relaxed mt-2">
            Based in Tunis, Tunisia, we are a collective of software engineers, security analysts, and digital marketers dedicated to building premium products.
          </p>
        </div>

        {/* MISSION & VISION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-28">
          <GlassCard className="p-8 hover:border-white/10" glowColor="none">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Our mission is to lead the digital transformation of local and international businesses by engineering bulletproof software solutions. We combine advanced programming languages, AI APIs, and strict security patterns to build apps that perform flawlessly at scale.
            </p>
          </GlassCard>
          
          <GlassCard className="p-8 hover:border-white/10" glowColor="none">
            <h2 className="text-2xl font-bold text-white mb-4">Our Culture</h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We operate on the principles of speed, clean architecture, and continuous learning. As developers, we appreciate codebases that are easy to maintain and debug, which is why we architect our clients' platforms with the exact same rigor we use for our own Fielmedina App.
            </p>
          </GlassCard>
        </section>

        {/* TIMELINE OF MILESTONES */}
        <section className="timeline-trigger mb-28">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-purple-400">Our Journey</span>
            <h2 className="text-3xl font-black text-white">Milestones & Growth</h2>
          </div>

          <div className="relative max-w-3xl mx-auto py-8">
            {/* Center Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-800" />
            {/* Animated drawing line */}
            <div className="timeline-line absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600 origin-top scale-y-0" />

            {/* Timeline nodes */}
            <div className="flex flex-col gap-16">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div 
                    key={milestone.year}
                    className={`timeline-node flex flex-col md:flex-row items-center relative ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 z-10" />

                    {/* Content Box */}
                    <div className={`w-full md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                      <GlassCard className="p-6" hoverable={true}>
                        <span className="inline-block text-xs font-bold font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-2">{milestone.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{milestone.description}</p>
                      </GlassCard>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="values-trigger mb-12">
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">Philosophy</span>
            <h2 className="text-3xl font-black text-white">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="value-card-anim">
                  <GlassCard className="h-full hover:border-white/20 p-8 flex flex-col gap-6">
                    <span 
                      className={`inline-block p-4 rounded-2xl w-fit ${val.color}`}
                      style={{ backgroundColor: val.bgGlow }}
                    >
                      <Icon className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{val.description}</p>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* HIRE US CALLOUT */}
        <section className="mt-20 text-center max-w-4xl mx-auto">
          <GlassCard className="p-10 border-white/5 flex flex-col items-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Want to cooperate with our team?
            </h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              We look forward to developing your web/mobile services and securing your database systems. Let's start a business discussion.
            </p>
            <Link
              href="/hire-us"
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
