'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const industryNames: Record<string, string> = {
  'financial-services': 'Financial Services',
  'healthcare': 'Healthcare',
  'manufacturing': 'Manufacturing',
  'retail': 'Retail',
  'technology': 'Technology',
  'professional-services': 'Prof. Services',
  'energy-utilities': 'Energy',
  'government': 'Government',
  'education': 'Education',
  'media-entertainment': 'Media',
  'transportation-logistics': 'Transportation',
  'general': 'General',
}

const colors = [
  '#4A4778',
  '#45266C',
  '#ACC953',
  '#5D9CEC',
  '#6B5B95',
  '#E8A84C',
  '#B8D458',
  '#9B59B6',
  '#3498DB',
  '#E67E22',
  '#1ABC9C',
  '#95A5A6',
]

interface IndustryChartProps {
  data: { industry: string; count: number }[]
}

export function IndustryChart({ data }: IndustryChartProps) {
  // Format data for display
  const formattedData = data.map((item) => ({
    ...item,
    displayName: industryNames[item.industry] || item.industry,
  }))

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No industry data available
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            allowDecimals={false}
          />
          <YAxis
            dataKey="displayName"
            type="category"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {formattedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
