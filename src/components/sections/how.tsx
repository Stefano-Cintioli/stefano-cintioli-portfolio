'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { BlurFade } from '@/components/motion/blur-fade';
import type { Principle, SiteContent } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * How I think & operate — 4 principles in a 2×2 grid. Phase 6 polish:
 * smaller ghosted number, tighter card padding, cleaner spacing rhythm.
 */
export function How({ content }: { content: SiteContent }) {
  return (
    <section
      id="how"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-6xl py-24 md:py-32">
        <BlurFade blur={false} y={8} duration={0.45}>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary mb-10 md:mb-14">
            {content.how.kicker}
          </p>
        </BlurFade>

        <ol className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 list-none p-0">
          {content.how.principles.map((principle, i) => (
            <PrincipleCard
              key={principle.number}
              principle={principle}
              index={i}
            />
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
  const initial = reduced ? false : { opacity: 0, y: 14 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.li
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className={cn(
        'group relative rounded-2xl border border-hairline bg-card text-card-foreground',
        'p-7 sm:p-8 md:p-9',
        'transition-[border-color,transform] duration-300',
        'hover:border-primary hover:-translate-y-1',
      )}
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span
          aria-hidden="true"
          className="font-display font-medium leading-none tracking-[-0.02em] tabular-nums text-3xl sm:text-4xl text-primary/15 group-hover:text-primary/25 transition-colors"
        >
          {principle.number}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary/80">
          {principle.keyword}
        </span>
      </div>

      <h3 className="font-display text-xl sm:text-2xl font-medium leading-[1.15] tracking-[-0.018em] text-foreground mb-3">
        {principle.title}
      </h3>
      <p className="text-[0.95rem] text-fg-dim leading-[1.65]">{principle.body}</p>
    </motion.li>
  );
}
