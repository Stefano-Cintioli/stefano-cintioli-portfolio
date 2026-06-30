'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { BlurFade } from '@/components/motion/blur-fade';
import { Button } from '@/components/ui/button';
import { SocialGlyph } from '@/components/social-glyph';
import type { SiteContent } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * #contact — short headline + primary email CTA + 4 icon buttons.
 *
 * Phase 6 restores the headline + email CTA that were stripped in Phase 5c.
 * The footer no longer shows social icons (de-duplication), so the icon row
 * here is the single canonical surface for social/contact links.
 */
export function Contact({ content }: { content: SiteContent }) {
  const reduced = useReducedMotion();
  const { kicker, headline, primaryCta, items } = content.contact;

  return (
    <section
      id="contact"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-4xl py-24 md:py-32 text-center">
        <BlurFade blur={false} y={8} duration={0.45}>
          {/* Small label — h2 (the headline below carries the visual weight but is the same heading level) */}
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold-ink mb-7">
            {kicker}
          </p>
        </BlurFade>

        <BlurFade blur={false} y={8} duration={0.5} delay={0.06}>
          <h2 className="font-display font-medium leading-[1.1] tracking-[-0.022em] text-balance text-3xl sm:text-4xl md:text-[clamp(2rem,3.6vw,3rem)] max-w-[24ch] mx-auto mb-10">
            <span className="text-foreground">{headline.preEm}</span>
            <span className="text-gold-ink">{headline.em}</span>
          </h2>
        </BlurFade>

        <BlurFade blur={false} y={8} duration={0.5} delay={0.12}>
          <Button asChild size="lg" className="group mb-10">
            <a href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Button>
        </BlurFade>

        <motion.ul
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.16 } },
          }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 list-none p-0"
        >
          {items.map((item) => (
            <motion.li
              key={item.kind}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: EASE },
                },
              }}
            >
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  item.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                aria-label={item.label}
                className={cn(
                  'group inline-grid place-items-center',
                  'h-12 w-12 sm:h-14 sm:w-14',
                  'rounded-xl border border-hairline-2 bg-card/60',
                  'text-foreground/80',
                  'transition-[color,background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground',
                )}
              >
                <SocialGlyph
                  kind={item.kind}
                  className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
