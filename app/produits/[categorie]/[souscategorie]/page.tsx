'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCMS } from '@/context/CMSContext'
import ProductCard from '@/components/ProductCard'
import { ChevronRight, Package } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  'remorques-semi-remorques': 'Remorques et Semi-Remorques',
  'materiel-tp': 'Matériel De TP',
  'poids-lourds': 'Poids-Lourds',
  'machines': 'Machines',
  'occasions': 'Occasions',
  'pieces-detachees': 'Pièces Détachées',
}

function formatLabel(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default function SousCategoriePage() {
  const params = useParams()
  const categorie = params.categorie as string
  const souscategorie = params.souscategorie as string
  const { products, trackVisit } = useCMS()

  useEffect(() => {
    trackVisit(`produits/${categorie}/${souscategorie}`)
  }, [trackVisit, categorie, souscategorie])

  const categoryLabel = categoryLabels[categorie] || formatLabel(categorie)
  const subLabel = formatLabel(souscategorie)
  const filtered = products.filter(p =>
    p.published && p.category === categorie && p.subcategory === souscategorie
  )

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <div className="bg-[#C41E2E] py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex flex-wrap items-center gap-2 text-red-200 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/produits" className="hover:text-white transition-colors">Nos Produits</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/produits/${categorie}`} className="hover:text-white transition-colors">{categoryLabel}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{subLabel}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold">{subLabel}</h1>
          <p className="text-red-100 mt-2">{filtered.length} produit{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">
              Aucun produit dans cette sous-catégorie
            </h3>
            <Link
              href={`/produits/${categorie}`}
              className="inline-block mt-6 bg-[#C41E2E] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#a01824] transition-colors"
            >
              Voir {categoryLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
