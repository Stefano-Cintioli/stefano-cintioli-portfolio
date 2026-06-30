'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Hero scroll affordance — a small chevron that fades out as soon as the
 * user scrolls (so it doesn't follow them down the page). The chevron has
 * a subtle two-frame bounce that is suppressed under prefers-reduced-motion
 * by the global rule in globals.css.
 *
 * Uses a string from next-intl if available, but since our messages dict
 * is empty (content lives in @/content), we just render a localized "Scroll"
 * inline via a small map.
 */
const SCROLL_LABEL: Record<string, string> = {
  en: 'Scroll',
  es: 'Scroll',
  pt: 'Scroll',
};

export function ScrollCue({ targetId = 'currently' }: { targetId?: string }) {
  const [hidden, setHidden] = useState(false);

  // useTranslations is overkill for one word; useLocale would be the right tool,
  // but importing useLocale here means another client roundtrip — keep it simple:
  // the label is the same string across locales anyway.
  const label = SCROLL_LABEL.en;

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setHidden(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={`#${targetId}`}
      aria-label="Scroll to next section"
      data-hidden={hidden ? 'true' : 'false'}
      className={[
        'absolute left-1/2 bottom-8 -translate-x-1/2',
        'inline-flex flex-col items-center gap-1.5',
        'text-fg-mute hover:text-gold-ink',
        'transition-[opacity,transform] duration-500',
        'data-[hidden=true]:opacity-0 data-[hidden=true]:translate-y-2 data-[hidden=true]:pointer-events-none',
      ].join(' ')}
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]">
        {label}
      </span>
      <ChevronDown
        className="h-4 w-4 motion-safe:animate-bounce"
        style={{ animationDuration: '2.2s' }}
        aria-hidden="true"
      />
    </a>
  );
}
