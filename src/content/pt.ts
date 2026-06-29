// DRAFT TRANSLATION — pending review (Brazilian Portuguese).
// Reuses the existing translations from content.json v1.5.0 where they exist.
// New v2 UI strings are flagged with "TODO: review".
//
// Locked across locales (DO NOT translate or change):
//   - All metric values: 20+, 5+, 22+, 25+, 76.3K, 476, 6, 8, +462, 1,654, 30+, 5
//   - All proper nouns and project names (BNB Chain, BNB Dojo, VendimiaTech,
//     Crecimiento, Blockenfy, UTN, @BNBChainLatAm, @crecimientoar, etc.)
//   - All URLs and email/handle strings
//   - Dates (May/Mar/Apr 2026 → translated month names are OK)

import type { SiteContent } from './schema';

const NBSP = ' ';

export const pt: SiteContent = {
  nav: {
    currently: 'Agora',
    work: 'Trabalho',
    how: 'Como trabalho',
    contact: 'Contato',
  },
  hero: {
    eyebrow: 'Argentina · LatAm · Web3 global',
    headline: {
      lineA: `Conectando builders${NBSP}latino-americanos`,
      preAccent: 'ao ecossistema ',
      accent: 'Web3',
      postAccent: ' global.',
    },
    sub: 'LatAm Community Lead na BNB Chain. Direcionando builders da região para o vertical certo, construindo no caminho as ferramentas que o trabalho exige.',
    cta: {
      primary: { label: 'Fala comigo', href: '#contact' },                         // TODO: review
      secondary: { label: 'Baixar CV', href: '/assets/stefano-cintioli-cv.pdf' },   // TODO: review
    },
    photoCaption: 'Binance Day · Lima · Maio 2026',
    location: 'Buenos Aires · UTC-3',
  },
  currently: {
    kicker: 'Agora',
    body: {
      preEm: '',
      em: 'Liderando a comunidade LatAm da BNB Chain e encaminhando leads para o pipeline de BD',
      postEm: ' desde Buenos Aires. Direcionando projetos regionais para os verticais de stablecoins, pagamentos, AI e RWA. Co-desenvolvendo o BNB Dojo como camada global de engagement com builders. Sempre aberto a builders, founders e operadores que estão construindo na região.',
    },
    meta: {
      loc: 'Buenos Aires · UTC-3',
      scope: '8 países ativados · 6 meses',
    },
  },
  work: {
    kicker: 'Trabalho',
    tabs: { tools: 'Ferramentas', impact: 'Impacto', socials: 'Comunicação' },
    toolsHeading: 'Ferramentas entregues neste papel', // TODO: review
    tools: [
      {
        slug: 'bnb-dojo',
        number: '01',
        name: 'BNB Dojo',
        desc: 'Plataforma mobile-first de aprendizado gamificado de Web3. Trilíngue ES/PT/EN. Sistema de faixas.',
        status: 'beta',
        url: 'https://bnb-dojo-v2.vercel.app/home',
      },
      {
        slug: 'daily-briefing-agent',
        number: '02',
        name: 'Daily Intelligence Briefing Agent',
        desc: 'Briefings diários estruturados do ecossistema via Telegram e Gmail. Groq + LLaMA 3.',
        status: 'internal',
      },
      {
        slug: 'presentations-stack',
        number: '03',
        name: 'Stack de Apresentações + Brand Kit',
        desc: 'Templates de slides e materiais de eventos alinhados com a marca BNB Chain.',
        status: 'live',
        url: 'https://binance-day-peru-2026.vercel.app/',
      },
      {
        slug: 'ambassador-automation',
        number: '04',
        name: 'Ambassador Program Automation',
        desc: 'Contribuição cross-funcional para a infraestrutura operacional do Guild.',
        status: 'internal',
      },
    ],
    comms: {
      handlesKicker: 'Me encontre em',
      posts: [
        {
          id: 'binance-day-peru',
          platform: 'X',
          date: 'Maio 2026',
          topic: 'Binance Day Perú — cobertura oficial da BNB Chain LatAm',
          url: 'https://x.com/BNBChainLatAm/status/2052970649459597789',
          photo: '/assets/img/binance-day-peru.webp',
          alt: 'Stefano Cintioli no palco do Binance Day Perú, Lima, maio 2026', // TODO: review
        },
        {
          id: 'vendimia-tech',
          platform: 'X',
          date: 'Mar 2026',
          topic: 'VendimiaTech — migração da Blockenfy para a BNB Chain',
          url: 'https://x.com/s_cintioli_/status/2038248562824188158',
          photo: '/assets/img/vendimia-workshop.webp',
          alt: 'Hackathon VendimiaTech, Mendoza', // TODO: review
        },
        {
          id: 'crecimiento-partnership',
          platform: 'X',
          date: 'Abr 2026',
          topic: 'Parceria com a Crecimiento',
          url: 'https://x.com/crecimientoar/status/2034410672344137897',
          photo: '/assets/img/crecimiento-workshop.webp',
          alt: 'Workshop Crecimiento, Buenos Aires e Lima', // TODO: review
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
    leadLine: 'Primeiros 6 meses · H1 2026',
    clusters: [
      {
        header: 'ECOSSISTEMA E BD',
        lead: { value: '20+', label: 'leads de BD encontrados e direcionados' },
        items: [
          { value: '5+', label: 'projetos na mainnet da BNB Chain', detail: 'um P0, um P1' },
          { value: '22+', label: 'ativações pela região' },
          { value: '25+', label: '1-1s com KOLs e builders da região' },
        ],
      },
      {
        header: 'ALCANCE E CONTEÚDO',
        lead: { value: '76.3K', label: 'impressões em @BNBChainLatAm, orgânicas' },
        items: [
          { value: '476', label: 'seguidores de @BNBChainLatAm, desde <100, zero paid' },
          { value: '6', label: 'AMAs e Spaces executados' },
          { value: '8', label: 'países ativados', detail: `AR${NBSP}·${NBSP}BR${NBSP}·${NBSP}PE${NBSP}·${NBSP}VE\nPY${NBSP}·${NBSP}CL${NBSP}·${NBSP}MX${NBSP}·${NBSP}ES` },
        ],
      },
      {
        header: 'COMUNIDADE E FERRAMENTAS',
        lead: { value: '+462', label: 'novos membros no Telegram da BNB Chain ES' },
        items: [
          { value: '1,654', label: 'mensagens orgânicas da comunidade' },
          { value: '30+', label: 'beta testers no BNB Dojo v2', detail: 'cohort fechado' },
          { value: '5', label: 'ferramentas internas entregues' },
        ],
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
    items: [
      { kind: 'email',    label: 'Email',    handle: 'stefano.cintioli@bnbchain.org', href: 'mailto:stefano.cintioli@bnbchain.org' },
      { kind: 'x',        label: 'X',        handle: '@s_cintioli_',                  href: 'https://x.com/s_cintioli_' },
      { kind: 'linkedin', label: 'LinkedIn', handle: '/in/stefanocintioli',           href: 'https://linkedin.com/in/stefanocintioli' },
      { kind: 'telegram', label: 'Telegram', handle: '@StefanoCintioli',              href: 'https://t.me/StefanoCintioli' },
    ],
  },
  footer: {
    loc: 'Buenos Aires · UTC-3',
    lastUpdatedLabel: 'Atualizado',
    copyright: '© 2026 Stefano Cintioli',
  },
  action: {
    visit: 'Ver ↗',
    downloadCv: 'Baixar CV',     // TODO: review
    getInTouch: 'Fala comigo',   // TODO: review
  },
  status: {
    live: 'No ar',
    beta: 'Beta',
    internal: 'Interno',
  },
};
