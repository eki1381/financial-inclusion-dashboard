'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, Building2, TrendingUp, Banknote } from 'lucide-react'

interface HeroSectionProps {
  onStartExploration: () => void
}

export function HeroSection({ onStartExploration }: HeroSectionProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Inklusi Keuangan, Industri, dan{' '}
              <span className="text-teal-600">Pertumbuhan Ekonomi</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Analisis Spasial Indonesia 2019–2024
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center lg:justify-start mb-8">
                <a 
                  href="https://www.bi.go.id/id/fungsi-utama/sistem-pembayaran/default.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
                >
                  <div className="text-sm text-gray-500 mb-1 group-hover:text-teal-600">SPI</div>
                  <div className="font-semibold text-gray-900 group-hover:text-teal-700">Sistem Pembayaran Indonesia</div>
                </a>
                <a 
                  href="https://indonesia2045.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
                >
                  <div className="text-sm text-gray-500 mb-1 group-hover:text-teal-600">RPJPN 2025-2045</div>
                  <div className="font-semibold text-gray-900 group-hover:text-teal-700">Rencana Pembangunan Jangka Panjang</div>
                </a>
                <a 
                  href="https://www.setneg.go.id/baca/index/rpjmn_2025_2029_fondasi_awal_wujudkan_visi_indonesia_emas_2045" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
                >
                  <div className="text-sm text-gray-500 mb-1 group-hover:text-teal-600">Asta Cita</div>
                  <div className="font-semibold text-gray-900 group-hover:text-teal-700">Visi Indonesia 2045</div>
                </a>
              </div>

              <Button 
                onClick={onStartExploration}
                size="lg"
                className="group"
              >
                Mulai Eksplorasi
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content - Indonesia map visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border">
              {/* Simplified Indonesia map representation */}
              <div className="relative h-80 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    {/* Simplified Indonesia archipelago shapes */}
                    <path
                      d="M50 120 Q80 100 120 110 Q160 105 200 115 Q240 120 280 125 Q320 130 350 135"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                    <circle cx="80" cy="115" r="8" fill="#0d9488" className="animate-pulse" />
                    <circle cx="150" cy="108" r="6" fill="#0d9488" className="animate-pulse" />
                    <circle cx="220" cy="118" r="7" fill="#0d9488" className="animate-pulse" />
                    <circle cx="290" cy="128" r="5" fill="#0d9488" className="animate-pulse" />
                    <circle cx="330" cy="132" r="4" fill="#0d9488" className="animate-pulse" />
                  </svg>
                </div>
                
                {/* Coverage indicators */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">Coverage</div>
                  <div className="text-sm font-semibold">514 Kabupaten</div>
                  <div className="text-sm font-semibold">83,931 Desa</div>
                </div>
              </div>

              {/* Key metrics preview */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Banknote className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Inklusi Keuangan</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Building2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Sektor Industri</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Pertumbuhan Ekonomi</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
