import { setRequestLocale } from 'next-intl/server';

import { getContent, type Locale } from '@/content';
import { SiteNav } from '@/components/nav/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Hero } from '@/components/sections/hero';
import { Currently } from '@/components/sections/currently';
import { Contact } from '@/components/sections/contact';

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
        <Hero content={content} />
        <Currently content={content} />

        {/* Phase 5b will add #work, #impact, #how here */}
        <PlaceholderStub id="work" label={content.nav.work} />
        <PlaceholderStub id="how" label={content.nav.how} />

        <Contact content={content} />
      </main>

      <SiteFooter content={content} />
    </>
  );
}

function PlaceholderStub({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="border-t border-hairline scroll-mt-[var(--nav-h)]"
    >
      <div className="container max-w-4xl py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-3">
          {label}
        </p>
        <p className="text-fg-mute">Phase 5b will replace this stub.</p>
      </div>
    </section>
  );
}
