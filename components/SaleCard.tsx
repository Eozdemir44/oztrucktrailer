import Link from 'next/link'
import Image from 'next/image'
import { SaleItem } from '@/lib/types'
import { MapPin, Calendar, CheckCircle } from 'lucide-react'

interface SaleCardProps {
  item: SaleItem
}

export default function SaleCard({ item }: SaleCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const mainImage = item.images[0] || 'https://via.placeholder.com/400x300?text=Vente+Réalisée'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={mainImage}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            Vendu
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight mb-1 line-clamp-2">
          {item.title}
        </h3>
        {item.productName && (
          <p className="text-[#C41E2E] font-medium text-sm mb-2">{item.productName}</p>
        )}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex flex-col gap-1 text-xs text-gray-400 dark:text-gray-500 mb-4">
          {item.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C41E2E]" />
              <span>{item.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C41E2E]" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <Link
          href={`/ventes-realisees/${item.id}`}
          className="inline-flex items-center gap-2 text-[#C41E2E] hover:text-[#a01824] font-semibold text-sm transition-colors"
        >
          Voir les détails →
        </Link>
      </div>
    </div>
  )
}
