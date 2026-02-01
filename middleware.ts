import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // If user is authenticated and trying to access admin routes, allow
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if accessing admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          // Allow access to login page without auth
          if (req.nextUrl.pathname === '/admin/login') {
            return true
          }
          // Require authentication for all other admin routes
          return !!token
        }
        // Allow all other routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
