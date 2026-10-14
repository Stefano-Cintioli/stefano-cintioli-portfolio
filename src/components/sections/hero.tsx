import Image from 'next/image';
import { HeroMesh } from '@/components/hero-mesh';
import { RequestCall } from '@/components/request-call';
import { SocialLinks } from '@/components/social-links';
import type { SiteContent } from '@/content';

export function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero-section pt-[var(--nav-h)]">
      <div className="container hero-content">
        <div className="hero-portrait-stage">
          <HeroMesh />
          <div className="hero-portrait">
            <Image
              id="hero-portrait-image"
              src="/assets/img/hero-peru.webp"
              alt={content.hero.photoAlt}
              width={500}
              height={500}
              priority
              fetchPriority="high"
              sizes="(min-width: 768px) 200px, 160px"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <h1 id="hero-heading" className="hero-name hero-text-reveal">Stefano Cintioli</h1>
        <p className="hero-role hero-text-reveal">{content.hero.status}</p>
        <div className="hero-action"><RequestCall copy={content.requestForm} /></div>
        <SocialLinks items={content.contact.items} className="hero-socials" />
      </div>
    </section>
  );
}
