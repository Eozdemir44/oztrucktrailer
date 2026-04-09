import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { ArrowRight, Tag } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

const categoryLabels: Record<string, string> = {
  'materiel-tp': 'Matériel TP',
  'remorques-semi-remorques': 'Remorques',
  'poids-lourds': 'Poids Lourds',
  'machines': 'Machines',
  'occasions': 'Occasions',
  'pieces-detachees': 'Pièces Détachées',
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = categoryLabels[product.category] || product.category
  const mainImage = product.images[0] || 'https://via.placeholder.com/400x300?text=OZ+Truck+Trailer'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 dark:border-gray-700">
      <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-[#C41E2E] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
        </div>
        {product.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              Vedette
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight mb-2 line-clamp-2">
          {product.title}
        </h3>

        {product.characteristics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.characteristics.slice(0, 2).map((c, i) => (
              <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                {c.key}: {c.value}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            {product.price ? (
              <span className="text-[#C41E2E] font-bold text-lg">
                {product.price.toLocaleString('fr-FR')} €
              </span>
            ) : (
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Prix sur demande
              </span>
            )}
          </div>
          <Link
            href={`/produits/detail/${product.id}`}
            className="inline-flex items-center gap-2 bg-[#C41E2E] hover:bg-[#a01824] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Détails
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
