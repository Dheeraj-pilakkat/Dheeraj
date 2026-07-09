"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { portfolioContent } from "@/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const orangeScreenRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const scrollLabelRef = useRef<HTMLSpanElement>(null);
  const sentence1Ref = useRef<HTMLParagraphElement>(null);
  const sentence2Ref = useRef<HTMLParagraphElement>(null);
  const engineerContainerRef = useRef<HTMLDivElement>(null);
  const engineerStandardTextRef = useRef<HTMLDivElement>(null);
  const engineerRevealTextRef = useRef<HTMLDivElement>(null);
  const engineerLensRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register scroll trigger inside client mount
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A. Reduced Motion Fallback: No pinning, just simple fades
    if (prefersReduced) {
      const tl = gsap.timeline();
      tl.fromTo(brandRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      tl.fromTo([slide1Ref.current, slide2Ref.current], { opacity: 0 }, {
        opacity: 1,
        stagger: 0.3,
        duration: 0.8,
      });
      tl.fromTo(engineerContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.4");
      const s1Letters = sentence1Ref.current?.querySelectorAll(".reveal-char");
      const s2Letters = sentence2Ref.current?.querySelectorAll(".reveal-char");
      if (s1Letters) tl.fromTo(s1Letters, { opacity: 0.15 }, { opacity: 1, duration: 0.6 }, "-=0.6");
      if (s2Letters) tl.fromTo(s2Letters, { opacity: 0.15 }, { opacity: 1, duration: 0.6 }, "-=0.4");
      return () => {
        tl.kill();
      };
    }

    const ctx = gsap.context(() => {
      // 1. Staggered reveal of Slide 1 on load
      const initTl = gsap.timeline();
      initTl.fromTo(
        brandRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      const initChars = slide1Ref.current?.querySelectorAll(".slide1-char");
      if (initChars && initChars.length > 0) {
        initTl.fromTo(
          initChars,
          { opacity: 0, y: 4 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: { amount: 0.8 },
            ease: "power1.out",
          },
          "-=0.6"
        );
      }

      initTl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

      initTl.fromTo(
        engineerContainerRef.current,
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Continuous bouncing cue animation (registered in context for automatic cleanup)
      gsap.fromTo(
        scrollCueRef.current,
        { y: 0 },
        {
          y: 6,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 1.2,
        }
      );

      // 2. Timeline Scroll-Driven Pinning & Slides Reveal
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Scroll distance (200% of viewport height)
          scrub: 1, // Smooth scrub tracking
          pin: stickyRef.current || true, // Pin inner container to prevent React removeChild unmount crashes
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update scroll label based on scroll progress
            if (scrollLabelRef.current) {
              const progress = self.progress;
              if (progress < 0.5) {
                scrollLabelRef.current.innerText = "Scroll to explore (1/2)";
              } else {
                scrollLabelRef.current.innerText = "Revealed. Scroll down (2/2)";
              }
            }
          }
        },
      });

      // Orange Overlay slides/reveals from top-right to cover background (Border Radius 0)
      scrollTl.fromTo(
        orangeScreenRef.current,
        {
          xPercent: 80,
          yPercent: -80,
          opacity: 0.15,
        },
        {
          xPercent: 0,
          yPercent: 0,
          opacity: 0.25, // Soft overlay on top of black background & grayscale image
          duration: 2.6, // spans across slide transitions (1.3 * 2)
          ease: "none",
        },
        0 // starts immediately on scrub start
      );

      // Slide 1 Out: typewrite out (backspace)
      const s1Chars = slide1Ref.current?.querySelectorAll(".slide1-char");
      if (s1Chars && s1Chars.length > 0) {
        scrollTl.to(s1Chars, {
          opacity: 0,
          y: -4,
          stagger: { amount: 1.0, from: "end" },
          duration: 0.2,
          ease: "power1.inOut",
        }, 0);
      }

      // Slide 2 Visibility
      scrollTl.fromTo(
        slide2Ref.current,
        { visibility: "hidden" },
        { visibility: "visible", duration: 0.01 },
        1.3
      );

      // Slide 2 In: typewrite in
      const s2Chars = slide2Ref.current?.querySelectorAll(".slide2-char");
      if (s2Chars && s2Chars.length > 0) {
        scrollTl.fromTo(
          s2Chars,
          { opacity: 0, y: 4 },
          {
            opacity: 1,
            y: 0,
            stagger: { amount: 1.0 },
            duration: 0.2,
            ease: "power1.out",
          },
          1.3
        );
      }

      // Sentence 1 letters reveal (Slide 1 phase)
      const s1Letters = sentence1Ref.current?.querySelectorAll(".reveal-char");
      if (s1Letters && s1Letters.length > 0) {
        scrollTl.fromTo(
          s1Letters,
          { opacity: 0.08, y: 2 },
          {
            opacity: 1,
            y: 0,
            stagger: { amount: 0.8 },
            duration: 0.2,
            ease: "power1.out",
          },
          0.2
        );
      }

      // Sentence 2 letters reveal (Slide 2 phase)
      const s2Letters = sentence2Ref.current?.querySelectorAll(".reveal-char");
      if (s2Letters && s2Letters.length > 0) {
        scrollTl.fromTo(
          s2Letters,
          { opacity: 0.08, y: 2 },
          {
            opacity: 1,
            y: 0,
            stagger: { amount: 0.8 },
            duration: 0.2,
            ease: "power1.out",
          },
          1.4
        );
      }
    }, containerRef);

    // Mouse-following magnifying glass for the orange text stamp (desktop only)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let removeEngineerMouseListeners: (() => void) | undefined;

    if (!isTouch) {
      const container = engineerContainerRef.current;
      const lensRing = engineerLensRingRef.current;
      const revealText = engineerRevealTextRef.current;
      const standardText = engineerStandardTextRef.current;

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

          // Reveal secret text inside the lens
          revealText.style.clipPath = `circle(80px at ${x}px ${y}px)`;
          revealText.style.setProperty("-webkit-clip-path", `circle(80px at ${x}px ${y}px)`);

          // Hide standard text inside the lens
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

        // Initial state
        gsap.set(lensRing, { scale: 0, opacity: 0 });
        revealText.style.clipPath = `circle(0px at 0px 0px)`;
        revealText.style.setProperty("-webkit-clip-path", "circle(0px at 0px 0px)");
        standardText.style.setProperty("mask-image", "none");
        standardText.style.setProperty("-webkit-mask-image", "none");

        removeEngineerMouseListeners = () => {
          container.removeEventListener("mousemove", onMouseMove);
          container.removeEventListener("mouseenter", onMouseEnter);
          container.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    }
 
    return () => {
      ctx.revert();
      if (removeEngineerMouseListeners) removeEngineerMouseListeners();
    };
  }, []);

  const slide1Words = portfolioContent.hero.slides[0].split(" ");
  const slide2Words = portfolioContent.hero.slides[1].split(" ");

  const sentence1Text = "01 // ARCHITECTURAL PRECISION ENGRAVED INTO EVERY PIXEL";
  const sentence2Text = "02 // LOW-LATENCY SPEED AND ENGINE ROBUSTNESS";
 
  const sentence1Letters = sentence1Text.split("");
  const sentence2Letters = sentence2Text.split("");

  return (
    // Outer scroll container (height creates scroll-trigger track)
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#0A0A0A]">
      {/* Sticky/Pinned full screen viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between px-4 py-12 md:px-8 md:py-16 select-none overflow-hidden"
      >
        {/* Background Image & Orange Overlay sliding in from bottom right */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src={portfolioContent.hero.backgroundImage}
            alt="Hero Background Architecture"
            fill
            sizes="100vw"
            className="object-cover opacity-30 filter grayscale contrast-[1.1] brightness-[0.9]"
            priority
          />
          <div
            ref={orangeScreenRef}
            className="absolute inset-0 bg-[#FF5A00] mix-blend-color opacity-0"
          />
        </div>

        {/* Header Name & Live Status */}
        <div
          ref={brandRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full z-20"
        >
          <span className="text-2xl md:text-3xl font-serif tracking-tight text-white font-medium hover:text-accent transition-colors duration-300">
            {portfolioContent.hero.name}
          </span>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-mono text-zinc-200">
              {portfolioContent.hero.availability}
            </span>
          </div>
        </div>

        {/* Center Slides Container */}
        <div className="relative grow flex items-center justify-start w-full max-w-none z-10 min-h-[40vh]">
          {/* Slide 1 */}
          <div
            ref={slide1Ref}
            className="absolute inset-0 flex items-center justify-start w-full"
          >
            <h1 className="text-[8vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] font-serif font-light text-zinc-200 leading-[1.12] tracking-tight">
              {slide1Words.map((word, wIdx) => {
                const isAccent =
                  word.toLowerCase().includes("purposeful") ||
                  word.toLowerCase().includes("fast");
                const chars = word.split("");
                return (
                  <React.Fragment key={wIdx}>
                    <span className={`inline-block whitespace-nowrap ${isAccent ? "text-accent italic font-normal tracking-wide" : ""}`}>
                      {chars.map((char, cIdx) => (
                        <span key={cIdx} className="slide1-char inline-block will-change-transform">
                          {char}
                        </span>
                      ))}
                    </span>
                    {wIdx < slide1Words.length - 1 && (
                      <span className="slide1-char inline-block w-[0.25em]">
                        {"\u00A0"}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </h1>
          </div>

          {/* Slide 2 */}
          <div
            ref={slide2Ref}
            className="absolute inset-0 flex items-center justify-start w-full invisible"
          >
            <h1 className="text-[8vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] font-serif font-light text-zinc-200 leading-[1.12] tracking-tight">
              {slide2Words.map((word, wIdx) => {
                const isAccent =
                  word.toLowerCase().includes("architectural") ||
                  word.toLowerCase().includes("restraint") ||
                  word.toLowerCase().includes("modular");
                const chars = word.split("");
                return (
                  <React.Fragment key={wIdx}>
                    <span className={`inline-block whitespace-nowrap ${isAccent ? "text-accent italic font-normal tracking-wide" : ""}`}>
                      {chars.map((char, cIdx) => (
                        <span key={cIdx} className="slide2-char inline-block will-change-transform opacity-0">
                          {char}
                        </span>
                      ))}
                    </span>
                    {wIdx < slide2Words.length - 1 && (
                      <span className="slide2-char inline-block w-[0.25em] opacity-0">
                        {"\u00A0"}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </h1>
          </div>

          {/* Scattered Scroll-Reveal Sentences (hidden sm:block keeps clean layout on mobile) */}
          <p
            ref={sentence1Ref}
            className="absolute top-32 right-4 md:right-12 text-right max-w-50 md:max-w-xs text-[10px] font-bold tracking-[0.25em] text-zinc-200 uppercase select-none hidden sm:block pointer-events-none"
          >
            {sentence1Letters.map((char, index) => (
              <span
                key={index}
                className={`reveal-char inline-block will-change-transform ${
                  char === " " ? "w-[0.25em]" : ""
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>

          <p
            ref={sentence2Ref}
            className="absolute top-[70%] left-4 md:left-16 max-w-50 md:max-w-xs text-[10px] font-bold tracking-[0.25em] text-zinc-200 uppercase select-none hidden sm:block pointer-events-none"
          >
            {sentence2Letters.map((char, index) => (
              <span
                key={index}
                className={`reveal-char inline-block will-change-transform ${
                  char === " " ? "w-[0.25em]" : ""
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        {/* Prominent Orange Full-Stack Engineer text to attract attention */}
        <div
          ref={engineerContainerRef}
          className="engineer-lens-container absolute bottom-24 right-4 md:right-12 z-20 text-right cursor-none py-4 px-2"
        >
          {/* Standard Text Layer */}
          <div ref={engineerStandardTextRef} className="flex flex-col items-end">
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-[#FF5A00] uppercase font-black block mb-2">
              Specialization
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black italic text-[#FF5A00] tracking-tight drop-shadow-[0_0_35px_rgba(255,90,0,0.45)] leading-none whitespace-nowrap">
              Full-Stack Engineer
            </h2>
          </div>

          {/* Secret Text Layer (revealed via clip-path) */}
          <div
            ref={engineerRevealTextRef}
            className="absolute top-4 left-0 right-2 flex flex-col items-end select-none pointer-events-none transition-opacity duration-300"
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-white uppercase font-black block mb-2">
              Specialization
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black italic text-white tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.45)] leading-none whitespace-nowrap">
              Systems Architect
            </h2>
          </div>

          {/* Magnifying Glass Lens Ring */}
          <div
            ref={engineerLensRingRef}
            className="hidden md:block pointer-events-none absolute h-[160px] w-[160px] -ml-[80px] -mt-[80px] rounded-full border border-white bg-white/5 backdrop-blur-[1px] shadow-[0_0_25px_rgba(255,255,255,0.18),inset_0_0_20px_rgba(255,255,255,0.12)] z-10"
          />
        </div>

        {/* Footer Scroll Indicator */}
        <div
          ref={scrollCueRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full text-zinc-200 text-xs font-mono tracking-widest uppercase border-t border-white/5 pt-8 z-20"
        >
          <span className="font-light">Full-Stack Engineer</span>

          {/* Scroll cue with status indicators */}
          <div className="flex items-center gap-3">
            <span ref={scrollLabelRef}>Scroll to explore (1/2)</span>
            <div className="flex items-center justify-center h-8 w-8 rounded-full border border-accent/20 text-accent">
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>

          <span className="font-light">Based remote / Worldwide</span>
        </div>
      </div>
    </div>
  );
}
