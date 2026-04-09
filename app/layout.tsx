import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OZ Truck Trailer TP/BTP - Vente, Location, Réparation',
  description: 'Vente, location et réparation de remorques, semi-remorques, matériel TP, poids lourds à Châteaubriant (44110) en Loire-Atlantique. Distributeur officiel Hidromek, Eurocomach, Scorpion Trailer.',
  keywords: 'remorque, semi-remorque, matériel TP, pelle, tractopelle, Châteaubriant, Loire-Atlantique, Hidromek, Eurocomach, Scorpion',
  authors: [{ name: 'OZ Truck Trailer TP/BTP' }],
  openGraph: {
    title: 'OZ Truck Trailer TP/BTP',
    description: 'Vente, location et réparation de matériel TP et transport à Châteaubriant',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
