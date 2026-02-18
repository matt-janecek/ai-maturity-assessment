'use client'

import { getMaturityDescription } from '@/lib/scoring'

interface ScoreDisplayProps {
  score: number
  level: number
  levelName: string
}

export function ScoreDisplay({ score, level, levelName }: ScoreDisplayProps) {
  // Calculate stroke offset for animated circle (0-100 scale, where 0 = full, 283 = empty)
  const circumference = 283
  const percentage = (score / 4) * 100
  const offset = circumference - (percentage / 100) * circumference

  const levelColors: Record<number, string> = {
    0: '#B8D458',
    1: '#E8A84C',
    2: '#5D9CEC',
    3: '#6B5B95',
    4: '#9B59B6',
  }

  const color = levelColors[level] || levelColors[0]

  return (
    <div className="text-center">
      {/* Score Circle */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <svg
          className="w-36 h-36 sm:w-48 sm:h-48 transform -rotate-90"
          viewBox="0 0 100 100"
          role="img"
          aria-label={`Score: ${score.toFixed(1)} out of 4.0, Level ${level} ${levelName}`}
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-score"
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
          <span className="text-3xl sm:text-4xl font-bold text-donyati-black">{score.toFixed(1)}</span>
          <span className="text-sm text-donyati-purple">out of 4.0</span>
        </div>
      </div>

      {/* Level Badge */}
      <div
        className={`inline-block px-6 py-3 rounded-full text-white font-bold shadow-pill mb-4 level-badge-${level}`}
      >
        <span className="text-sm opacity-90 block">Level {level}</span>
        <span className="text-lg">{levelName}</span>
      </div>

      {/* Description */}
      <p className="text-donyati-purple max-w-md mx-auto">
        {getMaturityDescription(level)}
      </p>
    </div>
  )
}
