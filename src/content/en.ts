/**
 * English content — single source of truth.
 *
 * Phase 6 restructure: nav reshaped (now / lastSixMonths / how / contact);
 * tools entirely removed; impact + communication merged into a curated
 * lastSixMonths block; now becomes short prose + chips; contact regains
 * its headline + primary CTA.
 */

import type { SiteContent } from './schema';

export const en: SiteContent = {
  seo: {
    // 51 chars
    title: 'Stefano Cintioli — LatAm Community Lead, BNB Chain',
    // 137 chars
    description:
      "LatAm Community Lead at BNB Chain. I route regional Web3 builders to the right vertical and ship the tools the work needs. Let's build.",
    keywords: [
      'web3',
      'blockchain',
      'BNB Chain',
      'LatAm',
      'business development',
      'community',
    ],
  },

  nav: {
    now: 'Now',
    lastSixMonths: 'Last 6 months',
    how: 'How I think',
    contact: 'Contact',
  },

  hero: {
    eyebrow: 'Argentina · LatAm · Global Web3',
    headline: {
      lineA: 'Bridging LatAm builders',
      preAccent: 'with global ',
      accent: 'Web3',
      postAccent: '.',
    },
    sub: 'Routing regional builders to the right vertical, building the tools the work needs along the way.',
    status: 'LatAm Community Lead · BNB Chain · Buenos Aires',
    cta: { label: 'Get in touch', href: '#contact' },
    photoCaption: 'Binance Day · Lima · May 2026',
  },

  now: {
    kicker: 'Now',
    body: "Running BNB Chain's LatAm community and sourcing leads to the BD pipeline from Buenos Aires.",
    chips: ['8 countries', '6 months', 'Buenos Aires'],
  },

  lastSixMonths: {
    kicker: 'H1 2026',
    heading: 'Last 6 months',
    intro: 'Organic growth, regional builders, real activations.',
    metrics: [
      { value: '76.3K', label: 'X impressions on @BNBChainLatAm', detail: 'organic' },
      { value: '+462',  label: 'BNB Chain ES Telegram members added' },
      { value: '8',     label: 'countries activated', detail: 'AR · BR · PE · VE · PY · CL · MX · ES' },
      { value: '25+',   label: 'KOL & builder 1-1s across the region' },
      { value: '20+',   label: 'BD leads sourced & routed' },
      { value: '5+',    label: 'projects live on BNB Chain mainnet', detail: 'one P0, one P1' },
    ],
    growth: {
      title: '@BNBChainLatAm followers',
      // Synthetic monthly shape from <100 → 476. Endpoints are real; midpoints
      // are visualization (no monthly snapshot data exists). Flagged in the PR.
      series: [80, 130, 195, 285, 370, 476],
      startLabel: '<100',
      endLabel: '476',
      caption: 'organic · zero paid · 6 months',
    },
    highlightsKicker: 'Content highlights',
    highlights: [
      {
        id: 'binance-day-peru',
        platform: 'X',
        date: 'May 2026',
        topic: 'Binance Day Perú — official BNB Chain LatAm coverage',
        url: 'https://x.com/BNBChainLatAm/status/2052970649459597789',
        photo: '/assets/img/binance-day-peru.webp',
        alt: 'Stefano Cintioli on stage at Binance Day Perú, Lima, May 2026',
      },
      {
        id: 'vendimia-tech',
        platform: 'X',
        date: 'Mar 2026',
        topic: 'VendimiaTech — Blockenfy migration to BNB Chain',
        url: 'https://x.com/s_cintioli_/status/2038248562824188158',
        photo: '/assets/img/vendimia-workshop.webp',
        alt: 'VendimiaTech Hackathon, Mendoza',
      },
      {
        id: 'crecimiento-partnership',
        platform: 'X',
        date: 'Apr 2026',
        topic: 'Crecimiento partnership',
        url: 'https://x.com/crecimientoar/status/2034410672344137897',
        photo: '/assets/img/crecimiento-workshop.webp',
        alt: 'Crecimiento Workshop, Buenos Aires and Lima',
      },
      {
        id: 'utn-university-tour',
        platform: 'LinkedIn',
        date: '2026',
        topic: 'UTN Buenos Aires — University Tour',
        url: 'https://www.linkedin.com/posts/natalie-abuchaibe_crypto-web3-blockchain-ugcPost-7444493501985116160-RFL4',
        photo: '/assets/img/university-tour-panel.webp',
        alt: 'Binance University Tour, UTN Buenos Aires',
      },
    ],
  },

  how: {
    kicker: 'How I think & operate',
    principles: [
      {
        number: '01',
        keyword: 'FILTER',
        title: 'First filter for the region.',
        body: "LatAm doesn't have a discovery problem. It has a signal problem. My job is to find serious builders in the region and route them to the right vertical owner inside BNB Chain BD (stables, payments, AI, RWAs) before noise reaches them. Warm referral over cold pitch.",
      },
      {
        number: '02',
        keyword: 'FOCUS',
        title: 'Builders, not banners.',
        body: 'The budget goes where the builders are. Technical tracks, workshops, bounties, direct project migrations. Not vanity sponsorship tiers and not stages with twenty logos on them.',
      },
      {
        number: '03',
        keyword: 'BUILD',
        title: 'Build what the work needs.',
        body: "The job comes with a fixed budget and a moving target. When the right tool doesn't exist, the only honest move is to build it. AI-assisted development makes this faster than waiting for it to arrive. The ceiling of what a community team produces is set by the tools it has access to. Some of those tools, the team has to ship themselves.",
      },
      {
        number: '04',
        keyword: 'PRESENCE',
        title: 'Show up. Stay. Build alongside.',
        body: "Regional ecosystems take years, not quarters. Repeat hackathons, repeat conferences, repeat conversations with the same builders. The job isn't to broadcast at them. It's to sit next to them, hear what they need, build the path with them. Without builders, no ecosystem. Without showing up, no trust. By year three you stop being a visitor and start being the room.",
      },
    ],
  },

  contact: {
    kicker: 'Contact',
    headline: {
      preEm: 'Building in LatAm, or hiring for it? ',
      em: "Let's talk.",
    },
    primaryCta: { label: 'Email Stefano', href: 'mailto:stefano.cintioli@bnbchain.org' },
    items: [
      { kind: 'email',    label: 'Email',    href: 'mailto:stefano.cintioli@bnbchain.org' },
      { kind: 'x',        label: 'X',        href: 'https://x.com/s_cintioli_' },
      { kind: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/stefanocintioli' },
      { kind: 'telegram', label: 'Telegram', href: 'https://t.me/StefanoCintioli' },
    ],
  },

  footer: {
    loc: 'Buenos Aires · UTC-3',
    lastUpdatedLabel: 'Last updated',
    copyright: '© 2026 Stefano Cintioli',
  },

  action: {
    getInTouch: 'Get in touch',
  },
};
