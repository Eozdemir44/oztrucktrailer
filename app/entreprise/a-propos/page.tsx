'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCMS } from '@/context/CMSContext'
import { Award, Users, MapPin, Zap } from 'lucide-react'

const values = [
  { icon: Award, title: 'Expertise', description: 'Des années d\'expérience dans le secteur du matériel TP et du transport. Une équipe formée par les constructeurs.' },
  { icon: Users, title: 'Proximité', description: 'Basés en Loire-Atlantique, nous connaissons les besoins des professionnels de la région.' },
  { icon: Zap, title: 'Réactivité', description: 'Intervention rapide, devis sous 24h, disponibilité pour vos urgences et dépannages.' },
  { icon: MapPin, title: 'Qualité', description: 'Nous ne proposons que des marques de référence : Hidromek, Eurocomach, Scorpion Trailer.' },
]

export default function AProposPage() {
  const { settings, trackVisit } = useCMS()

  useEffect(() => {
    trackVisit('entreprise/a-propos')
  }, [trackVisit])

  const paragraphs = settings.aboutText.split('\n\n').filter(Boolean)

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <div className="bg-[#C41E2E] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">À Propos De Nous</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Découvrez l'histoire et les valeurs d'OZ Truck Trailer TP/BTP
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* About text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notre Histoire</h2>
            <div className="w-16 h-1 bg-[#C41E2E] mb-6" />
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block bg-[#C41E2E] hover:bg-[#a01824] text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">En chiffres</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '10+', label: 'Années d\'expérience' },
                { number: '500+', label: 'Machines vendues' },
                { number: '3', label: 'Marques partenaires' },
                { number: '100%', label: 'Satisfaction client' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-extrabold text-[#C41E2E] mb-1">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Informations légales</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div><span className="font-medium">Raison sociale :</span> OZ Truck Trailer TP/BTP</div>
                <div><span className="font-medium">SIRET :</span> 80926449200012</div>
                <div><span className="font-medium">Adresse :</span> 8 Allée Du Foirail, 44110 Châteaubriant</div>
                <div><span className="font-medium">Tél :</span> <a href="tel:0244051090" className="text-[#C41E2E] hover:underline">02 44 05 10 90</a></div>
                <div><span className="font-medium">Email :</span> <a href="mailto:oz-truck-trailer@outlook.com" className="text-[#C41E2E] hover:underline text-xs">oz-truck-trailer@outlook.com</a></div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Nos Valeurs</h2>
          <div className="w-16 h-1 bg-[#C41E2E] mx-auto mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-14 h-14 bg-[#C41E2E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-[#C41E2E]" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
