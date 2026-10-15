import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

import { routing } from './i18n/routing';

/**
 * Next 16 renamed `middleware.ts` to `proxy.ts`. The factory from
 * next-intl is the same edge-runtime function — Next.js wires it up
 * based on the filename. We keep the function from next-intl/middleware
 * because that's still its export path (changing the file name does
 * not require changing the package's API).
 */
const handleLocale = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = handleLocale(request);
  const localeCookie = response.cookies.get('NEXT_LOCALE');
  if (localeCookie) {
    // Locale navigation uses document links. No client code accesses this cookie.
    response.cookies.set({ ...localeCookie, secure: true, httpOnly: true });
  }
  return response;
}

export const config = {
  // Match all paths except API routes, Next internals, Vercel internals,
  // and anything with a file extension (static assets in /public).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
