# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Fetch/refresh project data, then start dev server at http://localhost:5173
npm run build     # Fetch/refresh project data, type-check (tsc), then Vite bundle → dist/
npm run preview   # Preview the production build locally
npm run fetch:projects  # Manually run the GitHub project fetch (see "Data fetching" below)
```

No test runner is configured. Always run `npm run build` after changes — TypeScript errors surface there.

## Stack

React 18 + TypeScript + Tailwind CSS v3 + Framer Motion + Vite. Deployed to Cloudflare Workers (`wrangler.toml`) with SPA fallback via the `[assets] not_found_handling = "single-page-application"` block in `wrangler.toml` (there is no `public/_redirects` file — that's a Cloudflare Pages convention, not used by this Workers-based setup).

## Architecture

Single-page app. All content is in `src/App.tsx`, which renders sections in order: `Nav → SectionRail → Hero → Story → Values → About → Skills → Projects → Experience → Contact → Footer`. `CustomCursor`, `Nav`, and `SectionRail` render outside `<main>` as fixed overlay chrome.

Each section is an independent component in `src/components/`. No routing, no state management library. All data (experience entries, skill cards, values) is co-located as constants at the top of each component file — the one exception is Projects, which is generated at build time (see "Data fetching" below).

**CustomCursor** detects `data-cursor-hover` attribute on any hovered element (or its ancestor) to switch between dot and ring cursor states, and `data-cursor-label` to show contextual text (e.g. "View live") next to the cursor over project cards. It uses `mix-blend-mode: difference` so a single white cursor reads correctly over both black and white sections — don't give it a fixed color.

**Nav** is a floating pill capsule (`fixed top-5`, centered), not a full-width bar — this is deliberate so it reads consistently regardless of which section (light or dark) is scrolled underneath it. Mobile menu is a full-screen black takeover with large kinetic link reveals, not a dropdown.

**SectionRail** (`src/components/SectionRail.tsx`) is a fixed floating capsule (desktop only, `lg:flex`) tracking scroll position via `IntersectionObserver` across all eight section ids and highlighting the active one. Like Nav, it carries its own dark chip background so it's legible over any section color.

**Story** (`src/components/Story.tsx`) is a 220vh pinned section presenting three "moments" as a horizontal filmstrip — a `300%`-wide flex track is translated by `x` driven directly by `scrollYProgress` (same technique as Projects' gallery), so panels are always physically in motion while pinned, not just cross-fading in place. Each panel additionally blurs/scales based on its distance from being centered (a per-panel `useTransform` keyed to `index * 0.5`, since 3 evenly-spaced panels center at progress 0/0.5/1). Numbered tabs + a progress bar at the bottom track position and are clickable (they compute a scroll offset via `sectionRef` and jump with `window.scrollTo`). An earlier version of this section only cross-faded text in a fixed spot with no real movement — that read as static/boring and was replaced with this filmstrip approach; don't reintroduce a same-position crossfade here. Along with Hero and Projects, this is one of the few places continuous scroll-linked (`useScroll`/`useTransform`) animation is used — see "Motion system" below.

## Motion system (`src/lib/motion.ts`)

All animation goes through this file rather than ad-hoc values in components:

- `EASE` — the one easing curve (`[0.23, 1, 0.32, 1]`) used everywhere a transition needs easing.
- `DURATION` — named durations (`fast`/`base`/`slow`).
- `fadeUp` — reveal for small text/list items (fade + rise).
- `revealBlur` — **the signature reveal** for section headlines and major statements: arrives slightly scaled-down and soft-focus (`filter: blur()`), settles to full scale and sharp focus. Use this instead of `fadeUp` for anything that should read as a "coming into view" moment (section `h2`s, big statements).
- `staggerContainer(staggerChildren, delayChildren)` — factory for staggered list/grid reveals.
- `kineticWord` — per-word clip-in-from-below reveal for headlines (used in Hero's name).
- `viewportOnce` — shared `viewport` prop (`{ once: true, margin: '-80px' }`).
- `SPRING` — named spring presets (`snappy` for magnetic buttons, `smooth` for card tilt, `gentle` for the custom cursor).
- `useMagnetic(strength)` — hook returning spring-smoothed `x`/`y` motion values + mouse handlers; pulls a button toward the cursor within a small radius. Used on CTA buttons. Keep `strength` low (0.2–0.35) — it should read as a hint of physicality, not a bounce.
- `useTilt(maxDegrees)` — hook returning spring-smoothed `rotateX`/`rotateY` + mouse handlers for a 3D pointer-tilt on cards (used on project cards). The depth cue is the tilt itself — don't pair it with glow/shadow effects.

**No glow, no gradient mesh, no spotlight-on-hover.** An earlier pass of this design leaned on neon box-shadows and cursor-tracked radial glows (`shadow-neon-blue`, a `.spotlight-card` class) — that aesthetic was deliberately torn out for reading as generic "AI-generated SaaS template." Depth here comes from real mechanics: scroll-driven scale/blur (`revealBlur`, Story, Hero), parallax (About's background numeral), pinned scroll-scrubbing (Story, Projects), and pointer-physics (`useMagnetic`, `useTilt`) — never from decorative color glow. If you're tempted to add a colored shadow or gradient blob, don't.

Raw color values that can't be reached by Tailwind classes (SVG `stroke` attributes, inline styles) should import from `src/lib/tokens.ts` rather than hardcoding hex.

## Marquee

`src/components/ui/Marquee.tsx` is the one marquee implementation in the app (a `useAnimationFrame`-driven infinite scroller), used by both Skills' tech ticker and Contact's "Let's Talk" banner. Don't reintroduce a second CSS-`@keyframes`-based marquee — reuse this component.

## Data fetching — GitHub Projects

The Projects section is generated at build time, not hand-edited. `scripts/fetch-projects.mjs` runs via npm's `predev`/`prebuild` hooks:

- `predev` (`--mode=dev`) copies the committed `src/data/projects.snapshot.json` straight to the gitignored `src/data/projects.generated.json` — no network call on a normal `npm run dev`. It only fetches live if no snapshot exists yet.
- `prebuild` (`--mode=build`) always fetches live from `https://api.github.com/users/iMohammedArsh/repos`, ranks repos by a blended stars+recency score, picks up to 6, and refreshes both the working file and the committed snapshot. On failure it falls back to the existing snapshot (with a warning); it only fails the build if there's no snapshot to fall back to.

Repos are auto-selected (no manual per-project editing) — forks, archived repos, this site's own repo, and GitHub's special `.github` repo are excluded automatically; see the script for the exact ranking/filtering logic. `Projects.tsx` imports `src/data/projects.generated.json`, typed via `src/types/project.ts`.

`GITHUB_TOKEN` is read opportunistically to raise the rate limit but is never required — the endpoint used only needs public access.

## Font System

**One typeface, deliberately**: Inter (variable weight, loaded from Google Fonts as `Inter var`/`Inter`) is the only font in the app — `font-sans` in Tailwind. Hierarchy comes from size and weight (`font-medium`/`font-semibold`/`font-black`) and tight negative `tracking` on large type, not from switching typefaces. Don't add a second display font or a monospace font for labels — that "display font + mono label" combo reads as a template pattern and was deliberately removed.

## Design Tokens (tailwind.config.ts)

```
colors: ink (#0A0A0A) · paper (#F5F5F7) · mist (#86868B) — plus Tailwind's built-in white/black
borderRadius: card (18px) · badge (999px)
boxShadow: lift · lift-dark
```

**The palette is monochrome by design — no accent color.** `ink` is the near-black used for dark sections and dark text-on-light; `paper` is the off-white used for light sections; `mist` is a neutral grey for secondary text where opacity modifiers (`/40`, `/55`) on `ink`/`white` aren't precise enough. There is deliberately no `blue`/`violet`/accent token anymore — an earlier pass used a neon blue for buttons, links, and glow shadows, and it read as generic "AI SaaS" branding. If a design calls for emphasis, use contrast (solid black-on-white or white-on-black) or type weight, not color. `tailwind.config.ts` is the single source of truth for color; where a raw string is unavoidable (SVG attributes), use `src/lib/tokens.ts`.

## Section Pattern

Every content section follows this structure:
- `<section id="X">` — id matches the nav href `#X` and the `SectionRail` entry
- `py-28 md:py-36 px-6 md:px-10 lg:pl-36` padding (the extra left padding on `lg` clears the fixed `SectionRail`)
- `max-w-[1320px]` or `max-w-6xl mx-auto` container
- Section heading in `font-sans font-semibold text-4xl md:text-6xl tracking-[-0.02em]`, revealed with the `revealBlur` variant (see "Motion system" above) — no small mono eyebrow label above it; the earlier `/ Label` eyebrow convention was part of the removed dev-tool aesthetic

**Sections alternate between `bg-ink` (black, white text) and `bg-paper` (off-white, `ink` text) for visual rhythm** — Hero → Story: black, Values: paper, About: black, Skills: paper, Projects: black, Experience: paper, Contact/Footer: black. When adding a new section, pick whichever color continues the alternation and use the matching text-color convention (`text-white/NN` on black, `text-ink/NN` on paper) — don't default to always-dark.

## SEO / GEO

All SEO meta tags, Open Graph, Twitter Card, and JSON-LD structured data are in `index.html` (not managed via react-helmet-async at the component level — Helmet is only used in App.tsx for `lang` and `theme-color`). `public/llms.txt` gives non-JS-executing AI crawlers a plain-text summary of the site.

**Build-time prerendering**: `npm run build` renders `App` server-side (`src/entry-server.tsx`, via `react-dom/server`'s `renderToString`, built as a separate SSR bundle with `vite build --ssr`) and injects the resulting markup into `dist/index.html`'s `#root` (`scripts/prerender.mjs`), so crawlers that don't execute JavaScript still see real section content, not just the empty shell + `llms.txt`. The client (`src/main.tsx`) uses `createRoot` (not `hydrateRoot`), so it fully replaces the prerendered markup on load rather than hydrating it — there's no hydration-mismatch risk, but it does mean the very first paint (prerendered HTML + CSS) is briefly non-interactive until React takes over. `react-helmet-async` is CJS and must stay in `ssr.noExternal` in `vite.config.ts` for the SSR bundle to resolve it. Any hook whose initial state should reflect a real fact rather than an animation-start value (e.g. `useCountUp` in `Hero.tsx`) should seed that initial state from `typeof window === 'undefined'` — otherwise the prerendered HTML will show the pre-animation value (e.g. "0+ years") instead of the true one.
