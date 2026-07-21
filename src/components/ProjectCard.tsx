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

    const ctx = gsap.context(() => {
      if (imageRef.current && containerRef.current) {
        gsap.fromTo(
          imageRef.current,
          { 
            yPercent: -6, 
            scale: 1.12 
          },
          {
            yPercent: 6,
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

    // 3D Tilt Effect on hover (desktop only)
    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const relX = (e.clientX - rect.left) / width - 0.5;
      const relY = (e.clientY - rect.top) / height - 0.5;
      
      const tiltX = -relY * 6;
      const tiltY = relX * 6;

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
          x: relX * 10,
          y: relY * 10,
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
      className="project-card-interactive group relative flex flex-col w-full bg-white border border-slate-200/90 rounded-2xl overflow-hidden p-5 md:p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-indigo-500/40 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Subtle hover gradient highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Image Container with Parallax */}
      <div
        ref={containerRef}
        className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60"
      >
        <Image
          ref={imageRef}
          src={project.image}
          alt={`Screenshot of project ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-100 will-change-transform select-none filter contrast-[1.02] group-hover:scale-105 transition-all duration-700"
          loading="lazy"
        />
        
        {/* Project Year Tag */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-indigo-600 font-mono text-[11px] font-semibold tracking-wider shadow-sm">
          {project.year}
        </div>
      </div>

      {/* Content Details */}
      <div className="flex flex-col flex-1 mt-6" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
            {project.title}
          </h3>

          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-slate-50 text-slate-600 group-hover:text-indigo-600 group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-all duration-300 shrink-0"
            aria-label={`View live demo of ${project.title}`}
          >
            <ArrowUpRight className="h-5 w-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        <p className="mt-3 text-sm md:text-base font-light leading-relaxed text-slate-600 font-sans tracking-wide">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-mono tracking-wide text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
