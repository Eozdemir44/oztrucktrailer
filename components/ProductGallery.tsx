'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const safeImages = images.length > 0
    ? images
    : ['https://via.placeholder.com/800x600?text=OZ+Truck+Trailer']

  const prev = () => setCurrentIndex(i => (i - 1 + safeImages.length) % safeImages.length)
  const next = () => setCurrentIndex(i => (i + 1) % safeImages.length)

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative h-80 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden group cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={safeImages[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {safeImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentIndex + 1} / {safeImages.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {safeImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {safeImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentIndex
                    ? 'border-[#C41E2E]'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} - Miniature ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full">
            <Image
              src={safeImages[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
          <div className="absolute bottom-4 text-white text-sm">
            {currentIndex + 1} / {safeImages.length}
          </div>
        </div>
      )}
    </>
  )
}
