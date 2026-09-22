import { setRequestLocale } from 'next-intl/server';
import { getContent, type Locale } from '@/content';
import { SiteNav } from '@/components/nav/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Hero } from '@/components/sections/hero';
import { BuilderSessions } from '@/components/sections/builder-sessions';
import { Events } from '@/components/sections/events';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { CommunityGrowth } from '@/components/sections/community-growth';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getContent(locale as Locale);
  return <>
    <SiteNav content={content} locale={locale as Locale} />
    <main id="main">
      <Hero content={content} />
      <BuilderSessions content={content} />
      <Events id="online-events" collection={content.online} ui={content.ui} locale={locale as Locale} />
      <CommunityGrowth content={content} locale={locale as Locale} />
      <Events id="offline-events" collection={content.offline} ui={content.ui} locale={locale as Locale} />
      <About content={content} />
      <Contact content={content} />
    </main>
    <SiteFooter content={content} />
  </>;
}
