'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCMS } from '@/context/CMSContext'
import { Calendar, MapPin, ChevronRight, ArrowLeft, ChevronLeft, CheckCircle } from 'lucide-react'

export default function SaleDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { sales, trackVisit } = useCMS()
  const [imgIndex, setImgIndex] = useState(0)

  const item = sales.find(s => s.id === id && s.published)

  useEffect(() => {
    if (item) trackVisit(`vente/${id}`)
  }, [item, id, trackVisit])

  if (!item) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vente introuvable</h1>
          <Link href="/ventes-realisees" className="bg-[#C41E2E] text-white px-6 py-3 rounded-lg hover:bg-[#a01824]">
            Retour
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(item.date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const images = item.images.length > 0 ? item.images : ['https://via.placeholder.com/800x600?text=Vente+Réalisée']

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C41E2E]">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/ventes-realisees" className="hover:text-[#C41E2E]">Ventes Réalisées</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white truncate max-w-xs">{item.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/ventes-realisees" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#C41E2E] text-sm mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour aux ventes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="relative h-72 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image src={images[imgIndex]} alt={item.title} fill className="object-cover" sizes="600px" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Vendu
                </span>
              </div>
              {images.length > 1 && (
                <>
                  <button onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow">
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>
                  <button onClick={() => setImgIndex(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow">
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className={`relative w-16 h-12 rounded overflow-hidden border-2 ${i === imgIndex ? 'border-[#C41E2E]' : 'border-transparent'}`}>
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{item.title}</h1>
            {item.productName && (
              <p className="text-[#C41E2E] font-bold text-lg mb-4">{item.productName}</p>
            )}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{item.description}</p>
            <div className="space-y-3 text-sm">
              {item.location && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-[#C41E2E]" />
                  <span>{item.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 text-[#C41E2E]" />
                <span>{formattedDate}</span>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/produits" className="inline-block bg-[#C41E2E] hover:bg-[#a01824] text-white font-bold px-8 py-3 rounded-lg transition-colors">
                Voir nos produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
