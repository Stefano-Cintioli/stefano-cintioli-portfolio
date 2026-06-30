'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { BlurFade } from '@/components/motion/blur-fade';
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
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary mb-4">
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

        {/* METRICS — hairline grid, no boxes, no count-up */}
        <MetricGrid metrics={metrics} />

        {/* GROWTH CHART — one minimal sparkline */}
        <div className="mt-20 md:mt-28">
          <GrowthCard growth={growth} />
        </div>

        {/* CONTENT HIGHLIGHTS */}
        <div className="mt-20 md:mt-28">
          <BlurFade blur={false} y={8} duration={0.5}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary mb-7">
              {highlightsKicker}
            </p>
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
      className="flex flex-col gap-2"
    >
      <dd className="font-display font-medium tracking-[-0.025em] tabular-nums leading-[1] text-foreground text-4xl sm:text-5xl">
        {metric.value}
      </dd>
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
 * Growth chart — minimal sparkline, single gold path draws in on view.
 *
 * Endpoints are real (start label + end label from content); intermediate
 * series points are visualization-only and flagged in the PR.
 * -------------------------------------------------------------------------- */
function GrowthCard({ growth }: { growth: GrowthChart }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const reduced = useReducedMotion();

  const W = 800;
  const H = 220;
  const PAD_X = 24;
  const PAD_Y = 28;

  const max = Math.max(...growth.series);
  const min = Math.min(...growth.series);
  const span = max - min || 1;

  const stepX = (W - PAD_X * 2) / (growth.series.length - 1);
  const points = growth.series.map((v, i) => ({
    x: PAD_X + i * stepX,
    y: PAD_Y + (H - PAD_Y * 2) * (1 - (v - min) / span),
  }));

  // Smooth cardinal-ish path between points
  const linePath = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${H - PAD_Y} L ${points[0].x} ${H - PAD_Y} Z`;

  const lastPoint = points[points.length - 1];

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-hairline bg-card/40 p-5 sm:p-7 md:p-8"
    >
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-mute">
          {growth.title}
        </p>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-mute">
          {growth.caption}
        </p>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`${growth.title}: ${growth.startLabel} to ${growth.endLabel}`}
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

          {/* area */}
          <motion.path
            d={areaPath}
            fill="url(#growth-fill)"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          />

          {/* line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.1, ease: EASE }}
          />

          {/* end point */}
          <motion.circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r="5"
            fill="hsl(var(--primary))"
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: 1.05, ease: EASE }}
          />
        </svg>

        {/* Endpoint labels — start (real), end (real) */}
        <div className="flex justify-between mt-3 font-mono text-xs">
          <span className="text-fg-mute">{growth.startLabel}</span>
          <span className="text-primary tabular-nums">{growth.endLabel}</span>
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
              className="h-4 w-4 mt-1 shrink-0 text-fg-mute transition-[color,transform] duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </p>
        </div>
      </a>
    </motion.li>
  );
}
