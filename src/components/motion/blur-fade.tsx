'use client';

import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Magic-UI-style blur-fade reveal.
 *
 * Default: triggers when ~10% above center of the viewport, fires once,
 * 0.5s ease-out with a small 12px upward translate and a 6→0px blur.
 * Under prefers-reduced-motion, renders children immediately — no motion,
 * no opacity flash.
 */
export interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  /** Y-axis translate (in px) the element starts from. Default 12. */
  y?: number;
  /** Trigger on mount instead of on scroll. Use for hero. */
  inView?: boolean;
  /**
   * Animate `filter: blur()` alongside opacity + translate.
   * Set to false for large text blocks — animating filter forces the GPU to
   * re-rasterize the entire layer per frame, which is visibly janky on long
   * paragraphs in editorial type. Default true (small elements pay the cost
   * fine).
   */
  blur?: boolean;
  className?: string;
}

export function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  y = 12,
  inView = true,
  blur = true,
  className,
}: BlurFadeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const hidden = blur
    ? { opacity: 0, y, filter: 'blur(6px)' }
    : { opacity: 0, y };
  const visible = blur
    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
    : { opacity: 1, y: 0 };

  if (inView) {
    return (
      <motion.div
        initial={hidden}
        whileInView={visible}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration, delay, ease: REVEAL_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      animate={visible}
      transition={{ duration, delay, ease: REVEAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * Stagger group — container handles whileInView, items inherit via variants
 * ------------------------------------------------------------------------- */

export interface BlurStaggerProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export function BlurStagger({
  children,
  stagger = 0.08,
  className,
}: BlurStaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: REVEAL_EASE },
  },
};

export interface BlurStaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function BlurStaggerItem({ children, className }: BlurStaggerItemProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
