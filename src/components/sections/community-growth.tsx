'use client';

import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { communityGrowth, communityTotals } from '@/content/community-growth';
import type { Locale, SiteContent } from '@/content';

const W = 900, H = 230, PAD = 12;
const maximum = Math.ceil(Math.max(...communityGrowth.map(p => p[1])) / 500) * 500;
const x = (i: number) => PAD + i / (communityGrowth.length - 1) * (W - PAD * 2);
const y = (value: number) => H - PAD - value / maximum * (H - PAD * 2);
// Straight daily segments preserve observed plateaus and dips. Never smooth into a fictional curve.
const line = communityGrowth.map((p,i) => `${i ? 'L' : 'M'}${x(i).toFixed(2)},${y(p[1]).toFixed(2)}`).join(' ');
const area = `${line} L${x(communityGrowth.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

export function CommunityGrowth({ content, locale }: { content: SiteContent; locale: Locale }) {
  const c = content.reach;
  const reduced = useReducedMotion();
  const gradient = useId();
  const [selected, setSelected] = useState(communityGrowth.length - 1);
  const [date, net] = communityGrowth[selected];
  const number = new Intl.NumberFormat(locale);
  const dateText = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
  const shortDate = (date: string) => new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
  const signed = (n: number) => `${n >= 0 ? '+' : ''}${number.format(n)}`;

  return (
    <section id="community" aria-labelledby="community-heading" className="container max-w-6xl">
      <div className="overflow-hidden rounded-2xl border border-hairline-2 bg-bg-2">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-12">
          <div>
            <h2 id="community-heading" className="text-xl font-semibold tracking-tight">{c.heading}</h2>
            <p className="mt-2 text-xs text-fg-dim">{c.source}</p>
            <p className="mt-1 text-xs text-fg-dim">{c.period}</p>
            <p className="mb-2 mt-8 text-sm text-fg-dim">{c.growth}</p>
            <p className="text-5xl font-medium tracking-[-0.055em] tabular-nums sm:text-6xl">{signed(communityTotals.netFollows)}</p>
            <p className="mt-3 max-w-[42ch] text-xs leading-relaxed text-fg-dim">{c.growthNote}</p>
          </div>
          <div className="min-w-0 self-end">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 text-sm">
              <time dateTime={date} className="text-fg-dim">{dateText}</time>
              <output aria-live="off" htmlFor={`${gradient}-date`} className="font-medium tabular-nums text-gold-ink">{signed(net)}</output>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label={`${c.growth}, ${c.period}, ${signed(communityTotals.netFollows)}`} onPointerMove={event => {
              if (event.pointerType !== 'mouse') return;
              const box = event.currentTarget.getBoundingClientRect();
              const fraction = ((event.clientX - box.left) / box.width * W - PAD) / (W - PAD * 2);
              setSelected(Math.max(0, Math.min(communityGrowth.length - 1, Math.round(fraction * (communityGrowth.length - 1)))));
            }}>
              <defs><linearGradient className="text-gold-ink" id={gradient} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity="0.2" /><stop offset="100%" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
              {[0,500,1000,1500].map(n => <line key={n} x1={PAD} x2={W-PAD} y1={y(n)} y2={y(n)} stroke="currentColor" opacity="0.1" strokeDasharray={n ? '4 6' : undefined} />)}
              <path d={area} fill={`url(#${gradient})`} className="text-gold-ink" />
              <motion.path d={line} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinejoin="round" className="text-gold-ink" initial={false} whileInView={reduced ? {} : { pathLength: [0,1] }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
              <line x1={x(selected)} x2={x(selected)} y1={PAD} y2={H-PAD} stroke="currentColor" opacity="0.25" strokeDasharray="4 6" />
              <circle cx={x(selected)} cy={y(net)} r="6" fill="currentColor" className="text-gold-ink" />
            </svg>
            <div className="mt-3 flex justify-between text-xs text-fg-dim"><span>{shortDate(communityGrowth[0][0])}</span><span>{shortDate(communityGrowth.at(-1)![0])}</span></div>
            <label className="mt-5 block text-xs text-fg-dim" htmlFor={`${gradient}-date`}>{c.explore}</label>
            <input id={`${gradient}-date`} type="range" min={0} max={communityGrowth.length-1} value={selected} onChange={event => setSelected(Number(event.target.value))} aria-valuetext={`${dateText}, ${signed(net)} ${c.growth}`} className="growth-slider mt-1 h-8 w-full cursor-pointer accent-[hsl(var(--gold-ink))]" />
          </div>
        </div>
        <dl className="grid grid-cols-2 border-t border-hairline-2 bg-background/40 px-6 sm:px-8">
          {[[communityTotals.impressions,c.impressions],[communityTotals.engagements,c.engagements]].map(([value,label]) => <div key={label} className="py-5 first:border-r first:border-hairline-2 last:pl-6"><dt className="text-xs text-fg-dim">{label}</dt><dd className="mt-1 text-2xl font-medium tabular-nums sm:text-3xl">{number.format(Number(value))}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
