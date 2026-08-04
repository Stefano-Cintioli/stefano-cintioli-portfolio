import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

/**
 * Next 16 renamed `middleware.ts` to `proxy.ts`. The factory from
 * next-intl is the same edge-runtime function — Next.js wires it up
 * based on the filename. We keep the function from next-intl/middleware
 * because that's still its export path (changing the file name does
 * not require changing the package's API).
 */
export default createMiddleware(routing);

export const config = {
  // Match all paths except API routes, Next internals, Vercel internals,
  // and anything with a file extension (static assets in /public).
  // NOTE: `experiment` is excluded so the TEMPORARY /experiment route (a
  // separate non-localized root layout) isn't rewritten into the locale tree.
  // Remove this exclusion when deleting src/app/experiment/.
  matcher: ['/((?!api|_next|_vercel|experiment|.*\\..*).*)'],
};
