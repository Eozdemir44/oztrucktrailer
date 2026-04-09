'use client'

import { useState, useEffect } from 'react'
import { useCMS } from '@/context/CMSContext'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import { Package } from 'lucide-react'

const categories = [
  { value: 'all', label: 'Tous les produits' },
  { value: 'remorques-semi-remorques', label: 'Remorques & Semi-Remorques' },
  { value: 'materiel-tp', label: 'Matériel TP' },
  { value: 'poids-lourds', label: 'Poids-Lourds' },
  { value: 'machines', label: 'Machines' },
  { value: 'occasions', label: 'Occasions' },
  { value: 'pieces-detachees', label: 'Pièces Détachées' },
]

const ITEMS_PER_PAGE = 12

export default function ProduitsPage() {
  const { products, trackVisit } = useCMS()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    trackVisit('produits')
  }, [trackVisit])

  const filtered = products.filter(p => {
    if (!p.published) return false
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    setPage(1)
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <div className="bg-[#C41E2E] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Tous Nos Produits</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Découvrez notre gamme complète de matériels TP, remorques et poids lourds
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search */}
        <div className="mb-8">
          <SearchBar inline />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-[#C41E2E] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          {filtered.length} produit{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginated.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">Aucun produit trouvé</h3>
            <p className="text-gray-400 mt-2">Essayez une autre catégorie ou contactez-nous.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors ${
                  p === page
                    ? 'bg-[#C41E2E] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
