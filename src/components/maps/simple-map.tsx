'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GWRResult } from '@/lib/types'
import { interpolateColor } from '@/lib/utils'
import { generateIndonesiaVillages } from '@/lib/indonesia-geojson'

interface SimpleMapProps {
  gwrResults: GWRResult[]
  selectedIndex: 'availability' | 'accessibility' | 'usage' | 'composite'
  onRegionClick?: (regionId: string) => void
}

export function SimpleMap({ gwrResults, selectedIndex, onRegionClick }: SimpleMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  // Get min/max values for color scaling
  const coefficients = gwrResults.map(r => r.coefficient)
  const minCoeff = Math.min(...coefficients)
  const maxCoeff = Math.max(...coefficients)

  // Get Indonesia villages GeoJSON
  const villagesGeoJSON = generateIndonesiaVillages()
  
  // Map GWR results to geographic coordinates
  const mapRegions = gwrResults.slice(0, 80).map((result, index) => {
    const village = villagesGeoJSON.features[index % villagesGeoJSON.features.length]
    const [lng, lat] = village.geometry.coordinates
    
    // Convert geographic coordinates to SVG coordinates
    // Indonesia bounds: lng 95-141, lat -11 to 6
    const x = ((lng - 95) / (141 - 95)) * 350 + 25
    const y = ((6 - lat) / (6 - (-11))) * 250 + 25
    
    return {
      ...result,
      x,
      y,
      size: 3 + Math.abs(result.coefficient) * 6,
      village: village.properties
    }
  })

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg overflow-hidden">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Background archipelago outline */}
        <path
          d="M50 150 Q100 120 150 140 Q200 135 250 145 Q300 150 350 155"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Map regions */}
        {mapRegions.map((region) => {
          const color = interpolateColor(region.coefficient, minCoeff, maxCoeff)
          const isHovered = hoveredRegion === region.regionId
          
          return (
            <motion.circle
              key={region.regionId}
              cx={region.x}
              cy={region.y}
              r={region.size}
              fill={color}
              stroke={isHovered ? '#0f172a' : 'white'}
              strokeWidth={isHovered ? 2 : 1}
              className="cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
              whileHover={{ scale: 1.2 }}
              onMouseEnter={() => setHoveredRegion(region.regionId)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onRegionClick?.(region.regionId)}
            />
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-sm border">
        <div className="text-xs font-medium text-gray-700 mb-2">
          Koefisien {selectedIndex === 'availability' ? 'Availability' : 
                     selectedIndex === 'accessibility' ? 'Accessibility' : 
                     selectedIndex === 'usage' ? 'Usage' : 'Indeks Inklusi Keuangan'}
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: interpolateColor(minCoeff, minCoeff, maxCoeff) }}></div>
          <span className="text-xs text-gray-500">{minCoeff.toFixed(2)}</span>
          <div className="w-8 h-1 bg-gradient-to-r from-red-300 to-teal-600 rounded"></div>
          <span className="text-xs text-gray-500">{maxCoeff.toFixed(2)}</span>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: interpolateColor(maxCoeff, minCoeff, maxCoeff) }}></div>
        </div>
      </div>

      {/* Hover tooltip */}
      {hoveredRegion && (
        <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg border max-w-xs">
          {(() => {
            const regionData = mapRegions.find(r => r.regionId === hoveredRegion)
            if (!regionData) return null
            
            return (
              <div>
                <div className="font-medium text-gray-900 text-sm mb-1">
                  {regionData.village?.name || regionData.regionName}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {regionData.village?.kabupaten}, {regionData.village?.provinsi}
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Koefisien: <span className="font-medium">{regionData.coefficient.toFixed(3)}</span></div>
                  <div>P-value: <span className="font-medium">{regionData.pValue.toFixed(4)}</span></div>
                  <div>Signifikansi: <span className={`font-medium ${
                    regionData.significance === 'high' ? 'text-green-600' :
                    regionData.significance === 'medium' ? 'text-yellow-600' :
                    regionData.significance === 'low' ? 'text-orange-600' :
                    'text-gray-600'
                  }`}>
                    {regionData.significance === 'high' ? 'Tinggi' :
                     regionData.significance === 'medium' ? 'Sedang' :
                     regionData.significance === 'low' ? 'Rendah' : 'Tidak Signifikan'}
                  </span></div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}