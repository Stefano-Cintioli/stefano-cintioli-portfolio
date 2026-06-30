# Stefano Cintioli — Portfolio

Personal site for Stefano Cintioli (LatAm Community Lead, BNB Chain).
Trilingual (EN / ES / PT), built with Next.js 16 + Tailwind CSS + shadcn/ui +
Framer Motion. Deployed on Vercel.

**Live:** https://stefano-cintioli-portfolio.vercel.app

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | Static-rendered per locale via `generateStaticParams` |
| Styling | Tailwind CSS v3 + design-token CSS variables | All theme values flow through `--bg`, `--primary`, `--gold-ink`, etc. — no hardcoded hex in components |
| Components | shadcn/ui (Button, DropdownMenu, Sheet) | Tokens map to our palette, not shadcn's default neutrals |
| Fonts | Geist Sans + Geist Mono via `next/font` | Self-hosted by Next.js, zero external font requests |
| Animation | Framer Motion 12 | All reveals gated by `useReducedMotion()` |
| Themes | `next-themes` | `attribute="class"`, `defaultTheme="system"`, `disableTransitionOnChange` |
| i18n | `next-intl` 4 with `proxy.ts` (Next 16's middleware convention) | `localePrefix: 'as-needed'` → EN at `/`, ES at `/es`, PT at `/pt` |
| Package manager | `bun` | Lockfile committed; Vercel uses `bun install` per `vercel.json` |

---

## Run locally

```bash
bun install
bun run dev          # localhost:3000
bun run build        # production build (Next 16 Turbopack)
bun run typecheck    # tsc --noEmit
bun run start        # serve the production build
```

Node 20+ recommended. Bun's the documented installer; npm/pnpm should also work
but you'll need to delete `bun.lock` first to regenerate the equivalent.

---

## Project layout

```
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx       Root layout — Geist fonts, ThemeProvider,
│  │  │                    next-intl provider, JSON-LD Person, skip-link,
│  │  │                    Assistant mount
│  │  └─ page.tsx          Home — renders the 5 sections in order
│  ├─ globals.css          Design tokens (HSL CSS vars) + base styles
│  ├─ robots.ts            /robots.txt generator
│  └─ sitemap.ts           /sitemap.xml generator (3 locales + hreflang)
│
├─ components/
│  ├─ sections/            Hero / Now / LastSixMonths / How / Contact
│  ├─ nav/                 SiteNav (scroll-spy) + MobileMenu + LocaleSwitcher
│  ├─ motion/              BlurFade + BlurStagger (Magic-UI-style reveals)
│  ├─ providers/           ThemeProvider (next-themes wrapper)
│  ├─ ui/                  shadcn primitives (button, dropdown-menu, sheet)
│  ├─ assistant.tsx        Deferred RAG chatbot mount point (renders null)
│  ├─ site-footer.tsx
│  ├─ social-glyph.tsx     Shared social icons (email/X/LinkedIn/Telegram)
│  ├─ theme-toggle.tsx
│  └─ scroll-cue.tsx
│
├─ content/                Single source of truth — see "Content layer" below
│  ├─ schema.ts            SiteContent interface
│  ├─ en.ts                Source of truth (English)
│  ├─ es.ts                DRAFT — Argentine voseo, flagged for review
│  ├─ pt.ts                DRAFT — Brazilian PT, flagged for review
│  └─ index.ts             getContent(locale) with EN fallback
│
├─ hooks/
│  └─ use-scroll-spy.ts    IntersectionObserver wrapper for active-nav
│
├─ i18n/
│  ├─ routing.ts           defineRouting({ locales, defaultLocale, prefix })
│  ├─ navigation.ts        createNavigation — locale-aware Link/router
│  └─ request.ts           getRequestConfig — empty messages (content lives in @/content)
│
├─ lib/
│  └─ utils.ts             cn() helper (clsx + tailwind-merge)
│
└─ proxy.ts                next-intl middleware (Next 16 file convention)

public/
└─ assets/
   ├─ img/                 4 event WebPs
   ├─ logos/               BNB-Chain + partner logos
   ├─ favicon.svg          SC monogram, gold on midnight
   ├─ favicon.png          32×32 fallback
   ├─ apple-touch-icon.png 180×180
   └─ og-card.jpg          1200×630 OG share image
```

---

## Content layer

Every visible string lives in `src/content/{en,es,pt}.ts` behind the
`SiteContent` interface in `schema.ts`. Components import via the
`getContent(locale)` getter — which falls back to English for unknown
locales — and read typed fields. No JSON files at runtime.

```tsx
import { getContent } from '@/content';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent(locale);
  // content.hero.headline.lineA, content.lastSixMonths.metrics[0].value, ...
}
```

### Adding or editing a metric

The 6 curated metrics live in `content.lastSixMonths.metrics[]`. Edit
`en.ts` (the source of truth), then mirror the translation in `es.ts` +
`pt.ts`. Keep values + proper nouns (URLs, dates, "@BNBChainLatAm",
"BNB Chain", "Buenos Aires") identical across locales — only the
`label` and `detail` strings get translated.

### Adding a new locale

1. Create `src/content/<locale>.ts` matching the `SiteContent` shape.
2. Add it to the `dictionary` in `src/content/index.ts` and to
   `routing.locales` in `src/i18n/routing.ts`.
3. Add `<locale>: \`${SITE_URL}/<locale>\`` to the hreflang map in
   `src/app/[locale]/layout.tsx` and `src/app/sitemap.ts`.
4. `bun run build` — Next will SSG the new route as `/<locale>`.

### Mark draft translations

ES and PT files carry a `// DRAFT TRANSLATION — pending review` header
and `// TODO: review` markers next to v2-new strings. When a translator
signs off, delete the markers. Don't auto-translate factual claims
(metrics, dates, proper nouns) — those are locked across locales.

---

## Deployment

The branch `redesign/v2-nextjs` carries a `vercel.json` that pins
`framework: nextjs`. On merge to `main`, Vercel will:
1. Detect `package.json` + the Next.js dep.
2. Honor `vercel.json` → `installCommand: bun install`, `buildCommand: bun run build`.
3. Deploy as a Next.js project at https://stefano-cintioli-portfolio.vercel.app.

The merge **switches production** from the old static-HTML site to Next.js.
Branch previews already deploy as Next.js (verified throughout phases 1–8).

### `last updated` date

The footer date is stamped at server-render time via
`new Date().toISOString().slice(0, 10)`. Under SSG that's the build date.
Every Vercel rebuild (any commit or manual redeploy) refreshes it.

---

## Deferred: the RAG assistant

`src/components/assistant.tsx` is a no-op stub mounted in the layout
that reserves a slot for a future RAG chatbot over Stefano's bio
(Groq + LLaMA 3). Full integration recipe is in that file's header
docstring — including:
- env var setup (`GROQ_API_KEY` in Vercel)
- `bun add groq-sdk`
- the `/api/assistant` route handler shape (uses `content/en.ts` as the
  knowledge base — same single source of truth)
- conversion path from `null` return to a floating chat widget
- a11y checklist (focus trap, `aria-live`, reduced-motion)

To remove the stub entirely if you decide against the chatbot: delete
`src/components/assistant.tsx` and the one import + one `<Assistant />`
tag in `src/app/[locale]/layout.tsx`. Nothing else depends on it.

---

## Quality bar

- **WCAG 2.1 AA** — one `<h1>` per page, semantic landmarks, skip-link,
  `:focus-visible` ring global, AA contrast in light + dark (`text-gold-ink`
  for gold text on light bg, `text-primary` reserved for fills), sparkline
  has `<title>` + `<desc>` + an sr-only summary.
- **prefers-reduced-motion** respected: BlurFade short-circuits to a plain
  `<div>`; sparkline path renders at `pathLength=1` with no animation;
  count-up never started in the first place (replaced with static stagger).
- **SEO** — per-locale `<title>`, `description`, OG, Twitter, canonical,
  hreflang alternates (incl. x-default-equivalent), JSON-LD Person
  (schema.org), `/sitemap.xml`, `/robots.txt`, theme-color.
- **Performance** — hero image via `next/image` with `priority` + `sizes`;
  all other images lazy; fonts via `next/font` (zero CLS); Tailwind v3
  with content-aware purging; SSG for every locale page.

Run PageSpeed Insights against any branch preview URL for the 4 Lighthouse
scores — the sandbox doesn't ship a headless browser, so the audit isn't
automated here.

---

## License

All content (text, images, metrics) © Stefano Cintioli. Reach out
before reusing copy or photography.
