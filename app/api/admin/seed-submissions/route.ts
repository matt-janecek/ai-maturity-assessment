import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { insertSubmission } from '@/lib/db'

const industries = [
  'financial-services', 'healthcare', 'manufacturing', 'retail',
  'technology', 'professional-services', 'energy-utilities', 'government', 'education',
]

const companies = [
  'Acme Corp', 'TechStart Inc', 'Global Finance LLC', 'HealthFirst Medical',
  'ManufacturePro', 'RetailGiant', 'DataDriven Co', 'CloudScale Systems',
  'Enterprise Solutions', 'Innovation Labs', 'Digital Dynamics', 'Smart Systems Inc',
  'Future Tech', 'Quantum Industries', 'NextGen Corp',
]

const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Amanda', 'James', 'Michelle']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']

const titles = [
  'CTO', 'VP of Engineering', 'Director of IT', 'Chief Data Officer',
  'Head of Innovation', 'IT Manager', 'Digital Transformation Lead',
]

const dimensions = [
  'Governance & Risk', 'Developer Enablement', 'Human Oversight',
  'Workflow Integration', 'Platform & Architecture', 'Value Measurement',
  'Data & Model Lifecycle',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomScore(): number {
  return Math.round((Math.random() * 3 + 1) * 10) / 10
}

function getMaturity(score: number) {
  if (score < 1.5) return { level: 1, name: 'AI Aware' }
  if (score < 2.5) return { level: 2, name: 'AI Active' }
  if (score < 3.5) return { level: 3, name: 'AI Operational' }
  return { level: 4, name: 'AI Advanced' }
}

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const count = 25 + Math.floor(Math.random() * 26) // 25-50
    let created = 0

    for (let i = 0; i < count; i++) {
      const firstName = pick(firstNames)
      const lastName = pick(lastNames)
      const company = pick(companies)
      const dimScores = dimensions.map(d => ({
        dimension: d,
        score: randomScore(),
        questionsAnswered: Math.random() > 0.3 ? 2 : 1,
      }))
      const overall = dimScores.reduce((s, d) => s + d.score, 0) / dimScores.length
      const maturity = getMaturity(overall)

      await insertSubmission({
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
        company,
        title: pick(titles),
        industry: pick(industries),
        overallScore: Math.round(overall * 100) / 100,
        maturityLevel: maturity.level,
        maturityName: maturity.name,
        dimensionScores: dimScores,
        industryPercentile: Math.floor(Math.random() * 100),
        isSeeded: true,
      })
      created++
    }

    return NextResponse.json({ success: true, created })
  } catch (error) {
    console.error('Error seeding submissions:', error)
    return NextResponse.json({ error: 'Failed to seed submissions' }, { status: 500 })
  }
}
