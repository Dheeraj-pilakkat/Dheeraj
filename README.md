# Dheeraj.Dev — Modern Full-Stack Engineer & Systems Architect Portfolio

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2_(App_Router)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.15_(ScrollTrigger)-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![UIAudit Score](https://img.shields.io/badge/UIAudit-100%2F100_Excellent-10B981?style=for-the-badge&logo=checkmarx&logoColor=white)](#-audit--quality-compliance)

A state-of-the-art, high-performance portfolio website engineered for **Dheeraj**, a solo Full-Stack Software Engineer & Systems Architect. Featuring an editorial porcelain light theme, interactive scrollytelling loader, 60 FPS hardware-accelerated motion systems, interactive terminal blueprints, and 100/100 WCAG accessibility compliance.

---

## ✨ Key Features & Architectural Highlights

- ⚡ **Interactive Scrollytelling Preloader ([ScrollyLoader.tsx](src/components/ScrollyLoader.tsx))**:
  Sequential system compilation milestones (`01 // SYSTEM_INIT` to `04 // SYSTEM_READY`) featuring an animated 0% to 100% counter, session storage memory, and an architectural curtain-wipe entrance transition.
  
- 💻 **Interactive Full-Stack Terminal ([Hero.tsx](src/components/Hero.tsx))**:
  Live interactive developer console showcasing system architecture specs (`Arch.ts`), tech matrix (`Stack.json`), and live performance benchmarks (`Metrics.sh`) with touch-friendly tab switching and one-click code copy.

- 🎨 **60 FPS Hardware-Accelerated Motion**:
  GSAP 3 + ScrollTrigger synchronized with Lenis smooth scrolling. Uses GPU compositor layer management (`force3D: true`) and zero-judder RAF ticker integration.

- 🔍 **Magnifying Lens Bio Inspection ([About.tsx](src/components/About.tsx))**:
  Interactive cursor lens revealing hidden engineering bio notes upon hover over portrait framing.

- 🌊 **WebGL Raymarched Fluid Canvas ([Contact.tsx](src/components/Contact.tsx))**:
  Light-mode interactive WebGL fluid canvas background providing dynamic micro-animations behind the contact action portal.

- 📱 **Mobile-First Touch Architecture**:
  Fully responsive drawer menu navigation ([Header.tsx](src/components/Header.tsx)), touch-optimized terminal controls, fluid clamp typography, and zero-overflow layout grids.

- ♿ **100/100 WCAG & SEO Audit Score**:
  Fully validated with `uiaudit.js` across Performance, SEO, and Accessibility standards. Includes explicit keyboard skip links, `role="status"` live regions, and semantic landmark tags.

---

## 🛠️ Technology Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Framework & Core** | [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), CSS Custom Variables, [Lucide Icons](https://lucide.dev/) |
| **Typography** | `Plus Jakarta Sans` (Sans-Serif), `Instrument Serif` (Editorial Serif), Monospace |
| **Motion & Scroll** | [GSAP 3.15](https://gsap.com/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Lenis Smooth Scroll](https://lenis.darkroom.engineering/) |
| **Audit & Tooling** | [UIAudit.js](https://www.npmjs.com/package/uiaudit.js), ESLint, PostCSS |

---

## 📁 Repository Structure

```text
plank/
├── public/
│   ├── pic.jpg                 # Profile portrait image
│   ├── uiaudit.png             # Project showcase preview
│   ├── roadmapai.png           # Project showcase preview
│   ├── lumineye.png            # Project showcase preview
│   └── nammudeKozhikode.png    # Project showcase preview
├── src/
│   ├── app/
│   │   ├── globals.css         # Light-theme tokens, custom scrollbars, & grid pattern
│   │   ├── layout.tsx          # Root layout with accessibility skip link & fonts
│   │   ├── page.tsx            # Main single-page application entry point
│   │   ├── loading.tsx         # Custom Next.js loading route component
│   │   └── not-found.tsx       # Custom 404 error page with terminal console
│   ├── components/
│   │   ├── ScrollyLoader.tsx   # Interactive scrollytelling intro preloader
│   │   ├── Header.tsx          # Sticky navigation header & mobile drawer menu
│   │   ├── Hero.tsx            # Headline reveal & interactive code terminal
│   │   ├── SelectedWork.tsx    # Asymmetrical project grid section
│   │   ├── ProjectCard.tsx     # 3D hover tilt project card component
│   │   ├── Capabilities.tsx    # Engineering expertise matrix
│   │   ├── Process.tsx         # Development methodology timeline connector
│   │   ├── About.tsx           # Bio profile, portrait frame, & lens interaction
│   │   ├── Marquee.tsx         # RAF-synced infinite tech stack marquee
│   │   ├── Contact.tsx         # WebGL fluid canvas & email copy toast button
│   │   ├── Footer.tsx          # Minimal footer with back-to-top control
│   │   ├── Cursor.tsx          # 60 FPS GPU-accelerated custom trailing cursor
│   │   └── SmoothScroll.tsx    # Lenis + GSAP ticker synchronization wrapper
│   └── content.ts              # Single source of truth content & project data
├── package.json
└── README.md
```

---

## 📊 Audit & Quality Compliance

The application achieves a **Perfect 100/100 Score** across all App Router routes audited via `uiaudit.js`:

```text
┌──────────────────────────────────────────────────────────────────┐
│                           🔍  UIAudit                            │
│                            ./src/app                             │
└──────────────────────────────────────────────────────────────────┘

Overall Score:  100/100  Excellent ✓   (4 files scanned)

  Performance     100/100  ██████████  No issues ✓
  SEO             100/100  ██████████  No issues ✓
  Accessibility   100/100  ██████████  No issues ✓

  ✅ All checks passed. 0 accessibility or performance issues.
```

---

## 🚀 Getting Started Locally

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm** / **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Dheeraj-pilakkat/Dheeraj.git
   cd Dheeraj
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Run UIAudit verification**:
   ```bash
   npx uiaudit audit ./src/app
   ```

---

## 📬 Contact & Links

- **Developer**: Dheeraj Pilakkat
- **Email**: [dheerajthedeveloper@gmail.com](mailto:dheerajthedeveloper@gmail.com)
- **GitHub**: [github.com/Dheeraj-pilakkat](https://github.com/Dheeraj-pilakkat)
- **LinkedIn**: [linkedin.com/in/dheeraj-pilakkat](https://www.linkedin.com/in/dheeraj-pilakkat/)
