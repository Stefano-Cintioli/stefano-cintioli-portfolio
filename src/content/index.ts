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

import { defaultLocale } from '@/i18n/locales';
export { locales, defaultLocale, localeLabels } from '@/i18n/locales';

const dictionary: Record<Locale, SiteContent> = { en, es, pt };

export function getContent(locale: Locale | string | undefined): SiteContent {
  if (locale && locale in dictionary) {
    return dictionary[locale as Locale];
  }
  return dictionary[defaultLocale];
}
