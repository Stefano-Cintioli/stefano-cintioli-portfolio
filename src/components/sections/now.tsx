import { BlurFade } from '@/components/motion/blur-fade';
import type { SiteContent } from '@/content';

/**
 * #now — short body-sans statement + 2-3 inline chips.
 *
 * Replaces the old Currently section. Statement is rendered in BODY SANS
 * (not display) so it doesn't compete with the hero headline; ~2 lines max.
 * Right-side mono block is gone — facts now sit as small chips under the
 * body, on the same baseline.
 */
export function Now({ content }: { content: SiteContent }) {
  const { kicker, body, chips } = content.now;

  return (
    <section
      id="now"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-4xl py-24 md:py-28">
        <BlurFade blur={false} y={8} duration={0.45}>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary mb-7">
            {kicker}
          </p>
        </BlurFade>

        <BlurFade blur={false} y={8} duration={0.5} delay={0.08}>
          <p className="font-sans text-xl sm:text-2xl md:text-[clamp(1.4rem,2.4vw,1.85rem)] text-foreground leading-[1.4] tracking-[-0.005em] max-w-[44ch] mb-8">
            {body}
          </p>
        </BlurFade>

        <BlurFade blur={false} y={6} duration={0.5} delay={0.16}>
          <ul className="flex flex-wrap items-center gap-2.5 list-none p-0">
            {chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center rounded-full border border-hairline-2 bg-card/60 px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.04em] text-fg-dim"
              >
                {chip}
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  );
}
