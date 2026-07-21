"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SectionHeadingProps {
  number: string;
  heading: string;
  subtitle?: string;
}

export default function SectionHeading({ number, heading, subtitle }: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

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
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        numberRef.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          y: 40,
        },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full mb-10 md:mb-14 overflow-hidden">
      <div className="flex items-center gap-4 text-xs tracking-[0.2em] uppercase font-mono text-indigo-600 mb-3">
        <span ref={numberRef} className="inline-block select-none font-semibold">
          {number}
        </span>
        <div ref={lineRef} className="h-px grow bg-slate-200" />
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl font-serif text-slate-900 tracking-tight font-light will-change-transform"
        >
          {heading}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base font-light text-slate-600 max-w-md md:text-right font-sans tracking-wide leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
