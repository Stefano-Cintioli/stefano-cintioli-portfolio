'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleSwitcher } from '@/components/nav/locale-switcher';
import { MobileMenu } from '@/components/nav/mobile-menu';
import type { SiteContent, Locale } from '@/content';

const NAV_IDS = ['currently', 'work', 'how', 'contact'];

/**
 * Sticky top nav.
 *
 * Layout      : brand | nav links | (toggle · switcher · mobile menu)
 * Background  : translucent + backdrop-blur once scrolled past ~24px
 * Scroll-spy  : useScrollSpy → IntersectionObserver, no scroll math
 * Active mark : 2px gold underline + foreground-color text
 * Mobile      : nav-links hide, hamburger appears (shadcn Sheet drawer)
 *
 * Smooth scroll: relies on the global `html { scroll-behavior: smooth }`
 * rule already set in globals.css; the anchor `href="#id"` does the rest.
 */
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
    { href: '#currently', label: content.nav.currently, id: 'currently' },
    { href: '#work',      label: content.nav.work,      id: 'work' },
    { href: '#how',       label: content.nav.how,       id: 'how' },
    { href: '#contact',   label: content.nav.contact,   id: 'contact' },
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
      <div className="container h-full flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#hero"
          aria-label="Stefano Cintioli — top"
          className="inline-flex items-center gap-2.5 text-foreground transition-colors hover:text-primary"
        >
          <span
            aria-hidden="true"
            className="inline-grid place-items-center h-7 w-7 rounded-md border border-primary text-primary font-mono text-[0.65rem] tracking-wider"
          >
            SC
          </span>
          <span className="hidden sm:inline font-display text-base tracking-tight leading-none">
            Stefano Cintioli
          </span>
        </a>

        {/* Desktop nav links — scroll-spy underline indicator */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
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

        {/* Right cluster */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LocaleSwitcher />
          <MobileMenu content={content} activeId={activeId} />
        </div>
      </div>
    </header>
  );
}
