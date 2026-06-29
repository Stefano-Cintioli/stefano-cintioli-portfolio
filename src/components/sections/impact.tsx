'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

import { BlurFade } from '@/components/motion/blur-fade';
import type { ImpactCluster, ImpactMetric, SiteContent } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Impact — three clusters of metrics. Each cluster has a mono-caps gold
 * header, one prominent "lead" metric (≈1.7×), and three supporting items.
 * The lead numbers count up when they enter view; under prefers-reduced-motion,
 * the final value renders immediately with no animation.
 */
export function Impact({ content }: { content: SiteContent }) {
  return (
    <section
      id="impact"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-6xl py-24 md:py-32">
        <BlurFade>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-mute mb-12 md:mb-16">
            {content.impact.leadLine}
          </p>
        </BlurFade>

        <div className="flex flex-col gap-16 md:gap-20">
          {content.impact.clusters.map((cluster, i) => (
            <Cluster key={cluster.header} cluster={cluster} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Cluster({ cluster, index }: { cluster: ImpactCluster; index: number }) {
  return (
    <div>
      <BlurFade delay={index * 0.04}>
        <h3 className="font-mono text-[0.74rem] uppercase tracking-[0.18em] text-primary mb-6 font-medium">
          {cluster.header}
        </h3>
      </BlurFade>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline">
        <MetricCell metric={cluster.lead} variant="lead" delay={0.08 + index * 0.04} />
        {cluster.items.map((item, i) => (
          <MetricCell
            key={`${cluster.header}-${i}`}
            metric={item}
            variant="item"
            delay={0.12 + index * 0.04 + i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}

function MetricCell({
  metric,
  variant,
  delay,
}: {
  metric: ImpactMetric;
  variant: 'lead' | 'item';
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const reduced = useReducedMotion();
  const isLead = variant === 'lead';

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={cn(
        'relative p-6 sm:p-7 border-r border-b border-hairline',
        'flex flex-col gap-3',
        'transition-colors duration-300',
        isLead
          ? 'sm:col-span-2 lg:col-span-1 min-h-[220px] bg-gradient-to-b from-primary/8 to-primary/2 hover:from-primary/14 hover:to-primary/4'
          : 'min-h-[180px] hover:bg-muted/30',
      )}
    >
      <CountingNumber
        target={metric.value}
        play={inView && !reduced}
        className={cn(
          'font-mono font-medium leading-[1] tracking-tight tabular-nums',
          isLead
            ? 'text-primary text-5xl sm:text-6xl'
            : 'text-foreground text-3xl sm:text-4xl',
        )}
      />
      <p
        className={cn(
          'mt-auto leading-snug',
          isLead ? 'text-foreground text-base' : 'text-fg-dim text-sm',
        )}
      >
        {metric.label}
      </p>
      {metric.detail && (
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-mute whitespace-pre-line">
          {metric.detail}
        </p>
      )}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * Count-up — runs once when the cell enters view.
 *
 * Parses the target string into (prefix, number, suffix) — supports values
 * like "20+", "+462", "76.3K", "1,654". The numeric portion animates from 0
 * to its final value while the surrounding glyphs render statically.
 * Under reduced-motion (`play={false}`), the final string renders immediately.
 * ------------------------------------------------------------------------- */
function CountingNumber({
  target,
  play,
  className,
}: {
  target: string;
  play: boolean;
  className?: string;
}) {
  const parsed = parseMetric(target);
  const [display, setDisplay] = useState<string>(() => (play ? '0' : target));

  useEffect(() => {
    if (!play || !parsed) {
      setDisplay(target);
      return;
    }
    const startTime = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = parsed.value * eased;
      setDisplay(format(parsed, current));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, target, parsed]);

  return (
    <p className={className} aria-label={target}>
      {display}
    </p>
  );
}

interface ParsedMetric {
  prefix: string;
  value: number;
  decimals: number;
  thousandsSep: boolean;
  suffix: string;
}

function parseMetric(raw: string): ParsedMetric | null {
  // Capture: optional leading "+", the digit/comma/dot core, optional trailing glyphs.
  const match = raw.match(/^(\+?)([\d.,]+)([KkMm+]*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const hasComma = digits.includes(',');
  const cleaned = digits.replace(/,/g, '');
  const value = Number(cleaned);
  if (Number.isNaN(value)) return null;
  const decimals = (cleaned.split('.')[1] || '').length;
  return { prefix, value, decimals, thousandsSep: hasComma, suffix };
}

function format(p: ParsedMetric, n: number): string {
  let body = n.toFixed(p.decimals);
  if (p.thousandsSep) {
    const [int, dec] = body.split('.');
    body = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (dec ? `.${dec}` : '');
  }
  return `${p.prefix}${body}${p.suffix}`;
}
