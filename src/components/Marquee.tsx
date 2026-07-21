"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeProps {
  items: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
}

export default function Marquee({ items, speed = 25, reverse = false }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Quadruple items to ensure a seamless infinite seamless loop
  const marqueeItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Enforce GSAP ticker synchronization (matches Lenis RAF ticker rate for 0 judder)
    const tween = gsap.to(track, {
      xPercent: reverse ? 50 : -50,
      ease: "none",
      duration: speed,
      repeat: -1,
      force3D: true,
    });

    const onMouseEnter = () => tween.pause();
    const onMouseLeave = () => tween.play();

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      tween.kill();
      if (container) {
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [speed, reverse]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-5 border-y border-slate-200 bg-slate-50/80 backdrop-blur-sm select-none"
    >
      <div 
        ref={trackRef}
        className="flex w-max items-center gap-8 md:gap-16 whitespace-nowrap will-change-transform"
      >
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 md:gap-8">
            <span className="text-2xl md:text-4xl font-serif font-light text-slate-800 tracking-tight">
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-indigo-600 opacity-60 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
