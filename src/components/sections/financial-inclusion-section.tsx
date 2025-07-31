'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CustomLineChart } from '@/components/charts/line-chart'
import { Building2, Wifi, Smartphone } from 'lucide-react'
import { DashboardData } from '@/lib/types'
import { formatNumber } from '@/lib/utils'

interface FinancialInclusionSectionProps {
  data: DashboardData
}

export function FinancialInclusionSection({ data }: FinancialInclusionSectionProps) {
  const latestData = data.nationalTrends.financialInclusion[data.nationalTrends.financialInclusion.length - 1]

  const indexCards = [
    {
      title: 'Availability',
      value: latestData.availability,
      icon: Building2,
      color: 'bg-teal-100 text-teal-600',
      description: 'Ketersediaan layanan keuangan'
    },
    {
      title: 'Accessibility',
      value: latestData.accessibility,
      icon: Wifi,
      color: 'bg-green-100 text-green-600',
      description: 'Aksesibilitas layanan keuangan'
    },
    {
      title: 'Usage',
      value: latestData.usage,
      icon: Smartphone,
      color: 'bg-orange-100 text-orange-600',
      description: 'Penggunaan layanan keuangan'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Inklusi Keuangan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analisis tiga dimensi utama inklusi keuangan di Indonesia: ketersediaan, aksesibilitas, dan penggunaan layanan keuangan
          </p>
        </motion.div>

        {/* Index Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {indexCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                      <card.icon className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">
                        {formatNumber(card.value * 100, 1)}%
                      </div>
                      <div className="text-sm text-gray-500">2024</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Tren Inklusi Keuangan Nasional 2019-2024</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomLineChart 
                data={data.nationalTrends.financialInclusion}
                height={400}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
