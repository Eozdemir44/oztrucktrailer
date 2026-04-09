'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCMS } from '@/context/CMSContext'
import { Calendar, ChevronRight, ArrowLeft, Play } from 'lucide-react'

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
  return match ? match[1] : null
}

export default function MediaDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { media, trackVisit } = useCMS()

  const item = media.find(m => m.id === id && m.published)

  useEffect(() => {
    if (item) trackVisit(`media/${id}`)
  }, [item, id, trackVisit])

  if (!item) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Média introuvable</h1>
          <Link href="/photos-videos" className="bg-[#C41E2E] text-white px-6 py-3 rounded-lg hover:bg-[#a01824]">
            Retour aux médias
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(item.date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const youtubeId = item.type === 'video' ? getYoutubeId(item.url) : null

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C41E2E]">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/photos-videos" className="hover:text-[#C41E2E]">Photos & Vidéos</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white truncate max-w-xs">{item.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/photos-videos"
          className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#C41E2E] text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux médias
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            item.type === 'video' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
          }`}>
            {item.type === 'video' ? 'Vidéo' : 'Photo'}
          </span>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">{item.title}</h1>

        {/* Media display */}
        <div className="rounded-2xl overflow-hidden mb-6 bg-black">
          {item.type === 'video' && youtubeId ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={item.title}
              />
            </div>
          ) : item.type === 'video' ? (
            <video controls className="w-full max-h-[600px]" poster={item.thumbnail}>
              <source src={item.url} />
            </video>
          ) : (
            <div className="relative w-full" style={{ paddingBottom: '60%' }}>
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 900px"
                priority
              />
            </div>
          )}
        </div>

        {item.description && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  )
}
