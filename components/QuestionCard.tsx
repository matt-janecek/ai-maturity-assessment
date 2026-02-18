'use client'

import { useCallback } from 'react'
import { type Question, type QuestionOption } from '@/lib/questions'

interface QuestionCardProps {
  question: Question
  selectedValue: number | undefined
  onSelect: (value: number) => void
}

export function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, options: QuestionOption[]) => {
      const currentIndex = options.findIndex((o) => o.value === selectedValue)
      let nextIndex = -1

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
      }

      if (nextIndex >= 0) {
        onSelect(options[nextIndex].value)
        // Focus the newly selected option
        const container = e.currentTarget
        const buttons = container.querySelectorAll<HTMLButtonElement>('[role="radio"]')
        buttons[nextIndex]?.focus()
      }
    },
    [selectedValue, onSelect]
  )

  return (
    <div className="animate-fade-in">
      <div className="mb-2 text-sm font-medium text-donyati-purple uppercase tracking-wide">
        {question.dimension}
      </div>
      <h2
        id={`question-${question.id}`}
        className="text-xl sm:text-2xl font-bold text-donyati-black mb-4 sm:mb-8"
      >
        {question.text}
      </h2>

      <div
        role="radiogroup"
        aria-labelledby={`question-${question.id}`}
        className="space-y-3"
        onKeyDown={(e) => handleKeyDown(e, question.options)}
      >
        {question.options.map((option) => (
          <OptionButton
            key={option.value}
            option={option}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  )
}

interface OptionButtonProps {
  option: QuestionOption
  isSelected: boolean
  onClick: () => void
}

function OptionButton({ option, isSelected, onClick }: OptionButtonProps) {
  return (
    <button
      role="radio"
      aria-checked={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-donyati-dark-purple focus-visible:ring-offset-2 ${
        isSelected
          ? 'border-donyati-dark-purple bg-donyati-light-purple'
          : 'border-gray-200 bg-white hover:border-donyati-purple hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
            isSelected
              ? 'border-donyati-dark-purple bg-donyati-dark-purple'
              : 'border-gray-300'
          }`}
          aria-hidden="true"
        >
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div>
          <div className={`font-medium ${isSelected ? 'text-donyati-dark-purple' : 'text-donyati-black'}`}>
            {option.label}
          </div>
          {option.description && (
            <div className="text-sm text-donyati-purple mt-1">
              {option.description}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
