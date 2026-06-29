// DRAFT TRANSLATION — pending review.
// Reuses the existing Argentine-voseo translations from content.json v1.5.0
// where they exist. New v2 UI strings are flagged with "TODO: review".
//
// Locked across locales (DO NOT translate or change):
//   - All metric values: 20+, 5+, 22+, 25+, 76.3K, 476, 6, 8, +462, 1,654, 30+, 5
//   - All proper nouns and project names (BNB Chain, BNB Dojo, VendimiaTech,
//     Crecimiento, Blockenfy, UTN, @BNBChainLatAm, @crecimientoar, etc.)
//   - All URLs and email/handle strings
//   - Dates (May/Mar/Apr 2026 → translated month names are OK)

import type { SiteContent } from './schema';

const NBSP = ' ';

export const es: SiteContent = {
  nav: {
    currently: 'Ahora',
    work: 'Trabajo',
    how: 'Cómo trabajo',
    contact: 'Contacto',
  },
  hero: {
    eyebrow: 'Argentina · LatAm · Web3 global',
    headline: {
      lineA: `Conectando builders de${NBSP}LatAm`,
      preAccent: 'con el ecosistema ',
      accent: 'Web3',
      postAccent: ' global.',
    },
    sub: 'LatAm Community Lead en BNB Chain. Conectando builders regionales con el vertical correcto, y construyendo en el camino las herramientas que el trabajo necesita.',
    cta: {
      primary: { label: 'Descargar CV', href: '/assets/stefano-cintioli-cv.pdf' }, // TODO: review
      secondary: { label: 'Hablemos', href: '#contact' },                          // TODO: review
    },
    photoCaption: 'Binance Day · Lima · Mayo 2026',
    location: 'Buenos Aires · UTC-3',
  },
  currently: {
    kicker: 'Ahora',
    body: {
      preEm: '',
      em: 'Liderando la comunidad LatAm de BNB Chain y derivando leads al pipeline de BD',
      postEm: ' desde Buenos Aires. Conectando proyectos regionales hacia los verticales de stablecoins, pagos, AI y RWA. Co-desarrollando BNB Dojo como capa global de engagement con builders. Siempre abierto a builders, founders y operadores que estén construyendo en la región.',
    },
    meta: {
      loc: 'Buenos Aires · UTC-3',
      scope: '8 países activados · 6 meses',
    },
  },
  work: {
    kicker: 'Trabajo',
    tabs: { tools: 'Herramientas', impact: 'Impacto', socials: 'Comunicación' },
    toolsHeading: 'Herramientas shippeadas en este rol', // TODO: review
    tools: [
      {
        slug: 'bnb-dojo',
        number: '01',
        name: 'BNB Dojo',
        desc: 'Plataforma mobile-first de aprendizaje gamificado de Web3. Trilingüe ES/PT/EN. Sistema de cinturones.',
        status: 'beta',
        url: 'https://bnb-dojo-v2.vercel.app/home',
      },
      {
        slug: 'daily-briefing-agent',
        number: '02',
        name: 'Daily Intelligence Briefing Agent',
        desc: 'Briefings diarios y estructurados del ecosistema vía Telegram y Gmail. Groq + LLaMA 3.',
        status: 'internal',
      },
      {
        slug: 'presentations-stack',
        number: '03',
        name: 'Stack de Presentaciones + Brand Kit',
        desc: 'Templates de slides y assets de eventos alineados con la marca BNB Chain.',
        status: 'live',
        url: 'https://binance-day-peru-2026.vercel.app/',
      },
      {
        slug: 'ambassador-automation',
        number: '04',
        name: 'Ambassador Program Automation',
        desc: 'Contribución cross-funcional a la infraestructura operativa del Guild.',
        status: 'internal',
      },
    ],
    comms: {
      handlesKicker: 'Buscame en',
      posts: [
        {
          id: 'binance-day-peru',
          platform: 'X',
          date: 'Mayo 2026',
          topic: 'Binance Day Perú — cobertura oficial de BNB Chain LatAm',
          url: 'https://x.com/BNBChainLatAm/status/2052970649459597789',
          photo: '/assets/img/binance-day-peru.webp',
          alt: 'Stefano Cintioli en el escenario de Binance Day Perú, Lima, mayo 2026', // TODO: review
        },
        {
          id: 'vendimia-tech',
          platform: 'X',
          date: 'Mar 2026',
          topic: 'VendimiaTech — migración de Blockenfy a BNB Chain',
          url: 'https://x.com/s_cintioli_/status/2038248562824188158',
          photo: '/assets/img/vendimia-workshop.webp',
          alt: 'Hackathon VendimiaTech, Mendoza', // TODO: review
        },
        {
          id: 'crecimiento-partnership',
          platform: 'X',
          date: 'Abr 2026',
          topic: 'Partnership con Crecimiento',
          url: 'https://x.com/crecimientoar/status/2034410672344137897',
          photo: '/assets/img/crecimiento-workshop.webp',
          alt: 'Workshop Crecimiento, Buenos Aires y Lima', // TODO: review
        },
        {
          id: 'utn-university-tour',
          platform: 'LinkedIn',
          date: '2026',
          topic: 'UTN Buenos Aires — University Tour',
          url: 'https://www.linkedin.com/posts/natalie-abuchaibe_crypto-web3-blockchain-ugcPost-7444493501985116160-RFL4',
          photo: '/assets/img/university-tour-panel.webp',
          alt: 'Binance University Tour, UTN Buenos Aires', // TODO: review
        },
      ],
    },
  },
  impact: {
    leadLine: 'Primeros 6 meses · H1 2026',
    clusters: [
      {
        header: 'ECOSISTEMA Y BD',
        lead: { value: '20+', label: 'leads de BD encontrados y derivados' },
        items: [
          { value: '5+', label: 'proyectos en mainnet de BNB Chain', detail: 'uno P0, uno P1' },
          { value: '22+', label: 'activaciones en toda la región' },
          { value: '25+', label: '1-1s con KOLs y builders de la región' },
        ],
      },
      {
        header: 'ALCANCE Y CONTENIDO',
        lead: { value: '76.3K', label: 'impresiones en @BNBChainLatAm, orgánicas' },
        items: [
          { value: '476', label: 'seguidores de @BNBChainLatAm, desde <100, cero paid' },
          { value: '6', label: 'AMAs y Spaces ejecutados' },
          { value: '8', label: 'países activados', detail: `AR${NBSP}·${NBSP}BR${NBSP}·${NBSP}PE${NBSP}·${NBSP}VE\nPY${NBSP}·${NBSP}CL${NBSP}·${NBSP}MX${NBSP}·${NBSP}ES` },
        ],
      },
      {
        header: 'COMUNIDAD Y HERRAMIENTAS',
        lead: { value: '+462', label: 'miembros sumados al Telegram de BNB Chain ES' },
        items: [
          { value: '1,654', label: 'mensajes orgánicos en la comunidad' },
          { value: '30+', label: 'beta testers en BNB Dojo v2', detail: 'cohorte cerrada' },
          { value: '5', label: 'herramientas internas shippeadas' },
        ],
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
    items: [
      { kind: 'email',    label: 'Email',    handle: 'stefano.cintioli@bnbchain.org', href: 'mailto:stefano.cintioli@bnbchain.org' },
      { kind: 'x',        label: 'X',        handle: '@s_cintioli_',                  href: 'https://x.com/s_cintioli_' },
      { kind: 'linkedin', label: 'LinkedIn', handle: '/in/stefanocintioli',           href: 'https://linkedin.com/in/stefanocintioli' },
      { kind: 'telegram', label: 'Telegram', handle: '@StefanoCintioli',              href: 'https://t.me/StefanoCintioli' },
    ],
  },
  footer: {
    loc: 'Buenos Aires · UTC-3',
    lastUpdatedLabel: 'Actualizado',
    copyright: '© 2026 Stefano Cintioli',
  },
  action: {
    visit: 'Ver ↗',
    downloadCv: 'Descargar CV',   // TODO: review
    getInTouch: 'Hablemos',       // TODO: review
  },
  status: {
    live: 'En vivo',
    beta: 'Beta',
    internal: 'Interno',
  },
};
