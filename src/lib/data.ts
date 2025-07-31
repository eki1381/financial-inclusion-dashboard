import { DashboardData, RegionData, FinancialInclusionData } from './types'

// Sample data for demonstration - in a real application, this would come from your API
export const generateSampleData = (): DashboardData => {
  // Generate sample regions (kabupaten and desa)
  const regions: RegionData[] = []
  
  // Major Indonesian regions with approximate coordinates
  const majorRegions = [
    { name: 'Jakarta', coords: [-6.2088, 106.8456] as [number, number] },
    { name: 'Surabaya', coords: [-7.2575, 112.7521] as [number, number] },
    { name: 'Bandung', coords: [-6.9175, 107.6191] as [number, number] },
    { name: 'Medan', coords: [3.5952, 98.6722] as [number, number] },
    { name: 'Semarang', coords: [-6.9667, 110.4167] as [number, number] },
    { name: 'Makassar', coords: [-5.1477, 119.4327] as [number, number] },
    { name: 'Palembang', coords: [-2.9761, 104.7754] as [number, number] },
    { name: 'Denpasar', coords: [-8.6500, 115.2167] as [number, number] },
    { name: 'Balikpapan', coords: [-1.2379, 116.8529] as [number, number] },
    { name: 'Yogyakarta', coords: [-7.7956, 110.3695] as [number, number] },
    { name: 'Malang', coords: [-7.9666, 112.6326] as [number, number] },
    { name: 'Samarinda', coords: [-0.5017, 117.1536] as [number, number] },
    { name: 'Banjarmasin', coords: [-3.3194, 114.5906] as [number, number] },
    { name: 'Pekanbaru', coords: [0.5333, 101.4500] as [number, number] },
    { name: 'Padang', coords: [-0.9471, 100.4172] as [number, number] },
    { name: 'Manado', coords: [1.4748, 124.8421] as [number, number] },
    { name: 'Pontianak', coords: [-0.0263, 109.3425] as [number, number] },
    { name: 'Jambi', coords: [-1.6101, 103.6131] as [number, number] },
    { name: 'Mataram', coords: [-8.5833, 116.1167] as [number, number] },
    { name: 'Kupang', coords: [-10.1718, 123.6075] as [number, number] }
  ]

  // Generate kabupaten data
  majorRegions.forEach((region, index) => {
    const financialInclusion: FinancialInclusionData[] = []
    const industryGrowth: number[] = []
    const economicGrowth: number[] = []

    // Generate time series data for 2019-2024
    for (let year = 2019; year <= 2024; year++) {
      const baseAvailability = 0.3 + Math.random() * 0.4
      const baseAccessibility = 0.4 + Math.random() * 0.3
      const baseUsage = 0.2 + Math.random() * 0.5
      
      // Add some growth trend
      const yearFactor = (year - 2019) * 0.02
      
      financialInclusion.push({
        year,
        availability: Math.min(1, baseAvailability + yearFactor + (Math.random() - 0.5) * 0.1),
        accessibility: Math.min(1, baseAccessibility + yearFactor + (Math.random() - 0.5) * 0.1),
        usage: Math.min(1, baseUsage + yearFactor + (Math.random() - 0.5) * 0.1),
        composite: Math.min(1, (baseAvailability + baseAccessibility + baseUsage) / 3 + yearFactor)
      })

      industryGrowth.push(2 + Math.random() * 8) // 2-10% growth
      economicGrowth.push(3 + Math.random() * 6) // 3-9% growth
    }

    regions.push({
      id: `kab_${index}`,
      name: `Kabupaten ${region.name}`,
      type: 'kabupaten',
      coordinates: region.coords,
      financialInclusion,
      industryGrowth,
      economicGrowth,
      population: 500000 + Math.random() * 2000000
    })

    // Generate 3-5 desa for each kabupaten
    const desaCount = 3 + Math.floor(Math.random() * 3)
    for (let j = 0; j < desaCount; j++) {
      const desaFinancialInclusion: FinancialInclusionData[] = []
      const desaIndustryGrowth: number[] = []
      const desaEconomicGrowth: number[] = []

      for (let year = 2019; year <= 2024; year++) {
        const baseAvailability = 0.1 + Math.random() * 0.6
        const baseAccessibility = 0.2 + Math.random() * 0.5
        const baseUsage = 0.1 + Math.random() * 0.4
        
        const yearFactor = (year - 2019) * 0.015
        
        desaFinancialInclusion.push({
          year,
          availability: Math.min(1, baseAvailability + yearFactor + (Math.random() - 0.5) * 0.15),
          accessibility: Math.min(1, baseAccessibility + yearFactor + (Math.random() - 0.5) * 0.15),
          usage: Math.min(1, baseUsage + yearFactor + (Math.random() - 0.5) * 0.15),
          composite: Math.min(1, (baseAvailability + baseAccessibility + baseUsage) / 3 + yearFactor)
        })

        desaIndustryGrowth.push(1 + Math.random() * 6) // 1-7% growth
        desaEconomicGrowth.push(2 + Math.random() * 5) // 2-7% growth
      }

      regions.push({
        id: `desa_${index}_${j}`,
        name: `Desa ${region.name} ${j + 1}`,
        type: 'desa',
        parentId: `kab_${index}`,
        coordinates: [
          region.coords[0] + (Math.random() - 0.5) * 0.5,
          region.coords[1] + (Math.random() - 0.5) * 0.5
        ],
        financialInclusion: desaFinancialInclusion,
        industryGrowth: desaIndustryGrowth,
        economicGrowth: desaEconomicGrowth,
        population: 10000 + Math.random() * 50000
      })
    }
  })

  // Generate GWR results
  const gwrResults = {
    availability: regions.filter(r => r.type === 'desa').map(region => ({
      regionId: region.id,
      regionName: region.name,
      coefficient: -0.5 + Math.random() * 1.0,
      pValue: Math.random() * 0.1,
      significance: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low' as 'high' | 'medium' | 'low',
      localR2: 0.3 + Math.random() * 0.5
    })),
    accessibility: regions.filter(r => r.type === 'desa').map(region => ({
      regionId: region.id,
      regionName: region.name,
      coefficient: -0.3 + Math.random() * 0.8,
      pValue: Math.random() * 0.1,
      significance: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low' as 'high' | 'medium' | 'low',
      localR2: 0.2 + Math.random() * 0.6
    })),
    usage: regions.filter(r => r.type === 'desa').map(region => ({
      regionId: region.id,
      regionName: region.name,
      coefficient: -0.4 + Math.random() * 0.9,
      pValue: Math.random() * 0.1,
      significance: Math.random() > 0.5 ? 'high' : Math.random() > 0.2 ? 'medium' : 'low' as 'high' | 'medium' | 'low',
      localR2: 0.25 + Math.random() * 0.55
    })),
    composite: regions.filter(r => r.type === 'desa').map(region => ({
      regionId: region.id,
      regionName: region.name,
      coefficient: -0.2 + Math.random() * 0.7,
      pValue: Math.random() * 0.1,
      significance: Math.random() > 0.8 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low' as 'high' | 'medium' | 'low',
      localR2: 0.4 + Math.random() * 0.4
    }))
  }

  // Generate correlation data
  const correlations = regions.filter(r => r.type === 'kabupaten').map((region, index) => ({
    regionId: region.id,
    regionName: region.name,
    correlation: 0.3 + Math.random() * 0.6,
    rank: index + 1
  })).sort((a, b) => b.correlation - a.correlation).map((item, index) => ({
    ...item,
    rank: index + 1
  }))

  // Static national trends data (2019-2024)
  const nationalTrends = {
    financialInclusion: [
      { year: 2019, availability: 0.0565, accessibility: 0.3142, usage: 0.0981, composite: 0.3017 },
      { year: 2020, availability: 0.0538, accessibility: 0.3427, usage: 0.1037, composite: 0.3217 },
      { year: 2021, availability: 0.0516, accessibility: 0.3734, usage: 0.1093, composite: 0.3437 },
      { year: 2022, availability: 0.1235, accessibility: 0.3669, usage: 0.1134, composite: 0.4153 },
      { year: 2023, availability: 0.1083, accessibility: 0.3867, usage: 0.1217, composite: 0.4189 },
      { year: 2024, availability: 0.0465, accessibility: 0.4173, usage: 0.1274, composite: 0.3806 }
    ],
    economicGrowth: []
  }

  return {
    regions,
    gwrResults,
    correlations,
    nationalTrends
  }
}

export const sampleData = generateSampleData()

// Indonesia map bounds
export const INDONESIA_BOUNDS = {
  north: 6.0,
  south: -11.0,
  east: 141.0,
  west: 95.0
}
