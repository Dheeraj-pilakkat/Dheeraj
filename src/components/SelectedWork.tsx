"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { portfolioContent } from "@/content";

export default function SelectedWork() {
  return (
    <section
      id="work"
      aria-label="Selected Projects"
      className="py-16 md:py-24 w-full bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
        <SectionHeading
          number="01 // Selected Work"
          heading="Crafted Systems & Products"
          subtitle="Production-grade full-stack applications, developer tooling, and modern digital platforms built for speed and reliability."
        />
        
        {/* Asymmetrical Grid Layout for Editorial Polish */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioContent.projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`w-full ${
                  isEven ? "md:translate-y-0" : "md:translate-y-8"
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
