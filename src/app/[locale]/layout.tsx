import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Assistant } from '@/components/assistant';
import { routing } from '@/i18n/routing';
import { getContent, type Locale } from '@/content';
import '../globals.css';

const SITE_URL = 'https://stefano-cintioli-portfolio.vercel.app';

/**
 * Pre-render every locale at build time so each gets its own static HTML +
 * baked-in <html lang> + metadata. No runtime locale detection.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Site-wide publish date — the day the v2 redesign went to production.
 * Keep stable; doesn't refresh on every deploy. Used as article:published_time.
 */
const PUBLISHED_TIME = '2026-06-30T00:00:00Z';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(locale);

  // Document <title> + meta description come from the SEO block — concise,
  // per-locale, keyword-bearing. Kept separate from hero copy so neither
  // bleeds into the other.
  const docTitle = content.seo.title;
  const docDescription = content.seo.description;

  // OG / Twitter share previews use the longer headline-based string — that's
  // what looks right in a Slack / X / LinkedIn unfurl.
  const shareTitle = `Stefano Cintioli — ${content.hero.headline.lineA} ${content.hero.headline.preAccent}${content.hero.headline.accent}${content.hero.headline.postAccent}`;
  const shareDescription = content.hero.sub;

  const path = locale === routing.defaultLocale ? '' : `/${locale}`;
  // og:image + twitter:image are emitted automatically by Next.js from the
  // file-based metadata routes at src/app/[locale]/{opengraph,twitter}-image.tsx.
  // Don't set images here — would either duplicate or override the generator.
  // Stamped at server-render time → tracks the latest Vercel build date.
  const modifiedTime = new Date().toISOString();

  return {
    metadataBase: new URL(SITE_URL),
    // `title.default` is the home page's <title>. The template only kicks in
    // when a child route declares its own title — there are none today, so
    // it's safe to keep for future use; it can never append body content.
    title: { default: docTitle, template: '%s · Stefano Cintioli' },
    description: docDescription,
    keywords: content.seo.keywords,
    authors: [{ name: 'Stefano Cintioli', url: SITE_URL }],
    creator: 'Stefano Cintioli',
    openGraph: {
      type: 'profile',
      title: shareTitle,
      description: shareDescription,
      siteName: 'Stefano Cintioli',
      url: `${SITE_URL}${path}`,
      locale: locale === 'en' ? 'en_US' : locale === 'es' ? 'es_AR' : 'pt_BR',
      // images: emitted by ./opengraph-image.tsx
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
      creator: '@s_cintioli_',
      // images: emitted by ./twitter-image.tsx
    },
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        en: SITE_URL,
        es: `${SITE_URL}/es`,
        pt: `${SITE_URL}/pt`,
        'x-default': SITE_URL,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    // E-E-A-T dates — pass through to <head> as <meta property="article:...">
    other: {
      'article:published_time': PUBLISHED_TIME,
      'article:modified_time': modifiedTime,
    },
    icons: {
      icon: [
        { url: '/assets/favicon.svg', type: 'image/svg+xml' },
        { url: '/assets/favicon.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: [{ url: '/assets/apple-touch-icon.png', sizes: '180x180' }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const content = getContent(locale);

  // Stable @id for the Person — referenced by WebSite.publisher so crawlers
  // know both schemas describe the same entity.
  const PERSON_ID = `${SITE_URL}/#person`;
  const WEBSITE_ID = `${SITE_URL}/#website`;

  // schema.org Person — static facts about Stefano. Same payload across
  // locales (description swaps per locale to surface localized intent),
  // emitted as a JSON-LD <script> in the body so crawlers + LLMs can read
  // structured metadata without parsing the visible DOM.
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Stefano Cintioli',
    url: SITE_URL,
    // Person.image points at the generated EN OG card — same visual as the
    // share preview, no separate static asset required.
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: 'LatAm Community Lead',
    worksFor: {
      '@type': 'Organization',
      name: 'BNB Chain',
      url: 'https://www.bnbchain.org/',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
    description: content.hero.sub,
    knowsAbout: [
      'Web3',
      'Blockchain',
      'Business Development',
      'Community Growth',
      'AI Agents',
      'Stablecoins',
      'RWA',
      'Developer Relations',
    ],
    sameAs: [
      'https://x.com/s_cintioli_',
      'https://www.linkedin.com/in/stefanocintioli/',
      'https://t.me/StefanoCintioli',
    ],
  };

  // schema.org WebSite — names the site, declares its language for THIS
  // locale, and points its publisher at the Person above via @id. No
  // Organization schema — this is a personal site, not a brand.
  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Stefano Cintioli',
    url: SITE_URL,
    inLanguage: locale,
    publisher: { '@id': PERSON_ID },
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        {/* Skip-to-content — visually hidden until focused via Tab.
            Sits above the fixed nav so keyboard users can jump straight to <main>. */}
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:px-4 focus-visible:py-2 focus-visible:font-medium focus-visible:shadow-lg"
        >
          Skip to content
        </a>

        {/* schema.org Person — one per page, all locales */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* schema.org WebSite — declares the site + locale + publisher link */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* Deferred RAG chatbot mount point. Renders null today. */}
            <Assistant />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
