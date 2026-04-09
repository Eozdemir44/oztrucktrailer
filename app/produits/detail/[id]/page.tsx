'use client'

import { useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { useCMS } from '@/context/CMSContext'
import ProductGallery from '@/components/ProductGallery'
import { ChevronRight, Tag, MessageSquare, Share2, CheckCircle } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  'remorques-semi-remorques': 'Remorques et Semi-Remorques',
  'materiel-tp': 'Matériel De TP',
  'poids-lourds': 'Poids-Lourds',
  'machines': 'Machines',
  'occasions': 'Occasions',
  'pieces-detachees': 'Pièces Détachées',
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { products, trackVisit } = useCMS()

  const product = products.find(p => p.id === id)

  useEffect(() => {
    if (product) {
      trackVisit(`produit/${id}`)
    }
  }, [product, id, trackVisit])

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Produit introuvable</h1>
          <Link href="/produits" className="bg-[#C41E2E] text-white px-6 py-3 rounded-lg hover:bg-[#a01824]">
            Retour aux produits
          </Link>
        </div>
      </div>
    )
  }

  const categoryLabel = categoryLabels[product.category] || product.category

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papier !')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C41E2E] transition-colors">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/produits" className="hover:text-[#C41E2E] transition-colors">Nos Produits</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/produits/${product.category}`} className="hover:text-[#C41E2E] transition-colors">{categoryLabel}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white truncate max-w-xs">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 bg-[#C41E2E] text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {categoryLabel}
              </span>
              {product.featured && (
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                  Vedette
                </span>
              )}
            </div>

            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wide mb-1">
              {product.brand}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>

            <div className="mb-6">
              {product.price ? (
                <div className="text-3xl font-bold text-[#C41E2E]">
                  {product.price.toLocaleString('fr-FR')} €
                  <span className="text-sm text-gray-400 font-normal ml-2">HT</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-700 dark:text-gray-200">Prix sur demande</span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">Disponible</span>
                </div>
              )}
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Characteristics */}
            {product.characteristics.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C41E2E]" />
                  Caractéristiques techniques
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.characteristics.map((c, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                          <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 border-r border-gray-100 dark:border-gray-700 w-1/2">
                            {c.key}
                          </td>
                          <td className="px-4 py-3 text-gray-900 dark:text-white font-semibold">
                            {c.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-[#C41E2E] hover:bg-[#a01824] text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                Demander un devis
              </Link>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#C41E2E] hover:text-[#C41E2E] font-semibold py-4 px-5 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Partager
              </button>
            </div>

            {/* Contact info */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Une question ?</strong>{' '}
                Appelez-nous au{' '}
                <a href="tel:0244051090" className="text-[#C41E2E] font-semibold hover:underline">
                  02 44 05 10 90
                </a>{' '}
                ou écrivez à{' '}
                <a href="mailto:oz-truck-trailer@outlook.com" className="text-[#C41E2E] font-semibold hover:underline">
                  oz-truck-trailer@outlook.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
