"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReduced) {
      cursor.style.display = "none";
      return;
    }

    // Set initial offscreen position
    gsap.set(cursor, { x: -100, y: -100, force3D: true });

    // High performance quickTo with snappy 0.08s lerp for instant responsive tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onMouseEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const isProjectCard = target.classList.contains("project-card-interactive");
      const isLens = target.classList.contains("lens-hover-container");
      
      if (isLens) {
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          overwrite: "auto",
        });
        return;
      }

      gsap.to(cursor, {
        scale: isProjectCard ? 4 : 2.5,
        backgroundColor: "rgba(79, 70, 229, 0.12)",
        border: "1.5px solid rgba(79, 70, 229, 0.6)",
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        backgroundColor: "#4F46E5",
        border: "1px solid transparent",
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], .project-card-interactive, .lens-hover-container"
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
        
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    attachListeners();

    const observer = new MutationObserver(() => {
      attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], .project-card-interactive, .lens-hover-container"
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 -ml-1.5 -mt-1.5 rounded-full bg-indigo-600 hidden md:block"
    />
  );
}
