/**
 * Content layer entry point.
 *
 * Phase 6 schema after the tools/work removal + impact-comms merge.
 */

import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import type { Locale, SiteContent } from './schema';

export type {
  Locale,
  SiteContent,
  NavContent,
  HeroContent,
  NowContent,
  LastSixMonthsContent,
  ImpactMetric,
  GrowthChart,
  CommsPost,
  HowContent,
  Principle,
  ContactContent,
  ContactItem,
  FooterContent,
  ActionLabels,
} from './schema';

export const locales: readonly Locale[] = ['en', 'es', 'pt'] as const;
export const defaultLocale: Locale = 'en';

const dictionary: Record<Locale, SiteContent> = { en, es, pt };

export function getContent(locale: Locale | string | undefined): SiteContent {
  if (locale && locale in dictionary) {
    return dictionary[locale as Locale];
  }
  return dictionary[defaultLocale];
}

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  pt: 'PT',
};
