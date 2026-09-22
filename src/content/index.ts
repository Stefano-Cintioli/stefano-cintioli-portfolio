/**
 * Content layer entry point.
 *
 * Approved portfolio schema, shared across EN / ES / PT.
 */

import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import type { Locale, SiteContent } from './schema';

export type { Locale, SiteContent, EventItem, EventCollection, ContactItem } from './schema';

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
