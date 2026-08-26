# House of Chirmi — PRD

## Original problem statement
Production marketing site for **House of Chirmi**, a Bengaluru studio that builds Shopify storefronts for Indian craft/occasion-wear brands, manages them monthly (Brands), and runs a creator collective. Nine routes, one FastAPI+MongoDB backend with two form endpoints. Prerendered at build time (SEO-critical). Hand-built visual layer derived from the *chirmi* seed (scarlet + black eye = the ratti, the unit gold was weighed against). No component library, no third-party analytics.

## Architecture
- **Frontend:** React 18 + Vite + `vite-react-ssg` (prerenders all routes at build), react-router-dom 6, `react-helmet-async` (per-route head), Tailwind (token-driven), framer-motion + lenis for motion. Hand-built primitives (Seed, Section, Button, SeedLink, Eyebrow, HairlineGrid, CraftImage, MeasureRail, MaskedHeading, Reveal, Marquee, Accordion, Nav, Footer).
- **Serving:** `yarn start` = `vite-react-ssg build && node serve.mjs` → serves the prerendered `dist/` on :3000 with route→HTML mapping + SPA fallback (matches shipped HTML; deep links survive refresh). `vercel.json` + `public/_redirects` for hosting.
- **Backend:** FastAPI on :8001, all routes `/api`-prefixed. MongoDB via MONGO_URL. Endpoints: `POST /api/enquiry`, `POST /api/creator` (honeypot `company`, email validation, 5/IP/hr rate limit, SMTP notify with log-only fallback), gated `GET /api/enquiry` + `GET /api/creator` (bearer `ADMIN_TOKEN`).
- **Design tokens:** `src/styles/tokens.css` (colours, type ramp classes in global.css, spacing). Content data single-sourced in `src/config/*` (prices typed once).

## Core requirements (static)
- 9 routes: `/`, `/studio`, `/brands`, `/collective`, `/work`, `/work/:slug` (3 cases), `/about`, `/contact`, `*` 404.
- Prerendered HTML contains real copy; no empty root div for crawlers.
- Two working forms writing to Mongo, retrievable via gated GET.
- Motion disabled under prefers-reduced-motion; visible focus everywhere; no `href="#"`.
- Seed is the only decoration; scarlet is true Chinese red; pill is the only rounded element.

## Implemented (2026-06)
- All 9 routes built, prerendered, deep-link safe. `curl` on built /studio contains "Six steps, because the order matters".
- Full design system + primitives; measure rail; marquee; masked heading reveal (pure CSS, resting-visible so hydration races never hide content); section reveals; hover invert/scale; seed-link gap growth; two home parallax moments.
- Global chrome: nav with darkHero-driven transparency + active seed marker + mobile overlay (focus trap, Esc, scroll lock); footer with distinct destinations; skip link.
- Backend: both endpoints + honeypot + rate limit + gated GETs + SMTP log-only fallback. **Tested 100% backend / 100% frontend** (test_reports/iteration_1.json).
- SEO: per-route Helmet title/description/OG/twitter; JSON-LD Organization; robots.txt; sitemap.xml (10 URLs); manifest; favicon.svg + apple-touch-icon + og.jpg (seed-derived).
- Images: clay→ink gradient fallbacks (per user choice); real assets can be dropped into `public/images/`.

## Known/notes
- Invalid `/work/:slug` URLs emit a transient React hydration warning before the client redirect to `/work` (functionally correct; only on non-existent URLs, not the 9 real routes).
- SMTP intentionally unconfigured (log-only; enquiries still persist). Set SMTP_* env vars to enable email.
- MOCKED: none.

## Backlog / next
- P1: Drop in real self-hosted WebP images (plate, founder portrait, 3 case storefronts).
- P2: Optional SMTP config for live email notifications.
- P2: Harden rate limiter against X-Forwarded-For spoofing; migrate FastAPI shutdown to lifespan.
- P2: data-testids on accordion; 404-aware prerender to silence unknown-slug hydration warning.
