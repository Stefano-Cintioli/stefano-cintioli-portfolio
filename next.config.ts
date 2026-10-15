import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { reportOnlyPolicy } from './scripts/csp.mjs';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      { source: '/:path*', headers: [
        // Vercel's static 404 replaces an empty value with '*'. Keep an explicit
        // allowlist for the canonical origin on every document response.
        { key: 'Access-Control-Allow-Origin', value: 'https://stefanocintioli.vercel.app' },
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
