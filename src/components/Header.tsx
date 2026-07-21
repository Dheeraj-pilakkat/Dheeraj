"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioContent } from "@/content";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "Expertise", href: "/#capabilities" },
    { name: "Process", href: "/#process" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
        {/* Brand / Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-lg md:text-xl font-serif font-medium tracking-tight text-slate-900 hover:text-indigo-600 transition-colors"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform duration-300" />
          <span>Dheeraj.Dev</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-indigo-600 transition-colors relative py-1 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          ))}
        </nav>

        {/* Availability & Contact CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/60 text-slate-700 text-[11px] font-mono tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{portfolioContent.hero.availability}</span>
          </div>

          <a
            href="mailto:dheerajthedeveloper@gmail.com"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium tracking-wide hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-slate-200 shadow-xl px-6 py-6 flex flex-col gap-5 z-50">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-4 text-sm font-mono tracking-wider uppercase text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-indigo-600 transition-colors py-1.5 border-b border-slate-100"
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{portfolioContent.hero.availability}</span>
            </div>
            <a
              href="mailto:dheerajthedeveloper@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-indigo-600 text-white text-sm font-medium tracking-wide hover:bg-indigo-700 transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
