'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScatterPlot } from '@/components/charts/scatter-plot'
import { LeafletChoroplethMap } from '@/components/maps/leaflet-choropleth-map'

const DIMENSIONS = [
  { key: 'access', label: 'Accessibility', prefix: 'access_score_' },
  { key: 'avail', label: 'Availability', prefix: 'avail_score_' },
  { key: 'usage', label: 'Usage', prefix: 'usage_score_' },
  { key: 'IFI', label: 'Financial Inclusiveness Index', prefix: 'IFI_' }
];
const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];
import { DashboardData } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { TrendingUp, Award, MapPin } from 'lucide-react'

interface IndustrySectionProps {
  data: DashboardData
}

export function IndustrySection({ data }: IndustrySectionProps) {
  // State for ranking
  const [geojson, setGeojson] = useState<any>(null)
  const [rankYear, setRankYear] = useState<number>(2024)
  const [rankDim, setRankDim] = useState<string>('access')

  // Fetch geojson for ranking
  useEffect(() => {
    fetch('/indonesia-kab.geojson')
      .then(res => res.json())
      .then(setGeojson)
      .catch(() => setGeojson(null))
  }, [])

  // Get top 10 kabupaten/kota for selected year & dimension
  let top10: { nmkab: string, value: number }[] = []
  if (geojson) {
    const key = DIMENSIONS.find(d => d.key === rankDim)?.prefix + rankYear
    top10 = geojson.features
      .map((f: any) => ({
        nmkab: f.properties.nmkab || f.properties.name || '-',
        value: f.properties[key]
      }))
      .filter((f: any) => f.value !== undefined && f.value !== null && !isNaN(f.value))
      .sort((a: any, b: any) => b.value - a.value)
      .slice(0, 5)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Inklusi Keuangan di Tingkat Kabupaten/Kota
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analisis spasial antara inklusi keuangan dan dimensi-dimensinya di tingkat kabupaten/kota
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scatter Plot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
                  Peta Inklusi Keuangan Kabupaten/Kota di Indonesia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <select value={rankYear} onChange={e => setRankYear(Number(e.target.value))} style={{ padding: 4, borderRadius: 4 }}>
                    {YEARS.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <select value={rankDim} onChange={e => setRankDim(e.target.value)} style={{ padding: 4, borderRadius: 4 }}>
                    <option value="access">Accessibility</option>
                    <option value="avail">Availability</option>
                    <option value="usage">Usage</option>
                    <option value="IFI">Financial Inclusiveness Index</option>
                  </select>
                </div>
                <div className="w-full" style={{ height: 400 }}>
                  <LeafletChoroplethMap
                    geojsonUrl="/indonesia-kab.geojson"
                    faktor={
                      rankDim === "IFI"
                        ? `IFI_${rankYear}`
                        : `${rankDim}_score_${rankYear}`
                    }
                    macro=""
                    height={400}
                  />
                </div>
                <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-700">
                    <strong>Interpretasi:</strong> Peta menampilkan batas administratif seluruh kabupaten di Indonesia. 
                    Data visual dapat dikembangkan untuk menampilkan indikator industri atau inklusi keuangan per kabupaten.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Correlations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-full flex flex-col"
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  Ranking Tertinggi
                </CardTitle>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <select value={rankYear} onChange={e => setRankYear(Number(e.target.value))} style={{ padding: 4, borderRadius: 4 }}>
                    {YEARS.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <select value={rankDim} onChange={e => setRankDim(e.target.value)} style={{ padding: 4, borderRadius: 4 }}>
                    {DIMENSIONS.map(d => (
                      <option key={d.key} value={d.key}>{d.label}</option>
                    ))}
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 flex-1">
                  {top10.length === 0 && (
                    <div className="text-gray-500 text-sm">Data tidak tersedia</div>
                  )}
                  {top10.map((item, index) => (
                    <div key={item.nmkab} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3 ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-600' :
                          'bg-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">
                            {item.nmkab}
                          </div>
                          <div className="text-xs text-gray-500">
                            Rank #{index + 1}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          {formatNumber(item.value, 3)}
                        </div>
                        <div className="text-xs text-gray-500">
                          nilai
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
