"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { portfolioContent } from "@/content";

export default function SelectedWork() {
  return (
    <section id="work" className="py-10 md:py-16 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
        <SectionHeading
          number="01 // Selected Projects"
          title="Crafted Works"
          subtitle="A collection of production-grade systems, automated tooling, and custom products built for speed and utility."
        />
        
        {/* Editorial Grid: Asymmetrical spacing for premium agency design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {portfolioContent.projects.map((project, index) => {
            // Asymmetrical top offset on desktop to make layout feel editorial/premium
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`w-full ${
                  isEven ? "md:translate-y-0" : "md:translate-y-6"
                }`}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
