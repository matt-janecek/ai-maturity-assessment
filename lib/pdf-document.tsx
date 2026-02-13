import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import path from 'path'
import { type Industry } from '@/lib/industries'

interface DimensionScore {
  dimension: string
  score: number
  questionsAnswered: number
}

interface AssessmentResult {
  overallScore: number
  maturityLevel: number
  maturityName: string
  dimensionScores: DimensionScore[]
  industry?: Industry
  industryBenchmark?: number
  industryPercentile?: number
}

interface LeadInfo {
  name: string
  email: string
  company: string
  title?: string
}

interface PDFDocumentProps {
  result: AssessmentResult
  leadInfo: LeadInfo
}

const industryNames: Record<Industry, string> = {
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

const levelDescriptions: Record<number, string> = {
  0: 'Early AI interest with risk of overhyping. No formal AI capability.',
  1: 'AI experimentation in isolated contexts. Approved tools deployed.',
  2: 'AI in production, creating value. Team-level adoption.',
  3: 'AI pervasively used for transformation. Enterprise platform.',
  4: 'AI is part of business DNA. Competitive differentiator.',
}

const levelColors: Record<number, string> = {
  0: '#9BBF3B',
  1: '#E8A84C',
  2: '#5D9CEC',
  3: '#6B5B95',
  4: '#9B59B6',
}

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#12002A',
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottom: '2px solid #E8DEF6',
  },
  logo: {
    width: 100,
    height: 28,
  },
  date: {
    fontSize: 10,
    color: '#4A4778',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#12002A',
  },
  subtitle: {
    fontSize: 14,
    color: '#4A4778',
    marginBottom: 15,
  },
  industryBadge: {
    backgroundColor: '#f8f7fc',
    padding: '10px 15px',
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  industryText: {
    fontSize: 11,
  },
  industryLabel: {
    color: '#4A4778',
  },
  industryName: {
    fontWeight: 'bold',
    color: '#45266C',
  },
  scoreSection: {
    backgroundColor: '#f8f7fc',
    borderRadius: 12,
    padding: 25,
    textAlign: 'center',
    marginBottom: 25,
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#45266C',
  },
  scoreLabel: {
    color: '#4A4778',
    marginBottom: 15,
    fontSize: 12,
  },
  levelBadge: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 12,
  },
  levelDescription: {
    color: '#4A4778',
    maxWidth: 350,
    textAlign: 'center',
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#45266C',
    marginBottom: 15,
    marginTop: 20,
  },
  benchmarkSection: {
    backgroundColor: '#f8f7fc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  benchmarkStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#45266C',
  },
  statLabel: {
    fontSize: 10,
    color: '#4A4778',
  },
  benchmarkNote: {
    fontSize: 9,
    color: '#4A4778',
    textAlign: 'center',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f7fc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottom: '1px solid #E8DEF6',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottom: '1px solid #E8DEF6',
  },
  tableColDimension: {
    flex: 2,
  },
  tableColScore: {
    flex: 1,
    textAlign: 'center',
  },
  tableColBar: {
    flex: 2,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#45266C',
    fontSize: 10,
  },
  scoreBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#E8DEF6',
    borderRadius: 4,
  },
  scoreBarFill: {
    height: 8,
    borderRadius: 4,
  },
  ctaSection: {
    backgroundColor: '#45266C',
    borderRadius: 12,
    padding: 25,
    marginTop: 30,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  ctaText: {
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
    fontSize: 11,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#ACC953',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#12002A',
    fontWeight: 'bold',
    fontSize: 11,
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: '1px solid #E8DEF6',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#4A4778',
    textAlign: 'center',
  },
})

export function AssessmentPDFDocument({ result, leadInfo }: PDFDocumentProps) {
  const industryDisplay = result.industry ? industryNames[result.industry] : null
  const showIndustry = industryDisplay && industryDisplay !== 'General / Other'
  const percentileDisplay = result.industryPercentile !== undefined ? result.industryPercentile : null
  const levelColor = levelColors[result.maturityLevel] || levelColors[0]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={path.join(process.cwd(), 'public', 'DonyatiLogo.png')} />
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>AI Maturity Assessment Results</Text>
        <Text style={styles.subtitle}>Assessment for {leadInfo.company}</Text>

        {/* Industry Badge */}
        {showIndustry && (
          <View style={styles.industryBadge}>
            <Text style={styles.industryText}>
              <Text style={styles.industryLabel}>Industry: </Text>
              <Text style={styles.industryName}>{industryDisplay}</Text>
            </Text>
          </View>
        )}

        {/* Score Section */}
        <View style={styles.scoreSection}>
          <Text style={styles.scoreValue}>{result.overallScore.toFixed(1)}</Text>
          <Text style={styles.scoreLabel}>out of 4.0</Text>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text>Level {result.maturityLevel} - {result.maturityName}</Text>
          </View>
          <Text style={styles.levelDescription}>
            {levelDescriptions[result.maturityLevel]}
          </Text>
        </View>

        {/* Industry Benchmark */}
        {percentileDisplay !== null && result.industryBenchmark !== undefined && (
          <View style={styles.benchmarkSection}>
            <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Industry Comparison</Text>
            <View style={styles.benchmarkStats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{percentileDisplay}th</Text>
                <Text style={styles.statLabel}>Percentile</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{result.industryBenchmark.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Industry Avg</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{result.overallScore.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Your Score</Text>
              </View>
            </View>
            <Text style={styles.benchmarkNote}>Compared to {industryDisplay} organizations</Text>
          </View>
        )}

        {/* Dimension Breakdown */}
        <Text style={styles.sectionTitle}>Dimension Breakdown</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableColDimension, styles.headerText]}>Dimension</Text>
            <Text style={[styles.tableColScore, styles.headerText]}>Score</Text>
            <Text style={[styles.tableColBar, styles.headerText]}>Progress</Text>
          </View>

          {/* Table Rows */}
          {result.dimensionScores.map((ds, index) => {
            const level = ds.score < 1 ? 0 : ds.score < 2 ? 1 : ds.score < 3 ? 2 : ds.score < 3.5 ? 3 : 4
            const barColor = levelColors[level]
            const barWidth = `${(ds.score / 4) * 100}%`

            return (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableColDimension}>{ds.dimension}</Text>
                <Text style={[styles.tableColScore, { fontWeight: 'bold' }]}>{ds.score.toFixed(1)}</Text>
                <View style={[styles.tableColBar, styles.scoreBarContainer]}>
                  <View style={styles.scoreBarTrack}>
                    <View style={[styles.scoreBarFill, { width: barWidth, backgroundColor: barColor }]} />
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready for a Full Assessment?</Text>
          <Text style={styles.ctaText}>
            Get detailed recommendations and a customized roadmap for your AI journey.
          </Text>
          <View style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Schedule Consultation</Text>
          </View>
          <Text style={[styles.ctaText, { marginTop: 8, marginBottom: 0, fontSize: 9 }]}>
            outlook.office.com/book/Assessments@donyati.com/?ismsaljsauthenabled
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Donyati AI Assessment Framework | 7 Dimensions</Text>
          <Text style={styles.footerText}>© 2026 Donyati. All rights reserved.</Text>
        </View>
      </Page>
    </Document>
  )
}
