'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { BlurFade } from '@/components/motion/blur-fade';
import type { Principle, SiteContent } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * How I think — 4 operating principles in a 2×2 card grid.
 * Each card: oversized ghosted number, mono keyword in primary, display title,
 * body paragraph. Cards reveal in a staggered sequence when the section enters view.
 */
export function How({ content }: { content: SiteContent }) {
  return (
    <section
      id="how"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-6xl py-24 md:py-32">
        <BlurFade>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-10 md:mb-14">
            {content.how.kicker}
          </p>
        </BlurFade>

        <ol className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 list-none p-0">
          {content.how.principles.map((principle, i) => (
            <PrincipleCard key={principle.number} principle={principle} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function PrincipleCard({
  principle,
  index,
}: {
  principle: Principle;
  index: number;
}) {
  const reduced = useReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' };
  const animate = { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.li
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className={cn(
        'group relative rounded-2xl border border-hairline bg-card text-card-foreground',
        'p-8 sm:p-10 md:p-11',
        'transition-[border-color,transform] duration-300',
        'hover:border-primary hover:-translate-y-1',
      )}
    >
      <div className="flex items-baseline gap-4 mb-4">
        <span
          aria-hidden="true"
          className={cn(
            'font-mono font-medium leading-none tracking-tight tabular-nums',
            'text-5xl sm:text-6xl text-primary/15 group-hover:text-primary/25 transition-colors',
          )}
        >
          {principle.number}
        </span>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary/80">
          {principle.keyword}
        </span>
      </div>

      <h3 className="font-display text-2xl sm:text-3xl font-medium leading-[1.1] tracking-tight text-foreground mb-4">
        {principle.title}
      </h3>
      <p className="text-base text-fg-dim leading-[1.65]">{principle.body}</p>
    </motion.li>
  );
}
