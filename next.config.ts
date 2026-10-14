import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { reportOnlyPolicy } from './scripts/csp.mjs';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      { source: '/:path*', headers: [
        // Empty values remove Vercel's injected wildcard, including 404 documents.
        { key: 'Access-Control-Allow-Origin', value: '' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
      ] },
      // A document policy applies to its resources; repeating its hashes on
      // JS, CSS, fonts and optimized images only inflates critical transfers.
      { source: '/:path((?!_next/|assets/).*)', headers: [
        { key: 'Content-Security-Policy-Report-Only', value: reportOnlyPolicy },
      ] },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(config);
