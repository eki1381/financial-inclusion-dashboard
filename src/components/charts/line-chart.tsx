'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { FinancialInclusionData } from '@/lib/types'

interface CustomLineChartProps {
  data: FinancialInclusionData[]
  title?: string
  height?: number
}

export function CustomLineChart({ data, title, height = 300 }: CustomLineChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            domain={[0, 1]}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => [
              `${(value * 100).toFixed(1)}%`,
              name === 'availability' ? 'Availability' :
              name === 'accessibility' ? 'Accessibility' :
              name === 'usage' ? 'Usage' : 'Composite'
            ]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="availability" 
            stroke="#0d9488" 
            strokeWidth={3}
            dot={{ fill: '#0d9488', strokeWidth: 2, r: 4 }}
            name="Availability"
          />
          <Line 
            type="monotone" 
            dataKey="accessibility" 
            stroke="#059669" 
            strokeWidth={3}
            dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
            name="Accessibility"
          />
          <Line 
            type="monotone" 
            dataKey="usage" 
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            name="Usage"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}