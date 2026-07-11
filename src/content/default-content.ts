/**
 * Default site content document. This mirrors the structure the public
 * frontend renders and is used to seed the database the first time.
 * The client can override every field from the dashboard.
 */
export const DEFAULT_SITE_CONTENT = {
  brand: {
    name: 'FARAFINA',
    tagline: 'Conseils & Business',
  },
  nav: [
    { href: '#accueil', label: 'Accueil' },
    { href: '#apropos', label: 'À propos' },
    { href: '#services', label: 'Services' },
    { href: '#secteurs', label: 'Secteurs' },
    { href: '#actualites', label: 'Actualités' },
  ],
  hero: {
    badge: 'Cabinet de développement commercial',
    titleLead: 'Développer votre activité en',
    titleHighlight: 'Afrique de l’Ouest',
    paragraph:
      'FCB accompagne les entreprises, startups et porteurs de projets dans leur croissance commerciale, leur structuration opérationnelle et leur implantation en Afrique de l’Ouest.',
    ctaPrimary: 'Découvrir nos services →',
    ctaSecondary: 'Prendre contact',
    highlight:
      'Une approche terrain basée sur l’exécution, la rigueur et les résultats.',
    image: '',
  },
  about: {
    eyebrow: 'À propos',
    title: 'L’identité Farafina',
    image: '',
    paragraphs: [
      'Le nom « Farafina » signifie « Afrique » dans plusieurs langues africaines. Ce choix reflète l’attachement de FCB aux réalités du continent africain, à ses valeurs humaines et à sa volonté de contribuer au développement d’activités durables et structurées en Afrique de l’Ouest.',
      'FCB combine ainsi une vision moderne du développement d’affaires avec une forte compréhension des réalités terrain africaines.',
    ],
    subTitle: 'Qui sommes-nous ?',
    subParagraphs: [
      'Farafina Conseils & Business (FCB) est un cabinet de développement commercial et d’accompagnement opérationnel basé en Afrique de l’Ouest. Nous accompagnons les entreprises et porteurs de projets souhaitant développer leurs activités, structurer leur croissance et réussir leur implantation dans la sous-région.',
      'Notre approche repose sur une forte compréhension des réalités terrain, une logique d’exécution et une volonté de produire des résultats concrets et durables.',
    ],
  },
  services: {
    title: 'Nos services',
    items: [
      {
        n: '01',
        title: 'Business Development',
        text: 'Développement commercial, stratégie commerciale, prospection et structuration force de vente.',
      },
      {
        n: '02',
        title: 'Implantation & Déploiement',
        text: 'Accompagnement des entreprises souhaitant s’implanter et se développer en Afrique de l’Ouest.',
      },
      {
        n: '03',
        title: 'Formation & Accompagnement',
        text: 'Formations professionnelles orientées terrain et performance opérationnelle.',
      },
    ],
  },
  secteurs: {
    title: 'Nos secteurs',
    items: [
      { label: 'Télécom & infrastructures réseau', dot: '#F49F00' },
      { label: 'Solutions technologiques', dot: '#0C4B8E' },
      { label: 'Sécurité électronique', dot: '#F49F00' },
      { label: 'Développement commercial', dot: '#0C4B8E' },
      { label: 'Structuration opérationnelle', dot: '#F49F00' },
    ],
  },
  actualites: {
    title: 'Actualités',
    intro:
      'Les dernières nouvelles, missions et réflexions de Farafina Conseils & Business.',
    items: [
      {
        category: 'Événement',
        title: 'FCB au GITEX Africa Morocco 2026',
        excerpt:
          'FCB était présent au GITEX Africa Morocco 2026 pour renforcer son réseau et nouer de nouveaux partenariats stratégiques.',
        image: '',
        published: true,
        date: 'Avril 2026',
        text:
          'Farafina Conseils & Business a participé au GITEX Africa Morocco 2026, le plus grand rendez-vous technologique du continent, réunissant acteurs publics, entreprises et startups venus de toute l’Afrique.\n\nCette présence a permis à FCB de renforcer son réseau, d’échanger avec des partenaires stratégiques et d’identifier de nouvelles opportunités de collaboration pour les entreprises que nous accompagnons.\n\nCes rencontres confirment notre conviction : le développement commercial en Afrique de l’Ouest se construit sur le terrain, au contact direct des décideurs et des porteurs de projets.',
      },
      {
        category: 'Implantation',
        title: 'Accompagnement d’un déploiement réseau en Afrique de l’Ouest',
        excerpt:
          'Retour sur une mission de terrain d’accompagnement au déploiement d’une infrastructure réseau dans la sous-région.',
        image: '',
        published: true,
        date: 'Mars 2026',
        text:
          'FCB a accompagné une entreprise du secteur des télécommunications dans le déploiement de son infrastructure réseau sur plusieurs zones d’Afrique de l’Ouest.',
      },
      {
        category: 'Formation',
        title: 'Session de formation force de vente',
        excerpt:
          'Une session de formation orientée terrain pour structurer et dynamiser une force de vente.',
        image: '',
        published: true,
        date: 'Février 2026',
        text:
          'FCB a animé une session de formation destinée à structurer et dynamiser une force de vente, avec un programme orienté terrain et performance opérationnelle.',
      },
      {
        category: 'Conseil',
        title: '3 leviers pour structurer votre croissance',
        excerpt:
          'Trois leviers essentiels pour bâtir une croissance durable et maîtrisée de votre activité.',
        image: '',
        published: true,
        date: 'Janvier 2026',
        text:
          'Structurer sa croissance ne s’improvise pas. Voici trois leviers essentiels pour bâtir un développement durable et maîtrisé de votre activité.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Vous souhaitez développer votre activité en Afrique de l’Ouest ?',
    text: 'FCB vous accompagne avec une approche orientée terrain, stratégie et résultats.',
    email: 'contact@farafina-cb.com',
    phone: '+221 XX XXX XX XX',
    location: 'Afrique de l’Ouest',
    socials: [
      {
        type: 'linkedin',
        url: 'https://www.linkedin.com/company/farafina-conseils-business-suarl/',
        label: 'Farafina Conseils & Business',
      },
    ],
  },
  newsletter: {
    title: 'Newsletter',
    text: 'Inscrivez-vous pour recevoir les actualités et informations de FCB par e-mail.',
  },
  footer: {
    quote: '« Performance, impact, succès : oui, on est sur le coup ! »',
    description:
      'Cabinet de développement commercial et d’accompagnement opérationnel en Afrique de l’Ouest.',
  },
  showMarquee: true,
} as const;

export type SiteContentData = typeof DEFAULT_SITE_CONTENT;
