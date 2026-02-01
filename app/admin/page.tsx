import Link from 'next/link'
import { getAnalytics, getSubmissions } from '@/lib/admin/queries'
import { isDatabaseAvailable } from '@/lib/db'

// Force dynamic rendering - this page requires database access
export const dynamic = 'force-dynamic'
import { AnalyticsCards } from '@/components/admin/AnalyticsCards'
import { TimeSeriesChart } from '@/components/admin/TimeSeriesChart'
import { IndustryChart } from '@/components/admin/IndustryChart'
import { ScoreDistribution } from '@/components/admin/ScoreDistribution'
import { MaturityLevelChart } from '@/components/admin/MaturityLevelChart'

export default async function AdminDashboard() {
  // Check if database is available
  if (!isDatabaseAvailable()) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            AI Maturity Assessment analytics and insights
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Database Not Configured</h2>
          <p className="text-yellow-700">
            To view analytics and submissions, please set the <code className="bg-yellow-100 px-1 rounded">DATABASE_URL</code> environment variable in your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file.
          </p>
          <p className="text-yellow-700 mt-2">
            See the setup instructions for creating a Neon database.
          </p>
        </div>
      </div>
    )
  }

  // Fetch analytics and recent submissions in parallel
  const [analytics, recentSubmissions] = await Promise.all([
    getAnalytics(),
    getSubmissions({ page: 1, pageSize: 5, sortBy: 'created_at', sortOrder: 'desc' }),
  ])

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

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          AI Maturity Assessment analytics and insights
        </p>
      </div>

      {/* Stats Cards */}
      <AnalyticsCards
        totalSubmissions={analytics.totalSubmissions}
        averageScore={analytics.averageScore}
      />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions Over Time */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Submissions (Last 30 Days)
          </h2>
          <TimeSeriesChart data={analytics.recentTrend} />
        </div>

        {/* Industry Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Submissions by Industry
          </h2>
          <IndustryChart data={analytics.submissionsByIndustry} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Score Distribution
          </h2>
          <ScoreDistribution data={analytics.scoreDistribution} />
        </div>

        {/* Maturity Level Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Maturity Level Distribution
          </h2>
          <MaturityLevelChart data={analytics.submissionsByMaturityLevel} />
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Submissions
          </h2>
          <Link
            href="/admin/submissions"
            className="text-donyati-purple hover:text-donyati-dark-purple font-medium text-sm"
          >
            View All →
          </Link>
        </div>

        {recentSubmissions.data.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No submissions yet
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentSubmissions.data.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(submission.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {submission.name}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {submission.company || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {submission.industry
                      ? industryNames[submission.industry] || submission.industry
                      : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {Number(submission.overall_score).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/submissions/${submission.id}`}
                      className="text-donyati-purple hover:text-donyati-dark-purple text-sm font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
