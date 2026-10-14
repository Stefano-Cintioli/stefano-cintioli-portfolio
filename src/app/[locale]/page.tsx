import { notFound } from 'next/navigation';
import { locales } from '@/i18n/locales';
import { setRequestLocale } from 'next-intl/server';
import { getContent, type Locale } from '@/content';
import { SiteNav } from '@/components/nav/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { Hero } from '@/components/sections/hero';
import { BuilderSessions } from '@/components/sections/builder-sessions';
import { Events } from '@/components/sections/events';
import { Contact } from '@/components/sections/contact';
import { CommunityGrowth } from '@/components/sections/community-growth';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const content = getContent(locale as Locale);
  return <>
    <SiteNav content={{ nav: content.nav, ui: content.ui }} locale={locale as Locale} />
    <main id="main">
      <Hero content={content} />
      <BuilderSessions content={{ builderSessions: content.builderSessions }} />
      <Events id="online-events" collection={content.online} ui={content.ui} locale={locale as Locale} />
      <CommunityGrowth content={{ reach: content.reach }} locale={locale as Locale} />
      <Events id="offline-events" collection={content.offline} ui={content.ui} locale={locale as Locale} />
      <Contact content={content} />
    </main>
    <SiteFooter content={content} />
  </>;
}
