export interface Product {
  id: string
  title: string
  slug: string
  category: string
  subcategory: string
  brand: string
  description: string
  price: number | null
  images: string[]
  characteristics: { key: string; value: string }[]
  published: boolean
  createdAt: string
  featured: boolean
}

export interface NewsItem {
  id: string
  slug: string
  title: string
  content: string
  image: string
  type: 'actualite' | 'nouveaute'
  date: string
  published: boolean
}

export interface MediaItem {
  id: string
  slug: string
  title: string
  type: 'photo' | 'video'
  url: string
  thumbnail: string
  description: string
  date: string
  published: boolean
}

export interface SaleItem {
  id: string
  slug: string
  title: string
  description: string
  images: string[]
  productName: string
  date: string
  location: string
  published: boolean
}

export interface SiteSettings {
  heroImages: string[]
  heroTitles: string[]
  aboutText: string
  companyDescription: string
  homeWelcomeTitle: string
  homeWelcomeText: string
  socialFacebook: string
  socialInstagram: string
  socialLinkedin: string
  socialYoutube: string
  adminPassword: string
}

export interface Analytics {
  pages: Record<string, number[]>
}
