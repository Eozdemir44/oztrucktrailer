'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCMS } from '@/context/CMSContext'
import HeroSlider from '@/components/HeroSlider'
import ProductCard from '@/components/ProductCard'
import NewsCard from '@/components/NewsCard'
import SaleCard from '@/components/SaleCard'
import { Wrench, ShoppingCart, Settings, Award, Users, MapPin, Clock } from 'lucide-react'

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {children}
      </h2>
      <div className="w-16 h-1 bg-[#C41E2E] mx-auto" />
      {subtitle && (
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}

export default function HomePage() {
  const { products, news, sales, trackVisit } = useCMS()

  useEffect(() => {
    trackVisit('homepage')
  }, [trackVisit])

  const featuredProducts = products.filter(p => p.published && p.featured).slice(0, 8)
  const recentNews = news.filter(n => n.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)
  const recentSales = sales.filter(s => s.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle subtitle="Des solutions complètes pour vos besoins en matériel TP et transport">
            Nos Services
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingCart,
                title: 'Vente',
                description: 'Distributeur officiel Hidromek, Eurocomach et Scorpion Trailer. Large gamme de matériels neufs et occasions.',
                href: '/produits',
                cta: 'Voir nos produits',
              },
              {
                icon: Clock,
                title: 'Location',
                description: 'Location courte et longue durée de matériel TP, remorques et semi-remorques pour vos chantiers.',
                href: '/contact',
                cta: 'Demander un devis',
              },
              {
                icon: Wrench,
                title: 'Réparation & Entretien',
                description: 'Atelier équipé pour l\'entretien et la réparation de tous vos matériels TP, remorques et poids lourds.',
                href: '/services/reparation',
                cta: 'En savoir plus',
              },
            ].map((service, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 text-center group">
                <div className="w-16 h-16 bg-[#C41E2E]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C41E2E] transition-colors">
                  <service.icon className="w-8 h-8 text-[#C41E2E] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm leading-relaxed">{service.description}</p>
                <Link
                  href={service.href}
                  className="inline-block bg-[#C41E2E] hover:bg-[#a01824] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle subtitle="Découvrez notre sélection de matériels neufs disponibles">
              Produits Vedettes
            </SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/produits"
                className="inline-block border-2 border-[#C41E2E] text-[#C41E2E] hover:bg-[#C41E2E] hover:text-white font-bold px-10 py-3 rounded-lg text-lg transition-colors"
              >
                Voir tous nos produits
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent News */}
      {recentNews.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle subtitle="Restez informé des dernières nouvelles d'OZ Truck Trailer">
              Actualités Récentes
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentNews.map(item => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/entreprise/actualites"
                className="inline-block border-2 border-[#C41E2E] text-[#C41E2E] hover:bg-[#C41E2E] hover:text-white font-bold px-10 py-3 rounded-lg text-lg transition-colors"
              >
                Toutes les actualités
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Sales */}
      {recentSales.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle subtitle="Découvrez les récentes ventes réalisées par OZ Truck Trailer">
              Ventes Récentes
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentSales.map(item => (
                <SaleCard key={item.id} item={item} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/ventes-realisees"
                className="inline-block border-2 border-[#C41E2E] text-[#C41E2E] hover:bg-[#C41E2E] hover:text-white font-bold px-10 py-3 rounded-lg text-lg transition-colors"
              >
                Voir toutes les ventes
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle subtitle="4 bonnes raisons de nous faire confiance">
            Pourquoi Nous Choisir ?
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Expertise',
                description: 'Des années d\'expérience dans le matériel TP et le transport. Notre équipe est formée par les constructeurs.',
              },
              {
                icon: Settings,
                title: 'Qualité',
                description: 'Nous ne proposons que des marques reconnues pour leur fiabilité : Hidromek, Eurocomach, Scorpion.',
              },
              {
                icon: Wrench,
                title: 'Service Complet',
                description: 'De la vente à l\'entretien, en passant par la location : une solution globale pour tous vos besoins.',
              },
              {
                icon: MapPin,
                title: 'Proximité',
                description: 'Basés à Châteaubriant, nous intervenons dans toute la région Pays de la Loire et Bretagne.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#C41E2E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[#C41E2E] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Besoin d'un devis ?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Contactez-nous pour obtenir une offre personnalisée adaptée à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#C41E2E] hover:bg-gray-100 font-bold px-10 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              Nous contacter
            </Link>
            <a
              href="tel:0244051090"
              className="border-2 border-white text-white hover:bg-white hover:text-[#C41E2E] font-bold px-10 py-4 rounded-lg text-lg transition-colors"
            >
              02 44 05 10 90
            </a>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-10 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-6">Nos partenaires</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {['Hidromek', 'Eurocomach', 'Scorpion Trailer'].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-gray-300 dark:text-gray-600 hover:text-[#C41E2E] transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
