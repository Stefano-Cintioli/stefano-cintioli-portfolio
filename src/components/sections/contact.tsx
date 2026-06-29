'use client';

import { Mail } from 'lucide-react';
import { ArrowRight, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { BlurFade, BlurStagger, BlurStaggerItem } from '@/components/motion/blur-fade';
import type { SiteContent } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Contact — closing section with headline + 4 contact channels + the same
 * two CTAs as the hero (so the page bookends with the same calls to action).
 */
export function Contact({ content }: { content: SiteContent }) {
  const { kicker, headline, items } = content.contact;

  return (
    <section
      id="contact"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-5xl py-24 md:py-36">
        <BlurFade>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-8">
            {kicker}
          </p>
        </BlurFade>

        <BlurFade delay={0.08}>
          <h2 className="font-display font-medium leading-[1.02] tracking-tight text-balance text-4xl sm:text-5xl md:text-[clamp(2.4rem,5vw,4rem)] max-w-[22ch] mb-14">
            <span className="text-foreground">{headline.preEm}</span>
            <span className="text-primary">{headline.em}</span>
          </h2>
        </BlurFade>

        <BlurStagger className="border-t border-hairline mb-12">
          {items.map((item) => (
            <BlurStaggerItem key={item.kind} className="block">
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={cn(
                  'group grid grid-cols-[24px_minmax(0,108px)_1fr] sm:grid-cols-[28px_140px_1fr]',
                  'items-center gap-4 sm:gap-6',
                  'py-5 border-b border-hairline transition-colors',
                  'hover:bg-muted/40',
                )}
              >
                <span className="inline-grid place-items-center text-fg-mute group-hover:text-primary transition-colors">
                  <ContactGlyph kind={item.kind} />
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-fg-mute">
                  {item.label}
                </span>
                <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                  {item.handle}
                </span>
              </a>
            </BlurStaggerItem>
          ))}
        </BlurStagger>

        <BlurFade delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group">
              <a href={content.hero.cta.primary.href}>
                {content.hero.cta.primary.label}
                <ArrowRight
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={content.hero.cta.secondary.href}
                download="stefano-cintioli-cv.pdf"
              >
                <Download className="mr-1 h-4 w-4" aria-hidden="true" />
                {content.hero.cta.secondary.label}
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

function ContactGlyph({ kind }: { kind: 'email' | 'x' | 'linkedin' | 'telegram' }) {
  if (kind === 'email') {
    return <Mail className="h-[18px] w-[18px]" aria-hidden="true" />;
  }
  if (kind === 'x') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    );
  }
  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="8" y1="11" x2="8" y2="17" />
        <circle cx="8" cy="7.5" r="0.7" fill="currentColor" />
        <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4" />
        <line x1="12" y1="11" x2="12" y2="17" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.5l17-7-3 16-6-5-2 5-1-6 11-8" />
    </svg>
  );
}
