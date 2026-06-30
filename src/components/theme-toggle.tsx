'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Theme toggle — Light / Dark / System.
 * Uses shadcn dropdown-menu over a ghost icon-button.
 *
 * SSR-safe: avoids reading `theme` until mount to dodge hydration mismatch.
 * The trigger renders the Sun icon visible-in-light + Moon icon visible-in-dark
 * via Tailwind's `dark:` variant, so the initial paint always shows the
 * correct icon for the active theme without a JS round-trip.
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className="h-9 w-9 rounded-md text-foreground/80 hover:text-foreground"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem onClick={() => setTheme('light')} className="gap-2">
          <Sun className="h-4 w-4" aria-hidden="true" />
          <span>Light</span>
          {mounted && theme === 'light' && (
            <span className="ml-auto text-xs text-muted-foreground" aria-hidden="true">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="gap-2">
          <Moon className="h-4 w-4" aria-hidden="true" />
          <span>Dark</span>
          {mounted && theme === 'dark' && (
            <span className="ml-auto text-xs text-muted-foreground" aria-hidden="true">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="gap-2">
          <Monitor className="h-4 w-4" aria-hidden="true" />
          <span>System</span>
          {mounted && theme === 'system' && (
            <span className="ml-auto text-xs text-muted-foreground" aria-hidden="true">✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
