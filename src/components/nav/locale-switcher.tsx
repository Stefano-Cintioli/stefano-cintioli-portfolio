'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales, localeLabels, type Locale } from '@/content';

/**
 * Locale switcher — shadcn dropdown over a ghost icon button.
 *
 * On select, replaces the current path under the new locale via next-intl's
 * locale-aware router. URL changes update the static HTML — both EN (/) and
 * ES (/es) and PT (/pt) are pre-rendered.
 */
export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  function onSelect(next: Locale) {
    if (next === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Switch language"
          className="h-9 gap-1.5 px-2.5 font-mono text-xs uppercase tracking-[0.08em] text-foreground/80 hover:text-foreground"
          disabled={isPending}
        >
          <Languages className="h-4 w-4" aria-hidden="true" />
          <span aria-hidden="true">{localeLabels[currentLocale]}</span>
          <span className="sr-only">
            Current language: {localeLabels[currentLocale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => onSelect(loc)}
            className="gap-2 font-mono text-xs uppercase tracking-[0.08em]"
            aria-current={loc === currentLocale ? 'true' : undefined}
          >
            <span>{localeLabels[loc]}</span>
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
