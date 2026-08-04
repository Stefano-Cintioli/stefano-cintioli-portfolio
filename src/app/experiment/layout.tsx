import type { Metadata } from 'next';
import { Fraunces, Instrument_Serif, Bricolage_Grotesque } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import '../globals.css';

/**
 * TEMPORARY — design-experiment route (Tier 3 review surface).
 *
 * Not linked from anywhere, noindex/nofollow. Loads the three candidate
 * display faces plus the gold swatch comparison. Delete the entire
 * `src/app/experiment/` folder to remove — nothing else references it.
 */
const fraunces = Fraunces({ subsets: ['latin'], variable: '--exp-fraunces', display: 'swap' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--exp-instrument',
  display: 'swap',
});
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--exp-bricolage',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Design experiment (temporary — delete before merge)',
  robots: { index: false, follow: false },
};

export default function ExperimentLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} ${instrument.variable} ${bricolage.variable}`}
    >
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
