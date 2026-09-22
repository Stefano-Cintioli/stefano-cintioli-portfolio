'use client';

import { useEffect, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe2, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getContent, locales, localeLabels, type Locale } from '@/content';

/**
 * Locale switcher — shadcn dropdown over a ghost icon button.
 *
 * On select, replaces the current path under the new locale via next-intl's
 * locale-aware router. URL changes update the static HTML — both EN (/) and
 * ES (/es) and PT (/pt) are pre-rendered.
 *
 * Scroll preservation: a locale change is a route change, which normally
 * resets scroll to the top. We pass `scroll: false` to keep the viewport put,
 * and — as a belt-and-suspenders for the case where the subtree remounts —
 * stash the current scrollY and restore it on the next mount. Sections are
 * structurally identical across locales, so the reader stays in place. Deep
 * links (hash anchors) are untouched.
 */
const SCROLL_KEY = 'locale-switch-scroll';
const languageNames = { en: 'English', es: 'Español', pt: 'Português' };

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved !== null) {
      sessionStorage.removeItem(SCROLL_KEY);
      window.scrollTo(0, parseInt(saved, 10) || 0);
    }
  }, []);

  function onSelect(next: Locale) {
    if (next === currentLocale) return;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    }
    startTransition(() => {
      router.replace(`${pathname}${window.location.search}${window.location.hash}`, { locale: next, scroll: false });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={getContent(currentLocale).ui.language}
          className="h-10 gap-1.5 rounded-full border border-hairline-2 bg-bg-2/50 px-3 text-xs font-medium text-foreground hover:bg-bg-2"
          disabled={isPending}
        >
          <Globe2 className="hidden h-4 w-4 sm:block" aria-hidden="true" />
          <span aria-hidden="true">{localeLabels[currentLocale]}</span><ChevronDown className="h-3 w-3 opacity-60" aria-hidden="true" />
          <span className="sr-only">
            {localeLabels[currentLocale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px] rounded-xl p-1.5">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => onSelect(loc)}
            className="min-h-11 gap-3 rounded-lg px-3 text-sm"
            aria-current={loc === currentLocale ? 'true' : undefined}
          >
            <span className="w-7 text-xs text-fg-dim">{localeLabels[loc]}</span><span lang={loc}>{languageNames[loc]}</span>
            {loc === currentLocale && (
              <span
                className="ml-auto text-[0.65rem] text-muted-foreground"
                aria-hidden="true"
              >
                ✓
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
