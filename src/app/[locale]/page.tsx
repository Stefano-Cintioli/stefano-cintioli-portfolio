import { setRequestLocale } from 'next-intl/server';

import { getContent, type Locale } from '@/content';
import { SiteNav } from '@/components/nav/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Hero } from '@/components/sections/hero';
import { Currently } from '@/components/sections/currently';
import { Work } from '@/components/sections/work';
import { Impact } from '@/components/sections/impact';
import { How } from '@/components/sections/how';
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
        <Work content={content} />
        <Impact content={content} />
        <How content={content} />
        <Contact content={content} />
      </main>

      <SiteFooter content={content} />
    </>
  );
}
