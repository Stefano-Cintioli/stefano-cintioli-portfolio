# Landing hardening verification

Scope: `feat/landing-hardening-hero`, based on `a2b1f76`. Production stays on main until Stefano approves the PR. The primary action remains **Request a call**, using the existing FormSubmit form and approved EN/ES/PT copy.

## Measured performance

Lighthouse 13.5.0, Chrome headless, default mobile simulated throttling. Three independent production-build runs on the same localhost origin; medians reported. Individual results are in [lighthouse-metrics.json](./lighthouse-metrics.json). The supplied 73 / 3.5s / 660ms baseline was not reproduced and is retained as unverified context.

- Mobile performance 90 → 97; LCP 3.591s → 2.543s; TBT 25ms → 16ms; CLS remains 0.
- Initial font transfer 141,622 → 29,813 bytes. Same typefaces, self-hosted Latin subsets; unused Mono is not preloaded.
- Script transfer 274,942 → 175,705 bytes; unused JS 116,694 → 57,436 bytes.
- After accessibility, Best Practices and SEO are all 100. Baseline localhost SEO 92 came from conflicting request-host HTTP alternate links; baseline production SEO was 100.
- Desktop remains 100 across the four categories, LCP 0.613s, TBT 0.
- A production baseline was also measured: performance 92, LCP 3.335s, TBT 58.5ms, accessibility/Best Practices/SEO 100.

The local LCP median narrowly misses the strict <2.5s criterion. The PR description records the actual deployed Vercel preview measurement and the acceptance outcome. Local HTTP/1.1 and Vercel HTTPS results are identified separately.

## Browser checks

Screenshots: [360px](./screenshots/hero-360.png), [768px](./screenshots/hero-768.png), [1440px](./screenshots/hero-1440.png).

- EN → ES → PT → EN links, localized content, theme selection and saved locale navigation work.
- Country controls, both carousel arrows and keyboard growth-slider input update after deferred enhancement loads.
- Request dialog opens on demand; all five fields remain required. Empty submission stays in the dialog and focuses the first field. No real email was sent during this hardening work.
- Escape restores focus to the request button. Mobile-menu dismissal also returns focus to its button.
- Desktop mesh becomes animated after the portrait paints and pauses off-screen. Mobile stays static.
- A real 1350px reduced-motion audit confirmed the preference, static mesh, zero canvas, no name/role animation and no shader chunk request.
- Clean browser page and final Lighthouse runs have no console errors or first-party report-only CSP warnings.

## Security and routing

`bun run build`, `bun run typecheck`, `bun run test:security` and `git diff --check` pass. Run `node scripts/verify-preview.mjs <URL>` against the deployed preview, as recorded in the PR. It verifies returned headers, every inline script hash, secure locale cookies, all three locale pages, normal 404 and favicon.

Headers live only in `next.config.ts`. The full policy is report-only; `frame-ancestors 'none'` is enforced now. Production inline scripts use hashes generated from exact prerendered bytes after each build, retaining static HTML/CDN caching. Finalization updates both Next's route manifest and Vercel's Build Output API v3 header maps. It refuses missing hashes, unknown output formats or a policy over 7 KB, and checks emitted adapter HTML before writing. Document policy hashes are not repeated on every asset response.

The initial cloud preview correctly stopped at the unsupported-adapter guard. After inspecting Vercel's actual v3 format, two regression tests were added (five tests total). A real local Vercel-adapter build passed and verified six emitted HTML files against 107 script hashes.

FormSubmit needs `connect-src https://formsubmit.co`. Existing theme, dialog, chart and Paper styles require inline styles; scripts do not allow `unsafe-inline` or `unsafe-eval`. Paper uses local WebGL2 and requires no worker, blob or wasm permissions. HSTS is not configured or changed by this patch.

`NEXT_LOCALE` is Secure + HttpOnly. Native document links allow the server to manage it; client code does not access it. HTML hreflang, sitemap, canonical URLs and existing metadata remain unchanged. Duplicate request-host HTTP `Link` alternates are disabled.

A TODO leaves full enforcement until a week of clean browser observations. This patch does not install a CSP report-collection service or automatically promote the policy.

The About component, render, translations and navigation anchors are removed. Its unique personal line about inflation is proposed only in the PR description. No new biography copy was added.
