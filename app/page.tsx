'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-donyati">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-donyati-black">Donyati</div>
        </div>
        <nav>
          <Link
            href="/assess"
            className="bg-donyati-black text-white px-6 py-2 rounded-full font-medium hover:bg-donyati-dark-purple transition-colors"
          >
            Start Assessment
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-donyati-black mb-6 leading-tight">
            Discover Your Organization&apos;s<br />
            <span className="text-donyati-dark-purple">AI Maturity Level</span>
          </h1>
          <p className="text-xl text-donyati-purple max-w-2xl mx-auto mb-8">
            Take our free 5-minute assessment to understand where your organization stands
            on the AI adoption journey and get personalized recommendations.
          </p>
          <Link
            href="/assess"
            className="inline-flex items-center gap-2 bg-donyati-lime text-donyati-black px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Free Assessment
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-card card-hover">
            <div className="w-12 h-12 rounded-full bg-level-0 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-donyati-black mb-2">Instant Results</h3>
            <p className="text-donyati-purple">
              Get your AI maturity score and level immediately after completing the assessment.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-card card-hover">
            <div className="w-12 h-12 rounded-full bg-level-2 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-donyati-black mb-2">7 Key Dimensions</h3>
            <p className="text-donyati-purple">
              Comprehensive evaluation across governance, enablement, oversight, and more.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-card card-hover">
            <div className="w-12 h-12 rounded-full bg-level-3 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-donyati-black mb-2">Actionable Insights</h3>
            <p className="text-donyati-purple">
              Receive personalized recommendations to accelerate your AI journey.
            </p>
          </div>
        </div>

        {/* Maturity Levels Preview */}
        <div className="bg-white rounded-2xl p-8 shadow-card mb-16">
          <h2 className="text-2xl font-bold text-donyati-black mb-6 text-center">
            AI Maturity Levels
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { level: 0, name: 'AI-Aware', color: 'level-badge-0' },
              { level: 1, name: 'Tool Adoption', color: 'level-badge-1' },
              { level: 2, name: 'Workflow Integration', color: 'level-badge-2' },
              { level: 3, name: 'Platform & Governance', color: 'level-badge-3' },
              { level: 4, name: 'AI-Native Strategic', color: 'level-badge-4' },
            ].map(({ level, name, color }) => (
              <div key={level} className={`level-badge ${color}`}>
                <span className="text-sm opacity-90">Level {level}</span>
                <span className="block">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What You Get */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-donyati-black mb-8">
            What You&apos;ll Get
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📊', title: 'Maturity Score', desc: 'Your overall AI readiness score' },
              { icon: '📈', title: 'Dimension Breakdown', desc: 'Scores across 7 key areas' },
              { icon: '💡', title: 'Top Recommendations', desc: 'Priority actions to improve' },
              { icon: '📋', title: 'PDF Summary', desc: 'Downloadable report to share' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-card">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-donyati-black mb-1">{title}</h3>
                <p className="text-sm text-donyati-purple">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-donyati-dark-purple to-donyati-purple rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Assess Your AI Maturity?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join hundreds of organizations who have used our framework to accelerate their AI adoption journey.
          </p>
          <Link
            href="/assess"
            className="inline-flex items-center gap-2 bg-white text-donyati-dark-purple px-8 py-4 rounded-full text-lg font-bold hover:bg-donyati-light-purple transition-colors"
          >
            Start Assessment Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-donyati-purple text-sm">
            © 2026 Donyati. All rights reserved.
          </div>
          <div className="text-donyati-purple text-sm">
            Donyati AI Assessment Framework | 7 Dimensions
          </div>
        </div>
      </footer>
    </div>
  )
}
