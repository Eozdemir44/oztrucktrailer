'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCMS } from '@/context/CMSContext'
import ProductCard from '@/components/ProductCard'
import NewsCard from '@/components/NewsCard'
import SaleCard from '@/components/SaleCard'
import SearchBar from '@/components/SearchBar'
import { Search } from 'lucide-react'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const { products, news, sales, trackVisit } = useCMS()

  useEffect(() => {
    if (query) trackVisit(`recherche/${query}`)
  }, [query, trackVisit])

  const q = query.toLowerCase()

  const matchingProducts = products.filter(p =>
    p.published && q && (
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  )

  const matchingNews = news.filter(n =>
    n.published && q && (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    )
  )

  const matchingSales = sales.filter(s =>
    s.published && q && (
      s.title.toLowerCase().includes(q) ||
      s.productName.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    )
  )

  const totalResults = matchingProducts.length + matchingNews.length + matchingSales.length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <SearchBar inline />
      </div>

      {query && (
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {totalResults} résultat{totalResults > 1 ? 's' : ''} pour <strong className="text-gray-900 dark:text-white">"{query}"</strong>
        </p>
      )}

      {!query && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400">
            Entrez un terme de recherche
          </h2>
        </div>
      )}

      {query && totalResults === 0 && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400">
            Aucun résultat pour "{query}"
          </h2>
          <p className="text-gray-400 mt-2">Essayez avec d'autres termes.</p>
          <Link href="/produits" className="inline-block mt-6 bg-[#C41E2E] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#a01824]">
            Voir tous les produits
          </Link>
        </div>
      )}

      {matchingProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Produits ({matchingProducts.length})
          </h2>
          <div className="w-12 h-1 bg-[#C41E2E] mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchingProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {matchingNews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Actualités ({matchingNews.length})
          </h2>
          <div className="w-12 h-1 bg-[#C41E2E] mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingNews.map(n => <NewsCard key={n.id} item={n} />)}
          </div>
        </section>
      )}

      {matchingSales.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ventes Réalisées ({matchingSales.length})
          </h2>
          <div className="w-12 h-1 bg-[#C41E2E] mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingSales.map(s => <SaleCard key={s.id} item={s} />)}
          </div>
        </section>
      )}
    </div>
  )
}

export default function RecherchePage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="bg-[#C41E2E] py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Recherche</h1>
        </div>
      </div>
      <Suspense fallback={<div className="flex justify-center py-20"><div className="text-gray-400">Chargement...</div></div>}>
        <SearchResults />
      </Suspense>
    </div>
  )
}
