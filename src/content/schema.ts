/**
 * SiteContent — single typed schema for all per-locale content.
 *
 * Migrated from the legacy content.json (Phase 3). Every locale file in this
 * directory MUST satisfy this interface, so structural changes here ripple
 * into compile errors across en.ts / es.ts / pt.ts — that's the point.
 *
 * Discipline:
 *   - Metrics, proper nouns, URLs, dates: identical across locales.
 *   - Copy: translated; en is the source of truth.
 *   - New UI strings I introduce in this redesign (e.g. CTA labels) carry a
 *     trailing "// TODO: review" comment in es.ts / pt.ts so they're easy to
 *     find later.
 */

export type Locale = 'en' | 'es' | 'pt';

/* --------------------------------------------------------------------------
 * Hero
 * -------------------------------------------------------------------------- */

export interface HeroContent {
  eyebrow: string;
  headline: {
    /** Line 1 — full text. NBSP characters in source preserve word-pairing. */
    lineA: string;
    /** Line 2 prefix, sits in body color, includes trailing space. */
    preAccent: string;
    /** Word(s) painted in --primary. Same across locales (e.g. "Web3"). */
    accent: string;
    /** Line 2 suffix, body color, includes leading space. */
    postAccent: string;
  };
  sub: string;
  cta: {
    /** Primary CTA — Download CV. Phase 3 introduces this label. */
    primary: { label: string; href: string };
    /** Secondary CTA — Get in touch (mailto or #contact). */
    secondary: { label: string; href: string };
  };
  photoCaption: string;
  location: string;
}

/* --------------------------------------------------------------------------
 * Currently
 * -------------------------------------------------------------------------- */

export interface CurrentlyContent {
  kicker: string;
  /** Paragraph composed of pre-emphasis text, emphasized clause, post-emphasis. */
  body: {
    preEm: string;
    em: string;
    postEm: string;
  };
  meta: {
    loc: string;
    scope: string;
  };
}

/* --------------------------------------------------------------------------
 * Work
 * -------------------------------------------------------------------------- */

export type ToolStatus = 'live' | 'beta' | 'internal';

export interface ToolItem {
  /** Stable slug — anchor for the planned /work/[slug] route. */
  slug: string;
  /** Display number (01–04). */
  number: string;
  /** Project name — proper noun, kept verbatim across locales. */
  name: string;
  /** One-line description; translated per locale. */
  desc: string;
  status: ToolStatus;
  /** Optional outbound link. Absent for Internal tools without a public URL. */
  url?: string;
}

export interface CommsPost {
  id: string;
  /** Platform name — kept verbatim across locales (e.g. "X", "LinkedIn"). */
  platform: 'X' | 'LinkedIn';
  /** Display date — same string across locales (e.g. "May 2026"). */
  date: string;
  /** Topic line; translated per locale. */
  topic: string;
  url: string;
  /** Public path to the recap photo (under /public). */
  photo: string;
  /** Alt text for the photo; translated per locale. */
  alt: string;
}

export interface WorkContent {
  kicker: string;
  tabs: {
    tools: string;
    impact: string;
    socials: string;
  };
  toolsHeading: string;
  tools: ToolItem[];
  comms: {
    handlesKicker: string;
    posts: CommsPost[];
  };
}

/* --------------------------------------------------------------------------
 * Impact — three clusters, each with a lead metric + supporting items
 * -------------------------------------------------------------------------- */

export interface ImpactMetric {
  /** Number string — VERBATIM across locales (e.g. "76.3K", "+462"). */
  value: string;
  /** Label; translated per locale. */
  label: string;
  /** Optional qualifier (e.g. "one P0, one P1", "closed cohort", country list). */
  detail?: string;
}

export interface ImpactCluster {
  /** Heading like "ECOSYSTEM & BD" — translated per locale. */
  header: string;
  lead: ImpactMetric;
  items: ImpactMetric[];
}

export interface ImpactContent {
  leadLine: string;
  clusters: ImpactCluster[];
}

/* --------------------------------------------------------------------------
 * How I think — 4 operating principles
 * -------------------------------------------------------------------------- */

export interface Principle {
  /** Display number (01–04). */
  number: string;
  /** One-word keyword in mono caps (e.g. "FILTER" / "FILTRAR"). */
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
  label: string;       // translated
  handle: string;      // proper noun — verbatim across locales (e.g. @s_cintioli_)
  href: string;
}

export interface ContactContent {
  kicker: string;
  headline: {
    preEm: string;
    em: string;
  };
  items: ContactItem[];
}

/* --------------------------------------------------------------------------
 * Misc UI strings
 * -------------------------------------------------------------------------- */

export interface NavContent {
  currently: string;
  work: string;
  how: string;
  contact: string;
}

export interface FooterContent {
  loc: string;
  lastUpdatedLabel: string;
  copyright: string;
}

export interface ActionLabels {
  visit: string;        // existing
  downloadCv: string;   // new in v2
  getInTouch: string;   // new in v2
}

export interface StatusLabels {
  live: string;
  beta: string;
  internal: string;
}

/* --------------------------------------------------------------------------
 * Aggregate
 * -------------------------------------------------------------------------- */

export interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  currently: CurrentlyContent;
  work: WorkContent;
  impact: ImpactContent;
  how: HowContent;
  contact: ContactContent;
  footer: FooterContent;
  action: ActionLabels;
  status: StatusLabels;
}
