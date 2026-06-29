import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { routing } from './routing';

/**
 * Per-request i18n config.
 *
 * We don't use next-intl's messages dictionary — content is served via our
 * own typed @/content layer (Phase 3). This file only resolves the active
 * locale for the server runtime; `messages` is intentionally empty.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {},
  };
});
