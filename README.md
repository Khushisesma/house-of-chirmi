# House of Chirmi

Marketing site for **House of Chirmi** — a Bengaluru studio that builds Shopify storefronts for Indian craft & occasion-wear brands, manages those brands month to month, and runs a creator collective.

Nine prerendered routes, one FastAPI + MongoDB backend with two form endpoints. The entire visual language is derived from the *chirmi* seed (Abrus precatorius) — the scarlet, black-eyed seed that Indian goldsmiths used as the **ratti**, the standard unit for weighing gold. Small thing, big standard.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + **Vite** + [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) (build-time prerender) |
| Routing | `react-router-dom` v6 |
| Head / SEO | `react-helmet-async` (per-route title, meta, OG, Twitter) |
| Styling | Tailwind CSS, driven entirely from CSS tokens — **no component library** |
| Motion | `framer-motion` + `lenis` (smooth scroll); most reveals are pure CSS |
| Backend | **FastAPI** + **MongoDB** (Motor) |

There is **no third-party analytics** and **no pre-built UI kit** — every visual component is hand-built from the token layer.

---

## Project structure

```
/app
├── backend/
│   ├── server.py            # FastAPI app: /api/enquiry, /api/creator (+ gated GETs)
│   ├── requirements.txt
│   └── .env                 # MONGO_URL, DB_NAME, ADMIN_TOKEN, CORS_ORIGINS, SMTP_*
├── frontend/
│   ├── index.html           # entry HTML (fonts preconnect, JSON-LD, favicon, manifest)
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── serve.mjs            # tiny static server for the prerendered dist/
│   ├── vercel.json          # catch-all rewrite for hosting
│   ├── public/
│   │   ├── _redirects       # /*  /index.html  200
│   │   ├── favicon.svg      # seed mark (scarlet circle + off-centre black eye)
│   │   ├── apple-touch-icon.png, og.jpg, manifest.json, robots.txt, sitemap.xml
│   │   └── images/          # drop real self-hosted WebP assets here
│   └── src/
│       ├── main.jsx         # ViteReactSSG entry
│       ├── App.jsx          # routes + getStaticPaths for /work/:slug
│       ├── styles/          # tokens.css (design system) + global.css (type ramp, classes)
│       ├── config/          # ALL content data — a price is typed once, here
│       ├── components/      # hand-built primitives + chrome + forms
│       ├── hooks/           # useLenis
│       └── pages/           # Home, Studio, Brands, Collective, Work, CaseDetail, About, Contact, NotFound
└── memory/
    ├── PRD.md
    └── test_credentials.md
```

---

## Routes (9)

| Path | Page |
|---|---|
| `/` | Home |
| `/studio` | Studio — storefront packages, process, FAQ |
| `/brands` | Brands — monthly partnerships, tiers |
| `/collective` | Collective — creator content (brands ⇄ creators tabs) |
| `/work` | Work — case grid |
| `/work/:slug` | Case detail (`rawish-designs`, `kaarmugizh`, `the-jewellery-line`) |
| `/about` | About — the ratti story, commitments, founder |
| `/contact` | Contact — enquiry form |
| `*` | 404 |

Every route is **prerendered at build time**, so the served HTML contains the real copy (not an empty `<div id="root">`). Deep links survive a hard refresh.

---

## Design system

Defined once in `src/styles/tokens.css`, consumed everywhere via classes — no component hardcodes a raw value.

**Colour**
```
--ink #14100E   --ink-soft #241D19   --paper #E7E0D2   --paper-deep #DBD2C0
--scarlet #C3272B (true Chinese red)  --clay #7A5F4F   --gold #A8843F   --graphite #595855
```

**Type** — Bodoni Moda (display) + Jost (body), loaded via `<link>` with preconnect. Ramp classes: `.h-hero .h-page .h2 .h3 .statement .lede .body-text .eyebrow .btn-label .accent-italic`.

**Signature marks** — the `Seed` (the only decoration on the site) and the fixed **measure rail** down the left edge (a ratti tick scale, `mix-blend-mode: difference`).

**Motion** — one orchestrated moment per page; masked line reveal on headings; section reveals; hover scale/invert. All fully disabled under `prefers-reduced-motion: reduce`.

---

## Backend API

Base URL comes from `REACT_APP_BACKEND_URL`; all routes are `/api`-prefixed.

| Method | Endpoint | Notes |
|---|---|---|
| `POST` | `/api/enquiry` | `{ name, email, brand, link, need, budget, message, source_page, company }` → `{ ok, id }` |
| `POST` | `/api/creator` | `{ name, handle, city, categories[], sample_1, sample_2, company }` → `{ ok, id }` |
| `GET` | `/api/enquiry` | newest-first, **bearer-gated** (`Authorization: Bearer <ADMIN_TOKEN>`) |
| `GET` | `/api/creator` | newest-first, **bearer-gated** |

- **Honeypot** field `company` — if non-empty, returns `200` and stores nothing.
- **Rate limit** — 5 posts / IP / hour (in-memory), `429` beyond.
- Server-side email validation; stores with a `uuid` + UTC ISO timestamp.
- **Email notify** reads SMTP creds from env; if absent, logs and still returns success — *a missing mailer never loses an enquiry*.

### Example
```bash
API=$(grep REACT_APP_BACKEND_URL frontend/.env | cut -d= -f2)

curl -X POST "$API/api/enquiry" -H "Content-Type: application/json" \
  -d '{"name":"Asha","email":"asha@example.com","need":"Website","budget":"₹35,000 Launch","message":"Need a store"}'

# read submissions (admin)
curl "$API/api/enquiry" -H "Authorization: Bearer <ADMIN_TOKEN>"
```

---

## Environment variables

**backend/.env**
```
MONGO_URL=...            # provided
DB_NAME=...              # provided
CORS_ORIGINS=<site origin>
ADMIN_TOKEN=<strong token>   # gates the GET endpoints
NOTIFY_EMAIL=khushisesma25@gmail.com
# Optional — enable live email:
SMTP_HOST=  SMTP_PORT=587  SMTP_USER=  SMTP_PASS=  SMTP_FROM=
```

**frontend/.env**
```
REACT_APP_BACKEND_URL=<preview/prod URL>
```

---

## Running locally

Services are managed by **supervisor** (do not start servers manually).

```bash
# Frontend: builds the prerendered site and serves dist/ on :3000
sudo supervisorctl restart frontend

# Backend: FastAPI on :8001
sudo supervisorctl restart backend
```

`yarn start` runs `vite-react-ssg build && node serve.mjs` — so the preview is the **actual prerendered build** (what ships), served with route→HTML mapping and an SPA fallback. After changing frontend code, restart `frontend` to rebuild.

Useful scripts (in `frontend/`):
```bash
yarn dev      # Vite dev server (HMR) — for fast iteration
yarn build    # prerender to dist/
yarn serve    # serve an existing dist/ build
```

---

## SEO & assets

- Per-route `<title>` / `<meta description>` formatted `<Page> — House of Chirmi`.
- `og:*` + `twitter:card=summary_large_image` on every route.
- JSON-LD `Organization` in the document head.
- `robots.txt`, `sitemap.xml` (all routes), `manifest.json` (`theme_color #14100E`).
- `favicon.svg`, `apple-touch-icon.png`, `og.jpg` — all generated from the seed mark.

**Images:** currently render as clay→ink gradient fallbacks. Drop real self-hosted WebP files (longest edge ~1600px) into `frontend/public/images/` and point the relevant `src` in `src/config/*` / page components at them.

---

## Testing

Automated backend + frontend suite passed **100% / 100%** — see `/app/test_reports/iteration_1.json` and `backend/tests/backend_test.py`. Covered: both forms (submit → Mongo → gated GET), invalid email `422`, honeypot no-store, rate limit `429`, deep-link refresh on all routes, unknown-slug redirect, SPA nav, accordion, and the collective tabs.

---

## Notes

- Frontend is a **prerendered production bundle**, so code changes require a rebuild (`supervisorctl restart frontend`).
- SMTP is intentionally unconfigured (log-only fallback); enquiries still persist to MongoDB.
- Invalid `/work/<bogus>` URLs emit a transient React hydration warning before redirecting to `/work` (functionally harmless; the nine real routes are console-clean).
