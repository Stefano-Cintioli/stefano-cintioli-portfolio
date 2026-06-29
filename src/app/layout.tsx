import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://stefano-cintioli-portfolio.vercel.app';
const SITE_TITLE = 'Stefano Cintioli — Bridging LatAm builders with the global Web3 ecosystem';
const SITE_DESCRIPTION = 'LatAm Community Lead at BNB Chain. Routing regional builders to the right vertical, building the tools the work needs along the way.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s · Stefano Cintioli',
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: 'Stefano Cintioli' }],
  openGraph: {
    type: 'profile',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Stefano Cintioli',
    url: SITE_URL,
    images: [
      {
        url: '/assets/og-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Stefano Cintioli — Bridging LatAm builders with the global Web3 ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/assets/og-card.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  icons: {
    icon: [
      { url: '/assets/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0d1117',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
