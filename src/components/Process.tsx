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
    <section
      id="process"
      aria-label="Development Process"
      ref={containerRef}
      className="py-16 md:py-24 w-full bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full relative">
        <SectionHeading
          number="03 // Methodology"
          heading="Development Process"
          subtitle="A systematic, milestone-driven workflow engineered to ensure performance, communication, and flawless delivery."
        />

        <div className="relative mt-10 md:mt-16">
          <div className="hidden md:block absolute top-[32px] left-0 right-0 h-[2px] bg-slate-200" />
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[32px] left-0 right-0 h-[2px] bg-indigo-600 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {portfolioContent.process.map((item, index) => (
              <div
                key={index}
                className="process-step-item relative flex flex-col items-start group z-10"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full border border-slate-200 bg-white text-indigo-600 font-mono font-semibold text-base tracking-widest mb-6 shadow-sm group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-all duration-500">
                  {item.step}
                </div>

                <h3 className="text-2xl md:text-3xl font-serif text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-base font-light leading-relaxed text-slate-600 font-sans tracking-wide max-w-xs">
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
