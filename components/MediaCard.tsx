import Link from 'next/link'
import Image from 'next/image'
import { MediaItem } from '@/lib/types'
import { Play, Camera, Calendar } from 'lucide-react'

interface MediaCardProps {
  item: MediaItem
}

export default function MediaCard({ item }: MediaCardProps) {
  const formattedDate = new Date(item.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link href={`/photos-videos/${item.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group cursor-pointer">
        <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={item.thumbnail || item.url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            {item.type === 'video' ? (
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-7 h-7 text-[#C41E2E] ml-1" />
              </div>
            ) : (
              <Camera className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              item.type === 'video' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              {item.type === 'video' ? 'Vidéo' : 'Photo'}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-gray-900 dark:text-white font-bold text-base leading-tight mb-1 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-2">
            {item.description}
          </p>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
