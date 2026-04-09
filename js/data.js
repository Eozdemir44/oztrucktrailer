/* ============================================================
   OZ TRUCK TRAILER - Data Initialization (localStorage)
   ============================================================ */

(function initData() {
  'use strict';

  // ---- Products ----
  if (!localStorage.getItem('ozt_products')) {
    const products = [
      // ---- HIDROMEK - Matériel TP ----
      {
        id: 'prod_001',
        name: 'HMK 102B Tractopelle',
        brand: 'Hidromek',
        category: 'materiel-tp',
        subCategory: 'tractopelle',
        description: 'Tractopelle polyvalent 4x4x4 idéal pour les travaux de terrassement, fouilles et manutention. Motorisation puissante et transmission hydrostatique pour une excellente maniabilité sur tout terrain.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
        ],
        specs: {
          'Transmission': '4x4x4',
          'Puissance': '97 cv',
          'Godet chargeur': '1.0 m³',
          'Godet rétro': '0.28 m³',
          'PTAC': '8 500 kg',
          'Norme moteur': 'Stage V'
        },
        published: true,
        createdAt: '2024-01-15'
      },
      {
        id: 'prod_002',
        name: 'HMK 140LC Pelle Hydraulique',
        brand: 'Hidromek',
        category: 'materiel-tp',
        subCategory: 'pelle-chenille',
        description: 'Pelle hydraulique sur chenilles de 14 tonnes. Conçue pour les travaux de terrassement intensifs, elle offre une excellente force d\'arrachement et une grande précision de travail.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
        ],
        specs: {
          'Puissance moteur': '140 cv',
          'Poids opérationnel': '14 000 kg',
          'Godet standard': '0.6 m³',
          'Profondeur de fouille': '5.8 m',
          'Force d\'arrachement': '10.2 t',
          'Norme moteur': 'Stage V'
        },
        published: true,
        createdAt: '2024-01-20'
      },
      {
        id: 'prod_003',
        name: 'HMK 220LC Pelle Chenilles',
        brand: 'Hidromek',
        category: 'materiel-tp',
        subCategory: 'pelle-chenille',
        description: 'Pelle hydraulique sur chenilles 22 tonnes. Performance et fiabilité pour vos chantiers les plus exigeants. Système hydraulique à haute pression pour une productivité maximale.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
        ],
        specs: {
          'Puissance moteur': '163 cv',
          'Poids opérationnel': '22 500 kg',
          'Godet standard': '0.9 m³',
          'Profondeur de fouille': '6.5 m',
          'Force d\'arrachement': '15.8 t',
          'Norme moteur': 'Stage V'
        },
        published: true,
        createdAt: '2024-01-25'
      },
      {
        id: 'prod_004',
        name: 'HMK 300LC Pelle Chenilles',
        brand: 'Hidromek',
        category: 'materiel-tp',
        subCategory: 'pelle-chenille',
        description: 'Grande pelle hydraulique sur chenilles 30 tonnes. Pour les travaux miniers et les grands chantiers de terrassement. Puissance et robustesse exceptionnelles.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
        ],
        specs: {
          'Puissance moteur': '227 cv',
          'Poids opérationnel': '30 000 kg',
          'Godet standard': '1.4 m³',
          'Profondeur de fouille': '7.2 m',
          'Force d\'arrachement': '21.3 t',
          'Norme moteur': 'Stage V'
        },
        published: true,
        createdAt: '2024-02-01'
      },
      {
        id: 'prod_005',
        name: 'HMK 81W Pelle à Pneus',
        brand: 'Hidromek',
        category: 'materiel-tp',
        subCategory: 'pelle-pneu',
        description: 'Pelle hydraulique sur pneus 8 tonnes. Mobilité sur route sans transport, idéale pour les chantiers urbains et les travaux en zones peu accessibles.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
        ],
        specs: {
          'Puissance moteur': '95 cv',
          'Poids opérationnel': '8 000 kg',
          'Godet standard': '0.34 m³',
          'Profondeur de fouille': '4.8 m',
          'Vitesse de déplacement': '35 km/h',
          'Norme moteur': 'Stage V'
        },
        published: true,
        createdAt: '2024-02-05'
      },
      // ---- EUROCOMACH - Mini-pelles ----
      {
        id: 'prod_006',
        name: 'ES 1500 ZT Mini-Pelle',
        brand: 'Eurocomach',
        category: 'materiel-tp',
        subCategory: 'mini-pelle',
        description: 'Mini-pelle 1.5 tonne à queue zéro. Compacte et polyvalente, elle accède aux espaces confinés. Idéale pour les travaux en intérieur, jardins et zones urbaines.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
        ],
        specs: {
          'Marque moteur': 'Kubota',
          'Puissance moteur': '13.5 cv',
          'Poids opérationnel': '1 500 kg',
          'Profondeur de fouille': '2.2 m',
          'Godet standard': '0.04 m³',
          'Type': 'Queue zéro (ZT)'
        },
        published: true,
        createdAt: '2024-02-10'
      },
      {
        id: 'prod_007',
        name: 'ES 2500 ZT Mini-Pelle',
        brand: 'Eurocomach',
        category: 'materiel-tp',
        subCategory: 'mini-pelle',
        description: 'Mini-pelle 2.5 tonnes à queue zéro. Rapport poids/performance exceptionnel. Parfaite pour les travaux de terrassement léger et de tranchées.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
        ],
        specs: {
          'Marque moteur': 'Kubota',
          'Puissance moteur': '20.5 cv',
          'Poids opérationnel': '2 500 kg',
          'Profondeur de fouille': '2.7 m',
          'Godet standard': '0.06 m³',
          'Type': 'Queue zéro (ZT)'
        },
        published: true,
        createdAt: '2024-02-12'
      },
      {
        id: 'prod_008',
        name: 'ES 3500 ZT Mini-Pelle',
        brand: 'Eurocomach',
        category: 'materiel-tp',
        subCategory: 'mini-pelle',
        description: 'Mini-pelle 3.5 tonnes à queue zéro. Motorisation Kubota fiable et économique. Excellent pour les travaux de terrassement et de démolition légère.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
        ],
        specs: {
          'Marque moteur': 'Kubota',
          'Puissance moteur': '28.3 cv',
          'Poids opérationnel': '3 500 kg',
          'Profondeur de fouille': '2.9 m',
          'Godet standard': '0.08 m³',
          'Type': 'Queue zéro (ZT)'
        },
        published: true,
        createdAt: '2024-02-15'
      },
      {
        id: 'prod_009',
        name: 'ES 5000 Mini-Pelle',
        brand: 'Eurocomach',
        category: 'materiel-tp',
        subCategory: 'mini-pelle',
        description: 'Mini-pelle 5 tonnes. Puissance et polyvalence pour des travaux plus exigeants. Cabine spacieuse et confortable pour le conducteur.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
        ],
        specs: {
          'Puissance moteur': '36.5 cv',
          'Poids opérationnel': '5 000 kg',
          'Profondeur de fouille': '3.3 m',
          'Godet standard': '0.12 m³',
          'Force d\'arrachement': '2.8 t',
          'Norme moteur': 'Stage V'
        },
        published: true,
        createdAt: '2024-02-18'
      },
      // ---- SCORPION - Remorques & Semi-remorques ----
      {
        id: 'prod_010',
        name: 'Benne TP 24m³',
        brand: 'Scorpion',
        category: 'remorques',
        subCategory: 'benne-tp',
        description: 'Semi-remorque benne acier TP de 24m³ idéale pour le transport de matériaux de construction, gravats, terre et déblais. Structure robuste en acier haute résistance.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
          'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80'
        ],
        specs: {
          'Type': 'Semi-remorque benne acier',
          'Capacité': '24 m³',
          'PTAC': '44 t',
          'Essieux': 'Tandem (2 essieux)',
          'Matériau': 'Acier haute résistance',
          'Bâchage': 'Bâche coulissante'
        },
        published: true,
        createdAt: '2024-03-01'
      },
      {
        id: 'prod_011',
        name: 'Semi-Remorque Plateau 13.6m',
        brand: 'Scorpion',
        category: 'remorques',
        subCategory: 'plateau',
        description: 'Semi-remorque plateau en acier de 13.6 mètres. Idéale pour le transport d\'engins de chantier, de matériaux de grande dimension et de marchandises diverses.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80'
        ],
        specs: {
          'Type': 'Plateau acier',
          'Longueur plateau': '13.6 m',
          'Largeur utile': '2.48 m',
          'PTAC': '38 t',
          'Essieux': 'Tridem (3 essieux)',
          'Rampes': 'Rampes de chargement incluses'
        },
        published: true,
        createdAt: '2024-03-05'
      },
      {
        id: 'prod_012',
        name: 'Porte-Container 20/40 pieds',
        brand: 'Scorpion',
        category: 'remorques',
        subCategory: 'porte-container',
        description: 'Châssis porte-container extensible compatible 20 et 40 pieds. Structure optimisée pour le transport intermodal. Verrous ISO standards.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80'
        ],
        specs: {
          'Type': 'Châssis extensible',
          'Compatibilité': '20 et 40 pieds',
          'Verrous': 'ISO standards (8x)',
          'PTAC': '38 t',
          'Essieux': 'Tandem ou Tridem',
          'Extension': 'Hydraulique ou manuelle'
        },
        published: true,
        createdAt: '2024-03-10'
      },
      {
        id: 'prod_013',
        name: 'Benne Céréalière 55m³',
        brand: 'Scorpion',
        category: 'remorques',
        subCategory: 'benne-tp',
        description: 'Semi-remorque benne céréalière grande capacité 55m³. Parois aluminium légères pour maximiser la charge utile. Trappes de vidange latérales et fond.',
        price: null,
        priceLabel: 'Sur devis',
        images: [
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80'
        ],
        specs: {
          'Type': 'Benne céréalière',
          'Capacité': '55 m³',
          'Matériau': 'Aluminium',
          'PTAC': '44 t',
          'Essieux': 'Tridem (3 essieux)',
          'Trappes': 'Vidange latérale et fond'
        },
        published: true,
        createdAt: '2024-03-15'
      }
    ];
    localStorage.setItem('ozt_products', JSON.stringify(products));
  }

  // ---- Actualités ----
  if (!localStorage.getItem('ozt_news')) {
    const news = [
      {
        id: 'news_001',
        title: 'OZ Truck Trailer devient distributeur officiel Hidromek',
        excerpt: 'Nous sommes fiers d\'annoncer notre partenariat exclusif avec le constructeur turc Hidromek pour la région Pays de la Loire.',
        content: 'OZ Truck Trailer TP/BTP est désormais distributeur officiel et service agréé Hidromek pour la région Pays de la Loire. Cette collaboration nous permet de vous proposer toute la gamme de matériels Hidromek : tractopelles, pelles hydrauliques sur chenilles et sur pneus, avec des services de maintenance et pièces détachées d\'origine.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        date: '2024-03-01',
        published: true
      },
      {
        id: 'news_002',
        title: 'Nouveau stock de semi-remorques Scorpion disponible',
        excerpt: 'Une nouvelle gamme de semi-remorques bennes et plateaux Scorpion est disponible dans notre parc.',
        content: 'Nous avons le plaisir de vous informer de l\'arrivée d\'un nouveau stock de semi-remorques de la marque Scorpion. Bennes TP, plateaux, porte-containers : découvrez nos nouveaux équipements disponibles immédiatement à la vente ou à la location.',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
        date: '2024-02-15',
        published: true
      },
      {
        id: 'news_003',
        title: 'Extension de nos services de réparation poids lourds',
        excerpt: 'Notre atelier de réparation s\'agrandit pour mieux vous accueillir. Nouveau matériel de diagnostic.',
        content: 'Pour mieux répondre à la demande croissante, OZ Truck Trailer a investi dans l\'agrandissement de son atelier de réparation. Nous disposons désormais d\'un nouveau pont élévateur et d\'équipements de diagnostic de dernière génération pour vos poids lourds et utilitaires.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
        date: '2024-01-20',
        published: true
      }
    ];
    localStorage.setItem('ozt_news', JSON.stringify(news));
  }

  // ---- Médias (Photos/Vidéos) ----
  if (!localStorage.getItem('ozt_medias')) {
    const medias = [
      {
        id: 'media_001',
        title: 'Parc matériel TP',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        description: 'Notre parc de matériel TP disponible',
        published: true,
        date: '2024-03-10'
      },
      {
        id: 'media_002',
        title: 'Semi-remorques en stock',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
        description: 'Stock de semi-remorques disponibles',
        published: true,
        date: '2024-03-08'
      },
      {
        id: 'media_003',
        title: 'Atelier de réparation',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
        description: 'Notre atelier équipé pour vos réparations',
        published: true,
        date: '2024-03-05'
      },
      {
        id: 'media_004',
        title: 'Chantier TP en action',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        description: 'Nos machines Hidromek sur chantier',
        published: true,
        date: '2024-02-25'
      },
      {
        id: 'media_005',
        title: 'Transport et logistique',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
        description: 'Solutions de transport pour vos équipements',
        published: true,
        date: '2024-02-20'
      },
      {
        id: 'media_006',
        title: 'Entrée OZ Truck Trailer',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
        description: 'Notre établissement à Châteaubriant',
        published: true,
        date: '2024-02-15'
      }
    ];
    localStorage.setItem('ozt_medias', JSON.stringify(medias));
  }

  // ---- Ventes Réalisées ----
  if (!localStorage.getItem('ozt_sales')) {
    const sales = [
      {
        id: 'sale_001',
        title: 'HMK 220LC - Entreprise Martin BTP',
        description: 'Pelle hydraulique sur chenilles livrée à l\'entreprise Martin BTP pour un chantier de terrassement en Loire-Atlantique.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        category: 'Matériel TP',
        date: '2024-02-28',
        published: true
      },
      {
        id: 'sale_002',
        title: 'Semi-remorque Plateau - Transport Durand',
        description: 'Semi-remorque plateau 13.6m livrée à la société Transport Durand pour le transport d\'engins de chantier.',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
        category: 'Remorques',
        date: '2024-02-15',
        published: true
      },
      {
        id: 'sale_003',
        title: 'ES 3500 ZT - Paysagiste Leroux',
        description: 'Mini-pelle Eurocomach 3.5t vendue à l\'entreprise de paysage Leroux pour des travaux d\'aménagement.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
        category: 'Matériel TP',
        date: '2024-01-30',
        published: true
      },
      {
        id: 'sale_004',
        title: 'Benne TP 24m³ - Granulats du Pays',
        description: 'Semi-remorque benne TP Scorpion vendue à la société Granulats du Pays pour le transport de matériaux.',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
        category: 'Remorques',
        date: '2024-01-20',
        published: true
      }
    ];
    localStorage.setItem('ozt_sales', JSON.stringify(sales));
  }

  // ---- Settings ----
  if (!localStorage.getItem('ozt_settings')) {
    const settings = {
      heroImages: [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80'
      ],
      heroSlides: [
        {
          title: 'Votre Spécialiste <span>TP/BTP</span>',
          subtitle: 'Vente, réparation et location de remorques, semi-remorques, matériel TP et poids lourds en Pays de la Loire.',
          badge: 'Châteaubriant - Loire-Atlantique',
          btnText: 'Voir nos produits',
          btnLink: '/produits/tous-nos-produits.html'
        },
        {
          title: 'Matériel <span>Hidromek</span> & Eurocomach',
          subtitle: 'Distributeur officiel de matériel de travaux publics. Pelles, mini-pelles, tractopelles — neufs et occasions.',
          badge: 'Distributeur Agréé',
          btnText: 'Matériel TP',
          btnLink: '/produits/materiel-tp.html'
        },
        {
          title: 'Remorques & <span>Semi-Remorques</span>',
          subtitle: 'Large gamme de semi-remorques bennes, plateaux, porte-containers et remorques de toutes catégories.',
          badge: 'Vente & Location',
          btnText: 'Voir les remorques',
          btnLink: '/produits/remorques-semi-remorques.html'
        },
        {
          title: 'Réparation & <span>Entretien</span>',
          subtitle: 'Atelier agréé pour la réparation et l\'entretien de vos poids lourds, remorques et matériels TP.',
          badge: 'Atelier Agréé',
          btnText: 'Nos services',
          btnLink: '/services/reparation.html'
        }
      ],
      aboutText: 'OZ Truck Trailer TP/BTP est une entreprise spécialisée dans la vente, la réparation et la location de remorques, semi-remorques, matériel de travaux publics, poids lourds et utilitaires. Basée à Châteaubriant en Loire-Atlantique, nous intervenons sur toute la région Pays de la Loire et au-delà.',
      aboutText2: 'Fondée avec la passion du secteur TP/BTP, notre entreprise s\'est développée pour devenir un acteur de référence dans la région. Distributeur officiel Hidromek et Eurocomach, nous proposons une gamme complète de matériels neufs et d\'occasion, des pièces détachées et des services de maintenance de qualité.',
      socialLinks: {
        facebook: 'https://www.facebook.com',
        instagram: 'https://www.instagram.com',
        linkedin: 'https://www.linkedin.com',
        youtube: 'https://www.youtube.com'
      },
      homeIntroTitle: 'Votre partenaire pour vos projets TP/BTP',
      homeIntroText: 'Depuis notre établissement de Châteaubriant, nous mettons à votre disposition une expertise unique dans le domaine du matériel de travaux publics, des remorques et des poids lourds. Vente, location, réparation : un service complet pour vos projets.',
      password: 'admin123'
    };
    localStorage.setItem('ozt_settings', JSON.stringify(settings));
  }

  // ---- Analytics ----
  if (!localStorage.getItem('ozt_analytics')) {
    localStorage.setItem('ozt_analytics', JSON.stringify({}));
  }

})();

// ---- Data Access Helpers ----

const OZT = {
  // Products
  getProducts: function () {
    return JSON.parse(localStorage.getItem('ozt_products') || '[]');
  },
  saveProducts: function (data) {
    localStorage.setItem('ozt_products', JSON.stringify(data));
  },
  getProductById: function (id) {
    return this.getProducts().find(p => p.id === id) || null;
  },
  getProductsByCategory: function (cat) {
    return this.getProducts().filter(p => p.category === cat && p.published);
  },
  getPublishedProducts: function () {
    return this.getProducts().filter(p => p.published);
  },

  // News
  getNews: function () {
    return JSON.parse(localStorage.getItem('ozt_news') || '[]');
  },
  saveNews: function (data) {
    localStorage.setItem('ozt_news', JSON.stringify(data));
  },
  getNewsById: function (id) {
    return this.getNews().find(n => n.id === id) || null;
  },
  getPublishedNews: function () {
    return this.getNews().filter(n => n.published);
  },

  // Medias
  getMedias: function () {
    return JSON.parse(localStorage.getItem('ozt_medias') || '[]');
  },
  saveMedias: function (data) {
    localStorage.setItem('ozt_medias', JSON.stringify(data));
  },
  getMediaById: function (id) {
    return this.getMedias().find(m => m.id === id) || null;
  },
  getPublishedMedias: function () {
    return this.getMedias().filter(m => m.published);
  },

  // Sales
  getSales: function () {
    return JSON.parse(localStorage.getItem('ozt_sales') || '[]');
  },
  saveSales: function (data) {
    localStorage.setItem('ozt_sales', JSON.stringify(data));
  },
  getSaleById: function (id) {
    return this.getSales().find(s => s.id === id) || null;
  },
  getPublishedSales: function () {
    return this.getSales().filter(s => s.published);
  },

  // Settings
  getSettings: function () {
    return JSON.parse(localStorage.getItem('ozt_settings') || '{}');
  },
  saveSettings: function (data) {
    localStorage.setItem('ozt_settings', JSON.stringify(data));
  },

  // Analytics
  getAnalytics: function () {
    return JSON.parse(localStorage.getItem('ozt_analytics') || '{}');
  },
  saveAnalytics: function (data) {
    localStorage.setItem('ozt_analytics', JSON.stringify(data));
  },

  // Search
  searchAll: function (query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results = [];
    this.getPublishedProducts().forEach(p => {
      if (
        p.name.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      ) {
        results.push({ type: 'product', item: p });
      }
    });
    this.getPublishedNews().forEach(n => {
      if (n.title.toLowerCase().includes(q) || (n.excerpt && n.excerpt.toLowerCase().includes(q))) {
        results.push({ type: 'news', item: n });
      }
    });
    return results;
  },

  // Generate ID
  genId: function (prefix) {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  },

  // Auth
  checkAuth: function () {
    return sessionStorage.getItem('ozt_admin_logged') === 'true';
  },
  login: function (password) {
    const settings = this.getSettings();
    if (password === (settings.password || 'admin123')) {
      sessionStorage.setItem('ozt_admin_logged', 'true');
      return true;
    }
    return false;
  },
  logout: function () {
    sessionStorage.removeItem('ozt_admin_logged');
  }
};

window.OZT = OZT;
