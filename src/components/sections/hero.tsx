'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { ScrollCue } from '@/components/scroll-cue';
import type { SiteContent } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero.
 *
 * Headline tightened to AT MOST 3 lines; size dialed down from 5xl→4xl-md.
 * Single CTA. Floating "Buenos Aires · UTC-3" mono line is gone — replaced
 * with a small status chip directly below the CTA: "Role · Org · Location".
 * Entrance staggers on MOUNT (first paint, not whileInView).
 */
export function Hero({ content }: { content: SiteContent }) {
  const reduced = useReducedMotion();

  const item = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE },
        };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-[var(--nav-h)]"
    >
      <div className="container max-w-6xl py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
          {/* Left — copy */}
          <div className="order-2 md:order-1">
            <motion.p
              {...item(0)}
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold-ink mb-5"
            >
              {content.hero.eyebrow}
            </motion.p>

            <motion.h1
              {...item(0.06)}
              className={cn(
                'font-display font-medium tracking-[-0.02em] mb-7 text-balance',
                'leading-[1.04]',
                'text-[2.25rem] sm:text-[2.75rem] md:text-[clamp(2.5rem,4.4vw,3.75rem)]',
              )}
            >
              <span className="block text-foreground">
                {content.hero.headline.lineA}
              </span>
              <span className="block">
                <span className="text-foreground">{content.hero.headline.preAccent}</span>
                <span className="text-gold-ink">{content.hero.headline.accent}</span>
                <span className="text-foreground">{content.hero.headline.postAccent}</span>
              </span>
            </motion.h1>

            <motion.p
              {...item(0.12)}
              className="text-base md:text-lg text-fg-dim max-w-[44ch] leading-relaxed mb-8"
            >
              {content.hero.sub}
            </motion.p>

            <motion.div {...item(0.18)} className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="group">
                <a href={content.hero.cta.href}>
                  {content.hero.cta.label}
                  <ArrowRight
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Button>

              {/* Status chip — role · org · location */}
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5',
                  'border border-hairline-2 bg-card/60',
                  'font-mono text-[0.7rem] tracking-[0.04em] text-fg-dim',
                )}
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                />
                {content.hero.status}
              </span>
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.figure
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.6, delay: 0.08, ease: EASE },
                })}
            className={cn(
              'order-1 md:order-2 relative rounded-2xl overflow-hidden',
              'border border-hairline-2 bg-bg-2',
              'shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55),0_12px_28px_-16px_rgba(240,185,11,0.18)]',
              'mx-auto md:mx-0 w-full max-w-[420px] md:max-w-none',
              'aspect-[4/5]',
            )}
          >
            <Image
              src="/assets/img/binance-day-peru.webp"
              alt="Stefano Cintioli on stage at Binance Day Perú, Lima, May 2026"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover object-[50%_28%]"
            />
            <figcaption className="absolute left-0 right-0 bottom-0 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-fg-dim bg-gradient-to-t from-black/85 to-transparent">
              {content.hero.photoCaption}
            </figcaption>
          </motion.figure>
        </div>
      </div>

      <ScrollCue targetId="now" />
    </section>
  );
}
