'use client'

import { useState, useEffect } from 'react'
import { useCMS } from '@/context/CMSContext'
import NewsCard from '@/components/NewsCard'
import { Newspaper } from 'lucide-react'

export default function ActualitesPage() {
  const { news, trackVisit } = useCMS()
  const [filter, setFilter] = useState<'all' | 'actualite' | 'nouveaute'>('all')

  useEffect(() => {
    trackVisit('entreprise/actualites')
  }, [trackVisit])

  const filtered = news
    .filter(n => n.published && (filter === 'all' || n.type === filter))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="bg-[#C41E2E] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Actualités & Nouveautés</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Restez informé des dernières nouvelles d'OZ Truck Trailer TP/BTP
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filter */}
        <div className="flex gap-3 mb-8">
          {[
            { value: 'all', label: 'Tout' },
            { value: 'actualite', label: 'Actualités' },
            { value: 'nouveaute', label: 'Nouveautés' },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as typeof filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === f.value
                  ? 'bg-[#C41E2E] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">Aucune actualité disponible</h3>
          </div>
        )}
      </div>
    </div>
  )
}
