// DRAFT TRANSLATION — pending review (Brazilian Portuguese).
// Phase 6 restructure mirrors en.ts. New strings flagged with "TODO: review".

import type { SiteContent } from './schema';

export const pt: SiteContent = {
  seo: {
    // 55 chars
    title: 'Stefano Cintioli — Líder de Comunidade LatAm, BNB Chain',
    // 142 chars
    description:
      'Líder de Comunidade LatAm na BNB Chain. Conecto builders Web3 da região com o vertical certo e entrego as ferramentas que o trabalho precisa.',
    keywords: [
      'web3',
      'blockchain',
      'BNB Chain',
      'LatAm',
      'desenvolvimento de negócios',
      'comunidade',
    ],
  },

  nav: {
    now: 'Agora',
    lastSixMonths: 'Últimos 6 meses',
    how: 'Como trabalho',
    contact: 'Contato',
  },

  hero: {
    eyebrow: 'Argentina · LatAm · Web3 global',
    headline: {
      lineA: 'Conectando o talento da região',
      preAccent: 'com as oportunidades ',
      accent: 'Web3',
      postAccent: ' globais.',
    },
    sub: 'Acho quem tá construindo de verdade na região e conecto com o time certo dentro da BNB Chain. E o que falta no caminho, eu construo.',
    status: 'LatAm Community Lead · BNB Chain · Buenos Aires',
    cta: { label: 'Agenda uma call', href: 'https://calendly.com/stefano-cintioli-bnbchain/30min' },
    photoCaption: 'Binance Day · Lima · Maio 2026',
  },

  background: {
    kicker: 'Antes',
    body: 'Antes desse trabalho eu estava do outro lado: quatro hackathons como hacker, ganhei um e voltei pra outro como mentor. No meio disso cofundei uma comunidade web3 aqui na Argentina e coloquei vários projetos on-chain de pé por conta própria. O motivo era o mesmo de hoje, melhorar e abrir oportunidades pra região.',
  },

  now: {
    kicker: 'Agora',
    body: 'À frente da comunidade LatAm da BNB Chain desde Buenos Aires, colocando builders de verdade no pipeline de BD.',
    chips: ['8 países', '6 meses', 'Buenos Aires'],
  },

  lastSixMonths: {
    kicker: 'H1 2026',
    heading: 'Últimos 6 meses', // TODO: review
    intro: 'Zero paid, tudo orgânico. É isso que seis meses na correria realmente moveram.',
    metrics: [
      { value: '76.3K', label: 'impressões em @BNBChainLatAm', detail: 'orgânicas' },
      { value: '+462',  label: 'novos membros no Telegram da BNB Chain ES' },
      { value: '8',     label: 'países ativados', detail: 'AR · BR · PE · VE · PY · CL · MX · ES' },
      { value: '25+',   label: '1-1s com KOLs e builders da região' },
      { value: '20+',   label: 'leads de BD encontrados e direcionados' },
      { value: '5+',    label: 'projetos na mainnet da BNB Chain', detail: 'um P0, um P1' },
    ],
    growth: {
      title: 'Seguidores de @BNBChainLatAm',
      caption: 'orgânico · desde que assumi a conta',
      startValue: '<100',
      startDate: 'dez 2025',
      endDate: 'ago 2026',
    },
    highlightsKicker: 'Conteúdo em destaque', // TODO: review
    highlights: [
      {
        id: 'binance-day-peru',
        platform: 'X',
        date: 'Maio 2026',
        topic: 'Binance Day Perú — cobertura oficial da BNB Chain LatAm',
        url: 'https://x.com/BNBChainLatAm/status/2052970649459597789',
        photo: '/assets/img/binance-day-peru.webp',
        alt: 'Stefano Cintioli no palco do Binance Day Perú, Lima, maio 2026',
      },
      {
        id: 'vendimia-tech',
        platform: 'X',
        date: 'Mar 2026',
        topic: 'VendimiaTech — migração da Blockenfy para a BNB Chain',
        url: 'https://x.com/s_cintioli_/status/2038248562824188158',
        photo: '/assets/img/vendimia-workshop.webp',
        alt: 'Hackathon VendimiaTech, Mendoza',
      },
      {
        id: 'crecimiento-partnership',
        platform: 'X',
        date: 'Abr 2026',
        topic: 'Parceria com a Crecimiento',
        url: 'https://x.com/crecimientoar/status/2034410672344137897',
        photo: '/assets/img/crecimiento-workshop.webp',
        alt: 'Workshop Crecimiento, Buenos Aires e Lima',
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
    kicker: 'Como penso e opero',
    principles: [
      {
        number: '01',
        title: 'Sinal',
        body: 'Busco os builders que levam a indústria a sério e conecto eles com a vertical certa do BD. Indicação quente ganha de cold pitch toda vez.',
      },
      {
        number: '02',
        title: 'Builders',
        body: 'Os recursos vão pra onde estão os builders: trilhas técnicas, workshops, bounties. Não pra logos em palco.',
      },
      {
        number: '03',
        title: 'Ferramentas',
        body: 'Se a ferramenta que eu preciso não existe, eu construo, me apoiando na IA. Buildar junto com a comunidade é um requisito pra mim.',
      },
      {
        number: '04',
        title: 'Ficar',
        body: 'Não basta fazer um hackathon ou workshop e ir embora. Tem que ficar, construir no longo prazo e compartilhar valores pra que as pessoas da nossa comunidade possam crescer na indústria.',
      },
    ],
  },

  contact: {
    kicker: 'Contato',
    headline: {
      preEm: 'Tá construindo algo na América Latina ou contratando pra região? ',
      em: 'Bora conversar.',
    },
    primaryCta: { label: 'Agenda uma call', href: 'https://calendly.com/stefano-cintioli-bnbchain/30min' },
    items: [
      { kind: 'email',    label: 'Email',    href: 'mailto:stefano.cintioli@bnbchain.org' },
      { kind: 'x',        label: 'X',        href: 'https://x.com/s_cintioli_' },
      { kind: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/stefanocintioli' },
      { kind: 'telegram', label: 'Telegram', href: 'https://t.me/StefanoCintioli' },
    ],
  },

  footer: {
    loc: 'Buenos Aires · UTC-3',
    lastUpdatedLabel: 'Atualizado',
    copyright: '© 2026 Stefano Cintioli',
  },

  action: {
    getInTouch: 'Agenda uma call',
  },
};
