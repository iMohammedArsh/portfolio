# Mohammed Arsh — Portfolio

Personal portfolio site built with React + TypeScript + Tailwind CSS. Deployed on Cloudflare Workers.

**Live:** [coming soon]

## Stack

- **React 18** + **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion** — scroll animations, stagger reveals, marquee
- **Vite** — build tool
- **Cloudflare Workers** — hosting (via `wrangler`)

## Sections

- **Hero** — Full-bleed video background, typed role, count-up stats, magnetic CTAs
- **Story** — Sticky-scroll video section scrubbing three short statements
- **Values** — SCALABLE · INTELLIGENT · PERFORMANT · PURPOSEFUL
- **About** — Background, bio, quick-facts info cards
- **Skills** — Tech grid + scrolling marquee
- **Projects** — Auto-generated from public GitHub repos at build time (see below) — no manual editing
- **Experience** — Animated timeline
- **Contact** — Form (wired to Formspree — see Setup) + social links + "Let's Talk" marquee

## Setup

Copy `.env.example` to `.env` and fill in a [Formspree](https://formspree.io) endpoint so the
contact form can actually send messages:

```bash
cp .env.example .env
```

## Dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Fetch projects + TypeScript check + Vite bundle → dist/
npm run preview   # Preview production build
```

`npm run dev`/`npm run build` fetch the Projects section's data automatically from GitHub — see
`CLAUDE.md` for how that works. Run `npm run fetch:projects` to refresh it manually.

## Deploy (Cloudflare)

```bash
npm run build
npx wrangler deploy
```
