'use client'

import { type Industry, type IndustryInfo, getAllIndustries } from '@/lib/industries'

interface IndustrySelectorProps {
  selectedIndustry: Industry | null
  onSelect: (industry: Industry) => void
}

export function IndustrySelector({ selectedIndustry, onSelect }: IndustrySelectorProps) {
  const industries = getAllIndustries()

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-donyati-black mb-3">
          What industry is your organization in?
        </h2>
        <p className="text-donyati-purple">
          We'll tailor the assessment questions and benchmark your results against your industry peers.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {industries.map((industry) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            isSelected={selectedIndustry === industry.id}
            onClick={() => onSelect(industry.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface IndustryCardProps {
  industry: IndustryInfo
  isSelected: boolean
  onClick: () => void
}

function IndustryCard({ industry, isSelected, onClick }: IndustryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-4 sm:p-5 rounded-xl border-2 transition-all text-left h-full min-h-[120px] sm:min-h-[140px] ${
        isSelected
          ? 'border-donyati-dark-purple bg-donyati-light-purple ring-2 ring-donyati-lime ring-offset-2'
          : 'border-gray-200 bg-white hover:border-donyati-purple hover:bg-gray-50'
      }`}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-donyati-dark-purple flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Icon */}
      <div className="text-2xl sm:text-3xl mb-2">{industry.icon}</div>

      {/* Name */}
      <div
        className={`font-semibold text-sm sm:text-base leading-tight ${
          isSelected ? 'text-donyati-dark-purple' : 'text-donyati-black'
        }`}
      >
        {industry.name}
      </div>

      {/* Description */}
      <div className="text-xs sm:text-sm text-donyati-purple mt-1 leading-snug">
        {industry.description}
      </div>
    </button>
  )
}
