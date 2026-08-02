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
      lineA: "Connecting the region's talent",
      preAccent: 'with global ',
      accent: 'Web3',
      postAccent: ' opportunity.',
    },
    sub: "I find the people building for real in the region and connect them with the right team inside BNB Chain. Whatever's missing along the way, I build it.",
    status: 'LatAm Community Lead · BNB Chain · Buenos Aires',
    cta: { label: 'Book a call', href: 'https://calendly.com/stefano-cintioli-bnbchain/30min' },
    photoCaption: 'Binance Day · Lima · May 2026',
  },

  background: {
    kicker: 'Before',
    body: "Before this role I was on the other side of the table: four hackathons as a builder, one of them won, and one I came back to as a mentor. Along the way I co-founded a web3 community here in Argentina and shipped a handful of on-chain side projects. Same reason then as now, keep getting better and open up opportunities for the region.",
  },

  now: {
    kicker: 'Now',
    body: "Running BNB Chain's LatAm community from Buenos Aires and feeding real builders into the BD pipeline.",
    chips: ['8 countries', '6 months', 'Buenos Aires'],
  },

  lastSixMonths: {
    kicker: 'H1 2026',
    heading: 'Last 6 months',
    intro: "Zero paid, all organic. Here's what six months on the ground actually moved.",
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
      caption: 'organic · since I took over the account',
      startValue: '<100',
      startDate: 'Dec 2025',
      endDate: 'Aug 2026',
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
        body: "LatAm doesn't have a discovery problem, it has a signal problem. My job is to find the builders who are serious and get them to the right vertical inside BNB Chain BD (stables, payments, AI, RWAs) before the noise reaches them. A warm intro beats a cold pitch every time.",
      },
      {
        number: '02',
        keyword: 'FOCUS',
        title: 'Builders, not banners.',
        body: 'The budget goes where the builders are. Technical tracks, workshops, bounties, moving real projects on-chain. Not vanity sponsor tiers, not a stage with twenty logos on it.',
      },
      {
        number: '03',
        keyword: 'BUILD',
        title: 'Build what the work needs.',
        body: "The job comes with a fixed budget and a target that keeps moving. When the tool you need doesn't exist, the only honest move is to build it, and AI-assisted development gets it done faster than waiting around for it. What a community team can pull off is capped by the tools it has on hand, and some of those the team has to ship itself.",
      },
      {
        number: '04',
        keyword: 'PRESENCE',
        title: 'Show up. Stay. Build alongside.',
        body: "Regional ecosystems get built in years, not quarters. Same hackathon, same conference, same conversations with the same builders, over and over. The job isn't to broadcast at them. It's to sit next to them, listen to what they actually need, and build the path with them. No builders, no ecosystem. No showing up, no trust. By year three you stop being a visitor and start being part of the place.",
      },
    ],
  },

  contact: {
    kicker: 'Contact',
    headline: {
      preEm: 'Building something in LatAm, or hiring for the region? ',
      em: "Let's talk.",
    },
    primaryCta: { label: 'Book a call', href: 'https://calendly.com/stefano-cintioli-bnbchain/30min' },
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
    getInTouch: 'Book a call',
  },
};
