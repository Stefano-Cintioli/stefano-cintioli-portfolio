import { defineRouting } from 'next-intl/routing';

import { locales, defaultLocale } from '@/content';

/**
 * URL-based locale routing.
 *
 *   /        → English (default, no prefix)
 *   /es      → Spanish
 *   /pt      → Portuguese
 *
 * `localePrefix: 'as-needed'` keeps the canonical English URL clean while
 * still giving ES + PT real, indexable paths for hreflang SEO.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});
