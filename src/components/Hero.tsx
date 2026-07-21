"use client";
import React, { useEffect, useRef, useState } from "react";
import { portfolioContent } from "@/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Code2, CheckCircle2 } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const scrollCueArrowRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"arch" | "stack" | "metrics">("arch");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const initTl = gsap.timeline({
        defaults: { ease: "power4.out", force3D: true },
        onComplete: () => {
          // Clean up GPU compositor layers post-entrance to ensure 60 FPS smooth cursor tracking
          if (headlineRef.current) {
            gsap.set(headlineRef.current.querySelectorAll(".hero-word"), { clearProps: "willChange,transform" });
          }
          if (brandRef.current) gsap.set(brandRef.current, { clearProps: "willChange,transform" });
          if (ctaRef.current) gsap.set(ctaRef.current, { clearProps: "willChange,transform" });
          if (terminalRef.current) gsap.set(terminalRef.current, { clearProps: "willChange,transform" });
        },
      });

      initTl.fromTo(
        brandRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.9 }
      );

      const words = headlineRef.current?.querySelectorAll(".hero-word");
      if (words && words.length > 0) {
        initTl.fromTo(
          words,
          { opacity: 0, y: 35, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.05,
          },
          "-=0.6"
        );
      }

      initTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      initTl.fromTo(
        terminalRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0 },
        "-=0.7"
      );

      initTl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      if (scrollCueArrowRef.current) {
        gsap.to(scrollCueArrowRef.current, {
          y: 5,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const slide1Words = portfolioContent.hero.slides[0].split(" ");

  const codeSnippets = {
    arch: `// Full-Stack Architecture Blueprint
export const systemSpec = {
  frontend: "Next.js 16 + React 19",
  styling: "Tailwind CSS v4",
  animations: "GSAP 3 + ScrollTrigger",
  backend: "Node.js Microservices",
  database: "PostgreSQL + Redis Caching",
  deployment: "Vercel Edge + Docker",
  uptime: "99.98% High Availability"
};`,
    stack: `// Engineering Stack Matrix
{
  "core": ["TypeScript", "JavaScript", "Python"],
  "frontend": ["Next.js", "React", "Tailwind", "GSAP"],
  "backend": ["Node.js", "Express", "tRPC", "GraphQL"],
  "data": ["PostgreSQL", "MongoDB", "Redis"],
  "devops": ["Docker", "GitHub Actions", "Vercel"]
}`,
    metrics: `// Live Performance Profiling
[STATUS: 200 OK] -> Latency: 18ms
[SEO]: 100/100  | [A11Y]: 100/100
[PERFORMANCE]: 100/100 | [PRACTICES]: 100/100
[BUILD]: Zero Layout Shift (CLS: 0.00)
[MOTION]: 60 FPS Hardware Accelerated`,
  };

  const copySnippet = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero Section"
      className="relative w-full min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 flex flex-col justify-between bg-[#FAFAFA] grid-pattern overflow-hidden select-none"
    >
      <h1 className="sr-only">Dheeraj Dev — Full-Stack Developer & Systems Architect</h1>

      {/* Decorative ambient gradient spots (pointer-events-none for 0 layout impact) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-indigo-500/5 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-violet-500/5 blur-[70px] sm:blur-[90px] rounded-full pointer-events-none" />

      {/* Top Branding & Availability Badge */}
      <div
        ref={brandRef}
        className="w-full flex items-center justify-between gap-4 z-10"
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase font-semibold">
            Full-Stack Software Engineer
          </span>
          <span className="hidden sm:inline-block text-slate-400 text-xs font-mono">
            // React • Next.js • Node • Architecture
          </span>
        </div>
      </div>

      {/* Main Hero Content Grid */}
      <div className="grow my-8 sm:my-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        {/* Left Column: Headline & Bio */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          <h2
            ref={headlineRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 font-light leading-[1.15] tracking-tight mb-4 sm:mb-6"
            style={{ perspective: "1000px" }}
          >
            {slide1Words.map((word, idx) => {
              const isAccent =
                word.toLowerCase().includes("purposeful") ||
                word.toLowerCase().includes("fast");
              return (
                <span
                  key={idx}
                  className={`hero-word inline-block mr-[0.25em] ${
                    isAccent ? "text-indigo-600 italic font-normal" : ""
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-6 sm:mb-8 font-sans">
            Specializing in high-performance web applications, scalable API infrastructure, and motion-driven digital products with architectural discipline.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
          >
            <a
              href="#work"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-medium text-sm tracking-wide shadow-md hover:bg-indigo-700 hover:shadow-indigo-500/20 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium text-sm tracking-wide shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
            >
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        {/* Right Column: Mobile-Optimized Full-Stack Terminal */}
        <div
          ref={terminalRef}
          className="lg:col-span-5 w-full bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl sm:shadow-2xl overflow-hidden font-mono text-xs"
        >
          {/* Terminal Window Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-400 text-[10px] sm:text-[11px] font-mono tracking-tight truncate max-w-[130px] sm:max-w-none">
                  dheeraj@fullstack: ~
                </span>
              </div>
            </div>

            {/* Touch-Optimized Tab Controls */}
            <div className="flex items-center justify-stretch sm:justify-start gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[10px] sm:text-[11px] w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("arch")}
                className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded transition-colors text-center font-mono ${
                  activeTab === "arch"
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Arch.ts
              </button>
              <button
                onClick={() => setActiveTab("stack")}
                className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded transition-colors text-center font-mono ${
                  activeTab === "stack"
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Stack.json
              </button>
              <button
                onClick={() => setActiveTab("metrics")}
                className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded transition-colors text-center font-mono ${
                  activeTab === "metrics"
                    ? "bg-indigo-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Metrics.sh
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-5 bg-slate-900/90 leading-relaxed overflow-x-auto min-h-[190px] sm:min-h-[220px] flex flex-col justify-between">
            <pre className="text-slate-300 font-mono text-[11px] sm:text-xs whitespace-pre-wrap break-words sm:break-normal">
              {codeSnippets[activeTab]}
            </pre>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-3.5 mt-3 border-t border-slate-800 text-[10px] sm:text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-mono text-slate-300">System Ready • Production Mode</span>
              </div>

              <button
                onClick={copySnippet}
                aria-label="Copy Snippet"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 sm:bg-transparent text-slate-300 hover:text-indigo-400 transition-colors w-full sm:w-auto justify-center sm:justify-start"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold font-mono">Copied!</span>
                  </>
                ) : (
                  <>
                    <Code2 className="h-3.5 w-3.5" />
                    <span className="font-mono">Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="w-full flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-200 text-slate-500 text-[10px] sm:text-xs font-mono tracking-wider uppercase z-10"
      >
        <span className="hidden sm:inline">Engineering Discipline & Motion</span>
        
        {/* Scroll Cue with isolated arrow target for infinite floating loop */}
        <div className="flex items-center gap-2 text-indigo-600">
          <span>Scroll to explore projects</span>
          <div ref={scrollCueArrowRef}>
            <ArrowDown className="h-3.5 w-3.5" />
          </div>
        </div>

        <span className="hidden sm:inline">Remote / Worldwide</span>
      </div>
    </section>
  );
}
