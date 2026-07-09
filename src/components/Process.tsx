"use client";
import React, { useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";
import { portfolioContent } from "@/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Animate line loader across steps
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Fade-reveal each step
      gsap.fromTo(
        ".process-step-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="py-10 md:py-16 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full relative">
        <SectionHeading
          number="03 // Methodology"
          title="Development Process"
          subtitle="A systematic, milestone-driven approach engineered to ensure optimal performance, communication, and clean delivery."
        />

        <div className="relative mt-8 md:mt-12">
          {/* Continuous timeline connector line (desktop only) */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[32px] left-0 right-0 h-[1px] bg-white/10"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {portfolioContent.process.map((item, index) => (
              <div
                key={index}
                className="process-step-item relative flex flex-col items-start group"
              >
                {/* Step indicator circle */}
                <div className="flex items-center justify-center h-16 w-16 rounded-full border border-white/10 bg-[#0a0a0a] text-accent text-base font-mono tracking-widest mb-4 group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-500 z-10">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif text-zinc-200 mb-3 tracking-tight group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg font-light leading-relaxed text-zinc-400 font-sans tracking-wide max-w-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
