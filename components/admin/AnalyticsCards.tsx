'use client'

interface AnalyticsCardsProps {
  totalSubmissions: number
  averageScore: number
}

export function AnalyticsCards({ totalSubmissions, averageScore }: AnalyticsCardsProps) {
  // Calculate maturity level from average score
  const maturityLevel = Math.floor(averageScore)
  const maturityNames = ['AI-Aware', 'Tool Adoption', 'Workflow Integration', 'Platform & Governance', 'AI-Native']

  const cards = [
    {
      title: 'Total Submissions',
      value: totalSubmissions.toLocaleString(),
      icon: '📊',
      color: 'bg-donyati-purple',
    },
    {
      title: 'Average Score',
      value: averageScore.toFixed(2),
      subtitle: '/ 4.0',
      icon: '📈',
      color: 'bg-donyati-dark-purple',
    },
    {
      title: 'Average Maturity',
      value: `Level ${maturityLevel}`,
      subtitle: maturityNames[maturityLevel] || 'Unknown',
      icon: '🎯',
      color: 'bg-donyati-lime',
      textColor: 'text-donyati-black',
    },
    {
      title: 'This Month',
      value: '-',
      subtitle: 'submissions',
      icon: '📅',
      color: 'bg-level-2',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{card.icon}</span>
            <div className={`w-2 h-2 rounded-full ${card.color}`} />
          </div>
          <p className="text-sm text-gray-500 mb-1">{card.title}</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-bold ${card.textColor || 'text-gray-900'}`}>
              {card.value}
            </span>
            {card.subtitle && (
              <span className="text-sm text-gray-500">{card.subtitle}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
