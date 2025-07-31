'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, TrendingUp, Target, AlertCircle } from 'lucide-react'

export function SummarySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-600 to-green-600 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Rangkuman & Rekomendasi
          </h2>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto">
            Sintesis temuan penelitian dan rekomendasi kebijakan untuk mendorong inklusi keuangan 
            dan pertumbuhan ekonomi yang berkelanjutan
          </p>
        </motion.div>

        {/* Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-center mb-8">Alur Dampak Inklusi Keuangan</h3>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-12 w-12" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Inklusi Keuangan</h4>
                <p className="text-sm text-teal-100">Availability, Accessibility, Usage</p>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-white"></div>
                  <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  <div className="w-8 h-0.5 bg-white"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-12 w-12" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Sektor Industri</h4>
                <p className="text-sm text-teal-100">Pertumbuhan & Produktivitas</p>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-0.5 bg-white"></div>
                  <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  <div className="w-8 h-0.5 bg-white"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-12 w-12" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Pertumbuhan Ekonomi</h4>
                <p className="text-sm text-teal-100">PDRB & Kesejahteraan</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Insights Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Wilayah Prioritas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Indonesia Timur: Fokus pada accessibility</li>
                  <li>• Kalimantan: Penguatan availability</li>
                  <li>• Sulawesi: Peningkatan usage</li>
                  <li>• Nusa Tenggara: Program terintegrasi</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Kesenjangan Spasial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Gap availability: 45% antar provinsi</li>
                  <li>• Disparitas usage: 60% desa vs kota</li>
                  <li>• Heterogenitas GWR tinggi</li>
                  <li>• Konsentrasi di Jawa-Sumatera</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Saran Kebijakan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Infrastruktur digital terpadu</li>
                  <li>• Program literasi keuangan</li>
                  <li>• Insentif fintech daerah</li>
                  <li>• Kolaborasi publik-swasta</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-teal-100"
        >
          <p className="text-sm">
            © 2024 Analisis Spasial Inklusi Keuangan Indonesia. 
            Penelitian ini mendukung pencapaian Asta Cita dan RPJPN 2025-2045.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
