/**
 * English content — single source of truth.
 *
 * Migrated VERBATIM from the legacy content.json (v1.5.0) and the live
 * index.html. No facts, metrics, URLs, dates, or proper nouns were altered.
 *
 * Strings that are NEW in v2 (Get in touch CTA, tool slugs, photo alt
 * text) are written fresh here; ES + PT carry "TODO: review" markers
 * next to those same strings.
 */

import type { SiteContent } from './schema';

const NBSP = ' ';

export const en: SiteContent = {
  nav: {
    currently: 'Currently',
    work: 'Work',
    how: 'How I think',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Argentina · LatAm · Global Web3',
    headline: {
      lineA: `Bridging LatAm${NBSP}builders`,
      preAccent: 'with the global ',
      accent: 'Web3',
      postAccent: ' ecosystem.',
    },
    sub: 'LatAm Community Lead at BNB Chain. Routing regional builders to the right vertical, building the tools the work needs along the way.',
    cta: { label: 'Get in touch', href: '#contact' },
    photoCaption: 'Binance Day · Lima · May 2026',
    location: 'Buenos Aires · UTC-3',
  },
  currently: {
    kicker: 'Currently',
    body: {
      preEm: 'Currently ',
      em: "running BNB Chain's LatAm community and sourcing leads to the BD pipeline",
      postEm: ' from Buenos Aires. Routing regional projects toward stables, payments, AI, and RWA verticals. Co-developing BNB Dojo as a global builder-engagement layer. Always open to builders, founders, and operators working on the region.',
    },
    meta: {
      loc: 'Buenos Aires · UTC-3',
      scope: '8 countries activated · 6 months',
    },
  },
  work: {
    kicker: 'Work',
    tabs: { tools: 'Tools', impact: 'Impact', socials: 'Communication' },
    toolsHeading: 'Tools shipped during this role',
    tools: [
      {
        slug: 'bnb-dojo',
        number: '01',
        name: 'BNB Dojo',
        desc: 'Mobile-first gamified Web3 learning platform. Trilingual ES/PT/EN. Belt-rank system.',
        status: 'beta',
        url: 'https://bnb-dojo-v2.vercel.app/home',
      },
      {
        slug: 'daily-briefing-agent',
        number: '02',
        name: 'Daily Intelligence Briefing Agent',
        desc: 'Structured daily ecosystem briefings via Telegram and Gmail. Groq + LLaMA 3.',
        status: 'internal',
      },
      {
        slug: 'presentations-stack',
        number: '03',
        name: 'Presentations Stack + Brand Kit',
        desc: 'BNB Chain brand-compliant slide templates and event assets.',
        status: 'live',
        url: 'https://binance-day-peru-2026.vercel.app/',
      },
      {
        slug: 'ambassador-automation',
        number: '04',
        name: 'Ambassador Program Automation',
        desc: 'Cross-functional contribution to Guild ops infrastructure.',
        status: 'internal',
      },
    ],
    comms: {
      handlesKicker: 'Find me',
      posts: [
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
  },
  impact: {
    leadLine: 'First 6 months · H1 2026',
    clusters: [
      {
        header: 'ECOSYSTEM & BD',
        lead: { value: '20+', label: 'BD leads sourced & routed' },
        items: [
          { value: '5+', label: 'projects live on BNB Chain mainnet', detail: 'one P0, one P1' },
          { value: '22+', label: 'activations across the region' },
          { value: '25+', label: 'KOL & builder 1-1s across the region' },
        ],
      },
      {
        header: 'REACH & CONTENT',
        lead: { value: '76.3K', label: 'X impressions on @BNBChainLatAm, organic' },
        items: [
          { value: '476', label: '@BNBChainLatAm followers, from <100, zero paid' },
          { value: '6', label: 'AMAs & Spaces executed' },
          { value: '8', label: 'countries activated', detail: `AR${NBSP}·${NBSP}BR${NBSP}·${NBSP}PE${NBSP}·${NBSP}VE\nPY${NBSP}·${NBSP}CL${NBSP}·${NBSP}MX${NBSP}·${NBSP}ES` },
        ],
      },
      {
        header: 'COMMUNITY & TOOLS',
        lead: { value: '+462', label: 'BNB Chain ES Telegram members added' },
        items: [
          { value: '1,654', label: 'organic community messages' },
          { value: '30+', label: 'beta testers on BNB Dojo v2', detail: 'closed cohort' },
          { value: '5', label: 'internal tools shipped' },
        ],
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
    visit: 'Visit ↗',
    getInTouch: 'Get in touch',
  },
  status: {
    live: 'Live',
    beta: 'Beta',
    internal: 'Internal',
  },
};
