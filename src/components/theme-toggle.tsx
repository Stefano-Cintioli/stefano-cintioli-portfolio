'use client';

import { useEffect, useRef, useState } from 'react';
import { Moon, Sun, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { SiteContent } from '@/content/schema';

export function ThemeToggle({ ui }: { ui: Pick<SiteContent['ui'], 'theme' | 'light' | 'dark'> }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    setMounted(true);
    if (theme === 'system') setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, [theme, setTheme]);
  return <details ref={details} className="relative" onKeyDown={event => {
    if (event.key === 'Escape' && details.current) { details.current.open = false; details.current.querySelector('summary')?.focus(); }
  }}>
    <summary aria-label={ui.theme} className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-foreground/80 hover:bg-bg-2 [&::-webkit-details-marker]:hidden">
      <Sun className="h-[1.1rem] w-[1.1rem] dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-[1.1rem] w-[1.1rem] dark:block" aria-hidden="true" />
    </summary>
    <div className="absolute right-0 top-12 z-50 min-w-[150px] rounded-xl border border-hairline-2 bg-background p-1.5 shadow-lg">
      {(['light', 'dark'] as const).map(value => <button key={value} type="button" aria-pressed={mounted && theme === value} className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-sm hover:bg-bg-2" onClick={() => {
        setTheme(value);
        if (details.current) { details.current.open = false; details.current.querySelector('summary')?.focus(); }
      }}>{value === 'light' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}{ui[value]}{mounted && theme === value && <Check size={14} className="ml-auto" aria-hidden="true" />}</button>)}
    </div>
  </details>;
}
