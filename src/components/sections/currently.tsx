import { BlurFade } from '@/components/motion/blur-fade';
import type { SiteContent } from '@/content';

/**
 * Currently — a single focused statement with one emphasized clause in gold.
 * The right column carries small metadata; on mobile, metadata stacks below.
 */
export function Currently({ content }: { content: SiteContent }) {
  const { kicker, body, meta } = content.currently;

  return (
    <section
      id="currently"
      className="relative border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-6xl py-24 md:py-32">
        <BlurFade>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-8">
            {kicker}
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px] gap-10 md:gap-16 items-start">
          <BlurFade delay={0.08}>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[clamp(2rem,3.2vw,2.6rem)] leading-[1.25] tracking-tight text-foreground max-w-[34ch]">
              {body.preEm}
              <span className="text-primary font-medium">{body.em}</span>
              {body.postEm}
            </p>
          </BlurFade>

          <BlurFade delay={0.18}>
            <aside
              aria-label="Snapshot"
              className="md:pt-2 border-t border-hairline md:border-0 pt-6 md:pt-0 flex flex-col gap-3"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-mute">
                {meta.loc}
              </p>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-mute">
                {meta.scope}
              </p>
            </aside>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
