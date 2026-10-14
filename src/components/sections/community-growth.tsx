import { communityGrowth, communityTotals } from '@/content/community-growth';
import { DeferredEnhancement } from './deferred-enhancement';
import { W, H, PAD, x, y, line, area } from './growth-geometry';
import type { Locale, SiteContent } from '@/content';

export function CommunityGrowth({ content, locale }: { content: Pick<SiteContent, 'reach'>; locale: Locale }) {
  const c = content.reach;
  const gradient = 'community-growth-gradient';
  const selected = communityGrowth.length - 1;
  const [date, net] = communityGrowth[selected];
  const number = new Intl.NumberFormat(locale);
  const dateText = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
  const shortDate = (date: string) => new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
  const signed = (n: number) => `${n >= 0 ? '+' : ''}${number.format(n)}`;

  return (
    <section id="community" aria-labelledby="community-heading" className="container max-w-6xl" data-locale={locale} data-growth-label={c.growth}>
      <DeferredEnhancement key={locale} id="community" kind="growth" />
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
              <time data-growth-date dateTime={date} className="text-fg-dim">{dateText}</time>
              <output data-growth-output aria-live="off" htmlFor={`${gradient}-date`} className="font-medium tabular-nums text-gold-ink">{signed(net)}</output>
            </div>
            <svg data-growth-chart viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label={`${c.growth}, ${c.period}, ${signed(communityTotals.netFollows)}`}>
              <defs><linearGradient className="text-gold-ink" id={gradient} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity="0.2" /><stop offset="100%" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
              {[0,500,1000,1500].map(n => <line key={n} x1={PAD} x2={W-PAD} y1={y(n)} y2={y(n)} stroke="currentColor" opacity="0.1" strokeDasharray={n ? '4 6' : undefined} />)}
              <path d={area} fill={`url(#${gradient})`} className="text-gold-ink" />
              <path d={line} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinejoin="round" className="text-gold-ink" />
              <line data-growth-guide x1={x(selected)} x2={x(selected)} y1={PAD} y2={H-PAD} stroke="currentColor" opacity="0.25" strokeDasharray="4 6" />
              <circle data-growth-point cx={x(selected)} cy={y(net)} r="6" fill="currentColor" className="text-gold-ink" />
            </svg>
            <div className="mt-3 flex justify-between text-xs text-fg-dim"><span>{shortDate(communityGrowth[0][0])}</span><span>{shortDate(communityGrowth.at(-1)![0])}</span></div>
            <label className="mt-5 block text-xs text-fg-dim" htmlFor={`${gradient}-date`}>{c.explore}</label>
            <input data-growth-input id={`${gradient}-date`} type="range" min={0} max={communityGrowth.length-1} defaultValue={selected} aria-valuetext={`${dateText}, ${signed(net)} ${c.growth}`} className="growth-slider mt-1 h-8 w-full cursor-pointer accent-[hsl(var(--gold-ink))]" />
          </div>
        </div>
        <dl className="grid grid-cols-2 border-t border-hairline-2 bg-background/40 px-6 sm:px-8">
          {[[communityTotals.impressions,c.impressions],[communityTotals.engagements,c.engagements]].map(([value,label]) => <div key={label} className="py-5 first:border-r first:border-hairline-2 last:pl-6"><dt className="text-xs text-fg-dim">{label}</dt><dd className="mt-1 text-2xl font-medium tabular-nums sm:text-3xl">{number.format(Number(value))}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
