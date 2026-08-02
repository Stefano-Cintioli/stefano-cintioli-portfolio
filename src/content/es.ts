// DRAFT TRANSLATION — pending review (Argentine voseo).
// Phase 6 restructure mirrors en.ts. New strings flagged with "TODO: review".

import type { SiteContent } from './schema';

export const es: SiteContent = {
  seo: {
    // 54 chars
    title: 'Stefano Cintioli — Líder de Comunidad LatAm, BNB Chain',
    // 153 chars
    description:
      'Líder de Comunidad LatAm en BNB Chain. Conecto a builders Web3 regionales con el vertical correcto y construyo las herramientas que el trabajo necesita.',
    keywords: [
      'web3',
      'blockchain',
      'BNB Chain',
      'LatAm',
      'desarrollo de negocios',
      'comunidad',
    ],
  },

  nav: {
    now: 'Ahora',
    lastSixMonths: 'Últimos 6 meses',
    how: 'Cómo trabajo',
    contact: 'Contacto',
  },

  hero: {
    eyebrow: 'Argentina · LatAm · Web3 global',
    headline: {
      lineA: 'Conectando el talento de la región',
      preAccent: 'con oportunidades ',
      accent: 'Web3',
      postAccent: ' globales.',
    },
    sub: 'Busco a los que están construyendo en serio en la región y los conecto con el equipo correcto dentro de BNB Chain. Y las herramientas que faltan en el camino, las armo.',
    status: 'LatAm Community Lead · BNB Chain · Buenos Aires',
    cta: { label: 'Agendá una llamada', href: 'https://calendly.com/stefano-cintioli-bnbchain/30min' },
    photoCaption: 'Binance Day · Lima · Mayo 2026',
  },

  background: {
    kicker: 'Antes',
    body: 'Antes de este rol estaba del otro lado: cuatro hackathons como hacker, uno lo gané y a otro volví como mentor. En el medio cofundé una comunidad web3 acá en Argentina y saqué varios proyectos on-chain por mi cuenta. El motivo era el mismo que ahora, mejorar y abrir oportunidades para la región.',
  },

  now: {
    kicker: 'Ahora',
    body: 'Al frente de la comunidad LatAm de BNB Chain desde Buenos Aires, metiendo builders de verdad en el pipeline de BD.',
    chips: ['8 países', '6 meses', 'Buenos Aires'],
  },

  lastSixMonths: {
    kicker: 'H1 2026',
    heading: 'Últimos 6 meses', // TODO: review
    intro: 'Cero paid, todo orgánico. Esto es lo que movieron seis meses en la cancha.',
    metrics: [
      { value: '76.3K', label: 'impresiones en @BNBChainLatAm', detail: 'orgánicas' },
      { value: '+462',  label: 'miembros sumados al Telegram de BNB Chain ES' },
      { value: '8',     label: 'países activados', detail: 'AR · BR · PE · VE · PY · CL · MX · ES' },
      { value: '25+',   label: '1-1s con KOLs y builders de la región' },
      { value: '20+',   label: 'leads de BD encontrados y derivados' },
      { value: '5+',    label: 'proyectos en mainnet de BNB Chain', detail: 'uno P0, uno P1' },
    ],
    growth: {
      title: 'Seguidores de @BNBChainLatAm',
      series: [80, 130, 195, 285, 370, 476],
      startLabel: '<100',
      endLabel: '476',
      caption: 'orgánico · cero paid · 6 meses', // TODO: review
    },
    highlightsKicker: 'Contenido destacado', // TODO: review
    highlights: [
      {
        id: 'binance-day-peru',
        platform: 'X',
        date: 'Mayo 2026',
        topic: 'Binance Day Perú — cobertura oficial de BNB Chain LatAm',
        url: 'https://x.com/BNBChainLatAm/status/2052970649459597789',
        photo: '/assets/img/binance-day-peru.webp',
        alt: 'Stefano Cintioli en el escenario de Binance Day Perú, Lima, mayo 2026',
      },
      {
        id: 'vendimia-tech',
        platform: 'X',
        date: 'Mar 2026',
        topic: 'VendimiaTech — migración de Blockenfy a BNB Chain',
        url: 'https://x.com/s_cintioli_/status/2038248562824188158',
        photo: '/assets/img/vendimia-workshop.webp',
        alt: 'Hackathon VendimiaTech, Mendoza',
      },
      {
        id: 'crecimiento-partnership',
        platform: 'X',
        date: 'Abr 2026',
        topic: 'Partnership con Crecimiento',
        url: 'https://x.com/crecimientoar/status/2034410672344137897',
        photo: '/assets/img/crecimiento-workshop.webp',
        alt: 'Workshop Crecimiento, Buenos Aires y Lima',
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
    kicker: 'Cómo pienso y opero',
    principles: [
      {
        number: '01',
        keyword: 'FILTRAR',
        title: 'El primer filtro de la región.',
        body: 'LatAm no tiene un problema de descubrimiento, tiene un problema de señal. Mi laburo es encontrar a los que van en serio y derivarlos al vertical correcto dentro del BD de BNB Chain (stables, pagos, AI, RWAs) antes de que los tape el ruido. Un referido en caliente le gana a un cold pitch siempre.',
      },
      {
        number: '02',
        keyword: 'FOCO',
        title: 'Builders, no banners.',
        body: 'La plata va donde están los builders. Tracks técnicos, workshops, bounties, proyectos que se mudan on-chain de verdad. Nada de tiers de sponsoreo para la foto ni un escenario con veinte logos.',
      },
      {
        number: '03',
        keyword: 'CONSTRUIR',
        title: 'Construir lo que el laburo pide.',
        body: 'El rol viene con presupuesto fijo y objetivos que se mueven todo el tiempo. Cuando la herramienta que necesitás no existe, lo único honesto es construirla, y con desarrollo asistido por AI sale más rápido que esperar a que aparezca sola. El techo de lo que produce un equipo de community lo marcan las herramientas que tiene a mano, y algunas se las tiene que shipear el equipo mismo.',
      },
      {
        number: '04',
        keyword: 'PRESENCIA',
        title: 'Estar. Quedarte. Construir al lado.',
        body: 'Los ecosistemas de la región se construyen en años, no en trimestres. El mismo hackathon, la misma conferencia, las mismas charlas con los mismos builders, una y otra vez. El laburo no es hablarles de arriba. Es sentarte al lado, escuchar qué necesitan y construir el camino con ellos. Sin builders no hay ecosistema, y sin estar no hay confianza. Al tercer año dejás de ser un visitante y pasás a ser parte del lugar.',
      },
    ],
  },

  contact: {
    kicker: 'Contacto',
    headline: {
      preEm: '¿Estás construyendo algo en LatAm o contratando para la región? ',
      em: 'Hablemos.',
    },
    primaryCta: { label: 'Agendá una llamada', href: 'https://calendly.com/stefano-cintioli-bnbchain/30min' },
    items: [
      { kind: 'email',    label: 'Email',    href: 'mailto:stefano.cintioli@bnbchain.org' },
      { kind: 'x',        label: 'X',        href: 'https://x.com/s_cintioli_' },
      { kind: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/stefanocintioli' },
      { kind: 'telegram', label: 'Telegram', href: 'https://t.me/StefanoCintioli' },
    ],
  },

  footer: {
    loc: 'Buenos Aires · UTC-3',
    lastUpdatedLabel: 'Actualizado',
    copyright: '© 2026 Stefano Cintioli',
  },

  action: {
    getInTouch: 'Agendá una llamada',
  },
};
