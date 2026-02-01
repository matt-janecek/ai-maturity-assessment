'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

const levelColors: Record<number, string> = {
  0: '#B8D458',
  1: '#E8A84C',
  2: '#5D9CEC',
  3: '#6B5B95',
  4: '#9B59B6',
}

const levelNames: Record<number, string> = {
  0: 'AI-Aware',
  1: 'Tool Adoption',
  2: 'Workflow Integration',
  3: 'Platform & Governance',
  4: 'AI-Native',
}

interface MaturityLevelChartProps {
  data: { level: number; name: string; count: number }[]
}

export function MaturityLevelChart({ data }: MaturityLevelChartProps) {
  // Ensure all levels are represented
  const allLevels = [0, 1, 2, 3, 4].map((level) => {
    const found = data.find((d) => d.level === level)
    return {
      level,
      name: found?.name || levelNames[level],
      count: found?.count || 0,
    }
  })

  const hasData = allLevels.some((d) => d.count > 0)

  if (!hasData) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No maturity level data available
      </div>
    )
  }

  // Filter out zero-count entries for the pie chart
  const chartData = allLevels.filter((d) => d.count > 0)

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            label={({ name, percent }) =>
              `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
            }
            labelLine={{ stroke: '#6b7280', strokeWidth: 1 }}
          >
            {chartData.map((entry) => (
              <Cell
                key={`cell-${entry.level}`}
                fill={levelColors[entry.level]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
