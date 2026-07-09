"use client";
import React from "react";
import { portfolioContent } from "@/content";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    // Leverage programmatic Lenis scrolling if initialized, avoiding browser scroll fighting stutters
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
    <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-sm py-8 md:py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        {/* Copyright */}
        <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase order-3 md:order-1">
          © {currentYear} {portfolioContent.hero.name} // ALL RIGHTS RESERVED
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 order-1 md:order-2">
          {portfolioContent.contact.socials.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 hover:text-accent transition-colors duration-300 relative group py-1"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </div>

        {/* Back to top */}
        <button
          onClick={handleScrollToTop}
          className="group flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer order-2 md:order-3"
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <div className="flex items-center justify-center h-6 w-6 rounded-full border border-white/10 text-zinc-400 group-hover:text-white group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
            <ArrowUp className="h-3 w-3 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </footer>
  );
}
