// DRAFT TRANSLATION — pending review (Brazilian Portuguese).
// Phase 6 restructure mirrors en.ts. New strings flagged with "TODO: review".

import type { SiteContent } from './schema';

export const pt: SiteContent = {
  nav: {
    now: 'Agora',
    lastSixMonths: 'Últimos 6 meses',
    how: 'Como trabalho',
    contact: 'Contato',
  },

  hero: {
    eyebrow: 'Argentina · LatAm · Web3 global',
    headline: {
      lineA: 'Conectando builders latino-americanos',
      preAccent: 'à ',
      accent: 'Web3',
      postAccent: ' global.',
    },
    sub: 'Direcionando builders da região para o vertical certo, construindo no caminho as ferramentas que o trabalho exige.',
    status: 'LatAm Community Lead · BNB Chain · Buenos Aires', // TODO: review
    cta: { label: 'Fala comigo', href: '#contact' },
    photoCaption: 'Binance Day · Lima · Maio 2026',
  },

  now: {
    kicker: 'Agora',
    body: 'Liderando a comunidade LatAm da BNB Chain e encaminhando leads para o pipeline de BD desde Buenos Aires.',
    chips: ['8 países', '6 meses', 'Buenos Aires'], // TODO: review
  },

  lastSixMonths: {
    kicker: 'H1 2026',
    heading: 'Últimos 6 meses', // TODO: review
    intro: 'Crescimento orgânico, builders regionais, ativações reais.', // TODO: review
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
      series: [80, 130, 195, 285, 370, 476],
      startLabel: '<100',
      endLabel: '476',
      caption: 'orgânico · zero paid · 6 meses', // TODO: review
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
        keyword: 'FILTRAR',
        title: 'Primeiro filtro da região.',
        body: 'LatAm não tem problema de descoberta. Tem problema de sinal. Meu trabalho é achar os builders sérios da região e direcioná-los para o owner do vertical certo dentro do BD da BNB Chain (stables, pagamentos, AI, RWAs) antes que o ruído chegue. Indicação quente em vez de cold pitch.',
      },
      {
        number: '02',
        keyword: 'FOCO',
        title: 'Builders, não banners.',
        body: 'O orçamento vai onde estão os builders. Trilhas técnicas, workshops, bounties, migrações diretas de projetos. Não tiers de patrocínio de vaidade nem palcos com vinte logos.',
      },
      {
        number: '03',
        keyword: 'CONSTRUIR',
        title: 'Construir o que o trabalho exige.',
        body: 'O trabalho vem com orçamento fixo e alvo móvel. Quando a ferramenta certa não existe, a única jogada honesta é construí-la. O desenvolvimento assistido por AI deixa isso mais rápido do que esperar ela aparecer. O teto do que um time de community produz é determinado pelas ferramentas que ele tem à disposição. Algumas dessas ferramentas o próprio time precisa entregar.',
      },
      {
        number: '04',
        keyword: 'PRESENÇA',
        title: 'Aparecer. Ficar. Construir junto.',
        body: 'Ecossistemas regionais se constroem em anos, não em trimestres. Hackathons recorrentes, conferências recorrentes, conversas recorrentes com os mesmos builders. O trabalho não é transmitir para eles. É sentar ao lado, ouvir o que precisam, construir o caminho com eles. Sem builders, não há ecossistema. Sem presença, não há confiança. No terceiro ano, você deixa de ser visitante e passa a fazer parte do lugar.',
      },
    ],
  },

  contact: {
    kicker: 'Contato',
    headline: {
      preEm: 'Está construindo na América Latina ou contratando para a região? ',
      em: 'Vamos conversar.',
    },
    primaryCta: { label: 'Me manda um email', href: 'mailto:stefano.cintioli@bnbchain.org' }, // TODO: review
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
    getInTouch: 'Fala comigo', // TODO: review
  },
};
