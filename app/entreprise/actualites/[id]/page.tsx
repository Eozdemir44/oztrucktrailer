'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCMS } from '@/context/CMSContext'
import { Calendar, ChevronRight, ArrowLeft } from 'lucide-react'

export default function ActualiteDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { news, trackVisit } = useCMS()

  const item = news.find(n => n.id === id && n.published)

  useEffect(() => {
    if (item) {
      trackVisit(`actualite/${id}`)
    }
  }, [item, id, trackVisit])

  if (!item) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Actualité introuvable</h1>
          <Link href="/entreprise/actualites" className="bg-[#C41E2E] text-white px-6 py-3 rounded-lg hover:bg-[#a01824]">
            Retour aux actualités
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(item.date).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C41E2E]">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/entreprise/actualites" className="hover:text-[#C41E2E]">Actualités</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white truncate max-w-xs">{item.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/entreprise/actualites"
          className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#C41E2E] text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux actualités
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            item.type === 'nouveaute' ? 'bg-green-500 text-white' : 'bg-[#C41E2E] text-white'
          }`}>
            {item.type === 'nouveaute' ? 'Nouveauté' : 'Actualité'}
          </span>
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          {item.title}
        </h1>

        {item.image && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {item.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/entreprise/actualites"
            className="inline-flex items-center gap-2 border-2 border-[#C41E2E] text-[#C41E2E] hover:bg-[#C41E2E] hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>
        </div>
      </article>
    </div>
  )
}
