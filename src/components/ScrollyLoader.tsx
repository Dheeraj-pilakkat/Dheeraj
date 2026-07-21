"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, CheckCircle2, Cpu, Terminal, Sparkles } from "lucide-react";

const storySteps = [
  {
    step: "01",
    tag: "SYSTEM_INIT",
    title: "Booting Dheeraj.Dev Architecture Engine",
    detail: "Initializing Next.js 16 App Router edge runtime and server components...",
  },
  {
    step: "02",
    tag: "STACK_MANIFEST",
    title: "Compiling Production Technology Stack",
    detail: "TypeScript • React 19 • Node.js Microservices • PostgreSQL & Redis",
  },
  {
    step: "03",
    tag: "MOTION_SYSTEM",
    title: "Synchronizing GSAP 3 & Lenis Smooth Scroll",
    detail: "60 FPS hardware accelerated compositor layers and zero judder RAF ticker...",
  },
  {
    step: "04",
    tag: "SYSTEM_READY",
    title: "Full-Stack System Ready for Exploration",
    detail: "Sub-millisecond API latency, 100/100 Web Vitals, and WCAG accessibility.",
  },
];

export default function ScrollyLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user already saw intro in current session
    if (typeof window !== "undefined" && sessionStorage.getItem("scrolly_intro_seen")) {
      setIsDismissed(true);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsDismissed(true);
      return;
    }

    // Lock body scroll while scrollytelling loader is active
    document.body.style.overflow = "hidden";
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      // Counter animation from 0 to 100%
      gsap.to(obj, {
        val: 100,
        duration: 3.2,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentVal = Math.round(obj.val);
          setProgress(currentVal);
          if (counterRef.current) {
            counterRef.current.innerText = `${currentVal}%`;
          }

          // Step index progression based on percentage thresholds
          if (currentVal < 25) setCurrentStepIdx(0);
          else if (currentVal < 60) setCurrentStepIdx(1);
          else if (currentVal < 90) setCurrentStepIdx(2);
          else setCurrentStepIdx(3);
        },
        onComplete: () => {
          setIsLoaded(true);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, []);

  const handleEnter = () => {
    if (!containerRef.current) return;

    // Save session flag
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrolly_intro_seen", "true");
    }

    // Curtain curtain wipe transition into portfolio
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "power4.inOut",
      force3D: true,
      onComplete: () => {
        setIsDismissed(true);
        document.body.style.overflow = "auto";
        if ((window as any).lenis) {
          (window as any).lenis.start();
        }
      },
    });
  };

  if (isDismissed) return null;

  const activeStep = storySteps[currentStepIdx];

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex flex-col justify-between p-6 md:p-16 bg-[#FAFAFA] text-slate-900 grid-pattern select-none overflow-hidden"
    >
      <h1 className="sr-only">Dheeraj Dev Interactive System Scrolly Intro</h1>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top Header Status Bar */}
      <div className="w-full flex items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-mono tracking-wider uppercase font-semibold">
            Dheeraj.Dev
          </span>
          <span className="hidden sm:inline-block text-slate-400 text-xs font-mono">
            // Full-Stack Scrollytelling Preloader
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>INITIALIZING</span>
        </div>
      </div>

      {/* Center Scrollytelling Step Showcase */}
      <div className="grow my-auto flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-10 w-full">
        {/* Step Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-indigo-600 text-xs font-mono tracking-widest uppercase font-semibold mb-6">
          <Terminal className="h-3.5 w-3.5" />
          <span>{activeStep.tag} ({activeStep.step} / 04)</span>
        </div>

        {/* Step Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 font-light tracking-tight mb-4 min-h-[70px] sm:min-h-[90px] flex items-center justify-center">
          {activeStep.title}
        </h2>

        {/* Step Detail */}
        <p className="text-slate-600 text-sm sm:text-base font-mono tracking-wide max-w-xl mb-8 min-h-[40px] flex items-center justify-center">
          {activeStep.detail}
        </p>

        {/* Large Percentage Counter */}
        <div className="relative flex items-center justify-center my-4">
          <span
            ref={counterRef}
            className="text-6xl sm:text-8xl md:text-9xl font-serif font-extralight text-slate-900 tracking-tight"
          >
            0%
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar & Enter Action Button */}
      <div className="w-full flex flex-col items-center gap-6 z-10">
        {/* Animated Progress Bar Track */}
        <div className="w-full max-w-2xl h-1.5 rounded-full bg-slate-200 overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="h-full bg-indigo-600 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Enter Action Button or Loading Cue */}
        <div className="h-14 flex items-center justify-center w-full">
          {isLoaded ? (
            <button
              onClick={handleEnter}
              className="group flex items-center gap-3 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-medium text-sm tracking-wide shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="h-4 w-4 text-indigo-200" />
              <span>Enter Experience</span>
              <ArrowDown className="h-4 w-4 transform group-hover:translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
              <span>Compiling Architecture</span>
              <span className="inline-block animate-bounce">...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
