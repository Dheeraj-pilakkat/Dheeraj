"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register ScrollTrigger globally
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    // Save Lenis instance globally for programmatic scroll triggers (e.g. back-to-top button)
    (window as any).lenis = lenis;

    // Synchronize ScrollTrigger with Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    // Bind Lenis RAF to GSAP Ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable lag smoothing to prevent syncing hiccups
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
