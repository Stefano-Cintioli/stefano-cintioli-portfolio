import type { MetadataRoute } from 'next';

const SITE_URL = 'https://stefano-cintioli-portfolio.vercel.app';

/**
 * robots.txt — allow everything (this is a portfolio, no private paths),
 * and point crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
