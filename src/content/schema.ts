/**
 * SiteContent — single typed schema for all per-locale content.
 *
 * Phase 6 structural refactor:
 *   - Section names changed: "currently" → "now", "work + impact + tools" → "lastSixMonths".
 *   - Tools section removed entirely (no ToolItem, no ToolStatus, no WorkContent, no
 *     status labels). Tools content + URLs are gone from every locale.
 *   - Hero gains `status` chip (role · org · location), drops `location`.
 *   - Now is short prose + a list of chips (no preEm/em/postEm split anymore).
 *   - LastSixMonths is a flat curated metric list + a single growth-chart spec
 *     + the event/content cards that used to live in the Communication tab.
 *   - Contact gains its headline + primary CTA back. Footer no longer renders socials.
 */

export type Locale = 'en' | 'es' | 'pt';

/* --------------------------------------------------------------------------
 * Nav
 * -------------------------------------------------------------------------- */
export interface NavContent {
  now: string;
  lastSixMonths: string;
  how: string;
  contact: string;
}

/* --------------------------------------------------------------------------
 * Hero
 * -------------------------------------------------------------------------- */
export interface HeroContent {
  eyebrow: string;
  headline: {
    lineA: string;
    preAccent: string;
    accent: string;
    postAccent: string;
  };
  sub: string;
  /** Status chip near the CTA: role · org · location. */
  status: string;
  /** Single CTA — "Get in touch" → #contact. */
  cta: { label: string; href: string };
  photoCaption: string;
}

/* --------------------------------------------------------------------------
 * Now (was: Currently)
 * Short statement + 2–3 inline chips. No emphasis-clause split anymore.
 * -------------------------------------------------------------------------- */
export interface NowContent {
  kicker: string;
  body: string;
  /** Short pill facts (e.g. "8 countries", "6 months", "Buenos Aires"). */
  chips: string[];
}

/* --------------------------------------------------------------------------
 * Last 6 months (merges old Impact + Communication)
 * -------------------------------------------------------------------------- */
export interface ImpactMetric {
  value: string;        // verbatim across locales: "76.3K", "+462", "20+", etc.
  label: string;        // translated
  detail?: string;      // optional qualifier (e.g. "organic", "from <100")
}

/**
 * Growth-chart spec — minimal sparkline that animates a single gold line.
 * `series` is a list of synthetic-but-plausible monthly snapshots; only the
 * endpoints carry real data (start/end labels). Documented in the report.
 */
export interface GrowthChart {
  title: string;
  /** Y-axis snapshot values. First/last are real; midpoints are visual shape. */
  series: number[];
  startLabel: string;   // e.g. "<100"
  endLabel: string;     // e.g. "476"
  caption: string;      // e.g. "@BNBChainLatAm followers · organic · zero paid"
}

export interface CommsPost {
  id: string;
  platform: 'X' | 'LinkedIn';
  date: string;        // verbatim across locales: "May 2026", "Mar 2026", etc.
  topic: string;       // translated
  url: string;
  photo: string;       // /public path
  alt: string;         // translated
}

export interface LastSixMonthsContent {
  kicker: string;
  heading: string;
  /** Optional short lead-in below the heading. */
  intro?: string;
  /** Curated 6 strongest metrics. */
  metrics: ImpactMetric[];
  growth: GrowthChart;
  highlightsKicker: string;
  highlights: CommsPost[];
}

/* --------------------------------------------------------------------------
 * How I think
 * -------------------------------------------------------------------------- */
export interface Principle {
  number: string;
  keyword: string;
  title: string;
  body: string;
}

export interface HowContent {
  kicker: string;
  principles: Principle[];
}

/* --------------------------------------------------------------------------
 * Contact
 * -------------------------------------------------------------------------- */
export interface ContactItem {
  kind: 'email' | 'x' | 'linkedin' | 'telegram';
  label: string;       // also serves as aria-label
  href: string;
}

export interface ContactContent {
  kicker: string;
  /** Short headline; the emphasized clause is rendered in --primary. */
  headline: { preEm: string; em: string };
  /** Primary mailto CTA. Sits above the 4 icon buttons. */
  primaryCta: { label: string; href: string };
  items: ContactItem[];
}

/* --------------------------------------------------------------------------
 * Misc
 * -------------------------------------------------------------------------- */
export interface FooterContent {
  loc: string;
  lastUpdatedLabel: string;
  copyright: string;
}

export interface ActionLabels {
  getInTouch: string;
}

/* --------------------------------------------------------------------------
 * Aggregate
 * -------------------------------------------------------------------------- */
export interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  now: NowContent;
  lastSixMonths: LastSixMonthsContent;
  how: HowContent;
  contact: ContactContent;
  footer: FooterContent;
  action: ActionLabels;
}
