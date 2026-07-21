import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Terminal, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 bg-[#FAFAFA] grid-pattern select-none relative overflow-hidden"
    >
      {/* Decorative ambient gradient spots */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full flex flex-col items-center text-center z-10">
        {/* 404 Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono tracking-widest uppercase font-semibold mb-6 shadow-sm">
          <AlertTriangle className="h-3.5 w-3.5 text-indigo-600" />
          <span>Error 404 // Route Not Found</span>
        </div>

        {/* Primary Page Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-slate-900 tracking-tight font-light leading-tight mb-4">
          Lost in the Digital Void<span className="text-indigo-600">.</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-lg mb-8 font-sans">
          The requested URL path or endpoint does not exist in this architecture blueprint. It may have been moved or deleted.
        </p>

        {/* System Error Console Card */}
        <div className="w-full bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 p-5 font-mono text-xs text-left shadow-2xl mb-10 overflow-x-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 text-slate-400 text-[11px]">dheeraj@router: ~/errors</span>
            </div>
            <Terminal className="h-4 w-4 text-slate-500" />
          </div>
          <p className="text-rose-400 font-semibold mb-1">
            [HTTP 404]: GET /unknown-route -&gt; STATUS: NOT_FOUND
          </p>
          <p className="text-slate-400 mb-1">
            [STACK_TRACE]: Route resolve failed at Next.js App Router edge dispatch.
          </p>
          <p className="text-emerald-400">
            [RECOMMENDED_ACTION]: Return to home or navigate to verified endpoints.
          </p>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-medium text-sm tracking-wide shadow-md hover:bg-indigo-700 hover:shadow-indigo-500/20 transition-all duration-300 w-full sm:w-auto"
          >
            <Home className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/#work"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium text-sm tracking-wide shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Explore Selected Work</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
