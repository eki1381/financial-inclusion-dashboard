export interface FinancialInclusionData {
  year: number
  availability: number
  accessibility: number
  usage: number
  composite: number
}

export interface RegionData {
  id: string
  name: string
  type: 'kabupaten' | 'desa'
  parentId?: string
  coordinates: [number, number]
  financialInclusion: FinancialInclusionData[]
  industryGrowth: number[]
  economicGrowth: number[]
  population: number
}

export interface GWRResult {
  regionId: string
  regionName: string
  coefficient: number
  pValue: number
  significance: 'high' | 'medium' | 'low' | 'not_significant'
  localR2: number
}

export interface CorrelationData {
  regionId: string
  regionName: string
  correlation: number
  rank: number
}

export interface DashboardData {
  regions: RegionData[]
  gwrResults: {
    availability: GWRResult[]
    accessibility: GWRResult[]
    usage: GWRResult[]
    composite: GWRResult[]
  }
  correlations: CorrelationData[]
  nationalTrends: {
    financialInclusion: FinancialInclusionData[]
    economicGrowth: number[]
  }
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}