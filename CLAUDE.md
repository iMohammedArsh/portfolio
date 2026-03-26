# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Type-check (tsc) then Vite bundle → dist/
npm run preview   # Preview the production build locally
```

No test runner is configured. Always run `npm run build` after changes — TypeScript errors surface there.

## Stack

React 18 + TypeScript + Tailwind CSS v3 + Framer Motion + Vite. Deployed to Cloudflare Workers (`wrangler.toml`) with SPA fallback via `public/_redirects`.

## Architecture

Single-page app. All content is in `src/App.tsx`, which renders sections in order: `Nav → Hero → About → Skills → Projects → Experience → Contact → Footer`.

Each section is an independent component in `src/components/`. No routing, no state management library, no data fetching. All data (experience entries, skill cards, upcoming projects) is co-located as constants at the top of each component file.

**HeroGame** (`src/components/HeroGame.tsx`) is a fully self-contained canvas snake game. Game state lives in `useRef`s (not React state) to avoid stale closures in the `requestAnimationFrame` loop — only `gameState` drives re-renders. Keyboard + mobile D-pad controls are wired in a single `useEffect`.

**CustomCursor** detects `data-cursor-hover` attribute on any hovered element (or its ancestor) to switch between dot and ring cursor states. Add `data-cursor-hover` to any interactive element that should trigger the cursor change.

## Font System

Three fonts are loaded from Google Fonts:

| Token | Font | Use |
|---|---|---|
| `font-hero` | Hanken Grotesk | Section h2 headings, hero h1 — any `text-3xl` and up |
| `font-syne` | Syne | Nav logo "MA", skill card titles, experience role titles — small display labels only |
| `font-dm` | DM Sans | All body copy, badges, captions, UI text |

**Rule:** Syne is a wide-geometry typeface — only use it at `text-2xl` and below. Use `font-hero` for anything larger.

## Design Tokens (tailwind.config.ts)

```
colors: cream (#F5F4F0) · blue (#1A6BFF) · violet (#6B21E8) · ink (#0D0D0D) · muted (#6B7280) · border (#E5E3DD)
borderRadius: card (12px) · badge (999px)
boxShadow: card · card-hover
```

## Section Pattern

Every content section follows this structure:
- `<section id="X">` — id matches the nav href `#X`
- `py-16 px-6` padding
- `max-w-6xl mx-auto` container
- `/ Label` eyebrow in `font-dm text-xs text-muted tracking-[0.2em] uppercase`
- Section heading in `font-hero font-black text-4xl md:text-5xl` with `letterSpacing: '-0.02em'`
- Animations via Framer Motion `whileInView` + `viewport={{ once: true }}`

Alternating background: Skills and Experience have `bg-white/20`; Hero, About, Projects, Contact have no background.

## SEO

All SEO meta tags, Open Graph, Twitter Card, and JSON-LD structured data are in `index.html` (not managed via react-helmet-async at the component level — Helmet is only used in App.tsx for `lang` and `theme-color`).
