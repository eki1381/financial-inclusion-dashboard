'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function MapRefSetter({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map]);
  return null;
}

interface LeafletChoroplethMapProps {
  geojsonUrl: string
  filterProv?: string
  filterKab?: string
  faktor: string
  macro: string
  onSignificanceStats?: (stats: { signifikan: number, tidak: number }) => void
  height?: number
}

const DIMENSIONS = [
  { key: 'access', label: 'Accessibility', prefix: 'access_score_' },
  { key: 'avail', label: 'Availability', prefix: 'avail_score_' },
  { key: 'usage', label: 'Usage', prefix: 'usage_score_' },
  { key: 'IFI', label: 'Financial Inclusiveness Index', prefix: 'IFI_' }
];

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

export function LeafletChoroplethMap({ geojsonUrl, filterProv, filterKab, faktor, macro, onSignificanceStats, height }: LeafletChoroplethMapProps) {
  const [geojson, setGeojson] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  const [breaks, setBreaks] = useState<number[]>([])

  useEffect(() => {
    setError(null)
    fetch(geojsonUrl)
      .then(res => {
        if (!res.ok) throw new Error('GeoJSON not found: ' + geojsonUrl)
        return res.json()
      })
      .then(data => setGeojson(data))
      .catch(err => setError(err.message))
  }, [geojsonUrl])

// Filter features by provinsi/kabupaten if provided

const filteredGeojson = useMemo(() => {
  if (!geojson) return geojson
  if (typeof filterProv === 'string' || typeof filterKab === 'string') {
    return {
      ...geojson,
      features: geojson.features.filter((f: any) => {
        if (filterKab && filterKab !== 'all') {
          if (filterProv && filterProv !== 'all') {
            return f.properties.IDKAB === filterKab && f.properties.IDPROV === filterProv
          }
          return f.properties.IDKAB === filterKab
        }
        if (filterProv && filterProv !== 'all') {
          return f.properties.IDPROV === filterProv
        }
        return true
      })
    }
  }
  return geojson
}, [geojson, filterProv, filterKab])

  // Calculate natural breaks (jenks) for current faktor & macro
  useEffect(() => {
    if (!geojson || !faktor) return
    const key = macro ? `${faktor}_${macro}` : faktor
    const values = geojson.features
      .map((f: any) => f.properties[key])
      .filter((v: any) => v !== undefined && v !== null && !isNaN(v))
      .sort((a: number, b: number) => a - b)
    // Debug: log values dan breaks
    // @ts-ignore
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.log("DEBUG values", key, values)
    }
    if (values.length < 5) {
      if (values.length >= 1) {
        setBreaks([values[0], values[values.length - 1]])
      } else {
        setBreaks([])
      }
      return
    }
    const n = 5
    const quantiles = []
    for (let i = 1; i < n; i++) {
      const qIdx = Math.floor((i / n) * values.length)
      quantiles.push(values[qIdx])
    }
    // @ts-ignore
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.log("DEBUG breaks", [values[0], ...quantiles, values[values.length - 1]])
    }
    setBreaks([values[0], ...quantiles, values[values.length - 1]])
  }, [geojson, faktor, macro])

  // Statistik signifikansi
  useEffect(() => {
    if (!geojson || !faktor || !macro || !filteredGeojson) return
    const pvalKey = `${faktor}_pval_${macro}`
    let signifikan = 0
    let tidak = 0
    filteredGeojson.features.forEach((f: any) => {
      const pval = f.properties[pvalKey]
      if (typeof pval === 'number' && pval < 0.05) signifikan++
      else tidak++
    })
    if (onSignificanceStats) onSignificanceStats({ signifikan, tidak })
  }, [filteredGeojson, faktor, macro, onSignificanceStats])

  function getColor(value: number) {
    if (!breaks.length || value === undefined || value === null || isNaN(value)) return '#eee'
    // Jika semua value sama, beri satu warna utama
    if (breaks.length === 2 && breaks[0] === breaks[1]) {
      if (value === breaks[0]) return '#41b6c4'
      return '#eee'
    }
    // 5-class color
    const colors = ['#225ea8', '#41b6c4', '#c7e9b4', '#fecc5c', '#fd8d3c', '#e31a1c']
    for (let i = 0; i < breaks.length - 1; i++) {
      if (value <= breaks[i + 1]) return colors[i]
    }
    return colors[colors.length - 1]
  }

  function style(feature: any) {
    const key = macro ? `${faktor}_${macro}` : faktor
    const value = feature.properties[key]
    return {
      fillColor: getColor(value),
      color: '#333',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
  }

  // (hapus blok kedua yang sama, jika ada)

  // Auto fitBounds to filtered features
  useEffect(() => {
    if (!mapRef.current || !filteredGeojson || !filteredGeojson.features?.length) return
    // Get all coordinates from features
    const coords: [number, number][] = []
    filteredGeojson.features.forEach((f: any) => {
      const geom = f.geometry
      if (!geom) return
      if (geom.type === 'Polygon') {
        geom.coordinates.forEach((ring: any) => ring.forEach((c: any) => coords.push([c[1], c[0]])))
      } else if (geom.type === 'MultiPolygon') {
        geom.coordinates.forEach((poly: any) =>
          poly.forEach((ring: any) => ring.forEach((c: any) => coords.push([c[1], c[0]])))
        )
      } else if (geom.type === 'Point') {
        coords.push([geom.coordinates[1], geom.coordinates[0]])
      }
    })
    if (coords.length) {
      const bounds = L.latLngBounds(coords)
      mapRef.current.fitBounds(bounds, { maxZoom: 11, padding: [20, 20] })
    }
  }, [filteredGeojson])

  return (
    <div style={{ width: '100%', height: height || 440 }}>
      {/* Controls removed */}
      {error ? (
        <div style={{ color: 'red', padding: 16 }}>
          Error loading GeoJSON: {error}
        </div>
      ) : !geojson ? (
        <div style={{ color: '#0d9488', padding: 16, textAlign: 'center' }}>
          Memuat peta kabupaten Indonesia...
        </div>
      ) : (
        <MapContainer
          center={[-2.5, 117]}
          zoom={5}
          style={{ width: '100%', height: height || 440, borderRadius: 12, zIndex: 1 }}
          scrollWheelZoom={true}
        >
          <MapRefSetter mapRef={mapRef} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredGeojson && (
            <GeoJSON
              key={geojsonUrl + faktor + macro + (filterProv || '') + (filterKab || '')}
              data={filteredGeojson}
              style={style}
              onEachFeature={(feature, layer) => {
                const valueKey = macro ? `${faktor}_${macro}` : faktor
                const pvalKey = macro ? `${faktor}_pval_${macro}` : `${faktor}_pval`
                const value = feature.properties[valueKey]
                const pval = feature.properties[pvalKey]
                const nama = feature.properties.NMDESA || feature.properties.nmdesa || feature.properties.nmkab || feature.properties.name || '-'
                let tooltip = `<b>${nama}</b><br/>${(faktor || '').replace('_', ' ')}: ${value !== undefined ? value : '-'}`
                // Tampilkan signifikansi jika geojson desa/kelurahan
                if (geojsonUrl && geojsonUrl.toLowerCase().includes('desa')) {
                  const signif = typeof pval === 'number' && pval < 0.05 ? 'Signifikan' : 'Tidak Signifikan'
                  tooltip += `<br/>Signifikansi: ${signif}`
                }
                layer.bindTooltip(tooltip, { direction: 'top' })
              }}
            />
          )}
        </MapContainer>
      )}
    </div>
  )
}

export default LeafletChoroplethMap
