/**
 * Default site content document. This mirrors the structure the public
 * frontend renders and is used to seed the database the first time.
 * Aligned with FCB plaquette 2026 and Fiche de corrections v3 (26/10/2026).
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
    { href: '#methode', label: 'Méthode' },
    { href: '#domaines', label: 'Domaines' },
    { href: '#references', label: 'Références' },
    { href: '#actualites', label: 'Actualités' },
  ],
  hero: {
    badge: 'UNE PLATEFORME POUR DÉVELOPPER, STRUCTURER ET DÉPLOYER LES ENTREPRISES',
    titleLead: 'Développer votre activité en',
    titleHighlight: 'Afrique de l’Ouest',
    paragraph:
      'FCB accompagne les entreprises africaines et internationales dans leur développement commercial, leur implantation et leur déploiement en Afrique de l’Ouest — de la stratégie jusqu’à l’exécution sur le terrain, et jusqu’aux résultats.',
    ctaPrimary: 'Découvrir nos services',
    ctaSecondary: 'Réserver un échange de 30 minutes',
    highlight: 'Développer. Structurer. Déployer.',
    image: '',
  },
  about: {
    eyebrow: 'À propos',
    title: 'Une plateforme pour développer, structurer et déployer les entreprises',
    image: '',
    paragraphs: [
      'FARAFINA CONSEILS & BUSINESS (FCB) est une société sénégalaise, basée à Dakar, qui accompagne les entreprises africaines et internationales dans leur développement commercial, leur implantation et leur déploiement en Afrique de l’Ouest. Notre particularité : nous ne nous arrêtons pas à la recommandation. Nous intervenons de la stratégie jusqu’à l’exécution terrain, et nous restons aux côtés de nos clients jusqu’aux résultats.',
      'FCB intervient également comme représentant commercial de fabricants européens d’équipements pour les infrastructures télécoms, notamment la fibre optique (FTTH), avec un interlocuteur unique présent au Sénégal.',
      '« Farafina » signifie « Afrique ». Ce nom traduit notre ancrage : une entreprise africaine qui connaît les réalités économiques de la sous-région, et qui sait travailler avec des partenaires industriels et financiers internationaux.',
    ],
    subTitle: 'Le mot du dirigeant',
    subParagraphs: [],
    chiffresCles: [
      {
        number: '15 ans +',
        label:
          'd’expérience professionnelle du fondateur en développement commercial et implantation : 11 ans chez Globo Afrique, 3 ans chez Infractive, 2 ans de conception et de lancement de FCB',
      },
      {
        number: '6 pays',
        label: 'd’Afrique de l’Ouest où le fondateur a ouvert ou piloté des activités',
      },
      {
        number: '> 100 %',
        label: 'de croissance annuelle du chiffre d’affaires atteinte sur certaines périodes',
      },
      {
        number: '1',
        label: 'interlocuteur unique pour le suivi de votre dossier',
      },
    ],
    chiffresNote:
      'Les indicateurs « 6 pays » et « > 100 % » sont issus du parcours professionnel du fondateur, antérieur à la création de FCB.',
    motDuDirigeant: {
      quote:
        '« J’ai passé plus de quinze ans dans le développement commercial en Afrique de l’Ouest : ouvrir des marchés, implanter des bureaux, développer des chiffres d’affaires, dans les télécoms, les infrastructures réseaux, la sécurité électronique et les services aux entreprises. J’en retiens une conviction : ce qui fait la différence, ce n’est pas la qualité du plan, c’est la qualité de l’exécution.\n\nJ’ai créé FCB pour mettre cette expérience au service des entreprises et des partenaires qui veulent avancer concrètement — avec transparence, rigueur et un suivi réel des résultats. »',
      author: 'Arona DIAO',
      role: 'Fondateur & Gérant',
      presentation:
        'Arona Diao, fondateur et gérant de FCB, a passé 11 ans chez Globo Afrique (géolocalisation, sécurité électronique, vidéosurveillance), où il a participé à l’ouverture et au pilotage d’activités commerciales en Mauritanie, au Mali et au Burkina Faso. Il a ensuite dirigé pendant 3 ans le bureau Afrique de l’Ouest d’Infractive (infrastructures télécoms et fibre optique), où il a restructuré l’activité, développé fortement le chiffre d’affaires et ouvert les bureaux de Dakar et de Conakry. Il a créé FCB en 2024.',
    },
    nonSurvente:
      'FCB n’est pas un grand cabinet international, et nous ne prétendons pas l’être. Nous sommes une jeune entreprise portée par un dirigeant qui a du vécu terrain, en phase de structuration et d’accélération. Nous préférons vous le dire clairement plutôt que de survendre.',
    valeurs: [
      { title: 'Transparence', description: 'Dire les choses telles qu’elles sont ; prix et conditions clairs.' },
      { title: 'Loyauté', description: 'Envers nos clients, nos partenaires et nos engagements.' },
      { title: 'Rigueur', description: 'Méthode, suivi des actions, respect des délais.' },
      { title: 'Impact', description: 'Des résultats mesurables, utiles et durables.' },
      { title: 'Professionnalisme', description: 'Qualité des livrables et des échanges.' },
      { title: 'Exécution', description: 'Passer de l’intention à l’action, sur le terrain.' },
    ],
  },
  services: {
    title: 'Nos services',
    subtitle: 'Quatre pôles d’expertise de la stratégie jusqu’aux résultats sur le terrain',
    items: [
      {
        n: '01',
        title: 'Télécoms & infrastructures réseaux',
        subtitle: 'Représentation industrielle et coordination locale',
        text: 'Représentation commerciale de fabricants européens spécialisés et coordination locale complète pour les infrastructures télécoms.',
        points: [
          'Équipements passifs pour réseaux FTTH, de fabricants européens spécialisés : câbles à fibre optique, boîtiers (PBO, PTO), coupleurs, cassettes, connectique',
          'Équipements de raccordement, outillage, soudeuses, appareils de test et de mesure',
          'Représentation commerciale de fabricants européens spécialisés',
          'Coordination locale de l’offre, de la commande, du suivi des livraisons, du transport et du dédouanement',
        ],
        visons: 'Un interlocuteur local réactif, des produits de fabricants spécialisés et des délais suivis.',
      },
      {
        n: '02',
        title: 'Business development & implantation',
        subtitle: 'Entrer sur un marché et y développer durablement ses ventes',
        text: 'Accompagnement stratégique et opérationnel pour réussir votre implantation et conquérir de nouveaux marchés en Afrique de l’Ouest.',
        points: [
          'Études de marché et stratégie d’entrée en Afrique de l’Ouest',
          'Recherche et qualification de partenaires, distributeurs et clients',
          'Accompagnement à la création de filiales ou de succursales',
          'Représentation commerciale externalisée, prospection et développement de portefeuille',
        ],
        visons: 'Une entrée sur le marché sécurisée, des premiers clients plus rapidement et un relais local de confiance.',
      },
      {
        n: '03',
        title: 'Force de vente & stratégie commerciale',
        subtitle: 'Organiser la performance commerciale et la rendre mesurable',
        text: 'Organisation, structuration et pilotage rigoureux de vos équipes commerciales pour accélérer vos revenus.',
        points: [
          'Diagnostic commercial et plan d’action priorisé',
          'Organisation de la force de vente : rôles, objectifs, rituels, reporting',
          'Processus commerciaux et outils de suivi (pipeline, CRM)',
          'Lancement de nouveaux produits ou services',
        ],
        visons: 'Une équipe organisée, des objectifs suivis et un chiffre d’affaires qui progresse.',
      },
      {
        n: '04',
        title: 'Formation, création & structuration d’entreprise',
        subtitle: 'Faire monter les équipes en compétences et structurer les projets',
        text: 'Renforcement des compétences et structuration de projets d’entreprise avec le programme FCB START™.',
        points: [
          'Formations : métiers du commercial, management, gestion de projet, stratégie, entrepreneuriat',
          'Programme FCB START™ : Création, Structuration, Lancement, Accompagnement des porteurs de projet',
          'Business plans professionnels et structuration administrative',
        ],
        visons: 'Des équipes plus performantes et des projets structurés, présentables aux banques et aux partenaires.',
      },
    ],
    reseauExperts:
      'Un réseau d’experts mobilisable. Selon les besoins, FCB mobilise des professionnels partenaires en finance, fiscalité, communication, informatique, logistique et transit, contrôle de gestion — sous sa coordination, avec un interlocuteur unique.',
  },
  methode: {
    eyebrow: 'Méthode & Différenciation',
    title: 'Comprendre avant d’agir, mesurer pour progresser',
    steps: ['Comprendre', 'Diagnostiquer', 'Structurer', 'Exécuter', 'Mesurer', 'Améliorer'],
    description:
      'Chaque intervention FCB précise dès le départ : le problème identifié, la solution proposée, les actions à mener, le calendrier, les moyens mobilisés, les résultats visés, les indicateurs de suivi et le coût. Le client sait ce qu’il achète, et peut mesurer ce qu’il obtient.',
    atouts: [
      {
        title: 'De la stratégie à l’exécution',
        desc: 'Nous ne livrons pas un rapport pour disparaître, nous restons jusqu’aux résultats.',
      },
      {
        title: 'L’expérience du terrain ouest-africain',
        desc: 'Maîtrise fine des marchés, interlocuteurs, contraintes administratives et logistiques.',
      },
      {
        title: 'Une double culture',
        desc: 'Africaine par notre ancrage local, internationale par nos partenaires industriels et financiers.',
      },
      {
        title: 'Des offres claires',
        desc: 'Périmètre, délais, livrables et prix convenus en amont en toute clarté.',
      },
      {
        title: 'Un réseau d’experts mobilisé',
        desc: 'Des compétences de pointe réunies sous une coordination unique et réactive.',
      },
      {
        title: 'Une structure agile',
        desc: 'Décisions rapides et interlocuteur direct, sans intermédiaire.',
      },
    ],
  },
  secteurs: {
    title: 'Nos domaines de compétence',
    items: [
      {
        label: 'Télécoms et infrastructures réseaux',
        details: 'Fibre optique FTTH, équipements actifs et passifs',
        dot: '#F49F00',
      },
      {
        label: 'Sécurité électronique',
        details: 'Vidéosurveillance, géolocalisation, domotique',
        dot: '#0C4B8E',
      },
      {
        label: 'Services aux entreprises',
        details: 'Stratégie, développement commercial, structuration',
        dot: '#F49F00',
      },
      {
        label: 'Création d’entreprise',
        details: 'Cadrage, business plan, structuration, lancement',
        dot: '#0C4B8E',
      },
      {
        label: 'Formation professionnelle',
        details: 'Commercial, management, gestion de projet',
        dot: '#F49F00',
      },
    ],
  },
  referencesSection: {
    eyebrow: 'Clients & Références',
    title: 'Pour qui nous travaillons & Nos réalisations',
    profils: [
      {
        profil: 'Entreprises existantes',
        text: 'Développer le chiffre d’affaires, structurer la force de vente, conquérir de nouveaux marchés, se restructurer.',
      },
      {
        profil: 'Entreprises étrangères',
        text: 'Entrer en Afrique de l’Ouest, créer une filiale, trouver un partenaire local, être représentées sur place.',
      },
      {
        profil: 'Entreprises africaines',
        text: 'S’implanter dans un autre pays d’Afrique de l’Ouest et vendre au-delà de leur marché national.',
      },
      {
        profil: 'Startups, TPE & PME',
        text: 'Structurer le projet, réaliser le business plan, organiser la commercialisation, passer à l’exécution.',
      },
    ],
    references: [
      {
        client: 'Fabricant européen d’équipements télécoms',
        mission:
          'Représentation commerciale, développement de marchés et apport d’affaires en Afrique de l’Ouest (FTTH, VDI).',
      },
      {
        client: 'TUKKI JAMM',
        mission: 'Conseil et accompagnement au développement de l’activité.',
      },
      {
        client: 'Chaîne de boulangerie',
        mission: 'Consultance et accompagnement au développement.',
      },
      {
        client: 'Projet d’agence de tourisme religieux Sénégal – Maroc',
        mission:
          'Programme FCB START™ : diagnostic stratégique, structuration, étude de marché, business plan et préparation du lancement.',
      },
    ],
    referencesNote: 'Le détail des références est disponible sur demande.',
    fcbStart: {
      title: 'FCB START™ — Création, Structuration, Lancement, Accompagnement',
      description:
        'Notre programme en 8 étapes pour transformer une idée en entreprise prête à démarrer : diagnostic et cadrage, structuration du projet, étude de marché, modèle économique, business plan, structuration administrative, préparation du lancement et coaching post-lancement.',
    },
  },
  actualites: {
    title: 'Actualités & Perspectives',
    intro: 'Analyses, actualités et réflexions stratégiques de Farafina Conseils & Business.',
    items: [
      {
        category: 'Analyse régionale',
        title: 'Le marché régional ouest-africain existe déjà. La plupart des entreprises ne l’exploitent pas.',
        excerpt:
          'Selon les débats au Parlement de la CEDEAO, le commerce régional représente moins de 10 % des échanges. Pourquoi cet écart et comment réussir son expansion régionale ?',
        image: '',
        published: true,
        date: 'Février 2026',
        text: `Selon les débats tenus début 2026 au Parlement de la CEDEAO, le commerce entre pays de la région représente moins de 10 % de ses échanges, alors que la croissance économique régionale tourne autour de 5 % par an. La croissance est là ; les échanges régionaux, beaucoup moins.

Pourquoi cet écart ? Les institutions citent l’application inégale des protocoles commerciaux et l’harmonisation encore incomplète des normes. Sur le terrain, un autre facteur compte : beaucoup d’entreprises connaissent leur marché national, mais pas celui du pays voisin. Elles n’y ont ni relais local, ni partenaire de confiance, ni lecture claire du circuit de décision.

Pour une entreprise qui regarde au-delà de ses frontières, trois questions à se poser avant de s’engager : qui décide réellement chez le client cible, qui peut me représenter localement, et quel investissement de présence est raisonnable avant le premier contrat ?

C’est le travail que FCB accompagne : comprendre le marché, structurer l’entrée, puis exécuter sur place. Si vous envisagez une expansion régionale, parlons-en.

Source : Allafrica, « La CEDEAO veut accélérer le commerce intra-communautaire en 2026 », février 2026.`,
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Parlons de votre projet',
    text:
      'Votre partenaire pour le développement et le déploiement de vos activités en Afrique de l’Ouest. Un premier échange de 30 minutes suffit pour savoir si nous pouvons vous être utiles — sans engagement.',
    email: 'arona.diao@fcb-impact.com',
    phone: '+221 77 632 62 76',
    location: 'Dakar, Sénégal',
    socials: [
      {
        type: 'linkedin',
        url: 'https://www.linkedin.com/company/farafina-conseils-business-suarl/',
        label: 'Arona DIAO · FCB',
      },
      {
        type: 'whatsapp',
        url: 'https://wa.me/221776326276?text=Bonjour%2C%20je%20vous%20contacte%20depuis%20le%20site%20de%20FCB.',
        label: '+221 77 632 62 76',
      },
    ],
  },
  newsletter: {
    title: 'Newsletter',
    text: 'Inscrivez-vous pour recevoir les analyses et actualités de FCB directement par e-mail.',
  },
  footer: {
    quote: 'Développer. Structurer. Déployer.',
    description:
      'FARAFINA CONSEILS & BUSINESS (FCB) — Une plateforme pour développer, structurer et déployer les entreprises en Afrique de l’Ouest.',
  },
  showMarquee: true,
} as const;
