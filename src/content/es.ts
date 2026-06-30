// DRAFT TRANSLATION — pending review (Argentine voseo).
// Phase 6 restructure mirrors en.ts. New strings flagged with "TODO: review".

import type { SiteContent } from './schema';

export const es: SiteContent = {
  nav: {
    now: 'Ahora',
    lastSixMonths: 'Últimos 6 meses',
    how: 'Cómo trabajo',
    contact: 'Contacto',
  },

  hero: {
    eyebrow: 'Argentina · LatAm · Web3 global',
    headline: {
      lineA: 'Conectando builders de LatAm',
      preAccent: 'con la ',
      accent: 'Web3',
      postAccent: ' global.',
    },
    sub: 'Conectando builders regionales con el vertical correcto, y construyendo en el camino las herramientas que el trabajo necesita.',
    status: 'LatAm Community Lead · BNB Chain · Buenos Aires', // TODO: review (kept English title)
    cta: { label: 'Hablemos', href: '#contact' },
    photoCaption: 'Binance Day · Lima · Mayo 2026',
  },

  now: {
    kicker: 'Ahora',
    body: 'Llevando la comunidad LatAm de BNB Chain y derivando leads al pipeline de BD desde Buenos Aires.',
    chips: ['8 países', '6 meses', 'Buenos Aires'], // TODO: review
  },

  lastSixMonths: {
    kicker: 'H1 2026',
    heading: 'Últimos 6 meses', // TODO: review
    intro: 'Crecimiento orgánico, builders regionales, activaciones reales.', // TODO: review
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
        title: 'Primer filtro de la región.',
        body: 'LatAm no tiene un problema de descubrimiento. Tiene un problema de señal. Mi trabajo es encontrar a los builders serios de la región y derivarlos al vertical correcto dentro de BD de BNB Chain (stables, pagos, AI, RWAs) antes de que llegue el ruido. Referidos en caliente antes que cold pitch.',
      },
      {
        number: '02',
        keyword: 'FOCO',
        title: 'Builders, no banners.',
        body: 'El presupuesto va donde están los builders. Tracks técnicos, workshops, bounties, migraciones directas de proyectos. No tiers de sponsorship vanidosos ni escenarios con veinte logos.',
      },
      {
        number: '03',
        keyword: 'CONSTRUIR',
        title: 'Construir lo que el trabajo necesita.',
        body: 'El rol viene con presupuesto fijo y objetivos que se mueven. Cuando la herramienta correcta no existe, la única jugada honesta es construirla. El desarrollo asistido por AI lo hace más rápido que esperar a que aparezca. El techo de lo que un equipo de community produce lo marca el set de herramientas al que accede. Algunas de esas herramientas las tiene que shipear el equipo.',
      },
      {
        number: '04',
        keyword: 'PRESENCIA',
        title: 'Estar. Quedarse. Construir al lado.',
        body: 'Los ecosistemas regionales se construyen en años, no en trimestres. Hackathons repetidos, conferencias repetidas, conversaciones repetidas con los mismos builders. El trabajo no es transmitirles. Es sentarse al lado, escuchar lo que necesitan, construir el camino con ellos. Sin builders, no hay ecosistema. Sin presencia, no hay confianza. Al tercer año dejás de ser un visitante y empezás a ser parte del lugar.',
      },
    ],
  },

  contact: {
    kicker: 'Contacto',
    headline: {
      preEm: '¿Construís en LatAm o estás contratando para la región? ',
      em: 'Hablemos.',
    },
    primaryCta: { label: 'Escribime', href: 'mailto:stefano.cintioli@bnbchain.org' }, // TODO: review
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
    getInTouch: 'Hablemos', // TODO: review
  },
};
