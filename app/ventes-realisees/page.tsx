'use client'

import { useEffect } from 'react'
import { useCMS } from '@/context/CMSContext'
import SaleCard from '@/components/SaleCard'
import { ShoppingBag } from 'lucide-react'

export default function VentesRealiséesPage() {
  const { sales, trackVisit } = useCMS()

  useEffect(() => {
    trackVisit('ventes-realisees')
  }, [trackVisit])

  const published = sales
    .filter(s => s.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="bg-[#C41E2E] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ventes Réalisées</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Découvrez les matériels récemment vendus par OZ Truck Trailer TP/BTP
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {published.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {published.map(item => (
              <SaleCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">Aucune vente disponible</h3>
          </div>
        )}
      </div>
    </div>
  )
}
