import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/**
 * Locale-aware navigation primitives. Use these instead of next/link and
 * next/navigation in client components — they preserve the current locale
 * automatically and prefix URLs correctly.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
