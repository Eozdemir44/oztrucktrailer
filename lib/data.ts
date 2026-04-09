import { Product, NewsItem, MediaItem, SaleItem, SiteSettings, Analytics } from './types'

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'hidromek-hmk-102b',
    title: 'Hidromek HMK 102B Tractopelle',
    slug: 'hidromek-hmk-102b-tractopelle',
    category: 'materiel-tp',
    subcategory: 'tractopelle',
    brand: 'Hidromek',
    description: 'Le Hidromek HMK 102B est une tractopelle puissante et polyvalente, idéale pour les travaux de terrassement, de creusement et de chargement sur chantier TP/BTP. Sa configuration 4x4x4 lui permet une excellente maniabilité sur tous types de terrains.',
    price: null,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    characteristics: [
      { key: 'Puissance', value: '97 cv' },
      { key: 'Godet', value: '0.28 m³' },
      { key: 'Poids', value: '8.2 t' },
      { key: 'Configuration', value: '4x4x4' },
    ],
    published: true,
    createdAt: '2024-01-01T00:00:00Z',
    featured: true,
  },
  {
    id: 'hidromek-hmk-140lc',
    title: 'Hidromek HMK 140LC',
    slug: 'hidromek-hmk-140lc',
    category: 'materiel-tp',
    subcategory: 'pelle-a-chenille',
    brand: 'Hidromek',
    description: 'La pelle sur chenilles Hidromek HMK 140LC offre une excellente stabilité et une puissance remarquable pour les travaux de terrassement et d\'excavation. Idéale pour les chantiers nécessitant une grande précision.',
    price: null,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    characteristics: [
      { key: 'Puissance', value: '112 cv' },
      { key: 'Godet', value: '0.6 m³' },
      { key: 'Poids', value: '14 t' },
    ],
    published: true,
    createdAt: '2024-01-02T00:00:00Z',
    featured: true,
  },
  {
    id: 'hidromek-hmk-220lc',
    title: 'Hidromek HMK 220LC',
    slug: 'hidromek-hmk-220lc',
    category: 'materiel-tp',
    subcategory: 'pelle-a-chenille',
    brand: 'Hidromek',
    description: 'La Hidromek HMK 220LC est une pelle sur chenilles de grande capacité, parfaite pour les grands chantiers de terrassement, d\'excavation et de travaux publics. Sa profondeur de fouille de 6.5m en fait un engin de référence.',
    price: null,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    characteristics: [
      { key: 'Puissance', value: '163 cv' },
      { key: 'Profondeur de fouille', value: '6.5 m' },
      { key: 'Poids', value: '22 t' },
    ],
    published: true,
    createdAt: '2024-01-03T00:00:00Z',
    featured: true,
  },
  {
    id: 'hidromek-hmk-300lc',
    title: 'Hidromek HMK 300LC',
    slug: 'hidromek-hmk-300lc',
    category: 'materiel-tp',
    subcategory: 'pelle-a-chenille',
    brand: 'Hidromek',
    description: 'La Hidromek HMK 300LC est la pelle sur chenilles haut de gamme de la gamme Hidromek. Avec ses 30 tonnes et sa puissance de 227cv, elle est conçue pour les travaux les plus exigeants en terrassement et carrière.',
    price: null,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    characteristics: [
      { key: 'Puissance', value: '227 cv' },
      { key: 'Poids', value: '30 t' },
    ],
    published: true,
    createdAt: '2024-01-04T00:00:00Z',
    featured: false,
  },
  {
    id: 'hidromek-hmk-81w',
    title: 'Hidromek HMK 81W',
    slug: 'hidromek-hmk-81w',
    category: 'materiel-tp',
    subcategory: 'pelle-a-pneu',
    brand: 'Hidromek',
    description: 'La Hidromek HMK 81W est une pelle sur pneus compacte et maniable, idéale pour les travaux en milieu urbain et les chantiers à espace limité. Sa mobilité sur route en fait un engin polyvalent.',
    price: null,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    characteristics: [
      { key: 'Puissance', value: '95 cv' },
      { key: 'Poids', value: '8 t' },
    ],
    published: true,
    createdAt: '2024-01-05T00:00:00Z',
    featured: false,
  },
  {
    id: 'eurocomach-es-1500-zt',
    title: 'Eurocomach ES 1500 ZT',
    slug: 'eurocomach-es-1500-zt',
    category: 'materiel-tp',
    subcategory: 'mini-pelle',
    brand: 'Eurocomach',
    description: 'La mini-pelle Eurocomach ES 1500 ZT est parfaite pour les travaux dans des espaces restreints. Équipée d\'un moteur Kubota fiable, elle offre une excellente maniabilité et des performances optimales pour son gabarit.',
    price: null,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    characteristics: [
      { key: 'Poids', value: '1.5 t' },
      { key: 'Moteur', value: 'Kubota' },
      { key: 'Profondeur de fouille', value: '2.2 m' },
    ],
    published: true,
    createdAt: '2024-01-06T00:00:00Z',
    featured: true,
  },
  {
    id: 'eurocomach-es-2500-zt',
    title: 'Eurocomach ES 2500 ZT',
    slug: 'eurocomach-es-2500-zt',
    category: 'materiel-tp',
    subcategory: 'mini-pelle',
    brand: 'Eurocomach',
    description: 'La mini-pelle Eurocomach ES 2500 ZT combine compacité et puissance. Idéale pour les travaux de terrassement, tranchées et aménagements paysagers. Son moteur Kubota garantit fiabilité et économie de carburant.',
    price: null,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    characteristics: [
      { key: 'Poids', value: '2.5 t' },
      { key: 'Moteur', value: 'Kubota' },
      { key: 'Profondeur de fouille', value: '2.7 m' },
    ],
    published: true,
    createdAt: '2024-01-07T00:00:00Z',
    featured: false,
  },
  {
    id: 'eurocomach-es-3500-zt',
    title: 'Eurocomach ES 3500 ZT',
    slug: 'eurocomach-es-3500-zt',
    category: 'materiel-tp',
    subcategory: 'mini-pelle',
    brand: 'Eurocomach',
    description: 'La mini-pelle Eurocomach ES 3500 ZT est une machine intermédiaire alliant performance et polyvalence. Elle est particulièrement adaptée aux travaux de construction résidentielle et aux petits chantiers de génie civil.',
    price: null,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    characteristics: [
      { key: 'Poids', value: '3.5 t' },
      { key: 'Profondeur de fouille', value: '2.9 m' },
    ],
    published: true,
    createdAt: '2024-01-08T00:00:00Z',
    featured: false,
  },
  {
    id: 'eurocomach-es-5000',
    title: 'Eurocomach ES 5000',
    slug: 'eurocomach-es-5000',
    category: 'materiel-tp',
    subcategory: 'mini-pelle',
    brand: 'Eurocomach',
    description: 'La mini-pelle Eurocomach ES 5000 offre une capacité supérieure dans un format compact. Sa profondeur de fouille de 3.3m la rend capable de réaliser des travaux plus profonds tout en restant maniable sur chantier.',
    price: null,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    characteristics: [
      { key: 'Poids', value: '5 t' },
      { key: 'Profondeur de fouille', value: '3.3 m' },
    ],
    published: true,
    createdAt: '2024-01-09T00:00:00Z',
    featured: true,
  },
  {
    id: 'scorpion-benne-tp-24m3',
    title: 'Scorpion Benne TP 24m³',
    slug: 'scorpion-benne-tp-24m3',
    category: 'remorques-semi-remorques',
    subcategory: 'benne-tp',
    brand: 'Scorpion Trailer',
    description: 'La semi-remorque benne TP Scorpion de 24m³ est conçue pour le transport de matériaux de construction, terres et gravats. Son essieu tandem garantit une stabilité optimale lors du transport et du déchargement.',
    price: null,
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800'],
    characteristics: [
      { key: 'Volume', value: '24 m³' },
      { key: 'PTAC', value: '44 t' },
      { key: 'Essieu', value: 'Tandem' },
    ],
    published: true,
    createdAt: '2024-01-10T00:00:00Z',
    featured: true,
  },
  {
    id: 'scorpion-plateau-13-6m',
    title: 'Scorpion Semi-Remorque Plateau 13.6m',
    slug: 'scorpion-semi-remorque-plateau-13-6m',
    category: 'remorques-semi-remorques',
    subcategory: 'plateau',
    brand: 'Scorpion Trailer',
    description: 'La semi-remorque plateau Scorpion de 13.6m est la solution idéale pour le transport de marchandises volumineuses, de machines et d\'équipements industriels. Sa construction robuste garantit longévité et fiabilité.',
    price: null,
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800'],
    characteristics: [
      { key: 'Longueur', value: '13.6 m' },
      { key: 'Largeur', value: '2.55 m' },
    ],
    published: true,
    createdAt: '2024-01-11T00:00:00Z',
    featured: false,
  },
  {
    id: 'scorpion-porte-container-20-40',
    title: 'Scorpion Porte-Container 20/40 Pieds',
    slug: 'scorpion-porte-container-20-40-pieds',
    category: 'remorques-semi-remorques',
    subcategory: 'porte-container',
    brand: 'Scorpion Trailer',
    description: 'Le porte-container Scorpion est extensible pour s\'adapter aux containers de 20 et 40 pieds. Conçu pour le transport maritime et intermodal, il offre une flexibilité maximale pour vos opérations logistiques.',
    price: null,
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800'],
    characteristics: [
      { key: 'Type', value: 'Longueur extensible' },
      { key: 'Compatibilité', value: '20/40 pieds' },
    ],
    published: true,
    createdAt: '2024-01-12T00:00:00Z',
    featured: false,
  },
  {
    id: 'scorpion-benne-cerealiere-55m3',
    title: 'Scorpion Benne Céréalière 55m³',
    slug: 'scorpion-benne-cerealiere-55m3',
    category: 'remorques-semi-remorques',
    subcategory: 'benne-tp',
    brand: 'Scorpion Trailer',
    description: 'La semi-remorque benne céréalière Scorpion de 55m³ est construite en aluminium pour une légèreté maximale. Idéale pour le transport de céréales, betteraves et autres produits agricoles en vrac.',
    price: null,
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800'],
    characteristics: [
      { key: 'Volume', value: '55 m³' },
      { key: 'Construction', value: 'Aluminium' },
    ],
    published: true,
    createdAt: '2024-01-13T00:00:00Z',
    featured: true,
  },
]

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    slug: 'nouveau-partenariat-hidromek',
    title: 'Nouveau Partenariat avec Hidromek',
    content: 'OZ Truck Trailer TP/BTP est fier d\'annoncer son nouveau partenariat avec Hidromek, l\'un des leaders mondiaux dans la fabrication d\'engins de chantier. Ce partenariat nous permet de vous proposer une gamme complète de pelles hydrauliques, tractopelles et mini-pelles de haute qualité.\n\nGrâce à cet accord commercial, nous sommes désormais distributeur officiel des produits Hidromek pour la région des Pays de la Loire. Nos techniciens ont été formés directement par Hidromek pour assurer un service après-vente de qualité.\n\nVenez découvrir notre stock de machines Hidromek dans notre showroom à Châteaubriant.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    type: 'actualite',
    date: '2024-03-15',
    published: true,
  },
  {
    id: 'news-2',
    slug: 'nouvelle-gamme-eurocomach',
    title: 'Arrivée de la Nouvelle Gamme Eurocomach',
    content: 'Nous sommes heureux de vous présenter la nouvelle gamme de mini-pelles Eurocomach, désormais disponible chez OZ Truck Trailer TP/BTP. La série ZT se distingue par son zéro porte-à-faux arrière, permettant de travailler en toute sécurité dans des espaces confinés.\n\nLes nouvelles Eurocomach ES 1500 ZT, ES 2500 ZT et ES 3500 ZT sont maintenant en stock et disponibles à l\'essai sur notre site. Équipées de moteurs Kubota dernière génération, elles offrent un excellent compromis entre puissance et consommation.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    type: 'nouveaute',
    date: '2024-02-20',
    published: true,
  },
  {
    id: 'news-3',
    slug: 'extension-atelier-reparation',
    title: 'Extension de Notre Atelier de Réparation',
    content: 'Pour mieux vous servir, OZ Truck Trailer TP/BTP a investi dans l\'extension de son atelier de réparation à Châteaubriant. Le nouvel espace dispose de 4 fosses d\'inspection supplémentaires et d\'un pont élévateur adapté aux poids lourds.\n\nNos techniciens qualifiés peuvent désormais intervenir plus rapidement sur l\'entretien et la réparation de vos remorques, semi-remorques et matériels TP. Nous pouvons traiter plus de 15 véhicules simultanément pour minimiser vos temps d\'immobilisation.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    type: 'actualite',
    date: '2024-01-10',
    published: true,
  },
]

export const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    slug: 'photo-chantier-hidromek',
    title: 'Chantier avec Hidromek HMK 220LC',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
    description: 'Notre Hidromek HMK 220LC en action sur un chantier de terrassement en Loire-Atlantique.',
    date: '2024-03-01',
    published: true,
  },
  {
    id: 'media-2',
    slug: 'photo-convoi-remorque',
    title: 'Convoi Scorpion Semi-Remorque',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400',
    description: 'Livraison d\'une semi-remorque plateau Scorpion chez un client en Bretagne.',
    date: '2024-02-15',
    published: true,
  },
  {
    id: 'media-3',
    slug: 'photo-showroom',
    title: 'Notre Showroom à Châteaubriant',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Vue de notre showroom avec les dernières machines Hidromek et Eurocomach.',
    date: '2024-01-20',
    published: true,
  },
]

export const DEFAULT_SALES: SaleItem[] = [
  {
    id: 'sale-1',
    slug: 'vente-hidromek-140lc-bretagne',
    title: 'Livraison Hidromek HMK 140LC en Bretagne',
    description: 'Livraison d\'une pelle sur chenilles Hidromek HMK 140LC à une entreprise de terrassement en Bretagne. Le client, spécialisé dans les travaux de VRD, a choisi cette machine pour sa robustesse et ses performances. Notre équipe a assuré la livraison et la mise en main complète.',
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    productName: 'Hidromek HMK 140LC',
    date: '2024-03-10',
    location: 'Rennes, Bretagne',
    published: true,
  },
  {
    id: 'sale-2',
    slug: 'vente-scorpion-benne-pays-loire',
    title: 'Vente Scorpion Benne TP 24m³ - Pays de la Loire',
    description: 'Une entreprise de transport en vrac des Pays de la Loire a fait confiance à OZ Truck Trailer pour l\'achat de deux semi-remorques benne TP Scorpion de 24m³. Ces engins seront utilisés pour le transport de granulats dans la région.',
    images: ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800'],
    productName: 'Scorpion Benne TP 24m³',
    date: '2024-02-28',
    location: 'Nantes, Pays de la Loire',
    published: true,
  },
  {
    id: 'sale-3',
    slug: 'vente-eurocomach-es-2500-paysagiste',
    title: 'Eurocomach ES 2500 ZT pour Paysagiste',
    description: 'Un entrepreneur paysagiste de la région a acquis une Eurocomach ES 2500 ZT pour ses travaux d\'aménagement. La mini-pelle à zéro porte-à-faux lui permet de travailler efficacement dans des jardins et espaces urbains sans risquer d\'endommager les structures environnantes.',
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800'],
    productName: 'Eurocomach ES 2500 ZT',
    date: '2024-02-10',
    location: 'Châteaubriant, Loire-Atlantique',
    published: true,
  },
]

export const DEFAULT_SETTINGS: SiteSettings = {
  heroImages: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920',
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920',
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920',
  ],
  heroTitles: [
    'Votre Spécialiste Matériel TP/BTP',
    'Remorques & Semi-Remorques',
    'Transport & Logistique',
    'Matériel de Chantier',
  ],
  aboutText: 'OZ Truck Trailer TP/BTP est une entreprise spécialisée dans la vente, la location et la réparation de matériel TP/BTP et de transport. Basée à Châteaubriant en Loire-Atlantique, nous servons les professionnels du BTP, du transport et de l\'agriculture dans toute la région Pays de la Loire et Bretagne.\n\nFondée avec la passion du matériel professionnel, notre entreprise s\'est construite sur des valeurs de proximité, d\'expertise technique et de service client irréprochable. Nos équipes qualifiées sont à votre disposition pour vous conseiller dans le choix de vos équipements et assurer leur entretien.\n\nNous sommes distributeurs officiels des marques Hidromek, Eurocomach et Scorpion Trailer, ce qui nous permet de vous offrir les meilleures machines du marché avec un service après-vente de qualité.',
  companyDescription: 'Distributeur officiel Hidromek, Eurocomach et Scorpion Trailer à Châteaubriant',
  homeWelcomeTitle: 'Bienvenue chez OZ Truck Trailer TP/BTP',
  homeWelcomeText: 'Votre partenaire de confiance pour la vente, la location et l\'entretien de matériel TP et de transport en Loire-Atlantique.',
  socialFacebook: 'https://facebook.com',
  socialInstagram: 'https://instagram.com',
  socialLinkedin: 'https://linkedin.com',
  socialYoutube: 'https://youtube.com',
  adminPassword: 'admin123',
}

// Storage keys
const KEYS = {
  PRODUCTS: 'ozt_products',
  NEWS: 'ozt_news',
  MEDIA: 'ozt_media',
  SALES: 'ozt_sales',
  SETTINGS: 'ozt_settings',
}

// Products CRUD
export function getProducts(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS
  const stored = localStorage.getItem(KEYS.PRODUCTS)
  if (!stored) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS))
    return DEFAULT_PRODUCTS
  }
  return JSON.parse(stored)
}

export function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products))
}

export function addProduct(product: Product): void {
  const products = getProducts()
  products.push(product)
  saveProducts(products)
}

export function updateProduct(id: string, data: Partial<Product>): void {
  const products = getProducts()
  const idx = products.findIndex(p => p.id === id)
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...data }
    saveProducts(products)
  }
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter(p => p.id !== id)
  saveProducts(products)
}

// News CRUD
export function getNews(): NewsItem[] {
  if (typeof window === 'undefined') return DEFAULT_NEWS
  const stored = localStorage.getItem(KEYS.NEWS)
  if (!stored) {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(DEFAULT_NEWS))
    return DEFAULT_NEWS
  }
  return JSON.parse(stored)
}

export function saveNews(news: NewsItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.NEWS, JSON.stringify(news))
}

export function addNewsItem(item: NewsItem): void {
  const news = getNews()
  news.push(item)
  saveNews(news)
}

export function updateNewsItem(id: string, data: Partial<NewsItem>): void {
  const news = getNews()
  const idx = news.findIndex(n => n.id === id)
  if (idx !== -1) {
    news[idx] = { ...news[idx], ...data }
    saveNews(news)
  }
}

export function deleteNewsItem(id: string): void {
  const news = getNews().filter(n => n.id !== id)
  saveNews(news)
}

// Media CRUD
export function getMedia(): MediaItem[] {
  if (typeof window === 'undefined') return DEFAULT_MEDIA
  const stored = localStorage.getItem(KEYS.MEDIA)
  if (!stored) {
    localStorage.setItem(KEYS.MEDIA, JSON.stringify(DEFAULT_MEDIA))
    return DEFAULT_MEDIA
  }
  return JSON.parse(stored)
}

export function saveMedia(media: MediaItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.MEDIA, JSON.stringify(media))
}

export function addMediaItem(item: MediaItem): void {
  const media = getMedia()
  media.push(item)
  saveMedia(media)
}

export function deleteMediaItem(id: string): void {
  const media = getMedia().filter(m => m.id !== id)
  saveMedia(media)
}

// Sales CRUD
export function getSales(): SaleItem[] {
  if (typeof window === 'undefined') return DEFAULT_SALES
  const stored = localStorage.getItem(KEYS.SALES)
  if (!stored) {
    localStorage.setItem(KEYS.SALES, JSON.stringify(DEFAULT_SALES))
    return DEFAULT_SALES
  }
  return JSON.parse(stored)
}

export function saveSales(sales: SaleItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.SALES, JSON.stringify(sales))
}

export function addSaleItem(item: SaleItem): void {
  const sales = getSales()
  sales.push(item)
  saveSales(sales)
}

export function updateSaleItem(id: string, data: Partial<SaleItem>): void {
  const sales = getSales()
  const idx = sales.findIndex(s => s.id === id)
  if (idx !== -1) {
    sales[idx] = { ...sales[idx], ...data }
    saveSales(sales)
  }
}

export function deleteSaleItem(id: string): void {
  const sales = getSales().filter(s => s.id !== id)
  saveSales(sales)
}

// Settings
export function getSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  const stored = localStorage.getItem(KEYS.SETTINGS)
  if (!stored) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS))
    return DEFAULT_SETTINGS
  }
  return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
}

export function saveSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings))
}

// Slug generator
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ID generator
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
