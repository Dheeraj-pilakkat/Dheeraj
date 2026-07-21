"use client";
import React from "react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFAFA] grid-pattern select-none"
    >
      <h1 className="sr-only">Loading Dheeraj Dev Portfolio</h1>

      {/* Center Spinner & Brand Indicator */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full border-2 border-indigo-100 border-t-indigo-600 animate-spin" />
        <span className="absolute h-3 w-3 rounded-full bg-indigo-600 animate-ping" />
      </div>

      {/* Monospaced Status Text */}
      <div className="flex flex-col items-center text-center gap-2">
        <span className="text-sm font-mono tracking-widest text-slate-900 uppercase font-semibold">
          Dheeraj.Dev
        </span>
        <span className="text-xs font-mono tracking-wider text-indigo-600 uppercase animate-pulse">
          Initializing Engine & Choreographing Motion...
        </span>
      </div>

      {/* Bottom Progress Bar Indicator */}
      <div className="absolute bottom-12 w-48 h-1 rounded-full bg-slate-200 overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
