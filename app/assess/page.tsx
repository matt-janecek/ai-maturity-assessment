'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { QuestionCard } from '@/components/QuestionCard'
import { ProgressBar } from '@/components/ProgressBar'
import { LeadCaptureForm, type LeadInfo } from '@/components/LeadCaptureForm'
import { IndustrySelector } from '@/components/IndustrySelector'
import { coreQuestions, deepDiveQuestions, type Dimension, getQuestionForIndustry } from '@/lib/questions'
import { calculateAssessmentResult, type Answer } from '@/lib/scoring'
import { type Industry } from '@/lib/industries'

type AssessmentStep = 'industry-selection' | 'questions' | 'lead-capture' | 'optional-questions'

interface TrackingData {
  startTime: string
  referrerUrl?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

export default function AssessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<AssessmentStep>('industry-selection')
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<string, Answer>>(new Map())
  const [leadInfo, setLeadInfo] = useState<LeadInfo | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOptionalQuestions, setShowOptionalQuestions] = useState(false)
  const [tracking, setTracking] = useState<TrackingData>({ startTime: new Date().toISOString() })

  // Capture tracking data on page load
  useEffect(() => {
    const trackingData: TrackingData = {
      startTime: new Date().toISOString(),
      referrerUrl: document.referrer || undefined,
      utmSource: searchParams.get('utm_source') || undefined,
      utmMedium: searchParams.get('utm_medium') || undefined,
      utmCampaign: searchParams.get('utm_campaign') || undefined,
      utmTerm: searchParams.get('utm_term') || undefined,
      utmContent: searchParams.get('utm_content') || undefined,
    }
    setTracking(trackingData)

    // Also store in sessionStorage in case of page refresh
    sessionStorage.setItem('assessmentTracking', JSON.stringify(trackingData))
  }, [searchParams])

  const questions = showOptionalQuestions
    ? [...coreQuestions, ...deepDiveQuestions]
    : coreQuestions

  // Get industry-specific question if industry is selected
  const currentQuestion = selectedIndustry
    ? getQuestionForIndustry(questions[currentQuestionIndex], selectedIndustry)
    : questions[currentQuestionIndex]

  const totalQuestions = questions.length

  const handleIndustrySelect = (industry: Industry) => {
    setSelectedIndustry(industry)
  }

  const handleIndustryContinue = () => {
    if (selectedIndustry) {
      // Store industry in sessionStorage
      sessionStorage.setItem('selectedIndustry', selectedIndustry)
      setStep('questions')
    }
  }

  const handleSelectAnswer = (value: number) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      dimension: currentQuestion.dimension as Dimension,
      value,
    }

    setAnswers(new Map(answers.set(currentQuestion.id, answer)))

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else if (step === 'questions') {
        setStep('lead-capture')
      } else {
        // All optional questions done, go to results
        submitAssessment()
      }
    }, 300)
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleLeadSubmit = async (lead: LeadInfo) => {
    setLeadInfo(lead)
    setIsSubmitting(true)

    try {
      // Submit lead info and core assessment results
      const answersArray = Array.from(answers.values())
      const result = calculateAssessmentResult(answersArray, selectedIndustry || 'general')

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          result,
          industry: selectedIndustry,
          timestamp: new Date().toISOString(),
          tracking,
        }),
      })

      if (!response.ok) {
        console.error('Failed to submit lead')
      }

      // Store results in sessionStorage for results page
      sessionStorage.setItem('assessmentResult', JSON.stringify(result))
      sessionStorage.setItem('leadInfo', JSON.stringify(lead))

      // Navigate to results
      router.push('/assess/results')
    } catch (error) {
      console.error('Error submitting assessment:', error)
      // Still navigate to results even if lead submission fails
      const answersArray = Array.from(answers.values())
      const result = calculateAssessmentResult(answersArray, selectedIndustry || 'general')
      sessionStorage.setItem('assessmentResult', JSON.stringify(result))
      sessionStorage.setItem('leadInfo', JSON.stringify(lead))
      router.push('/assess/results')
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitAssessment = async () => {
    setIsSubmitting(true)
    const answersArray = Array.from(answers.values())
    const result = calculateAssessmentResult(answersArray, selectedIndustry || 'general')

    try {
      // Update with optional question answers
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: leadInfo,
          result,
          industry: selectedIndustry,
          timestamp: new Date().toISOString(),
          includesOptional: true,
          tracking,
        }),
      })
    } catch (error) {
      console.error('Error updating assessment:', error)
    }

    sessionStorage.setItem('assessmentResult', JSON.stringify(result))
    router.push('/assess/results')
  }

  const handleSkipOptional = () => {
    // Navigate directly to results without optional questions
    const answersArray = Array.from(answers.values())
    const result = calculateAssessmentResult(answersArray, selectedIndustry || 'general')
    sessionStorage.setItem('assessmentResult', JSON.stringify(result))
    router.push('/assess/results')
  }

  const handleAddOptional = () => {
    setShowOptionalQuestions(true)
    setStep('optional-questions')
  }

  return (
    <div className="min-h-screen bg-gradient-donyati">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-donyati-black">
            Donyati
          </Link>
          {step !== 'lead-capture' && (
            <button
              onClick={() => router.push('/')}
              className="text-donyati-purple hover:text-donyati-black transition-colors"
            >
              Exit
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {step === 'industry-selection' ? (
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-card">
            <IndustrySelector
              selectedIndustry={selectedIndustry}
              onSelect={handleIndustrySelect}
            />

            {/* Continue Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleIndustryContinue}
                disabled={!selectedIndustry}
                className="px-8 py-3 bg-donyati-lime text-donyati-black rounded-full text-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        ) : step === 'questions' || step === 'optional-questions' ? (
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-card">
            {/* Progress */}
            <div className="mb-8">
              <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
            </div>

            {/* Question */}
            <QuestionCard
              question={currentQuestion}
              selectedValue={answers.get(currentQuestion.id)?.value}
              onSelect={handleSelectAnswer}
            />

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 text-donyati-purple hover:text-donyati-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>

              {step === 'optional-questions' && (
                <button
                  onClick={handleSkipOptional}
                  className="px-6 py-2 text-donyati-purple hover:text-donyati-black transition-colors"
                >
                  Skip to Results →
                </button>
              )}
            </div>
          </div>
        ) : step === 'lead-capture' ? (
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-card">
            <LeadCaptureForm onSubmit={handleLeadSubmit} isSubmitting={isSubmitting} />

            {/* Optional: Add deep-dive questions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-donyati-purple mb-3">
                  Want more detailed insights?
                </p>
                <button
                  onClick={handleAddOptional}
                  className="text-donyati-dark-purple font-medium hover:underline"
                >
                  Answer 7 more questions for deeper analysis
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Reassurance */}
        {step !== 'lead-capture' && (
          <div className="text-center mt-6 text-sm text-donyati-purple">
            Your responses are used only to generate your personalized report.
          </div>
        )}
      </main>
    </div>
  )
}
