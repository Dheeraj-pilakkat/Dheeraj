# Antigravity Prompt — Plank Dev Portfolio

Paste this whole block into Antigravity as the build brief.

---

## Project

Build a premium, dark-themed, animation-driven personal portfolio website for **Plank Dev**, a full-stack developer (React / Next.js / Node / MERN). Reference inspiration for motion quality and visual polish: olyyx.webflow.io (agency-grade animation, spacing, and typography confidence) — but the CONTENT STRUCTURE must be for a solo developer, not an agency. Do not add "our team," fake client logos, or a multi-person "about us." This is one person's site.

## Stack

- Next.js 14+ (App Router), TypeScript
- Tailwind CSS for layout/utility styling
- GSAP + ScrollTrigger for scroll-driven reveals
- Lenis (or `studio-freight/lenis`) for smooth scroll
- Framer Motion only if needed for simple UI micro-interactions (page transitions, hover states) — GSAP owns scroll timelines
- All images as placeholders for now: use `https://picsum.photos/seed/{unique-seed}/{width}/{height}` so each placeholder is visually distinct. Structure the `<Image>` components so real assets can be dropped in later without touching layout code (use a single `projects.ts` / `content.ts` data file for image paths, not hardcoded inline).

## Visual direction

- Dark theme: near-black background (`#0a0a0a` / `#0d0d0d`), not pure black — should feel like ink, not a placeholder
- One accent color used sparingly — a warm gold/bronze OR a stark off-white, pick one and use it only for accents (underline on hover, cursor dot, small labels), never as a large fill
- Large, confident display typography for hero and section headers — a serif or high-contrast sans for headlines (e.g. a pairing like "Fraunces" or "Instrument Serif" for display + "Inter" or "Neue Montreal"-style grotesk for body/UI). Big type is what makes this feel luxurious, not decoration.
- Generous whitespace/negative space — luxury reads through restraint, not density
- Subtle grain/noise texture overlay on the background for tactility
- No stock "gradient blob SaaS" aesthetic — this should feel more editorial/architectural

## Motion requirements

- Custom cursor: small dot that scales/inverts on hover over links and project cards
- Smooth scroll via Lenis synced with GSAP ScrollTrigger
- Hero: staggered text reveal on load (headline splits into lines/words, animates up + fades in), not a generic fade
- Section headers: reveal on scroll with a clip-path or mask wipe, not just opacity fade
- Project cards: image scales/parallaxes slightly on scroll, subtle tilt or magnetic hover on desktop
- Marquee/ticker somewhere (e.g. tech stack strip or "Available for freelance work" strip) — infinite horizontal scroll, pause on hover
- Page transitions between sections should feel intentional, not instant cuts
- Respect `prefers-reduced-motion` — provide a reduced-motion fallback (simple fades, no parallax/tilt)

## Page structure (single-page, section-based, `/` route)

1. **Hero**
   - Name/brand: "Plank Dev"
   - One-line positioning statement (placeholder copy: "Full-stack developer building fast, purposeful web products")
   - Small availability indicator ("Available for freelance work")
   - Scroll-cue animation

2. **Selected Work** (the centerpiece — most animation budget goes here)
   - Grid or vertical stacked list of 4–6 project cards
   - Each card: placeholder image, project name, 1-line description, tech tags, link (can be `#`)
   - Data-driven from a `content/projects.ts` array so it's trivial to swap in real projects later (mention UIAudit.js, RoadmapAI, and client work like eye-care site as placeholder entries the user can rename)

3. **Capability / What I do**
   - 3–4 capability blocks (e.g. "Frontend Engineering," "Full-Stack Product Builds," "Performance & DX Tooling," "Freelance Delivery") — not a generic agency "services" grid, framed as personal skill areas

4. **Process** (optional, keep short)
   - 3-step horizontal or vertical timeline: Discover → Build → Ship, with a sentence each

5. **About**
   - Short first-person bio block, placeholder text, one placeholder portrait image
   - Tech stack marquee (React, Next.js, Node, TypeScript, etc.)

6. **Contact / CTA**
   - Large closing headline ("Let's build something"), email link, social links (GitHub, X, LinkedIn placeholders)
   - No contact form needed yet — a mailto link is enough for v1

7. **Footer**
   - Minimal: copyright, back-to-top, socials

## Code quality requirements

- Fully responsive (mobile: simplify/reduce animation complexity, don't just shrink desktop layout)
- Component-driven: `Hero.tsx`, `ProjectCard.tsx`, `Marquee.tsx`, `Cursor.tsx`, `SectionHeading.tsx`, etc. — no monolithic page file
- All copy and image paths pulled from a single `content.ts` (or `content.json`) file so it's a content-editing job, not a code-editing job, when real content is ready
- Lighthouse performance in mind: lazy-load below-fold images, avoid layout shift, keep GSAP bundle usage lean
- Clean, commented code — I'll be extending this myself in Antigravity/VS Code afterward

## Deliverable

Fully working Next.js project, dev-server runnable with `npm run dev`, no missing dependencies, no placeholder "TODO" left unresolved in code (only content is placeholder, code must be complete).
