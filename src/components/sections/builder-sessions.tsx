'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { SiteContent } from '@/content';

/** Exact threshold statements stay static. Only the integer count metrics count up. */
function SessionMetric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const reduced = useReducedMotion();
  const target = Number(value.replace(/\D/g, ''));
  const [display, setDisplay] = useState(target);
  const threshold = value.startsWith('>');
  useEffect(() => {
    if (!inView || reduced || threshold) { setDisplay(target); return; }
    const animation = animate(0, target, { duration: 0.9, ease: 'easeOut', onUpdate: n => setDisplay(Math.round(n)) });
    return () => animation.stop();
  }, [inView, reduced, target, threshold]);
  return <div ref={ref} className="session-metric group">
    <dt className="max-w-[25ch] text-sm text-fg-dim">{label}</dt>
    <dd className="mt-5 text-5xl font-medium tracking-[-0.06em] tabular-nums lg:text-6xl"><span className="sr-only">{value}</span><span aria-hidden="true">{threshold ? value : `${display}${value.endsWith('+') ? '+' : ''}`}</span></dd>
    <span aria-hidden="true" className="mt-6 block h-1 w-10 rounded-full bg-primary transition-[width] duration-300 group-hover:w-20" />
  </div>;
}

export function BuilderSessions({ content }: { content: SiteContent }) {
  const s = content.builderSessions;
  const [selected, setSelected] = useState(0);
  const country = s.countryDetails[selected];
  return (
    <section id="builder-sessions" aria-labelledby="sessions-heading" className="section-space bg-bg-2">
      <div className="container max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div><p className="mb-4 text-sm font-medium text-gold-ink">BNB Builder Sessions</p><h2 id="sessions-heading" className="section-title max-w-[20ch]">{s.heading}</h2></div>
          <div className="space-y-4 text-base leading-relaxed text-fg-dim"><p>{s.body}</p><p>{s.results}</p></div>
        </div>
        <dl className="my-9 grid gap-4 sm:grid-cols-3 md:my-12">{s.metrics.map(m => <SessionMetric key={m.label} {...m} />)}</dl>
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-sm font-medium">{s.coverageLabel}</h3><p className="text-xs text-fg-dim">{s.exploreLabel}</p></div>
            <div role="group" aria-label={s.coverageLabel} className="flex flex-wrap gap-2">
              {s.countryDetails.map((c,i) => <button key={c.name} type="button" aria-pressed={selected === i} aria-controls="country-sessions" onClick={() => setSelected(i)} className="country-button"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{c.name}</button>)}
            </div>
            <div id="country-sessions" role="region" aria-label={country.name} aria-live="polite" className="mt-4 min-h-[128px] rounded-xl border border-hairline bg-background/60 p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium"><MapPin size={16} aria-hidden="true" />{country.name}</p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">{country.links.map(link => <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm underline decoration-hairline-2 underline-offset-4 hover:text-gold-ink"><span>{link.title}<span className="block text-xs text-fg-dim">{link.label}</span></span><ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul>
            </div>
          </div>
          <div className="border-l-2 border-primary pl-6 md:mt-9"><h3 className="mb-3 text-sm font-medium">{s.upcomingLabel}</h3><p className="text-sm leading-relaxed text-fg-dim">{s.upcoming}</p><p className="mt-5 text-sm leading-relaxed">{s.goal}</p></div>
        </div>
        <p className="mt-6 text-xs text-fg-dim">{s.reviewed}</p>
      </div>
    </section>
  );
}
