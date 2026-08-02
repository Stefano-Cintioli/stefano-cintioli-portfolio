import { BlurFade } from '@/components/motion/blur-fade';
import type { SiteContent } from '@/content';

/**
 * #background — short pre-role origin story. Sits between Hero and Now.
 *
 * Narrative prose (not a CV list), rendered in body sans so it reads as a
 * quiet lead-in and doesn't compete with the hero headline. Mirrors the Now
 * section's kicker + paragraph rhythm; no chips, no metrics.
 */
export function Background({ content }: { content: SiteContent }) {
  const { kicker, body } = content.background;

  return (
    <section
      id="background"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-4xl py-24 md:py-28">
        <BlurFade blur={false} y={8} duration={0.45}>
          {/* Section heading — small mono kicker, semantically the section's h2 */}
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-gold-ink mb-7">
            {kicker}
          </h2>
        </BlurFade>

        <BlurFade blur={false} y={8} duration={0.5} delay={0.08}>
          <p className="font-sans text-xl sm:text-2xl md:text-[clamp(1.4rem,2.4vw,1.85rem)] text-foreground leading-[1.4] tracking-[-0.005em] max-w-[46ch]">
            {body}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
