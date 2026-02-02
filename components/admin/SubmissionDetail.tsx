'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AssessmentSubmission, DimensionScore } from '@/lib/db'
import { DeleteConfirmModal } from './DeleteConfirmModal'

const industryNames: Record<string, string> = {
  'financial-services': 'Financial Services',
  'healthcare': 'Healthcare & Life Sciences',
  'manufacturing': 'Manufacturing',
  'retail': 'Retail & Consumer Goods',
  'technology': 'Technology & Software',
  'professional-services': 'Professional Services',
  'energy-utilities': 'Energy & Utilities',
  'government': 'Government & Public Sector',
  'education': 'Education',
  'media-entertainment': 'Media & Entertainment',
  'transportation-logistics': 'Transportation & Logistics',
  'general': 'General / Other',
}

const maturityDescriptions: Record<number, { name: string; description: string }> = {
  0: {
    name: 'AI-Aware',
    description: 'Beginning AI exploration with limited implementations',
  },
  1: {
    name: 'Tool Adoption',
    description: 'Individual AI tools in use but not integrated',
  },
  2: {
    name: 'Workflow Integration',
    description: 'AI embedded in business workflows with governance',
  },
  3: {
    name: 'Platform & Governance',
    description: 'Centralized AI platform with enterprise-wide governance',
  },
  4: {
    name: 'AI-Native Strategic',
    description: 'AI is core to business strategy and operations',
  },
}

const levelColors: Record<number, string> = {
  0: 'from-level-0 to-green-600',
  1: 'from-level-1 to-orange-600',
  2: 'from-level-2 to-blue-600',
  3: 'from-level-3 to-purple-700',
  4: 'from-level-4 to-purple-900',
}

interface SubmissionDetailProps {
  submission: AssessmentSubmission
}

export function SubmissionDetail({ submission }: SubmissionDetailProps) {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/submissions')
      } else {
        alert('Failed to delete submission')
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
      alert('Failed to delete submission')
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const dimensionScores = (
    typeof submission.dimension_scores === 'string'
      ? JSON.parse(submission.dimension_scores)
      : submission.dimension_scores
  ) as DimensionScore[]

  const maturityInfo = maturityDescriptions[submission.maturity_level] || {
    name: 'Unknown',
    description: '',
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/submissions"
        className="inline-flex items-center text-donyati-purple hover:text-donyati-dark-purple"
      >
        <span className="mr-2">&larr;</span>
        Back to Submissions
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{submission.name}</h1>
          <p className="text-gray-600 mt-1">{submission.company}</p>
        </div>
        <div className="text-right">
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r ${
              levelColors[submission.maturity_level] || 'from-gray-500 to-gray-600'
            }`}
          >
            Level {submission.maturity_level}: {maturityInfo.name}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Information
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-500">Name</dt>
              <dd className="text-gray-900 font-medium">{submission.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd>
                <a
                  href={`mailto:${submission.email}`}
                  className="text-donyati-purple hover:underline"
                >
                  {submission.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Company</dt>
              <dd className="text-gray-900">{submission.company || '-'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Title</dt>
              <dd className="text-gray-900">{submission.title || '-'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Phone</dt>
              <dd className="text-gray-900">
                {submission.phone ? (
                  <a href={`tel:${submission.phone}`} className="text-donyati-purple hover:underline">
                    {submission.phone}
                  </a>
                ) : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Company Size</dt>
              <dd className="text-gray-900">{submission.company_size || '-'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Industry</dt>
              <dd className="text-gray-900">
                {submission.industry
                  ? industryNames[submission.industry] || submission.industry
                  : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Submitted</dt>
              <dd className="text-gray-900">{formatDate(submission.created_at)}</dd>
            </div>
          </dl>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Assessment Results
          </h2>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-donyati-dark-purple">
              {Number(submission.overall_score).toFixed(2)}
            </div>
            <div className="text-gray-500 mt-1">out of 4.0</div>
          </div>

          <div
            className={`p-4 rounded-lg bg-gradient-to-r ${
              levelColors[submission.maturity_level] || 'from-gray-500 to-gray-600'
            } text-white`}
          >
            <div className="font-semibold">
              Level {submission.maturity_level}: {maturityInfo.name}
            </div>
            <div className="text-sm mt-1 opacity-90">
              {maturityInfo.description}
            </div>
          </div>

          {submission.industry_percentile !== null && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Industry Percentile</div>
              <div className="text-2xl font-bold text-gray-900">
                {submission.industry_percentile}
                <span className="text-base font-normal text-gray-500">th</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Better than {submission.industry_percentile}% of organizations
                in this industry
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a
              href={`mailto:${submission.email}?subject=Your%20AI%20Maturity%20Assessment%20Results&body=Hi%20${encodeURIComponent(
                submission.name.split(' ')[0]
              )},%0A%0AThank%20you%20for%20completing%20the%20AI%20Maturity%20Assessment.%20I%27d%20love%20to%20discuss%20your%20results%20and%20how%20Donyati%20can%20help%20accelerate%20your%20AI%20journey.%0A%0AYour%20overall%20score%20was%20${Number(
                submission.overall_score
              ).toFixed(
                2
              )}%2F4.0%20(Level%20${submission.maturity_level}%20-%20${maturityInfo.name}).%0A%0ABest%20regards`}
              className="flex items-center justify-center w-full px-4 py-3 bg-donyati-purple text-white rounded-lg hover:bg-donyati-dark-purple transition-colors"
            >
              <span className="mr-2">📧</span>
              Email Lead
            </a>
            <a
              href="https://outlook.office365.com/book/Donyati@donyati.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-4 py-3 bg-donyati-lime text-donyati-black rounded-lg hover:opacity-90 transition-colors"
            >
              <span className="mr-2">📅</span>
              Book Meeting
            </a>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center justify-center w-full px-4 py-3 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              <span className="mr-2">🗑️</span>
              Delete Submission
            </button>
          </div>
        </div>
      </div>

      {/* Tracking & Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location & Device */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Location & Device
          </h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">IP Address</dt>
              <dd className="text-gray-900 font-mono text-sm">{submission.ip_address || '-'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Location</dt>
              <dd className="text-gray-900 text-sm">
                {submission.city || submission.region || submission.country
                  ? [submission.city, submission.region, submission.country].filter(Boolean).join(', ')
                  : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500 mb-1">User Agent</dt>
              <dd className="text-gray-700 text-xs font-mono bg-gray-50 p-2 rounded break-all">
                {submission.user_agent || '-'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Time to Complete</dt>
              <dd className="text-gray-900 text-sm">
                {submission.time_to_complete_seconds
                  ? `${Math.floor(submission.time_to_complete_seconds / 60)}m ${submission.time_to_complete_seconds % 60}s`
                  : '-'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Marketing Attribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Marketing Attribution
          </h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Referrer</dt>
              <dd className="text-gray-900 text-sm truncate max-w-[200px]" title={submission.referrer_url || ''}>
                {submission.referrer_url || 'Direct'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">UTM Source</dt>
              <dd className="text-gray-900 text-sm">{submission.utm_source || '-'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">UTM Medium</dt>
              <dd className="text-gray-900 text-sm">{submission.utm_medium || '-'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">UTM Campaign</dt>
              <dd className="text-gray-900 text-sm">{submission.utm_campaign || '-'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">UTM Term</dt>
              <dd className="text-gray-900 text-sm">{submission.utm_term || '-'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">UTM Content</dt>
              <dd className="text-gray-900 text-sm">{submission.utm_content || '-'}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Dimension Scores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dimensionScores.map((dim) => (
            <div
              key={dim.dimension}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 text-sm">
                  {dim.dimension}
                </h3>
                <span className="text-lg font-bold text-donyati-dark-purple">
                  {dim.score.toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-donyati-purple rounded-full h-2 transition-all"
                  style={{ width: `${(dim.score / 4) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {dim.questionsAnswered} question{dim.questionsAnswered !== 1 ? 's' : ''} answered
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        submissionName={submission.name}
        submissionCompany={submission.company || ''}
      />
    </div>
  )
}
