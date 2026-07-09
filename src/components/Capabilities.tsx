"use client";
import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { portfolioContent } from "@/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MatrixTextProps {
  text: string;
  delay?: number;
}

function MatrixText({ text, delay = 0 }: MatrixTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = containerRef.current;
    if (!element) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>-_/[]{}—=+*^?!#%&ｦｧｨｩｪｫｬｭｮｯ";
    const duration = 1.0; // seconds
    const fps = 25;
    const interval = 1000 / fps;
    const totalFrames = duration * fps;

    let frame = 0;

    const startEffect = () => {
      if (animationRef.current) clearInterval(animationRef.current);
      
      animationRef.current = window.setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        
        const decoded = text.split("").map((char, index) => {
          if (char === " ") return " ";
          
          const threshold = index / text.length;
          if (progress >= threshold) {
            return char;
          }
          
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");

        setDisplayText(decoded);

        if (frame >= totalFrames) {
          setDisplayText(text);
          if (animationRef.current) clearInterval(animationRef.current);
        }
      }, interval);
    };

    const initialText = text.split("").map(c => c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]).join("");
    setDisplayText(initialText);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      onEnter: () => {
        setTimeout(startEffect, delay * 1000);
      },
      onEnterBack: () => {
        setTimeout(startEffect, delay * 1000);
      }
    });

    return () => {
      trigger.kill();
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [text, delay]);

  return (
    <span ref={containerRef} className="font-mono text-[9px] md:text-[10px] tracking-wider text-zinc-200 uppercase select-none">
      {displayText}
    </span>
  );
}

const capSentences = [
  "// GLYPH DECODING: ACCESSIBLE DOM STRUCTURES",
  "// SYS_INIT: CONNECTING API TERMINALS & DATABASE PIPES",
  "// METRICS: COMPILING ASSETS AT SUB-MILLISECOND LATENCY",
  "// EXEC_FLOW: TRANSLATING AMBIGUOUS SCOPE TO PRODUCTION",
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" ref={containerRef} className="py-10 md:py-16 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
        <SectionHeading
          number="02 // Expertise"
          title="Core Capabilities"
          subtitle="Specialized skillsets built on top of extensive architectural standards and clean development design."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mt-8">
          {portfolioContent.capabilities.map((cap, index) => (
            <div
              key={index}
              className="capability-item group flex flex-col border-t border-white/5 pt-5 hover:border-accent/30 transition-colors duration-500"
            >
              {/* Header Info */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono tracking-widest text-accent">
                  0{index + 1}
                </span>
                <span className="hidden sm:inline-block">
                  <MatrixText text={capSentences[index]} delay={index * 0.15} />
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-serif text-zinc-200 mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                {cap.title}
              </h3>
              
              {/* Description */}
              <p className="text-base md:text-lg font-light leading-relaxed text-zinc-400 font-sans tracking-wide max-w-lg mb-4">
                {cap.description}
              </p>

              {/* Sub-details checklist */}
              <ul className="flex flex-wrap gap-2 mt-auto">
                {cap.details.map((detail) => (
                  <li
                    key={detail}
                    className="px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/5 text-xs font-mono tracking-wider text-zinc-300"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
