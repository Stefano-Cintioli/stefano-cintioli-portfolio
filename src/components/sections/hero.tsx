'use client';

import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { ScrollCue } from '@/components/scroll-cue';
import type { SiteContent } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — entrance animation on MOUNT (not whileInView), since this is the
 * first paint. Each piece staggers in over ~0.7s total.
 */
export function Hero({ content }: { content: SiteContent }) {
  const reduced = useReducedMotion();

  const item = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12, filter: 'blur(6px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.55, delay, ease: EASE },
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
              className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-5"
            >
              {content.hero.eyebrow}
            </motion.p>

            <motion.h1
              {...item(0.08)}
              className="font-display font-medium leading-[0.96] tracking-tight mb-6 text-balance text-5xl sm:text-6xl md:text-[clamp(3rem,5.8vw,5.4rem)]"
            >
              <span className="block text-foreground">
                {content.hero.headline.lineA}
              </span>
              <span className="block">
                <span className="text-foreground">{content.hero.headline.preAccent}</span>
                <span className="text-primary">{content.hero.headline.accent}</span>
                <span className="text-foreground">{content.hero.headline.postAccent}</span>
              </span>
            </motion.h1>

            <motion.p
              {...item(0.16)}
              className="text-base md:text-lg text-fg-dim max-w-[42ch] leading-relaxed mb-9"
            >
              {content.hero.sub}
            </motion.p>

            <motion.div
              {...item(0.24)}
              className="flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="group">
                <a href={content.hero.cta.primary.href}>
                  {content.hero.cta.primary.label}
                  <ArrowRight
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <a
                  href={content.hero.cta.secondary.href}
                  download="stefano-cintioli-cv.pdf"
                >
                  <Download className="mr-1 h-4 w-4" aria-hidden="true" />
                  {content.hero.cta.secondary.label}
                </a>
              </Button>
            </motion.div>

            <motion.p
              {...item(0.32)}
              className="mt-9 font-mono text-xs uppercase tracking-[0.14em] text-fg-mute"
            >
              {content.hero.location}
            </motion.p>
          </div>

          {/* Right — photo */}
          <motion.figure
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
                  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
                  transition: { duration: 0.7, delay: 0.1, ease: EASE },
                })}
            className={cn(
              'order-1 md:order-2 relative rounded-2xl overflow-hidden',
              'border border-hairline-2 bg-bg-2',
              'shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55),0_12px_28px_-16px_rgba(240,185,11,0.18)]',
              'mx-auto md:mx-0 w-full max-w-[440px] md:max-w-none',
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

      <ScrollCue targetId="currently" />
    </section>
  );
}
