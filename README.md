# Dacnis Startup Website

Welcome to the official Next.js codebase for the **Dacnis** startup website. This multi-page application is designed for modern web indexing (SEO) and Generative Engine Optimization (GEO/LMO) for AI systems. It features clean Tailwind CSS (v4) styles, smooth GSAP transitions, and fully responsive layouts.

---

## 🚀 Getting Started

First, run the development server:

```bash
bun dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Architecture & Directories

We use a modular, component-driven architecture to make the application easy to maintain, debug, and expand:

```text
├── app/
│   ├── layout.tsx         # Global layout (Geist font, Navbar, Footer, JSON-LD Schema)
│   ├── globals.css        # Global CSS (Tailwind imports, custom color variables, grid layers)
│   ├── page.tsx           # Home page (Hero, Trust bar, Services preview, Stats, CTA)
│   ├── about/
│   │   └── page.tsx       # About page (Milestones, mission, core values, timeline)
│   ├── services/
│   │   ├── page.tsx       # Services listing catalog page
│   │   └── [slug]/
│   │       └── page.tsx   # Dynamic service details page (FAQs, process steps)
│   ├── hire-us/
│   │   └── page.tsx       # Contact form wrapped in Suspense (service pre-selection)
│   ├── sitemap.ts         # Dynamic SEO Sitemap generator
│   └── robots.ts          # Search engines crawler guidelines
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Floating glassmorphic header navigation
│   │   └── Footer.tsx     # Footer including office info & trust links
│   └── ui/
│       └── GlassCard.tsx  # Reusable panel with backdrop-blur & glow gradients
├── lib/
│   └── services-data.ts   # Centralized database for services copy, features & FAQs
└── public/
    └── images/            # Standard logos, custom illustrations, and partner logos
```

---

## 🛠️ How to Maintain & Update Content

### 1. Modifying or Adding Services
All text, capabilities, FAQs, and configurations for our 6 core services (Web Dev, Mobile Dev, AI, Cyber Security, SEO, Marketing) are stored in [services-data.ts](file:///Users/aslan/Desktop/Devs/dacnis/startup/lib/services-data.ts).
- To edit any text, simply change the string in `servicesData`.
- To add a new service, append a new object conforming to the `Service` interface. The details page (`/services/new-slug`) and dynamic sitemap will be generated automatically.

### 2. Customizing Global Styles
Themes and variables are declared in [globals.css](file:///Users/aslan/Desktop/Devs/dacnis/startup/app/globals.css). We leverage **Tailwind v4** syntax for defining inline variables:
```css
@theme inline {
  --color-background: var(--background);
  /* Add custom theme tokens here */
}
```

---

## ⚙️ GSAP & React 19 Best Practices
Since Next.js pre-renders pages on the server (SSR), GSAP animations must run **only** on the client side:
1. **Client Hook**: We use the `@gsap/react` plugin's `useGSAP` hook, which handles target cleaning and prevents memory leaks upon route change.
2. **Registration**: Always register plugins safely under window scope.
3. **SSG Compatibility**: Wrap components that require layout calculations inside `"use client"` and execute animations inside `useGSAP`.

Example:
```typescript
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MyComponent() {
  const containerRef = useRef(null);
  useGSAP(() => {
    gsap.from(".element", { opacity: 0, scrollTrigger: { trigger: ".trigger" } });
  }, { scope: containerRef });
  
  return <div ref={containerRef} className="trigger"><div className="element" /></div>;
}
```

---

## 🔍 SEO & AI Crawler (LMO/GEO) Optimizations
We implement cutting-edge indexing patterns so that AI models (Gemini, ChatGPT) and search engines recommend Dacnis:
1. **JSON-LD Schema**: Located in [layout.tsx](file:///Users/aslan/Desktop/Devs/dacnis/startup/app/layout.tsx). It defines Dacnis as a `ProfessionalService` in Tunisia, citing Fielmedina App ownership and trusted clients.
2. **Metadata**: Each page handles custom titles and Open Graph tags.
3. **Structured Content**: FAQ accordions and lists help LLMs parse precise solutions.
4. **Sitemap & Robots**: Standard compliant [sitemap.ts](file:///Users/aslan/Desktop/Devs/dacnis/startup/app/sitemap.ts) and [robots.ts](file:///Users/aslan/Desktop/Devs/dacnis/startup/app/robots.ts).

---

## 🖼️ Next.js Image Component Guidelines
To prevent Layout Shift (CLS) and ensure fast mobile loading speed, follow Next.js `<Image />` rules:
- Always use the `Image` component from `next/image`.
- Provide exact `width` and `height` properties for layout calculation, OR
- Use the `fill` property inside a parent container that has `position: relative`.
- Always declare descriptive `alt` tags.

---

## 🐞 Where & How to Debug

| Scenario | Issue Location | Debugging Steps |
|---|---|---|
| **Text or Service Content updates** | [services-data.ts](file:///Users/aslan/Desktop/Devs/dacnis/startup/lib/services-data.ts) | Edit copy in the corresponding service object. Verify locally. |
| **Hydration mismatch / UI differences** | Client-only GSAP triggers | Make sure components using GSAP are marked `"use client"`. Avoid accessing `window` or `document` variables directly outside `useEffect` or `useGSAP`. |
| **Routing / Dynamic Page failures** | [page.tsx (Detail)](file:///Users/aslan/Desktop/Devs/dacnis/startup/app/services/[slug]/page.tsx) | Note that Next.js 15+ page params are Promises. Always unwrap using `use(params)` inside client components or `await params` in server components. |
| **Hire Us Form submission issues** | [page.tsx (Hire Us)](file:///Users/aslan/Desktop/Devs/dacnis/startup/app/hire-us/page.tsx) | The search params reader must remain inside a `<Suspense>` boundary. Check query string parameters (e.g. `/hire-us?service=seo`) to debug auto-selection. |
| **Production Build Check** | Local command line | Run `bun run build` in the root folder. Inspect output to ensure static generation completes without TypeScript errors. |

---

## 🛡️ Security Best Practices
- **No Insecure Client-Side Calls**: Avoid placing API secret keys or credentials in client components. Use Next.js Server Actions or API routes under `app/api/` for secure backend workflows.
- **Form Sanitization**: Sanitize user strings before outputting them to prevent cross-site scripting (XSS).
- **Secure Dependencies**: Keep npm dependencies updated and inspect warnings using `bun pm audit` or `npm audit`.
