/**
 * Content layer entry point.
 *
 * Phase 5 sections will import { getContent, defaultLocale } from '@/content'.
 * The getter falls back to en when a locale's content is missing so we can
 * ship a partial translation without breaking the build.
 */

import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import type { Locale, SiteContent } from './schema';

export type {
  Locale,
  SiteContent,
  HeroContent,
  CurrentlyContent,
  WorkContent,
  ToolItem,
  ToolStatus,
  CommsPost,
  ImpactContent,
  ImpactCluster,
  ImpactMetric,
  HowContent,
  Principle,
  ContactContent,
  ContactItem,
  NavContent,
  FooterContent,
  ActionLabels,
  StatusLabels,
} from './schema';

export const locales: readonly Locale[] = ['en', 'es', 'pt'] as const;
export const defaultLocale: Locale = 'en';

const dictionary: Record<Locale, SiteContent> = { en, es, pt };

/**
 * Resolve content for a locale, with an English fallback.
 * Server-safe (synchronous, no I/O — everything is tree-shaken TS modules).
 */
export function getContent(locale: Locale | string | undefined): SiteContent {
  if (locale && locale in dictionary) {
    return dictionary[locale as Locale];
  }
  return dictionary[defaultLocale];
}

/** Locale display labels for the upcoming locale switcher (Phase 4). */
export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  pt: 'PT',
};
