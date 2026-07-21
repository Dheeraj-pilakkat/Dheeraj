"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Marquee from "./Marquee";
import { portfolioContent } from "@/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const secretBio = [
  "My true passion lies in building ultra-clean next-gen platforms, choreographing GSAP motion sequences, and optimizing production stability. I build engines that scale seamlessly under heavy enterprise traffic.",
  "My stack philosophy is strict: Next.js edge runtimes, robust TypeScript structures, and modular Tailwind utilities. No boilerplate, no heavy templates—just raw, performant codebases built to load instantly.",
  "I collaborate with founders worldwide to scope and deliver high-impact MVPs on rigorous schedules. From setting up solid CI/CD paths to database profiling, I translate ambiguity into working software.",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bioContainerRef = useRef<HTMLDivElement>(null);
  const revealTextRef = useRef<HTMLDivElement>(null);
  const lensRingRef = useRef<HTMLDivElement>(null);
  const standardTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bio-text-para",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      if (imageRef.current && imageContainerRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.15, yPercent: -8 },
          {
            scale: 1.02,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let removeMouseListeners: (() => void) | undefined;

    if (!isTouch) {
      const container = bioContainerRef.current;
      const lensRing = lensRingRef.current;
      const revealText = revealTextRef.current;
      const standardText = standardTextRef.current;

      if (container && lensRing && revealText && standardText) {
        const onMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(lensRing, {
            left: x,
            top: y,
            duration: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });

          revealText.style.clipPath = `circle(80px at ${x}px ${y}px)`;
          revealText.style.setProperty("-webkit-clip-path", `circle(80px at ${x}px ${y}px)`);

          standardText.style.setProperty("mask-image", `radial-gradient(circle 80px at ${x}px ${y}px, transparent 80px, black 81px)`);
          standardText.style.setProperty("-webkit-mask-image", `radial-gradient(circle 80px at ${x}px ${y}px, transparent 80px, black 81px)`);
        };

        const onMouseEnter = () => {
          gsap.to(lensRing, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(revealText, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(lensRing, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          revealText.style.clipPath = `circle(0px at 0px 0px)`;
          revealText.style.setProperty("-webkit-clip-path", "circle(0px at 0px 0px)");

          standardText.style.setProperty("mask-image", "none");
          standardText.style.setProperty("-webkit-mask-image", "none");
        };

        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseenter", onMouseEnter);
        container.addEventListener("mouseleave", onMouseLeave);

        gsap.set(lensRing, { scale: 0, opacity: 0 });
        revealText.style.clipPath = `circle(0px at 0px 0px)`;
        revealText.style.setProperty("-webkit-clip-path", "circle(0px at 0px 0px)");
        standardText.style.setProperty("mask-image", "none");
        standardText.style.setProperty("-webkit-mask-image", "none");

        removeMouseListeners = () => {
          container.removeEventListener("mousemove", onMouseMove);
          container.removeEventListener("mouseenter", onMouseEnter);
          container.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    }
 
    return () => {
      ctx.revert();
      if (removeMouseListeners) removeMouseListeners();
    };
  }, []);

  return (
    <section
      id="about"
      aria-label="About Profile"
      ref={containerRef}
      className="py-16 md:py-24 w-full bg-white border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
        <SectionHeading
          number="04 // Profile"
          heading="About Dheeraj"
          subtitle="A perspective on software engineering, user interface design, and architectural clarity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <div
              ref={imageContainerRef}
              className="relative aspect-4/5 w-full max-w-sm mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md"
            >
              <Image
                ref={imageRef}
                src={portfolioContent.about.portraitImage}
                alt="Portrait of Dheeraj, Full-Stack Developer"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 select-none filter contrast-[1.02] hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto w-full">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="block text-xl font-serif font-bold text-slate-900">4+</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Live Products</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="block text-xl font-serif font-bold text-slate-900">100%</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">TypeScript</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="block text-xl font-serif font-bold text-slate-900">60FPS</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">GSAP Motion</span>
              </div>
            </div>
          </div>

          <div
            ref={bioContainerRef}
            className="lens-hover-container relative lg:col-span-7 flex flex-col justify-center md:cursor-none py-4"
          >
            <div ref={standardTextRef} className="flex flex-col gap-5 md:gap-6">
              {portfolioContent.about.bio.map((para, index) => (
                <p
                  key={index}
                  className="bio-text-para text-base md:text-lg font-light leading-relaxed text-slate-700 font-sans tracking-wide"
                >
                  {para}
                </p>
              ))}
            </div>

            <div
              ref={revealTextRef}
              className="absolute top-4 left-0 right-0 hidden md:flex flex-col gap-5 md:gap-6 select-none pointer-events-none transition-opacity duration-300"
            >
              {secretBio.map((para, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg leading-relaxed text-indigo-600 font-sans tracking-wide font-medium"
                >
                  {para}
                </p>
              ))}
            </div>

            <div
              ref={lensRingRef}
              className="hidden md:block pointer-events-none absolute h-[160px] w-[160px] -ml-[80px] -mt-[80px] rounded-full border border-indigo-600 bg-indigo-500/10 backdrop-blur-[1px] shadow-[0_0_25px_rgba(79,70,229,0.2),inset_0_0_20px_rgba(79,70,229,0.15)] z-10"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 mb-6">
          <span className="text-[11px] font-mono tracking-widest uppercase text-indigo-600 font-semibold">
            Engineering Stack & Tech Ecosystem
          </span>
        </div>
        <Marquee items={portfolioContent.about.techStack} speed={30} />
      </div>
    </section>
  );
}
