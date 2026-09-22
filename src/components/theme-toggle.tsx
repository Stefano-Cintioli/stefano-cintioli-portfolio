'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getContent } from '@/content';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const ui = getContent(useLocale()).ui;
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    // Preserve the appearance of visitors who previously selected System, then fix that choice.
    if (theme === 'system') setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, [theme, setTheme]);
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" aria-label={ui.theme} className="h-10 w-10 rounded-full text-foreground/80 hover:text-foreground">
        <Sun className="h-[1.1rem] w-[1.1rem] dark:hidden" aria-hidden="true" />
        <Moon className="hidden h-[1.1rem] w-[1.1rem] dark:block" aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="min-w-[150px] rounded-xl p-1.5">
      <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
        <DropdownMenuRadioItem value="light" className="min-h-11 gap-2 rounded-lg"><Sun size={16} aria-hidden="true" />{ui.light}</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark" className="min-h-11 gap-2 rounded-lg"><Moon size={16} aria-hidden="true" />{ui.dark}</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>;
}
