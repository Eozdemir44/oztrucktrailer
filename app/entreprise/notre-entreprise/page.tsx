'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCMS } from '@/context/CMSContext'
import { Truck, Shield, Star, Building2 } from 'lucide-react'

export default function NotreEntreprisePage() {
  const { trackVisit } = useCMS()

  useEffect(() => {
    trackVisit('entreprise/notre-entreprise')
  }, [trackVisit])

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <div className="bg-[#C41E2E] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Notre Entreprise</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            OZ Truck Trailer TP/BTP, votre partenaire de confiance en Loire-Atlantique
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Distributeur Officiel en Loire-Atlantique
          </h2>
          <div className="w-16 h-1 bg-[#C41E2E] mx-auto mb-6" />
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            OZ Truck Trailer TP/BTP est une société spécialisée dans la vente, la location et la réparation de matériel professionnel TP/BTP et de transport. Nous sommes distributeurs officiels des marques Hidromek, Eurocomach et Scorpion Trailer pour la région Pays de la Loire et Bretagne.
          </p>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Nos Marques Partenaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Hidromek',
                description: 'Leader turc de la construction d\'engins de chantier. Pelles hydrauliques, tractopelles et mini-pelles de haute qualité.',
                specialty: 'Matériel TP/BTP',
                icon: Shield,
              },
              {
                name: 'Eurocomach',
                description: 'Fabricant italien de mini-pelles compactes, reconnu pour ses technologies zéro porte-à-faux et sa fiabilité.',
                specialty: 'Mini-Pelles',
                icon: Star,
              },
              {
                name: 'Scorpion Trailer',
                description: 'Constructeur de remorques et semi-remorques TP : bennes, plateaux, porte-containers. Qualité et robustesse.',
                specialty: 'Remorques & Semi-Remorques',
                icon: Truck,
              },
            ].map((partner, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-16 h-16 bg-[#C41E2E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <partner.icon className="w-8 h-8 text-[#C41E2E]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{partner.name}</h3>
                <span className="text-xs bg-[#C41E2E] text-white px-3 py-1 rounded-full font-semibold">
                  {partner.specialty}
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Ce Que Nous Faisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Vente Matériel Neuf', text: 'Large gamme de machines TP, remorques et poids lourds neufs issus de nos partenaires officiels.' },
              { title: 'Vente Occasions', text: 'Sélection de matériels d\'occasion révisés et garantis pour tous les budgets.' },
              { title: 'Location', text: 'Location courte et longue durée adaptée à vos chantiers et projets.' },
              { title: 'Entretien', text: 'Atelier complet pour l\'entretien préventif de tous vos matériels TP et transport.' },
              { title: 'Réparation', text: 'Diagnostic et réparation rapide : mécanique, hydraulique, électricité, carrosserie.' },
              { title: 'Pièces Détachées', text: 'Stock de pièces d\'origine pour Hidromek, Eurocomach et Scorpion Trailer.' },
            ].map((service, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C41E2E] inline-block" />
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{service.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-10 text-center">
          <Building2 className="w-12 h-12 text-[#C41E2E] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Venez Nous Rendre Visite</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Notre showroom à Châteaubriant vous accueille du lundi au vendredi de 8h à 18h et le samedi de 8h à 12h.
          </p>
          <p className="font-bold text-gray-900 dark:text-white mb-6">
            8 Allée Du Foirail, 44110 Châteaubriant
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#C41E2E] hover:bg-[#a01824] text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  )
}
