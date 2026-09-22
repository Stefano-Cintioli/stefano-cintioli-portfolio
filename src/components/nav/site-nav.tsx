'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleSwitcher } from '@/components/nav/locale-switcher';
import { MobileMenu } from '@/components/nav/mobile-menu';
import type { SiteContent, Locale } from '@/content';

const NAV_IDS = ['builder-sessions', 'online-events', 'offline-events', 'about', 'contact'];

export function SiteNav({
  content,
  locale: _locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const activeId = useScrollSpy(NAV_IDS);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { href: '#builder-sessions', label: content.nav.work, id: 'builder-sessions' },
    { href: '#online-events', label: content.nav.online, id: 'online-events' },
    { href: '#offline-events', label: content.nav.offline, id: 'offline-events' },
    { href: '#about', label: content.nav.about, id: 'about' },
    { href: '#contact', label: content.nav.contact, id: 'contact' },
  ];

  return (
    <header
      data-scrolled={scrolled ? 'true' : 'false'}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[var(--nav-h)]',
        'border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-border'
          : 'bg-background/85 backdrop-blur-md border-transparent',
      )}
    >
      <div className="container max-w-6xl h-full flex items-center justify-between gap-4">
        <a
          href="#hero"
          aria-label="Stefano Cintioli"
          className="inline-flex items-center gap-2.5 shrink-0 text-foreground transition-colors hover:text-gold-ink"
        >
          <span
            aria-hidden="true"
            className="hidden min-[380px]:inline-grid place-items-center h-9 w-9 rounded-full bg-foreground text-background text-[0.8rem] font-semibold tracking-[-0.07em] ring-2 ring-primary/60 ring-offset-2 ring-offset-background"
          >
            SC
          </span>
          <span className="font-display text-sm sm:text-base tracking-tight leading-none">
            Stefano Cintioli
          </span>
        </a>

        <nav aria-label={content.ui.navigation} className="hidden lg:flex items-center gap-7">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'relative py-1 text-sm transition-colors',
                  'after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px]',
                  'after:bg-primary after:origin-left after:transition-transform after:duration-300',
                  isActive
                    ? 'text-foreground after:scale-x-100'
                    : 'text-foreground/65 hover:text-foreground after:scale-x-0',
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LocaleSwitcher />
          <MobileMenu content={content} activeId={activeId} />
        </div>
      </div>
    </header>
  );
}
