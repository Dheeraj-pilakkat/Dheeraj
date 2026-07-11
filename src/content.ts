// src/content.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string; // Picsum seed or other URL
  link: string;
  year: string;
}

export interface Capability {
  title: string;
  description: string;
  details: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface PortfolioContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    name: string;
    slides: string[];
    availability: string;
    backgroundImage: string;
  };
  projects: Project[];
  capabilities: Capability[];
  process: ProcessStep[];
  about: {
    bio: string[];
    portraitImage: string;
    techStack: string[];
  };
  contact: {
    headline: string;
    subheadline: string;
    email: string;
    socials: SocialLink[];
  };
}

export const portfolioContent: PortfolioContent = {
  meta: {
    title: "Dheeraj Dev | Premium Full-Stack Portfolio",
    description: "Personal portfolio of Dheeraj , building high-performance Next.js applications and robust MERN stack backends with architectural precision and motion design.",
  },
  hero: {
    name: "Dheeraj.Dev",
    slides: [
      "Full-stack developer building fast, purposeful web products",
      "Focusing on architectural clarity, performant systems, and modular codebase engineering"
    ],
    availability: "Available for freelance work",
    backgroundImage: "/pic3.jpeg",
  },
  projects: [
    {
      id: "uiaudit-js",
      title: "UIAudit.js",
      description: "An automated visual regression testing library for headless Chrome.",
      tags: ["TypeScript", "Node.js", "Puppeteer", "Pixelmatch"],
      image: "/uiaudit.png",
      link: "https://www.npmjs.com/package/uiaudit.js",
      year: "2026",
    },
    {
      id: "roadmap-ai",
      title: "RoadmapAI",
      description: "Generative knowledge graphs mapped to professional engineering paths.",
      tags: ["Next.js", "FastAPI", "OpenAI", "PostgreSQL"],
      image: "/roadmapai.png",
      link: "https://roadmapai-three.vercel.app/",
      year: "2025",
    },
    {
      id: "lumin-eyecare",
      title: "Lumin Eye-Care",
      description: "Premium practice portal with direct booking pipelines and client records.",
      tags: ["React", "Express", "Tailwind CSS", "MongoDB"],
      image: "/lumineye.png",
      link: "https://lumineye.vercel.app/",
      year: "2024",
    },
    {
      id: "hyper-cache",
      title: "HyperCache API",
      description: "Ultra-low latency key-value middleware designed for Next.js Edge runtimes.",
      tags: ["TypeScript", "Redis", "Cloudflare Workers"],
      image: "https://picsum.photos/seed/hypercache/1200/800",
      link: "#",
      year: "2024",
    },
  ],
  capabilities: [
    {
      title: "Frontend Engineering",
      description: "Crafting fluid, high-fidelity interfaces with strict attention to typography, transitions, and loading states.",
      details: ["Next.js & App Router architecture", "GSAP ScrollTrigger integrations", "Tailwind & custom design systems", "Web Vitals & SEO optimization"],
    },
    {
      title: "Full-Stack Product Builds",
      description: "Designing end-to-end applications from database architecture to secure API layers and scalable deployments.",
      details: ["Node.js / Express servers", "Relational & NoSQL database schemas", "JWT/OAuth security protocols", "TRPC & REST API interfaces"],
    },
    {
      title: "Performance & DX Tooling",
      description: "Creating developer tools, packages, and automation configurations to improve speed and code quality.",
      details: ["Custom CLI automation scripts", "CI/CD testing pipelines", "Package creation & bundling", "Webpack / Vite optimization"],
    },
    {
      title: "Freelance Delivery",
      description: "Translating ambiguous business needs into concrete, high-impact technical solutions on clear timelines.",
      details: ["Scoping & system blueprints", "Milestone-driven execution", "Interactive client updates", "Post-handoff technical support"],
    },
  ],
  process: [
    {
      step: "01",
      title: "Discover",
      description: "We break down your goals, analyze technological constraints, and design the software architecture before writing a line of code.",
    },
    {
      step: "02",
      title: "Build",
      description: "Iterative development with clean, componentized TypeScript, real-time preview staging, and ongoing performance profiling.",
    },
    {
      step: "03",
      title: "Ship",
      description: "Rigorous testing, SEO optimization, and secure deployment to production-ready edge servers with bulletproof fallback systems.",
    },
  ],
  about: {
    bio: [
      "I am Dheeraj , a solo full-stack developer obsessed with the intersection of architecture, user experience, and animation. I spend my time building products that load instantly, feel natural to interact with, and solve real commercial problems.",
      "My development philosophy is rooted in architectural restraint and typographer's discipline: clean codebases, rich editorial layouts, and micro-animations that communicate state rather than distract.",
      "Whether collaborating with founders to take an MVP from zero to one or writing specialized tooling to solve engineering bottlenecks, I aim for production-grade reliability and fluid interactive flow.",
    ],
    portraitImage: "/pic1.jpeg",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "GSAP",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
      "Framer Motion",
      "GraphQL",
      "Redis",
      "Docker",
      "Git",
    ],
  },
  contact: {
    headline: "Let's build something",
    subheadline: "Have a project in mind or looking to hire a full-stack engineer? Drop me a message and let's bring it to life.",
    email: "hello@Dheeraj.dev",
    socials: [
      { name: "GitHub", url: "https://github.com/Dheeraj-pilakkat" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/dheeraj-pilakkat/" },
      // { name: "X / Twitter", url: "https://x.com" },
    ],
  },
};
