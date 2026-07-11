"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const card = cardRef.current;
    if (!card) return;

    // Wrap ScrollTrigger in gsap.context for proper cleanup
    const ctx = gsap.context(() => {
      if (imageRef.current && containerRef.current) {
        gsap.fromTo(
          imageRef.current,
          { 
            yPercent: -8, 
            scale: 1.15 
          },
          {
            yPercent: 8,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    // 2. 3D Tilt Effect on hover
    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const relX = (e.clientX - rect.left) / width - 0.5;
      const relY = (e.clientY - rect.top) / height - 0.5;
      
      const tiltX = -relY * 8;
      const tiltY = relX * 8;

      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
        scale: 1.01,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: relX * 12,
          y: relY * 12,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) {
      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      ctx.revert();
      if (!isTouch) {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card-interactive group relative flex flex-col w-full bg-[#1C1C1C] border border-white/5 rounded-2xl overflow-hidden p-4 md:p-6 transition-all duration-500 hover:border-accent/30 hover:bg-[#222] will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Visual background gloss highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Image Container with Parallax */}
      <div
        ref={containerRef}
        className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/5"
      >
        <Image
          ref={imageRef}
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-100 will-change-transform select-none filter brightness-[0.85] contrast-[1.05] group-hover:brightness-100 transition-[filter] duration-500"
          loading="lazy"
        />
        
        {/* Project Year Tag */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] tracking-widest text-accent font-mono">
          {project.year}
        </div>
      </div>

      {/* Content Details */}
      <div className="flex flex-col flex-1 mt-6" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-serif font-light text-zinc-200 tracking-tight group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.02] text-zinc-400 group-hover:text-accent group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
          <Link href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full w-full">
            <ArrowUpRight className="h-5 w-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
          </div>
        </div>

        <p className="mt-3 text-sm font-light leading-relaxed text-zinc-400 font-sans tracking-wide">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono tracking-wider text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
