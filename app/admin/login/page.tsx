'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function LoginContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Check if dev mode is enabled (we'll show the form regardless and let the backend validate)
  const showDevLogin = true // Form is always shown in dev, but only works if DEV_AUTH_ENABLED=true

  useEffect(() => {
    // If already authenticated, redirect to admin
    if (session) {
      router.push('/admin')
    }
  }, [session, router])

  const handleMicrosoftSignIn = () => {
    signIn('azure-ad', { callbackUrl: '/admin' })
  }

  const handleDevSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')

    const result = await signIn('dev-credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setLoginError('Invalid credentials. Use admin@donyati.com / admin123')
      setIsLoading(false)
    } else if (result?.ok) {
      router.push('/admin')
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-donyati-light-purple to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-donyati-purple"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-donyati-light-purple to-white">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-donyati-black">
              <span className="text-donyati-lime">Donyati</span> Admin
            </h1>
            <p className="text-gray-600 mt-2">AI Maturity Assessment Dashboard</p>
          </div>

          {/* Error Message */}
          {(error || loginError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                {error === 'AccessDenied'
                  ? 'Access denied. Only @donyati.com accounts are allowed.'
                  : error === 'CredentialsSignin'
                  ? 'Invalid credentials.'
                  : loginError || 'An error occurred during sign in. Please try again.'}
              </p>
            </div>
          )}

          {/* Development Login Form */}
          {showDevLogin && (
            <>
              <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-xs text-center">
                  Development Mode - Use: admin@donyati.com / admin123
                </p>
              </div>

              <form onSubmit={handleDevSignIn} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@donyati.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-donyati-purple focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-donyati-purple focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-donyati-lime text-donyati-black rounded-xl hover:opacity-90 transition-colors font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Sign in (Dev Mode)'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
            </>
          )}

          {/* Microsoft Sign In Button */}
          <button
            onClick={handleMicrosoftSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-donyati-dark-purple text-white rounded-xl hover:bg-donyati-purple transition-colors font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="currentColor">
              <path d="M0 0h10v10H0V0zm11 0h10v10H11V0zM0 11h10v10H0V11zm11 0h10v10H11V11z"/>
            </svg>
            Sign in with Microsoft
          </button>

          {/* Info */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Sign in with your @donyati.com Microsoft account
          </p>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a href="/" className="text-donyati-purple hover:underline text-sm">
            &larr; Back to Assessment
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-donyati-light-purple to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-donyati-purple"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
