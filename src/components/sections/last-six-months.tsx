'use client';

import Image from 'next/image';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { BlurFade } from '@/components/motion/blur-fade';
import { FOLLOWER_COUNT } from '@/content/followers';
import type {
  CommsPost,
  GrowthChart,
  ImpactMetric,
  SiteContent,
} from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * #last-6-months — flagship proof section. Merges the old #impact (curated
 * to the 6 strongest metrics) with the old Communication tab (event/content
 * cards). One growth chart sits between metrics and highlights.
 *
 * No tabs, no count-up. Metrics fade-up on a clean hairline grid with a
 * 70ms stagger. The growth-chart line draws in on view (single gold stroke).
 */
export function LastSixMonths({ content }: { content: SiteContent }) {
  const {
    kicker,
    heading,
    intro,
    metrics,
    growth,
    highlightsKicker,
    highlights,
  } = content.lastSixMonths;

  return (
    <section
      id="last-6-months"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-6xl py-24 md:py-32">
        <BlurFade blur={false} y={8} duration={0.45}>
          {/* Eyebrow (mono "H1 2026") sits above the h2 — keep it as a <p>;
              "Last 6 months" below is the actual section heading. */}
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold-ink mb-4">
            {kicker}
          </p>
        </BlurFade>

        <BlurFade blur={false} y={8} duration={0.5} delay={0.06}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[clamp(2.25rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.022em] text-foreground mb-3">
            {heading}
          </h2>
        </BlurFade>

        {intro && (
          <BlurFade blur={false} y={8} duration={0.5} delay={0.1}>
            <p className="text-base md:text-lg text-fg-dim max-w-[52ch] leading-relaxed mb-14 md:mb-20">
              {intro}
            </p>
          </BlurFade>
        )}

        {/* FEATURED — follower-growth tile (count-up + curve), leads the block */}
        <GrowthCard growth={growth} />

        {/* METRICS — clean stat grid, animated gold underline per number */}
        <div className="mt-14 md:mt-16">
          <MetricGrid metrics={metrics} />
        </div>

        {/* CONTENT HIGHLIGHTS */}
        <div className="mt-20 md:mt-28">
          <BlurFade blur={false} y={8} duration={0.5}>
            {/* Sub-section heading, semantically an h3 under the section's h2 */}
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold-ink mb-7">
              {highlightsKicker}
            </h3>
          </BlurFade>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 list-none p-0">
            {highlights.map((post, i) => (
              <HighlightCard key={post.id} post={post} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Metric grid
 * -------------------------------------------------------------------------- */
function MetricGrid({ metrics }: { metrics: ImpactMetric[] }) {
  const reduced = useReducedMotion();
  return (
    <motion.dl
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 lg:gap-x-12 border-t border-hairline pt-10"
    >
      {metrics.map((m, i) => (
        <Metric key={`${m.value}-${i}`} metric={m} />
      ))}
    </motion.dl>
  );
}

function Metric({ metric }: { metric: ImpactMetric }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
      className="group/metric flex flex-col gap-2"
    >
      <dd className="font-display font-medium tracking-[-0.025em] tabular-nums leading-[1] text-foreground text-4xl sm:text-5xl">
        {metric.value}
      </dd>
      {/* gold underline draws in on view; nudges wider on hover */}
      <motion.span
        aria-hidden="true"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.55, delay: 0.15, ease: EASE } },
        }}
        className="block h-[2px] w-8 origin-left rounded-full bg-gold-ink/60 transition-[width] duration-300 group-hover/metric:w-12"
      />
      <dt className="text-sm text-fg-dim leading-snug max-w-[26ch]">
        {metric.label}
      </dt>
      {metric.detail && (
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-mute">
          {metric.detail}
        </p>
      )}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
 * Count-up — animates 0 → target once, when scrolled into view.
 *
 * Only two real data points exist for follower growth, so this is the hero
 * number. Under prefers-reduced-motion it renders the final value immediately.
 * -------------------------------------------------------------------------- */
function CountUp({
  to,
  suffix = '',
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) {
      setVal(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {val.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

/* --------------------------------------------------------------------------
 * Growth chart — @BNBChainLatAm follower growth.
 *
 * Exactly two real anchors: the takeover point (growth.startValue on
 * growth.startDate) and today's FOLLOWER_COUNT on growth.endDate. The curve is
 * a single smooth cubic drawn purely as a visual connector between those two
 * anchors — there are NO intermediate data points, real or invented. The big
 * count-up number is the real metric; the curve is decorative shape only.
 * -------------------------------------------------------------------------- */
function GrowthCard({ growth }: { growth: GrowthChart }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const reduced = useReducedMotion();

  const endDisplay = `${FOLLOWER_COUNT.toLocaleString('en-US')}+`;

  // Two anchors only. Start sits low-left, end sits high-right. The path
  // between them is a hand-tuned cubic that hugs the baseline early then
  // accelerates upward — an "organic takeoff" shape, not a plotted series.
  const W = 800;
  const H = 220;
  const PAD_X = 28;
  const PAD_Y = 30;

  const x0 = PAD_X;
  const y0 = H - PAD_Y;          // start anchor (low)
  const x1 = W - PAD_X;
  const y1 = PAD_Y;              // end anchor (high)
  const dx = x1 - x0;

  // Control points: stay flat near the start, sweep up toward the end.
  const linePath = `M ${x0} ${y0} C ${x0 + dx * 0.5} ${y0}, ${x1 - dx * 0.18} ${y1 + (y0 - y1) * 0.15}, ${x1} ${y1}`;
  const areaPath = `${linePath} L ${x1} ${H - PAD_Y} L ${x0} ${H - PAD_Y} Z`;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-primary/25 bg-card/50 p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_-30px_rgba(240,185,11,0.25)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8 items-center">
        {/* Left — the real metric: title + count-up + framing (1 column) */}
        <div className="md:col-span-1">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-mute mb-3">
            {growth.title}
          </p>
          <CountUp
            to={FOLLOWER_COUNT}
            suffix="+"
            className="block font-display font-medium tracking-[-0.03em] leading-[0.9] text-foreground text-6xl sm:text-7xl"
          />
          <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-gold-ink">
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            {growth.startValue} → {endDisplay}
          </p>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-mute">
            {growth.caption}
          </p>
        </div>

        {/* Right — the connector curve, spanning two columns */}
        <div className="relative md:col-span-2">
          {/* Accessible summary — the two real anchors, in prose. The SVG is
              decorative given this, so it is aria-hidden. */}
          <p className="sr-only">
            {`${growth.title}: grew from ${growth.startValue} (${growth.startDate}) to ${endDisplay} (${growth.endDate}), ${growth.caption}.`}
          </p>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            aria-hidden="true"
            focusable="false"
          >
          <defs>
            <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="hsl(var(--primary))" stopOpacity="0.22" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* hairline baseline */}
          <line
            x1={PAD_X}
            y1={H - PAD_Y}
            x2={W - PAD_X}
            y2={H - PAD_Y}
            stroke="hsl(var(--foreground) / 0.1)"
            strokeWidth="1"
          />

          {/* start anchor — hollow dot (low-left) */}
          <circle
            cx={x0}
            cy={y0}
            r="4"
            fill="hsl(var(--background))"
            stroke="hsl(var(--foreground) / 0.3)"
            strokeWidth="1.5"
          />

          {/* area under the connector */}
          <motion.path
            d={areaPath}
            fill="url(#growth-fill)"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          />

          {/* connector — stroke uses --gold-ink so it stays visible on white */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="hsl(var(--gold-ink))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.2, ease: EASE }}
          />

          {/* end anchor — bright gold dot (high-right) */}
          <motion.circle
            cx={x1}
            cy={y1}
            r="5.5"
            fill="hsl(var(--primary))"
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: 1.1, ease: EASE }}
          />
        </svg>

          {/* Anchor labels — the two real, dated data points */}
          <div className="flex justify-between mt-3 font-mono text-xs" aria-hidden="true">
            <span className="text-fg-mute">
              {growth.startValue} · {growth.startDate}
            </span>
            <span className="text-gold-ink tabular-nums">
              {endDisplay} · {growth.endDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Content highlight card
 * -------------------------------------------------------------------------- */
function HighlightCard({ post, index }: { post: CommsPost; index: number }) {
  const reduced = useReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 14 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.li
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
      className="group"
    >
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'block rounded-xl overflow-hidden border border-hairline bg-card',
          'transition-[border-color,transform,box-shadow] duration-300',
          'hover:border-primary hover:-translate-y-1',
          'hover:shadow-[0_24px_50px_-20px_rgba(240,185,11,0.18)]',
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
          <Image
            src={post.photo}
            alt={post.alt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-mute">
            <span>{post.platform}</span> · <span>{post.date}</span>
          </p>
          <p className="font-display text-lg leading-[1.3] tracking-[-0.012em] text-foreground flex items-start gap-2">
            <span className="flex-1">{post.topic}</span>
            <ArrowUpRight
              className="h-4 w-4 mt-1 shrink-0 text-fg-mute transition-[color,transform] duration-200 group-hover:text-gold-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </p>
        </div>
      </a>
    </motion.li>
  );
}
