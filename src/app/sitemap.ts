import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://stefano-cintioli-portfolio.vercel.app';

/**
 * Sitemap — one entry per locale, each with hreflang alternates.
 *
 * Default locale (en) lives at the bare root; ES + PT at /es and /pt
 * (matches next-intl's `localePrefix: 'as-needed'` config).
 *
 * Next.js builds this into /sitemap.xml at the site root.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = {
    en: SITE_URL,
    es: `${SITE_URL}/es`,
    pt: `${SITE_URL}/pt`,
  };

  return routing.locales.map((locale) => ({
    url:
      locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1.0 : 0.8,
    alternates: { languages },
  }));
}
