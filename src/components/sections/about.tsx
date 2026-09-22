import type { SiteContent } from '@/content';

export function About({ content }: { content: SiteContent }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-space">
      <div className="container max-w-6xl">
        <div className="border-t border-hairline-2 pt-10 sm:pt-14 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
          <h2 id="about-heading" className="section-title mb-7 md:mb-0">{content.about.heading}</h2>
          <div className="max-w-[65ch]">
            {content.about.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0
                ? 'mb-7 text-xl font-medium leading-relaxed tracking-[-0.015em] sm:text-2xl sm:leading-relaxed'
                : 'mt-5 text-base leading-[1.8] text-fg-dim'}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
