import { defineRouting } from 'next-intl/routing';

import { locales, defaultLocale } from '@/i18n/locales';

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
  // layout metadata already provides canonical, production-origin hreflang links.
  // Avoid duplicate request-host Link headers on local/preview domains.
  alternateLinks: false,
  localePrefix: 'as-needed',
  // Native document locale links let the server own this cookie; no client JS reads/writes it.
  localeCookie: { secure: true },
});
