'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCMS } from '@/context/CMSContext'

export default function HeroSlider() {
  const { settings } = useCMS()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const images = settings.heroImages.length > 0
    ? settings.heroImages
    : ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920']

  const titles = settings.heroTitles.length > 0
    ? settings.heroTitles
    : ['Votre Spécialiste TP/BTP']

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, goTo])

  const next = useCallback(() => {
    goTo((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, goTo])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-gray-900">
      {/* Images */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative h-full w-full shrink-0">
            <Image
              src={img}
              alt={titles[i] || 'OZ Truck Trailer'}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#C41E2E] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            OZ Truck Trailer TP/BTP
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            {titles[currentIndex] || 'Votre Spécialiste Matériel TP/BTP'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Spécialiste en vente, location et réparation de matériel TP et transport
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produits"
              className="bg-[#C41E2E] hover:bg-[#a01824] text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              Voir nos produits
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-white w-8 h-3'
                  : 'bg-white/50 hover:bg-white/75 w-3 h-3'
              }`}
              aria-label={`Aller à l'image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
