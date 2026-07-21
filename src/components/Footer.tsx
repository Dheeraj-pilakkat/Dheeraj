"use client";
import React from "react";
import { portfolioContent } from "@/content";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white/80 backdrop-blur-sm py-8 md:py-12 mt-auto select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        {/* Copyright */}
        <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase order-3 md:order-1">
          © {currentYear} {portfolioContent.hero.name} // ALL RIGHTS RESERVED
        </div>

        {/* Social Links */}
        <nav aria-label="Social profiles" className="flex items-center gap-6 order-1 md:order-2">
          <a
            href="https://github.com/Dheeraj-pilakkat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono tracking-widest uppercase text-slate-600 hover:text-indigo-600 transition-colors duration-300 relative group py-1"
          >
            <span>GitHub</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/dheeraj-pilakkat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono tracking-widest uppercase text-slate-600 hover:text-indigo-600 transition-colors duration-300 relative group py-1"
          >
            <span>LinkedIn</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </a>
        </nav>

        {/* Back to top */}
        <button
          onClick={handleScrollToTop}
          className="group flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-slate-600 hover:text-slate-900 transition-colors duration-300 cursor-pointer order-2 md:order-3"
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <div className="flex items-center justify-center h-7 w-7 rounded-full border border-slate-200 text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-all duration-300">
            <ArrowUp className="h-3.5 w-3.5 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </footer>
  );
}
