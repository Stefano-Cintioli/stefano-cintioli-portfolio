import { setRequestLocale } from 'next-intl/server';

import { getContent, type Locale } from '@/content';
import { SiteNav } from '@/components/nav/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { ScrollCue } from '@/components/scroll-cue';

/**
 * Phase 4 page — exercises nav/scroll-spy/footer/locale-switcher with
 * stub anchor sections. Real content sections (Hero/Currently/Work/Impact/
 * How I think/Contact) land in Phase 5 and replace these stubs.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getContent(locale as Locale);

  return (
    <>
      <SiteNav content={content} locale={locale as Locale} />

      <main id="main">
        {/* Provisional hero stub for Phase 4 — real hero lands in Phase 5 */}
        <section
          id="hero"
          className="relative min-h-[100svh] flex items-center"
        >
          <div className="container max-w-4xl pt-32 pb-16">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-5">
              {content.hero.eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.96] tracking-tight mb-7">
              <span className="block text-foreground">{content.hero.headline.lineA}</span>
              <span className="block">
                <span className="text-foreground">{content.hero.headline.preAccent}</span>
                <span className="text-primary">{content.hero.headline.accent}</span>
                <span className="text-foreground">{content.hero.headline.postAccent}</span>
              </span>
            </h1>
            <p className="text-lg text-fg-dim max-w-prose leading-relaxed mb-10">
              {content.hero.sub}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              v2 · Phase 4 — nav, scroll-spy, theme toggle, locale switcher live.
              Real sections land in Phase 5.
            </p>
          </div>
          <ScrollCue />
        </section>

        {/* Anchor stubs so the scroll-spy has targets to observe */}
        <SectionStub id="currently" label={content.nav.currently} />
        <SectionStub id="work" label={content.nav.work} />
        <SectionStub id="how" label={content.nav.how} />
        <SectionStub id="contact" label={content.nav.contact} />
      </main>

      <SiteFooter content={content} />
    </>
  );
}

function SectionStub({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="border-t border-hairline min-h-[60vh] flex items-center"
    >
      <div className="container max-w-4xl py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-3">
          {label}
        </p>
        <p className="text-fg-mute">Phase 5 will replace this stub with real content.</p>
      </div>
    </section>
  );
}
