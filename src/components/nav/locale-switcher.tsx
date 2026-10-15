'use client';

import { useEffect, useRef } from 'react';
import { Globe2, ChevronDown } from 'lucide-react';
import { locales, localeLabels } from '@/i18n/locales';
import type { Locale } from '@/content/schema';

const SCROLL_KEY = 'locale-switch-scroll';
const languageNames = { en: 'English', es: 'Español', pt: 'Português' };

/** Native document links let the server own the Secure/HttpOnly preference. */
export function LocaleSwitcher({ currentLocale, label }: { currentLocale: Locale; label: string }) {
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved !== null) { sessionStorage.removeItem(SCROLL_KEY); window.scrollTo(0, parseInt(saved, 10) || 0); }
  }, []);

  return <details ref={details} className="relative" onKeyDown={event => {
    if (event.key === 'Escape' && details.current) { details.current.open = false; details.current.querySelector('summary')?.focus(); }
  }}>
    <summary aria-label={`${localeLabels[currentLocale]} ${label}`} className="flex h-10 cursor-pointer list-none items-center gap-1.5 rounded-full border border-hairline-2 bg-bg-2/50 px-3 text-xs font-medium hover:bg-bg-2 [&::-webkit-details-marker]:hidden">
      <Globe2 className="hidden h-4 w-4 sm:block" aria-hidden="true" />
      <span>{localeLabels[currentLocale]}</span><ChevronDown className="h-3 w-3 opacity-60" aria-hidden="true" />
    </summary>
    <ul className="absolute right-0 top-12 z-50 min-w-[190px] rounded-xl border border-hairline-2 bg-background p-1.5 shadow-lg">
      {locales.map(locale => <li key={locale}><a href={`/${locale}`} aria-current={locale === currentLocale ? 'true' : undefined} className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm hover:bg-bg-2" onClick={event => {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
        event.currentTarget.href = `/${locale}${window.location.search}${window.location.hash}`;
      }}><span className="w-7 text-xs text-fg-dim">{localeLabels[locale]}</span><span lang={locale}>{languageNames[locale]}</span>{locale === currentLocale && <span className="ml-auto" aria-hidden="true">✓</span>}</a></li>)}
    </ul>
  </details>;
}
