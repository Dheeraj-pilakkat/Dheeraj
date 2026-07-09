import React from "react";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0a0a0a] text-zinc-100 overflow-x-hidden">
      {/* Hero section */}
      <Hero />

      {/* Selected Work section */}
      <SelectedWork />

      {/* Capabilities / Expertise section */}
      <Capabilities />

      {/* Development Process section */}
      <Process />

      {/* About Profile section */}
      <About />

      {/* Contact & Call To Action section */}
      <Contact />

      {/* Footer component */}
      <Footer />
    </main>
  );
}
