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

- **Hero** — Full-width editorial headline with interactive particle canvas
- **Values** — SCALABLE · INTELLIGENT · PERFORMANT · PURPOSEFUL
- **About** — Background, info cards with tilt effect
- **Skills** — Dark "TECH STACK" section with pill capsules + scrolling marquee
- **Projects** — Case study cards with gradient thumbnails
- **Experience** — Animated timeline
- **Contact** — Dark-themed form with inquiry checkboxes + "Let's Talk!" marquee

## Dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # TypeScript check + Vite bundle → dist/
npm run preview   # Preview production build
```

## Deploy (Cloudflare)

```bash
npm run build
npx wrangler deploy
```

## Coming Soon

- MongoDB integration for contact form submissions
