'use client'

import { useEffect, Suspense } from 'react'
import { useCMS } from '@/context/CMSContext'
import ContactForm from '@/components/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const { trackVisit } = useCMS()

  useEffect(() => {
    trackVisit('contact')
  }, [trackVisit])

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <div className="bg-[#C41E2E] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contactez-Nous</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form - 3 cols */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Envoyez-nous un message</h2>
            <div className="w-12 h-1 bg-[#C41E2E] mb-6" />
            <Suspense fallback={<div>Chargement...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Info - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Nos Coordonnées</h2>
              <div className="w-12 h-1 bg-[#C41E2E] mb-6" />
            </div>

            {[
              {
                icon: MapPin,
                title: 'Adresse',
                content: '8 Allée Du Foirail\n44110 Châteaubriant',
                link: null,
              },
              {
                icon: Phone,
                title: 'Téléphone',
                content: '02 44 05 10 90',
                link: 'tel:0244051090',
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'oz-truck-trailer@outlook.com',
                link: 'mailto:oz-truck-trailer@outlook.com',
              },
              {
                icon: Clock,
                title: 'Horaires',
                content: 'Lun-Ven : 8h00 - 18h00\nSamedi : 8h00 - 12h00\nDimanche : Fermé',
                link: null,
              },
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="w-10 h-10 bg-[#C41E2E]/10 rounded-lg flex items-center justify-center shrink-0">
                  <info.icon className="w-5 h-5 text-[#C41E2E]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{info.title}</p>
                  {info.link ? (
                    <a href={info.link} className="text-gray-600 dark:text-gray-300 text-sm hover:text-[#C41E2E] transition-colors">
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-line">{info.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
              <iframe
                src="https://maps.google.com/maps?q=8+All%C3%A9e+du+Foirail+44110+Ch%C3%A2teaubriant&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OZ Truck Trailer - Localisation"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
