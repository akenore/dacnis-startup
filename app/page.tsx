"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Code,
  CheckCircle,
  ExternalLink,
  Award,
  MapPin
} from "lucide-react";
import { servicesData } from "@/lib/services-data";
import GlassCard from "@/components/ui/GlassCard";

// Register ScrollTrigger for client-side execution
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Icon Mapping for service list
  const iconMap = {
    Globe: Globe,
    Smartphone: Smartphone,
    Cpu: Cpu,
    ShieldAlert: ShieldAlert,
    Search: Search,
    Megaphone: Megaphone,
  };

  useGSAP(() => {
    // Hero Text Entrance Animation
    const heroTimeline = gsap.timeline();
    heroTimeline.fromTo(
      ".hero-anim-item",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    // Floating cards interactive animations
    gsap.to(".floating-card-1", {
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut"
    });
    gsap.to(".floating-card-2", {
      y: -15,
      repeat: -1,
      yoyo: true,
      duration: 3.5,
      ease: "sine.inOut",
      delay: 0.5
    });

    // Services Scroll Animation
    gsap.fromTo(
      ".service-card-anim",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-trigger",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Partners Logos Animation
    gsap.fromTo(
      ".partner-anim-item",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".partners-trigger",
          start: "top 85%"
        }
      }
    );

    // Stats counter animation
    const statsItems = gsap.utils.toArray(".stat-number");
    statsItems.forEach((stat: any) => {
      const targetVal = parseInt(stat.getAttribute("data-target") || "0", 10);
      gsap.fromTo(stat,
        { textContent: "0" },
        {
          textContent: targetVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          snap: { textContent: 1 },
          onUpdate: function () {
            // Add '+' or other suffixes if needed
            if (stat.id === "stat-exp") {
              stat.innerHTML = stat.textContent + "+";
            } else if (stat.id === "stat-projects") {
              stat.innerHTML = stat.textContent + "+";
            } else if (stat.id === "stat-clients") {
              stat.innerHTML = stat.textContent + "+";
            } else {
              stat.innerHTML = stat.textContent;
            }
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-slate-950">

      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Heading and intro */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="hero-anim-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Tunisian Technology Leader & Digital Agency
            </div>

            <h1 ref={heroTextRef} className="hero-anim-item text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Engineering the <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>

            <p className="hero-anim-item text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
              We design, develop, and secure high-performance digital systems. From custom web platforms to native mobile apps and artificial intelligence, Dacnis delivers out-of-the-box innovation trusted globally.
            </p>

            <div className="hero-anim-item flex flex-wrap gap-4 mt-2">
              <Link
                href="/hire-us"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                Start with us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold tracking-wide hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Right Column: Creative floating glass assets */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[400px]">
            {/* Main Center Glow */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full blur-[100px] opacity-30 animate-pulse pointer-events-none" />

            {/* Floating Card 1: Fielmedina App */}
            <a
              href="https://www.fielmedina.com"
              target="_blank"
              rel="noopener noreferrer"
              className="floating-card-1 absolute z-20 left-4 top-10 w-60 p-5 rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-md shadow-2xl hover:border-purple-500/30 transition-colors block cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Smartphone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-wide">Featured App</p>
                  <p className="text-white font-black text-sm"><strong>Fielmedina App</strong></p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                Designed & built by Dacnis. High-performance offline map and local community engine.
              </p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[95%] h-full bg-purple-500 rounded-full" />
              </div>
            </a>

            {/* Floating Card 2: AI & Analytics */}
            <div className="floating-card-2 absolute z-15 right-4 bottom-10 w-64 p-5 rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-wide">Artificial Intelligence</p>
                  <p className="text-white font-black text-sm"><strong>AI Agent System</strong></p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                LLM prompt chains and semantic search structures deployed locally.
              </p>
              <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                <span>MODEL: Gemini 3.5</span>
                <span>STATUS: ACTIVE</span>
              </div>
            </div>

            {/* Visual background wireframe box */}
            <div className="absolute w-[350px] h-[350px] border border-white/5 rounded-3xl rotate-12 scale-90 pointer-events-none" />
            <div className="absolute w-[350px] h-[350px] border border-white/5 rounded-3xl -rotate-12 scale-100 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* TRUSTED BY / PARTNERS */}
      <section className="py-12 border-y border-white/5 bg-slate-950/40 relative z-10 partners-trigger">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Trusted Globally By</p>
            <p className="text-slate-300 text-sm font-semibold">Leading brands trust our execution</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: "Gisysco", url: "https://gisysco.com", logo: "/images/logo-gisysco.svg" },
              { name: "Sepat Express", url: "https://sepat-express.com", logo: "/images/sepat-express.png" },
              { name: "Koktahome", url: "https://koktahome.com", logo: "/images/koktahome.png" },
              { name: "Motobike", url: "https://www.motobike.com.tn", logo: "/images/motobike-logo.png" },
              { name: "Mustache Prod", url: "https://www.facebook.com/Mustachprod/", logo: "/images/mustache-prod.jpg" }
            ].map((p, idx) => (
              <a
                key={idx}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-anim-item flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 h-16 w-36"
              >
                {p.logo ? (
                  <Image
                    src={p.logo}
                    alt={`${p.name} Logo`}
                    width={110}
                    height={36}
                    className="max-h-10 w-auto object-contain"
                  />
                ) : (
                  <span className="text-slate-300 font-mono font-black text-sm tracking-wide">
                    {p.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CREATIVE SERVICES GRID */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 services-trigger">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs uppercase tracking-widest font-black text-cyan-400">Core Expertise</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Our Digital Solutions
          </h2>
          <p className="text-slate-400 text-base max-w-2xl">
            We provide deep technological skills and marketing muscle. Each service is customizable and backed by dedicated engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName] || Globe;
            return (
              <Link key={service.slug} href={`/services/${service.slug}`} className="service-card-anim block">
                <GlassCard
                  className="h-full group hover:border-white/20"
                  glowColor={
                    service.slug === "cyber-security"
                      ? "emerald"
                      : service.slug === "ai"
                        ? "cyan"
                        : "purple"
                  }
                >
                  <div className="flex flex-col gap-6 justify-between h-full">
                    <div>
                      {/* Icon with service gradients */}
                      <span className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${service.themeColor} text-white mb-6 shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </span>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      Learn details
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SPECIAL FOUNDER & FIELMEDINA APP SPOTLIGHT */}
      <section className="py-20 px-6 md:px-12 bg-slate-900/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative flex justify-center">
            {/* iPhone/Mobile layout mock */}
            <div className="w-[280px] h-[520px] rounded-[40px] border-4 border-slate-700 bg-slate-950 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-700 rounded-b-xl mx-auto w-32 z-30" /> {/* Speaker bar */}

              {/* Screen Content */}
              <div className="absolute inset-0 bg-slate-900 flex flex-col justify-between p-6 pt-10">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Fielmedina</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  {/* Mock Map Element */}
                  <div className="h-44 rounded-2xl bg-slate-800 border border-white/5 relative overflow-hidden flex items-center justify-center">
                    {/* Abstract map elements */}
                    <div className="absolute top-6 left-12 w-2 h-16 bg-slate-700/60 rotate-45" />
                    <div className="absolute top-10 left-6 w-2 h-20 bg-slate-700/60 -rotate-45" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    {/* Location Pin */}
                    <span className="relative z-10 p-3 rounded-full bg-purple-500/20 text-purple-400 ring-4 ring-purple-500/10">
                      <MapPin className="w-6 h-6 animate-bounce" />
                    </span>
                  </div>

                  <h4 className="text-white text-base font-bold">Discover Local Venues</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Access localized coordinates, map systems, and offline databases natively.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-slate-400 text-center font-mono">DEVELOPED BY DACNIS</span>
                  <a
                    href="https://www.fielmedina.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-purple-600/20 hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Get App
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              Flagship Innovation
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Proud Creators of <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Fielmedina Application
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Fielmedina represents our capabilities in full-scale mobile architecture and complex mapping systems. Deployed natively across iOS and Android, it serves thousands of local users with zero-lag routing, robust database sync, and a premium UI.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm leading-relaxed">
                  <strong>High Performance:</strong> Optimized native engines for fluid 60fps renders.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm leading-relaxed">
                  <strong>Offline First:</strong> Fully functional routing databases inside the device storage.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STATS SECTION */}
      <section ref={statsRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="text-center flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/5">
            <span id="stat-exp" data-target="14" className="stat-number text-3xl sm:text-4xl md:text-5xl font-black text-cyan-400">
              0
            </span>
            <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Years Combined Experience</span>
          </div>

          <div className="text-center flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/5">
            <span id="stat-projects" data-target="50" className="stat-number text-3xl sm:text-4xl md:text-5xl font-black text-purple-400">
              0
            </span>
            <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Projects Completed</span>
          </div>

          <div className="text-center flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/5">
            <span id="stat-clients" data-target="20" className="stat-number text-3xl sm:text-4xl md:text-5xl font-black text-pink-400">
              0
            </span>
            <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Trusted Brands</span>
          </div>

          <div className="text-center flex flex-col gap-2 p-6 rounded-2xl bg-white/5 border border-white/5">
            <span id="stat-apps" data-target="1" className="stat-number text-3xl sm:text-4xl md:text-5xl font-black text-emerald-400">
              0
            </span>
            <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Flagship App</span>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 px-6 md:px-12 relative z-10 max-w-5xl mx-auto text-center">
        <GlassCard className="relative overflow-hidden glow-cyan border-white/10 p-12 md:p-16 flex flex-col items-center gap-8">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl">
            Let's build something <br />
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              extraordinary together
            </span>
          </h2>

          <p className="text-slate-300 text-base max-w-lg leading-relaxed">
            Ready to scale your web platform, mobile app, search rankings, or integrate custom machine learning pipelines? Fill out our brief.
          </p>

          <Link
            href="/hire-us"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2"
          >
            Start With Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </GlassCard>
      </section>

    </div>
  );
}
