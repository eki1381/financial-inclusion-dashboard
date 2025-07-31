'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LeafletChoroplethMap } from '@/components/maps/leaflet-choropleth-map'
import { DashboardData } from '@/lib/types'
import { MapPin, BarChart3, Building2, CreditCard, Wifi, GraduationCap, DollarSign, Factory } from 'lucide-react'

interface GWRSectionProps {
  data: DashboardData
}

export function GWRSection({ data }: GWRSectionProps) {
  const [selectedMacro, setSelectedMacro] = useState<string>('industri')
  const [selectedFaktor, setSelectedFaktor] = useState<string>('bank')
  const [significanceStats, setSignificanceStats] = useState<{ signifikan: number, tidak: number }>({ signifikan: 0, tidak: 0 })
  const [selectedProv, setSelectedProv] = useState<string>('all')
  const [selectedKabupaten, setSelectedKabupaten] = useState<string>('all')
  const [provList, setProvList] = useState<{ id: string, name: string }[]>([])
  const [kabList, setKabList] = useState<{ id: string, name: string, idprov: string }[]>([])

  useEffect(() => {
    fetch('/indonesia-desa.geojson')
      .then(res => res.json())
      .then(geojson => {
        const provMap: Record<string, string> = {}
        const kabMap: Record<string, { id: string, name: string, idprov: string }> = {}
        geojson.features.forEach((f: any) => {
          if (f.properties.IDPROV && f.properties.NMPROV) {
            provMap[f.properties.IDPROV] = f.properties.NMPROV
          }
          if (f.properties.IDKAB && f.properties.NMKAB && f.properties.IDPROV) {
            kabMap[f.properties.IDKAB] = { id: f.properties.IDKAB, name: f.properties.NMKAB, idprov: f.properties.IDPROV }
          }
        })
        const provListArr = Object.entries(provMap).map(([id, name]) => ({ id, name }))
        const kabListArr = [{ id: 'all', name: 'Semua Kabupaten/Kota', idprov: 'all' }, ...Object.values(kabMap)]
        setProvList(provListArr)
        setKabList(kabListArr)
        setSelectedProv('31')
        setSelectedKabupaten('3173')
      })
      .catch(() => {
        setProvList([{ id: 'all', name: 'Semua Provinsi' }])
        setKabList([{ id: 'all', name: 'Semua Kabupaten/Kota', idprov: 'all' }])
      })
  }, [])

  const filteredKabList = kabList.filter(kab => kab.idprov === selectedProv || kab.id === 'all')

  const indicatorOptions = [
    { key: 'bank', label: 'Jumlah Bank', icon: MapPin, color: 'teal' },
    { key: 'koperasi', label: 'Jumlah Koperasi', icon: Building2, color: 'green' },
    { key: 'atm_agen', label: 'Jumlah ATM & Agen Bank', icon: CreditCard, color: 'orange' },
    { key: 'bts', label: 'Jumlah BTS', icon: Wifi, color: 'blue' },
    { key: 'smak', label: 'Jumlah SMA/K', icon: GraduationCap, color: 'violet' },
    { key: 'kredit', label: 'Penggunaan Kredit', icon: DollarSign, color: 'rose' }
  ]
  const macroOptions = [
    { key: 'industri', label: 'Industri', icon: Factory, color: 'gray', macro: 'industri' },
    { key: 'pdrb', label: 'PDRB', icon: BarChart3, color: 'gray', macro: 'gdp' }
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
            GWR Mikro: Desa/Kelurahan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analisis Geographically Weighted Regression (GWR) untuk memahami variasi spasial 
            pengaruh inklusi keuangan terhadap pertumbuhan ekonomi di tingkat desa
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 h-full"
          >
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Filter Wilayah</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Provinsi</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={selectedProv}
                    onChange={e => {
                      setSelectedProv(e.target.value)
                      setSelectedKabupaten('all')
                    }}
                  >
                    {provList.map(prov => (
                      <option key={prov.id} value={prov.id}>{prov.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Kabupaten/Kota</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={selectedKabupaten}
                    onChange={e => setSelectedKabupaten(e.target.value)}
                  >
                    {filteredKabList.map(kab => (
                      <option key={kab.id} value={kab.id}>{kab.name}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 flex flex-col min-h-0">
              <CardHeader className="py-2">
                <CardTitle className="text-lg">Filter Indikator</CardTitle>
              </CardHeader>
              <CardContent className="py-2 flex-shrink min-h-0">
                <div className="flex gap-2">
                  {macroOptions.map(option => (
                    <Button
                      key={option.key}
                      variant={selectedMacro === option.key ? 'default' : 'outline'}
                      className={`flex-1 justify-center ${selectedMacro === option.key ? 'bg-gray-600 hover:bg-gray-700' : ''}`}
                      onClick={() => setSelectedMacro(option.key)}
                    >
                      <option.icon className="h-4 w-4 mr-2" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Filter Faktor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {indicatorOptions.map(option => {
                    let activeClass = ''
                    if (selectedFaktor === option.key) {
                      if (option.key === 'smak') activeClass = 'bg-violet-600 hover:bg-violet-700 text-white'
                      else if (option.key === 'kredit') activeClass = 'bg-rose-600 hover:bg-rose-700 text-white'
                      else if (option.key === 'bank') activeClass = 'bg-teal-600 hover:bg-teal-700 text-white'
                      else if (option.key === 'koperasi') activeClass = 'bg-green-600 hover:bg-green-700 text-white'
                      else if (option.key === 'atm_agen') activeClass = 'bg-orange-600 hover:bg-orange-700 text-white'
                      else if (option.key === 'bts') activeClass = 'bg-blue-600 hover:bg-blue-700 text-white'
                    }
                    return (
                      <Button
                        key={option.key}
                        variant={selectedFaktor === option.key ? 'default' : 'outline'}
                        className={`w-full justify-start ${activeClass}`}
                        onClick={() => setSelectedFaktor(option.key)}
                      >
                        <option.icon className="h-4 w-4 mr-2" />
                        {option.label}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Statistik Signifikansi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Signifikan</span>
                    </div>
                    <span className="font-semibold">{significanceStats.signifikan}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                      <span className="text-sm">Tidak Signifikan</span>
                    </div>
                    <span className="font-semibold">{significanceStats.tidak}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3 h-full flex flex-col"
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>
                  Peta Koefisien GWR
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex-1 min-h-0">
                    <div style={{ width: "100%" }}>
                      <LeafletChoroplethMap
                        geojsonUrl="/indonesia-desa.geojson"
                        filterProv={selectedProv}
                        filterKab={selectedKabupaten}
                        faktor={selectedFaktor}
                        macro={macroOptions.find(opt => opt.key === selectedMacro)?.macro || selectedMacro}
                        onSignificanceStats={setSignificanceStats}
                        height={700}
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Interpretasi Peta GWR</h4>
                    <p className="text-sm text-blue-700">
                      Setiap titik mewakili satu desa/kelurahan. Warna menunjukkan kekuatan dan arah 
                      pengaruh indikator {
                        (macroOptions.find(opt => opt.key === selectedMacro)?.label || '') +
                        (indicatorOptions.find(opt => opt.key === selectedFaktor) ? ' - ' + indicatorOptions.find(opt => opt.key === selectedFaktor)?.label : '')
                      } terhadap pertumbuhan ekonomi lokal. Ukuran titik mencerminkan besaran koefisien.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Analisis Korelasi Multidimensi */}
        <div className="mt-40">
          <Card>
            <CardHeader>
              <CardTitle>Analisis Korelasi Multidimensi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-teal-600">0.74</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Inklusi → Industri</h4>
                  <p className="text-sm text-gray-600">
                    Korelasi kuat antara inklusi keuangan dan pertumbuhan sektor industri
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">0.68</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Industri → Ekonomi</h4>
                  <p className="text-sm text-gray-600">
                    Pertumbuhan industri berkontribusi signifikan terhadap pertumbuhan ekonomi
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">0.82</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Inklusi → Ekonomi</h4>
                  <p className="text-sm text-gray-600">
                    Efek total inklusi keuangan terhadap pertumbuhan ekonomi (langsung + tidak langsung)
                  </p>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Jalur Kausal</h4>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                    Inklusi Keuangan
                  </div>
                  <div className="text-teal-600 font-bold">→</div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                    Sektor Industri
                  </div>
                  <div className="text-green-600 font-bold">→</div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                    Pertumbuhan Ekonomi
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
