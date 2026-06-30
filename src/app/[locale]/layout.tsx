import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { ThemeProvider } from '@/components/providers/theme-provider';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = getContent(locale);

  const description = content.hero.sub;
  const title = `Stefano Cintioli — ${content.hero.headline.lineA} ${content.hero.headline.preAccent}${content.hero.headline.accent}${content.hero.headline.postAccent}`;
  const path = locale === routing.defaultLocale ? '' : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: '%s · Stefano Cintioli' },
    description,
    authors: [{ name: 'Stefano Cintioli' }],
    openGraph: {
      type: 'profile',
      title,
      description,
      siteName: 'Stefano Cintioli',
      url: `${SITE_URL}${path}`,
      locale: locale === 'en' ? 'en_US' : locale === 'es' ? 'es_AR' : 'pt_BR',
      images: [
        {
          url: '/assets/og-card.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/og-card.jpg'],
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
    icons: {
      icon: [
        // SVG first — scalable, modern browsers prefer it for crisp tab icons at any size
        { url: '/assets/favicon.svg', type: 'image/svg+xml' },
        // PNG fallback for browsers that don't render SVG favicons
        { url: '/assets/favicon.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: [
        { url: '/assets/apple-touch-icon.png', sizes: '180x180' },
      ],
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

  // schema.org Person — static facts about Stefano. Same payload across
  // locales (description swaps per locale to surface localized intent),
  // emitted as a JSON-LD <script> in the body so crawlers + LLMs can read
  // structured metadata without parsing the visible DOM.
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Stefano Cintioli',
    url: SITE_URL,
    image: `${SITE_URL}/assets/og-card.jpg`,
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
