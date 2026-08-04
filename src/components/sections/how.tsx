'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { BlurFade } from '@/components/motion/blur-fade';
import type { Principle, SiteContent } from '@/content';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * How I think & operate — a borderless, full-width numbered stack (01 → 04).
 *
 * Was a 2×2 card grid; the repeated rounded-card container read as the same
 * generic component as three other sections, and the short copy left the boxes
 * half-empty. This matches the site spec's original intent for the section:
 * "vertical stack, full width, generous whitespace, no cards, no effects."
 * Each principle is an editorial row (ghosted number + title on the left,
 * body on the right) separated by hairlines. Copy is verbatim from content.
 */
export function How({ content }: { content: SiteContent }) {
  return (
    <section
      id="how"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-5xl pt-20 pb-24 md:pt-24 md:pb-32">
        <BlurFade blur={false} y={8} duration={0.45}>
          {/* Section heading — softened from all-caps to sentence case */}
          <h2 className="font-mono text-[0.72rem] tracking-[0.06em] text-gold-ink mb-12 md:mb-16">
            {content.how.kicker}
          </h2>
        </BlurFade>

        <ol className="list-none p-0 m-0 border-t border-hairline">
          {content.how.principles.map((principle, i) => (
            <PrincipleRow key={principle.number} principle={principle} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function PrincipleRow({
  principle,
  index,
}: {
  principle: Principle;
  index: number;
}) {
  const reduced = useReducedMotion();
  const initial = reduced ? false : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.li
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="group grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-x-10 gap-y-3 border-b border-hairline py-9 md:py-12"
    >
      {/* Left — ghosted number + editorial title */}
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden="true"
          className="font-display font-medium leading-none tracking-[-0.02em] tabular-nums text-3xl sm:text-4xl text-primary/15 transition-colors duration-300 group-hover:text-primary/30"
        >
          {principle.number}
        </span>
        <h3 className="font-editorial text-2xl sm:text-3xl md:text-[clamp(1.75rem,2.6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.01em] text-foreground text-balance">
          {principle.title}
        </h3>
      </div>

      {/* Right — body */}
      <p className="text-[0.95rem] sm:text-base text-fg-dim leading-[1.7] max-w-[52ch] text-pretty md:pt-1.5">
        {principle.body}
      </p>
    </motion.li>
  );
}
