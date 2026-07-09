"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Detect touch device or reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReduced) {
      cursor.style.display = "none";
      return;
    }

    // Set initial position out of view
    gsap.set(cursor, { x: -100, y: -100 });

    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xSetter(mouseX);
      ySetter(mouseY);
    };

    window.addEventListener("mousemove", onMouseMove);

    const onMouseEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const isProjectCard = target.classList.contains("project-card-interactive");
      const isLens = target.classList.contains("lens-hover-container") || target.classList.contains("engineer-lens-container");
      
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
        scale: isProjectCard ? 6 : 3.5,
        backgroundColor: "rgba(255, 90, 0, 0.15)", // Warm orange translucent
        border: "1px solid rgba(255, 90, 0, 0.6)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 2,
        opacity: 1,
        backgroundColor: "#FF5A00", // Solid warm orange
        border: "1px solid transparent",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], .project-card-interactive, .magnetic-hover, .lens-hover-container, .engineer-lens-container"
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
        
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    attachListeners();

    // Use MutationObserver to handle dynamically rendered elements
    const observer = new MutationObserver(() => {
      attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], .project-card-interactive, .magnetic-hover, .lens-hover-container, .engineer-lens-container"
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-1 z-[9999]   h-4 w-4 rounded-full bg-[#FF5A00] mix-blend-screen transition-transform duration-100 ease-out hidden md:block"
      />
    </>
  );
}
