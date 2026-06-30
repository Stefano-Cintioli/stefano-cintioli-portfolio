'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { SocialGlyph } from '@/components/social-glyph';
import type { SiteContent } from '@/content';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * #contact — icons only.
 *
 * No headline, no kicker, no CTAs. The section's identity is its position
 * (the closing destination of the "Contact" nav link + scroll-spy target).
 * Footer keeps the same socials but in a denser, borderless treatment so
 * the icons here read as the primary contact surface.
 */
export function Contact({ content }: { content: SiteContent }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-5xl py-28 md:py-40">
        <motion.ul
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-9 list-none p-0"
        >
          {content.contact.items.map((item) => (
            <motion.li
              key={item.kind}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
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
                  'h-14 w-14 sm:h-16 sm:w-16',
                  'rounded-2xl border border-hairline-2',
                  'text-foreground bg-card',
                  'transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground',
                  'hover:shadow-[0_18px_38px_-16px_rgba(240,185,11,0.45)]',
                  'focus-visible:border-primary',
                )}
              >
                <SocialGlyph
                  kind={item.kind}
                  className="h-6 w-6 sm:h-7 sm:w-7"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
