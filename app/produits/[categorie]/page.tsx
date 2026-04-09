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
  'poids-lourds': 'Poids-Lourds, Utilitaires & Véhicules',
  'machines': 'Machines',
  'occasions': 'Occasions',
  'pieces-detachees': 'Pièces Détachées',
}

export default function CategoriePage() {
  const params = useParams()
  const categorie = params.categorie as string
  const { products, trackVisit } = useCMS()

  useEffect(() => {
    trackVisit(`produits/${categorie}`)
  }, [trackVisit, categorie])

  const categoryLabel = categoryLabels[categorie] || categorie.replace(/-/g, ' ')
  const filtered = products.filter(p => p.published && p.category === categorie)

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <div className="bg-[#C41E2E] py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-red-200 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/produits" className="hover:text-white transition-colors">Nos Produits</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{categoryLabel}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold">{categoryLabel}</h1>
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
              Aucun produit dans cette catégorie
            </h3>
            <p className="text-gray-400 mt-2">Revenez bientôt ou contactez-nous pour plus d'informations.</p>
            <Link
              href="/produits"
              className="inline-block mt-6 bg-[#C41E2E] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#a01824] transition-colors"
            >
              Voir tous les produits
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
