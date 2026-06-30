import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

import { getContent, type Locale } from '@/content';
import { routing } from '@/i18n/routing';

/**
 * Per-locale OG image. File-based metadata route → Next.js auto-emits
 * <meta property="og:image" content=".../{locale}/opengraph-image/{id}?{hash}">
 * on each locale's page. No manual og:image / twitter:image entries needed.
 *
 * Runtime: Node (NOT Edge). On Next 16 with Turbopack, Edge runtime's fetch
 * doesn't yet implement the file: protocol, so `fetch(new URL('./X.ttf',
 * import.meta.url))` 500s with "not implemented... yet". Node runtime reads
 * via fs at module load, which Vercel bundles into the function output.
 */
export const runtime = 'nodejs';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Load Geist Sans once at module init — both weights are co-located in
 * src/app/[locale]/_fonts/. process.cwd() is the project root on Vercel. */
const FONT_DIR = join(process.cwd(), 'src/app/[locale]/_fonts');
const geistRegular = readFileSync(join(FONT_DIR, 'Geist-Regular.ttf'));
const geistSemiBold = readFileSync(join(FONT_DIR, 'Geist-SemiBold.ttf'));

// Per-locale alt — used by Next as the og:image:alt attribute.
const ALT: Record<Locale, string> = {
  en: 'Stefano Cintioli — LatAm Community Lead at BNB Chain',
  es: 'Stefano Cintioli — Líder de Comunidad LatAm en BNB Chain',
  pt: 'Stefano Cintioli — Líder de Comunidade LatAm na BNB Chain',
};
export const alt = ALT.en;

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (routing.locales.includes(locale as Locale) ? locale : 'en') as Locale;
  return [
    {
      contentType: 'image/png',
      size,
      alt: ALT[l],
      id: l,
    },
  ];
}

/* --- palette / type tokens (inline — ImageResponse takes no CSS) --- */
const BG          = '#0d1117';   // midnight
const GOLD        = '#F0B90B';   // BNB gold
const INK_ON_GOLD = '#0d1117';   // dark ink on gold square
const WHITE_TEXT  = '#F5F5F4';   // off-white
const MUTED       = '#9CA3AF';   // tagline + footer

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (routing.locales.includes(locale as Locale)
    ? locale
    : 'en') as Locale;
  const content = getContent(safeLocale);

  // Eyebrow = hero.eyebrow, uppercased. (en.eyebrow already mixed-case.)
  const eyebrow = content.hero.eyebrow.toUpperCase();

  // Role = hero.status with the location suffix (last "· X" segment) stripped.
  // Works in all 3 locales since they all end in "· Buenos Aires".
  const role = content.hero.status.replace(/\s·\s[^·]+$/, '');

  // Tagline = the full hero headline reassembled from its 4 parts.
  const h = content.hero.headline;
  const tagline = `${h.lineA} ${h.preAccent}${h.accent}${h.postAccent}`.trim();

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Geist',
          position: 'relative',
        }}
      >
        {/* 6px gold bar across the top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: GOLD,
          }}
        />

        {/* Content frame — 70px padding all around (76 top to clear the gold bar) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            padding: '76px 70px 70px 70px',
          }}
        >
          {/* TOP — SC monogram + eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '22px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '14px',
                background: GOLD,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: INK_ON_GOLD,
                fontSize: '28px',
                fontWeight: 600,
                letterSpacing: '-0.04em',
              }}
            >
              SC
            </div>
            <div
              style={{
                color: GOLD,
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </div>
          </div>

          {/* MIDDLE — name, role, tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                color: WHITE_TEXT,
                fontSize: '64px',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Stefano Cintioli
            </div>
            <div
              style={{
                color: GOLD,
                fontSize: '30px',
                fontWeight: 600,
                marginTop: '20px',
              }}
            >
              {role}
            </div>
            <div
              style={{
                color: MUTED,
                fontSize: '28px',
                marginTop: '24px',
                maxWidth: '820px',     // ~70% of 1200 − padding
                lineHeight: 1.2,
              }}
            >
              {tagline}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geistRegular,  weight: 400, style: 'normal' },
        { name: 'Geist', data: geistSemiBold, weight: 600, style: 'normal' },
      ],
    },
  );
}
