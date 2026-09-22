import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import type { SiteContent } from '@/content';

export function Hero({ content }: { content: SiteContent }) {
  const { hero } = content;
  return (
    <section id="hero" aria-labelledby="hero-heading" className="pt-[var(--nav-h)]">
      <div className="container max-w-6xl py-12 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[1.35fr_0.85fr] lg:gap-16">
          <div>
            <p className="mb-5 max-w-[36ch] text-sm font-medium text-fg-dim">{hero.status}</p>
            <h1 id="hero-heading" className="max-w-[16ch] text-[clamp(2.5rem,5.3vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-balance">
              {hero.headline.lineA}
            </h1>
            <p className="mb-8 mt-6 max-w-[49ch] text-base leading-relaxed text-fg-dim lg:text-lg">{hero.sub}</p>
            <Button asChild size="lg" className="rounded-full px-6">
              <a href={hero.cta.href} target="_blank" rel="noopener noreferrer">{hero.cta.label}<ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-bg-2 md:aspect-[4/5]">
              <Image src="/assets/img/binance-day-peru.webp" alt={hero.photoAlt} fill priority sizes="(max-width: 767px) calc(100vw - 40px), 430px" className="object-cover object-[50%_32%]" />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-fg-dim">{hero.photoCaption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
