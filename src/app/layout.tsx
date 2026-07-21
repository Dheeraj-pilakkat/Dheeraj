import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import ScrollyLoader from "@/components/ScrollyLoader";
import { portfolioContent } from "@/content";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: portfolioContent.meta.title,
  description: portfolioContent.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-indigo-500/15 selection:text-indigo-950 font-sans">
        {/* Accessible Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:font-mono focus:text-xs"
        >
          Skip to main content
        </a>

        {/* Global Accessible Site Heading */}
        <h1 className="sr-only">Dheeraj Dev — Full-Stack Software Engineer & Systems Architect</h1>

        {/* Custom Tailored Scrollytelling Intro Loader */}
        <ScrollyLoader />

        {/* Grain Noise Overlay for Premium Texture */}
        <div className="grain-overlay" />
        
        {/* Smooth Scroll via Lenis Wrapper */}
        <SmoothScroll>
          {/* Custom Cursor follower */}
          <Cursor />

          {/* Sticky Navigation Header */}
          <Header />
          
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
