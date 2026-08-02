'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

import type { SiteContent } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Before → Now, as two connected "chapter" cards.
 *
 * Replaces the two separate stacked sections. Card 01 (Antes) is the origin,
 * card 02 (Ahora) is the current chapter, joined by a gold connector (an arrow
 * that points right on desktop, down on mobile). Cards reveal from opposite
 * sides on scroll and lift on hover, echoing the highlight cards further down.
 *
 * Anchors preserved: the section keeps id="background" (hero scroll-cue target)
 * and the Now card keeps id="now" (nav + scroll-spy target). All tokens are
 * the repo's own — hairline borders, card surface, gold-ink, primary.
 */
export function Chapters({ content }: { content: SiteContent }) {
  const reduced = useReducedMotion();
  const { background, now } = content;

  const reveal = (fromX: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16, x: fromX },
          whileInView: { opacity: 1, y: 0, x: 0 },
          viewport: { once: true, margin: '-10% 0px -10% 0px' } as const,
          transition: { duration: 0.55, ease: EASE },
        };

  const cardClass = cn(
    'group relative flex flex-col rounded-2xl border border-hairline bg-card/40',
    'p-6 sm:p-8 md:p-9',
    'transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'hover:border-primary hover:-translate-y-1',
    'hover:shadow-[0_24px_50px_-20px_rgba(240,185,11,0.18)]',
  );

  return (
    <section
      id="background"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-6xl py-24 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-5 md:gap-0">
          {/* Card 01 — Antes (origin) */}
          <motion.article {...reveal(-18)} className={cardClass}>
            <ChapterLabel n="01" kicker={background.kicker} />
            <p className="font-sans text-lg sm:text-xl md:text-[clamp(1.2rem,1.9vw,1.55rem)] text-foreground leading-[1.45] tracking-[-0.005em]">
              {background.body}
            </p>
          </motion.article>

          {/* Connector — gold arrow, horizontal on desktop, vertical on mobile */}
          <div
            className="flex items-center justify-center py-1 md:px-6 md:py-0"
            aria-hidden="true"
          >
            <span className="hidden md:block h-px w-6 bg-hairline-2" />
            <span className="grid place-items-center h-9 w-9 shrink-0 rounded-full border border-hairline-2 bg-card text-gold-ink">
              <ArrowRight className="hidden md:block h-4 w-4" />
              <ArrowDown className="md:hidden h-4 w-4" />
            </span>
            <span className="hidden md:block h-px w-6 bg-hairline-2" />
          </div>

          {/* Card 02 — Ahora (current chapter) */}
          <motion.article
            id="now"
            {...reveal(18)}
            className={cn(cardClass, 'scroll-mt-[var(--nav-h)]')}
          >
            <ChapterLabel n="02" kicker={now.kicker} />
            <p className="font-sans text-lg sm:text-xl md:text-[clamp(1.2rem,1.9vw,1.55rem)] text-foreground leading-[1.45] tracking-[-0.005em] mb-7">
              {now.body}
            </p>
            <ul className="mt-auto flex flex-wrap items-center gap-2.5 list-none p-0">
              {now.chips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center rounded-full border border-hairline-2 bg-card/60 px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-fg-dim transition-colors duration-300 group-hover:border-primary/40"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function ChapterLabel({ n, kicker }: { n: string; kicker: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-xs text-fg-mute tabular-nums">{n}</span>
      <span className="h-px w-4 bg-hairline-2" aria-hidden="true" />
      {/* Semantically the chapter's heading */}
      <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold-ink">
        {kicker}
      </h2>
    </div>
  );
}
