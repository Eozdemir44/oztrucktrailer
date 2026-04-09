'use client'

import { useState, useEffect } from 'react'
import { useCMS } from '@/context/CMSContext'
import MediaCard from '@/components/MediaCard'
import { Image as ImageIcon } from 'lucide-react'

export default function PhotosVideosPage() {
  const { media, trackVisit } = useCMS()
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all')

  useEffect(() => {
    trackVisit('photos-videos')
  }, [trackVisit])

  const filtered = media
    .filter(m => m.published && (filter === 'all' || m.type === filter))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="bg-[#C41E2E] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Photos & Vidéos</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Découvrez nos chantiers, livraisons et matériels en images
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-3 mb-8">
          {[
            { value: 'all', label: 'Tout' },
            { value: 'photo', label: 'Photos' },
            { value: 'video', label: 'Vidéos' },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(item => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">Aucun média disponible</h3>
          </div>
        )}
      </div>
    </div>
  )
}
