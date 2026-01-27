'use client'

interface BookingsEmbedProps {
  bookingsUrl?: string
}

export function BookingsEmbed({ bookingsUrl }: BookingsEmbedProps) {
  // Default to a placeholder URL - replace with actual Microsoft Bookings URL
  const url = bookingsUrl || 'https://outlook.office365.com/book/Donyati@donyati.com/'

  return (
    <div className="bg-gradient-to-r from-donyati-dark-purple to-donyati-purple rounded-2xl p-8 text-center">
      <h3 className="text-2xl font-bold text-white mb-4">
        Ready to Accelerate Your AI Journey?
      </h3>
      <p className="text-white/80 mb-6 max-w-md mx-auto">
        Schedule a free 30-minute consultation with our AI strategy experts to discuss your results and create a customized roadmap.
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white text-donyati-dark-purple px-8 py-4 rounded-full text-lg font-bold hover:bg-donyati-light-purple transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        Schedule Consultation
      </a>

      <div className="mt-6 flex justify-center items-center gap-4 text-white/60 text-sm">
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          30 minutes
        </span>
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          Video call
        </span>
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Free
        </span>
      </div>
    </div>
  )
}
