'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { RegionData } from '@/lib/types'

interface ScatterPlotProps {
  data: RegionData[]
  title?: string
  height?: number
}

export function ScatterPlot({ data, title, height = 400 }: ScatterPlotProps) {
  // Transform data for scatter plot
  const scatterData = data
    .filter(region => region.type === 'kabupaten')
    .map(region => {
      const latestFinancial = region.financialInclusion[region.financialInclusion.length - 1]
      const latestIndustry = region.industryGrowth[region.industryGrowth.length - 1]
      
      return {
        name: region.name,
        x: latestFinancial.composite * 100, // Financial inclusion composite index
        y: latestIndustry, // Industry growth
        size: Math.log(region.population) * 10 // Population size for bubble size
      }
    })

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Financial Inclusion Index"
            stroke="#666"
            fontSize={12}
            tickFormatter={(value) => `${value.toFixed(0)}%`}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Industry Growth"
            stroke="#666"
            fontSize={12}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => [
              name === 'x' ? `${value.toFixed(1)}%` : `${value.toFixed(1)}%`,
              name === 'x' ? 'Financial Inclusion' : 'Industry Growth'
            ]}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.name
              }
              return label
            }}
          />
          <Scatter 
            name="Regions" 
            data={scatterData} 
            fill="#0d9488"
            fillOpacity={0.7}
            stroke="#0d9488"
            strokeWidth={1}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}