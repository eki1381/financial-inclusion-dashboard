'use client'

import { useMemo, useRef } from 'react'
import { HeroSection } from './sections/hero-section'
import { FinancialInclusionSection } from './sections/financial-inclusion-section'
import { IndustrySection } from './sections/industry-section'
import { GWRSection } from './sections/gwr-section'
import { EconomicGrowthSection } from './sections/economic-growth-section'
import { SummarySection } from './sections/summary-section'
import { generateSampleData } from '@/lib/data'

export function Dashboard() {
  const financialInclusionRef = useRef<HTMLDivElement>(null)
  // Gunakan useMemo agar sampleData hanya di-generate sekali di client
  const sampleData = useMemo(() => generateSampleData(), [])

  const scrollToFinancialInclusion = () => {
    financialInclusionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection onStartExploration={scrollToFinancialInclusion} />
      
      {/* Financial Inclusion Section */}
      <div ref={financialInclusionRef}>
        <FinancialInclusionSection data={sampleData} />
      </div>
      
      {/* Industry Relationship Section */}
      <IndustrySection data={sampleData} />
      
      {/* GWR Micro Analysis Section */}
      <GWRSection data={sampleData} />
      
      {/* Economic Growth Section */}
      <EconomicGrowthSection data={sampleData} />
      
      {/* Summary and Recommendations Section */}
      <SummarySection />
    </div>
  )
}
