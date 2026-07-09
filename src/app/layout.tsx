import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import { portfolioContent } from "@/content";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Inter({
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
      className={`${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-zinc-100 selection:bg-[#FF5A00]/30 selection:text-white">
        {/* Grain Noise Overlay for Premium Texture */}
        <div className="grain-overlay" />
        
        {/* Smooth Scroll via Lenis Wrapper */}
        <SmoothScroll>
          {/* Custom Cursor follower */}
          <Cursor />
          
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
