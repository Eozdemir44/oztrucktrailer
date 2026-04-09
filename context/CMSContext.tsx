'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Product, NewsItem, MediaItem, SaleItem, SiteSettings } from '@/lib/types'
import {
  getProducts, saveProducts,
  getNews, saveNews,
  getMedia, saveMedia,
  getSales, saveSales,
  getSettings, saveSettings,
  DEFAULT_PRODUCTS, DEFAULT_NEWS, DEFAULT_MEDIA, DEFAULT_SALES, DEFAULT_SETTINGS,
  generateId
} from '@/lib/data'
import { trackPageVisit } from '@/lib/analytics'

interface CMSContextType {
  products: Product[]
  news: NewsItem[]
  media: MediaItem[]
  sales: SaleItem[]
  settings: SiteSettings
  // Product methods
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void
  toggleProductPublished: (id: string) => void
  toggleProductFeatured: (id: string) => void
  // News methods
  addNews: (item: Omit<NewsItem, 'id'>) => void
  updateNews: (id: string, data: Partial<NewsItem>) => void
  deleteNews: (id: string) => void
  toggleNewsPublished: (id: string) => void
  // Media methods
  addMedia: (item: Omit<MediaItem, 'id'>) => void
  deleteMedia: (id: string) => void
  // Sale methods
  addSale: (item: Omit<SaleItem, 'id'>) => void
  updateSale: (id: string, data: Partial<SaleItem>) => void
  deleteSale: (id: string) => void
  toggleSalePublished: (id: string) => void
  // Settings
  updateSettings: (settings: Partial<SiteSettings>) => void
  resetData: () => void
  // Analytics
  trackVisit: (page: string) => void
}

const CMSContext = createContext<CMSContextType | null>(null)

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [media, setMedia] = useState<MediaItem[]>([])
  const [sales, setSales] = useState<SaleItem[]>([])
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setProducts(getProducts())
    setNews(getNews())
    setMedia(getMedia())
    setSales(getSales())
    setSettings(getSettings())
    setInitialized(true)
  }, [])

  // Products
  const addProduct = useCallback((data: Omit<Product, 'id' | 'createdAt'>) => {
    const product: Product = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    setProducts(prev => {
      const updated = [...prev, product]
      saveProducts(updated)
      return updated
    })
  }, [])

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...data } : p)
      saveProducts(updated)
      return updated
    })
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id)
      saveProducts(updated)
      return updated
    })
  }, [])

  const toggleProductPublished = useCallback((id: string) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, published: !p.published } : p)
      saveProducts(updated)
      return updated
    })
  }, [])

  const toggleProductFeatured = useCallback((id: string) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p)
      saveProducts(updated)
      return updated
    })
  }, [])

  // News
  const addNews = useCallback((data: Omit<NewsItem, 'id'>) => {
    const item: NewsItem = { ...data, id: generateId() }
    setNews(prev => {
      const updated = [...prev, item]
      saveNews(updated)
      return updated
    })
  }, [])

  const updateNews = useCallback((id: string, data: Partial<NewsItem>) => {
    setNews(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, ...data } : n)
      saveNews(updated)
      return updated
    })
  }, [])

  const deleteNews = useCallback((id: string) => {
    setNews(prev => {
      const updated = prev.filter(n => n.id !== id)
      saveNews(updated)
      return updated
    })
  }, [])

  const toggleNewsPublished = useCallback((id: string) => {
    setNews(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, published: !n.published } : n)
      saveNews(updated)
      return updated
    })
  }, [])

  // Media
  const addMedia = useCallback((data: Omit<MediaItem, 'id'>) => {
    const item: MediaItem = { ...data, id: generateId() }
    setMedia(prev => {
      const updated = [...prev, item]
      saveMedia(updated)
      return updated
    })
  }, [])

  const deleteMedia = useCallback((id: string) => {
    setMedia(prev => {
      const updated = prev.filter(m => m.id !== id)
      saveMedia(updated)
      return updated
    })
  }, [])

  // Sales
  const addSale = useCallback((data: Omit<SaleItem, 'id'>) => {
    const item: SaleItem = { ...data, id: generateId() }
    setSales(prev => {
      const updated = [...prev, item]
      saveSales(updated)
      return updated
    })
  }, [])

  const updateSale = useCallback((id: string, data: Partial<SaleItem>) => {
    setSales(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...data } : s)
      saveSales(updated)
      return updated
    })
  }, [])

  const deleteSale = useCallback((id: string) => {
    setSales(prev => {
      const updated = prev.filter(s => s.id !== id)
      saveSales(updated)
      return updated
    })
  }, [])

  const toggleSalePublished = useCallback((id: string) => {
    setSales(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, published: !s.published } : s)
      saveSales(updated)
      return updated
    })
  }, [])

  // Settings
  const updateSettings = useCallback((data: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...data }
      saveSettings(updated)
      return updated
    })
  }, [])

  // Reset
  const resetData = useCallback(() => {
    saveProducts(DEFAULT_PRODUCTS)
    saveNews(DEFAULT_NEWS)
    saveMedia(DEFAULT_MEDIA)
    saveSales(DEFAULT_SALES)
    saveSettings(DEFAULT_SETTINGS)
    setProducts(DEFAULT_PRODUCTS)
    setNews(DEFAULT_NEWS)
    setMedia(DEFAULT_MEDIA)
    setSales(DEFAULT_SALES)
    setSettings(DEFAULT_SETTINGS)
  }, [])

  // Analytics
  const trackVisit = useCallback((page: string) => {
    trackPageVisit(page)
  }, [])

  return (
    <CMSContext.Provider value={{
      products, news, media, sales, settings,
      addProduct, updateProduct, deleteProduct, toggleProductPublished, toggleProductFeatured,
      addNews, updateNews, deleteNews, toggleNewsPublished,
      addMedia, deleteMedia,
      addSale, updateSale, deleteSale, toggleSalePublished,
      updateSettings, resetData,
      trackVisit,
    }}>
      {children}
    </CMSContext.Provider>
  )
}

export function useCMS() {
  const context = useContext(CMSContext)
  if (!context) throw new Error('useCMS must be used within CMSProvider')
  return context
}
