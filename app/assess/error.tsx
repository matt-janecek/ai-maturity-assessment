'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AssessError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-donyati flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-card max-w-md w-full text-center">
        <Image
          src="/DonyatiLogo.png"
          alt="Donyati"
          width={120}
          height={34}
          className="h-8 w-auto mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-donyati-black mb-2">
          Assessment Error
        </h2>
        <p className="text-donyati-purple mb-6">
          Something went wrong during the assessment. Your progress has been saved.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="bg-donyati-lime text-donyati-black px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="text-donyati-purple hover:text-donyati-dark-purple transition-colors text-sm"
          >
            Start a new assessment
          </Link>
        </div>
      </div>
    </div>
  )
}
