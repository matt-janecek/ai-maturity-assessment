'use client'

import Image from 'next/image'

export default function GlobalError({
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
          Something went wrong
        </h2>
        <p className="text-donyati-purple mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-donyati-lime text-donyati-black px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
