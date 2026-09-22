/** Approved portfolio copy and curated evidence. Keep all locales in sync. */
export type Locale = 'en' | 'es' | 'pt';
export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  url: string;
  videoId?: string;
  language?: string;
  photo?: string;
  photoPosition?: string;
  photoFit?: 'cover' | 'contain';
  alt?: string;
}
export interface EventCollection {
  heading: string;
  intro: string;
  description: string;
  action: string;
  items: EventItem[];
}
export interface ContactItem {
  kind: 'email' | 'x' | 'linkedin' | 'telegram' | 'github';
  label: string;
  href: string;
}
export interface SiteContent {
  seo: { title: string; description: string; keywords: string[] };
  nav: { work: string; online: string; offline: string; about: string; contact: string };
  hero: {
    eyebrow: string;
    status: string;
    headline: { lineA: string; preAccent: string; accent: string; postAccent: string };
    sub: string;
    cta: { label: string; href: string };
    photoCaption: string;
    photoAlt: string;
  };
  builderSessions: {
    heading: string;
    body: string;
    results: string;
    goal: string;
    coverageLabel: string;
    countries: string[];
    exploreLabel: string;
    countryDetails: { name: string; links: { title: string; label: string; url: string }[] }[];
    upcomingLabel: string;
    upcoming: string;
    metrics: { value: string; label: string }[];
    reviewed: string;
  };
  online: EventCollection;
  offline: EventCollection;
  reach: { heading: string; period: string; impressions: string; engagements: string; source: string; growth: string; growthNote: string; explore: string; total: string };
  about: { heading: string; paragraphs: string[] };
  contact: { heading: string; body: string; primaryCta: { label: string; href: string }; items: ContactItem[] };
  footer: { copyright: string };
  ui: { previous: string; next: string; close: string; closeMenu: string; youtube: string; openMenu: string; navigation: string; skip: string; carousel: string; language: string; theme: string; light: string; dark: string };
}
