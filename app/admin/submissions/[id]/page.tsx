import { notFound } from 'next/navigation'
import { SubmissionDetail } from '@/components/admin/SubmissionDetail'

// Force dynamic rendering - this page requires database access
export const dynamic = 'force-dynamic'
import { getSubmissionById } from '@/lib/admin/queries'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SubmissionDetailPage({ params }: PageProps) {
  const { id } = await params
  const submissionId = parseInt(id)

  if (isNaN(submissionId)) {
    notFound()
  }

  const submission = await getSubmissionById(submissionId)

  if (!submission) {
    notFound()
  }

  return <SubmissionDetail submission={submission} />
}
