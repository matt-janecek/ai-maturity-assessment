import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Sample data for realistic test submissions
const industries = [
  'financial-services',
  'healthcare',
  'manufacturing',
  'retail',
  'technology',
  'professional-services',
  'energy-utilities',
  'government',
  'education',
]

const companies = [
  'Acme Corp',
  'TechStart Inc',
  'Global Finance LLC',
  'HealthFirst Medical',
  'ManufacturePro',
  'RetailGiant',
  'DataDriven Co',
  'CloudScale Systems',
  'Enterprise Solutions',
  'Innovation Labs',
  'Digital Dynamics',
  'Smart Systems Inc',
  'Future Tech',
  'Quantum Industries',
  'NextGen Corp',
]

const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Amanda', 'James', 'Michelle', 'Christopher', 'Ashley', 'Daniel', 'Jennifer', 'Matthew']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson']

const titles = [
  'CTO',
  'VP of Engineering',
  'Director of IT',
  'Chief Data Officer',
  'Head of Innovation',
  'IT Manager',
  'Digital Transformation Lead',
  'VP of Technology',
  'Director of Analytics',
  'Senior Architect',
]

const dimensions = [
  'Governance & Risk',
  'Developer Enablement',
  'Human Oversight',
  'Workflow Integration',
  'Platform & Architecture',
  'Value Measurement',
  'Data & Model Lifecycle',
]

const maturityLevels = [
  { level: 1, name: 'AI Aware' },
  { level: 2, name: 'AI Active' },
  { level: 3, name: 'AI Operational' },
  { level: 4, name: 'AI Advanced' },
]

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomScore(): number {
  // Generate scores with a slight bias toward middle values
  const base = Math.random() * 3 + 1 // 1-4
  return Math.round(base * 10) / 10
}

function generateDimensionScores() {
  return dimensions.map(dimension => ({
    dimension,
    score: randomScore(),
    questionsAnswered: Math.random() > 0.3 ? 2 : 1,
  }))
}

function getMaturityFromScore(score: number) {
  if (score < 1.5) return maturityLevels[0]
  if (score < 2.5) return maturityLevels[1]
  if (score < 3.5) return maturityLevels[2]
  return maturityLevels[3]
}

function randomDate(daysBack: number): Date {
  const now = new Date()
  const pastDate = new Date(now.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000)
  return pastDate
}

async function seed() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is not set')
    process.exit(1)
  }

  const sql = neon(databaseUrl)

  console.log('Seeding database with test data...\n')

  const submissions = []
  const numSubmissions = 25

  for (let i = 0; i < numSubmissions; i++) {
    const firstName = randomElement(firstNames)
    const lastName = randomElement(lastNames)
    const name = `${firstName} ${lastName}`
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomElement(companies).toLowerCase().replace(/\s+/g, '')}.com`
    const company = randomElement(companies)
    const title = randomElement(titles)
    const industry = randomElement(industries)
    const dimensionScores = generateDimensionScores()
    const overallScore = dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length
    const maturity = getMaturityFromScore(overallScore)
    const industryPercentile = Math.floor(Math.random() * 100)
    const createdAt = randomDate(45) // Last 45 days

    submissions.push({
      name,
      email,
      company,
      title,
      industry,
      overallScore: Math.round(overallScore * 100) / 100,
      maturityLevel: maturity.level,
      maturityName: maturity.name,
      dimensionScores,
      industryPercentile,
      createdAt,
    })
  }

  // Sort by date so they appear in chronological order
  submissions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  for (const sub of submissions) {
    await sql`
      INSERT INTO assessment_submissions (
        name, email, company, title, industry,
        overall_score, maturity_level, maturity_name,
        dimension_scores, industry_percentile, created_at
      ) VALUES (
        ${sub.name},
        ${sub.email},
        ${sub.company},
        ${sub.title},
        ${sub.industry},
        ${sub.overallScore},
        ${sub.maturityLevel},
        ${sub.maturityName},
        ${JSON.stringify(sub.dimensionScores)},
        ${sub.industryPercentile},
        ${sub.createdAt.toISOString()}
      )
    `
    console.log(`✓ Added: ${sub.name} (${sub.company}) - Level ${sub.maturityLevel}`)
  }

  console.log(`\n✅ Seeded ${numSubmissions} test submissions`)
}

seed().catch(console.error)
