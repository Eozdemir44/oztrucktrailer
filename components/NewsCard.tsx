import Link from 'next/link'
import Image from 'next/image'
import { NewsItem } from '@/lib/types'
import { Calendar, Tag } from 'lucide-react'

interface NewsCardProps {
  item: NewsItem
}

export default function NewsCard({ item }: NewsCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={item.image || 'https://via.placeholder.com/400x300?text=OZ+Truck'}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            item.type === 'nouveaute'
              ? 'bg-green-500 text-white'
              : 'bg-[#C41E2E] text-white'
          }`}>
            {item.type === 'nouveaute' ? 'Nouveauté' : 'Actualité'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
        <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {item.content.replace(/\n/g, ' ')}
        </p>
        <Link
          href={`/entreprise/actualites/${item.id}`}
          className="inline-flex items-center gap-2 text-[#C41E2E] hover:text-[#a01824] font-semibold text-sm transition-colors"
        >
          Lire la suite →
        </Link>
      </div>
    </div>
  )
}
