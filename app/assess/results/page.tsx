'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { DimensionChart } from '@/components/DimensionChart'
import { RecommendationsPreview } from '@/components/RecommendationsPreview'
import { BenchmarkComparison } from '@/components/BenchmarkComparison'
import { BookingsEmbed } from '@/components/BookingsEmbed'
import { type AssessmentResult } from '@/lib/scoring'
import { getTriggeredRecommendations } from '@/lib/recommendations'
import { type LeadInfo } from '@/components/LeadCaptureForm'
import { type Industry, getIndustryInfo } from '@/lib/industries'

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [leadInfo, setLeadInfo] = useState<LeadInfo | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    // Retrieve results from sessionStorage
    const storedResult = sessionStorage.getItem('assessmentResult')
    const storedLead = sessionStorage.getItem('leadInfo')

    if (!storedResult) {
      // No results, redirect to assessment
      router.push('/assess')
      return
    }

    setResult(JSON.parse(storedResult))
    if (storedLead) {
      setLeadInfo(JSON.parse(storedLead))
    }
  }, [router])

  const handleDownloadPDF = async () => {
    if (!result || !leadInfo) return

    setIsGeneratingPDF(true)
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result, leadInfo }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `AI-Maturity-Assessment-${leadInfo.company.replace(/\s+/g, '-')}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-donyati flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-donyati-purple border-t-transparent" />
      </div>
    )
  }

  const allRecommendations = getTriggeredRecommendations(result.dimensionScores)
  const industryInfo = result.industry ? getIndustryInfo(result.industry) : null

  return (
    <div className="min-h-screen bg-gradient-donyati">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/DonyatiLogo.png" alt="Donyati" width={120} height={34} className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base text-donyati-purple hover:text-donyati-black transition-colors disabled:opacity-50"
            >
              {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="hidden sm:inline">Generating...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </button>
            <Link
              href="/"
              className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-donyati-black text-white rounded-full font-medium hover:bg-donyati-dark-purple transition-colors whitespace-nowrap"
            >
              New Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-donyati-black mb-2">
            Your AI Maturity Assessment Results
            {industryInfo && industryInfo.id !== 'general' && (
              <span className="block text-lg sm:text-xl font-normal text-donyati-purple mt-1">
                {industryInfo.icon} {industryInfo.name}
              </span>
            )}
          </h1>
          {leadInfo && (
            <p className="text-donyati-purple">
              Assessment for {leadInfo.company}
            </p>
          )}
        </div>

        {/* Score and Dimensions */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Overall Score */}
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-card">
            <ScoreDisplay
              score={result.overallScore}
              level={result.maturityLevel}
              levelName={result.maturityName}
            />
          </div>

          {/* Dimension Breakdown */}
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-card">
            <DimensionChart dimensionScores={result.dimensionScores} />
          </div>
        </div>

        {/* Industry Benchmark Comparison */}
        {result.industry && (
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-card mb-8">
            <BenchmarkComparison
              score={result.overallScore}
              industry={result.industry}
            />
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-card mb-8">
          <RecommendationsPreview
            recommendations={allRecommendations}
            industry={result.industry}
          />
        </div>

        {/* Maturity Model Infographic */}
        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-card mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-donyati-black mb-4 sm:mb-6 text-center">
            Your Position on the AI Maturity Journey
          </h3>
          <div className="flex justify-center items-end gap-1 sm:gap-2 h-48 sm:h-64 mb-4">
            {[0, 1, 2, 3, 4].map((level) => {
              const isCurrentLevel = level === result.maturityLevel
              const heights = [40, 55, 70, 85, 100]

              return (
                <div
                  key={level}
                  className="flex flex-col items-center"
                  style={{ height: '100%' }}
                >
                  <div
                    className={`w-12 sm:w-16 md:w-20 rounded-t-lg transition-all duration-500 ${
                      isCurrentLevel ? 'ring-2 sm:ring-4 ring-donyati-lime ring-offset-1 sm:ring-offset-2' : ''
                    } level-badge-${level}`}
                    style={{ height: `${heights[level]}%` }}
                  />
                  <div className={`text-xs mt-1 sm:mt-2 font-medium ${isCurrentLevel ? 'text-donyati-black' : 'text-donyati-purple'}`}>
                    L{level}
                  </div>
                  {isCurrentLevel && (
                    <div className="text-[10px] sm:text-xs text-donyati-dark-purple font-bold mt-1">
                      You are here
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-5 text-[10px] sm:text-xs text-donyati-purple mt-4 px-1 sm:px-2 text-center gap-1">
            <span>AI-Aware</span>
            <span>Tool Adoption</span>
            <span>Workflow Integration</span>
            <span>Platform & Governance</span>
            <span>AI-Native Strategic</span>
          </div>
        </div>

        {/* Schedule Consultation */}
        <BookingsEmbed />

        {/* Share Results */}
        <div className="text-center mt-8 text-sm text-donyati-purple">
          <p>
            Results are stored in your browser. Download the PDF to keep a permanent copy.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/DonyatiLogo.png" alt="Donyati" width={80} height={23} className="h-6 w-auto opacity-70" />
            <span className="text-donyati-purple text-sm">© 2026 Donyati. All rights reserved.</span>
          </div>
          <div className="text-donyati-purple text-sm">
            Donyati AI Assessment Framework | 7 Dimensions
          </div>
        </div>
      </footer>
    </div>
  )
}
