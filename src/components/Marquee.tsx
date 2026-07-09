"use client";
import React from "react";

interface MarqueeProps {
  items: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
}

export default function Marquee({ items, speed = 20, reverse = false }: MarqueeProps) {
  // Duplicate items twice to ensure continuous smooth infinite scrolling
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm">
      <div 
        className="flex w-max items-center gap-8 md:gap-16 whitespace-nowrap hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 md:gap-8">
            <span className="text-3xl md:text-5xl font-serif font-light text-zinc-100 tracking-tight">
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-accent opacity-50" />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
