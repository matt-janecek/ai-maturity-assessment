import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'

// Allowed email domain for admin access
const ALLOWED_DOMAIN = '@donyati.com'

// Development credentials (only works when DEV_AUTH_ENABLED=true)
const DEV_USER = {
  id: 'dev-user-1',
  email: 'admin@donyati.com',
  name: 'Dev Admin',
}
const DEV_PASSWORD = 'admin123'

// Build providers list dynamically at runtime (not build time)
function getProviders(): NextAuthOptions['providers'] {
  const providers: NextAuthOptions['providers'] = []

  // Add Azure AD provider if credentials are configured
  if (process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET && process.env.AZURE_AD_TENANT_ID) {
    providers.push(
      AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        tenantId: process.env.AZURE_AD_TENANT_ID,
      })
    )
  }

  // Add development credentials provider if enabled (set DEV_AUTH_ENABLED=true in env)
  if (process.env.DEV_AUTH_ENABLED === 'true') {
    providers.push(
      CredentialsProvider({
        id: 'dev-credentials',
        name: 'Development Login',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'admin@donyati.com' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          // Only allow the dev user with correct password
          if (
            credentials?.email === DEV_USER.email &&
            credentials?.password === DEV_PASSWORD
          ) {
            return DEV_USER
          }
          return null
        },
      })
    )
  }

  // If no providers are configured, log a warning
  if (providers.length === 0) {
    console.error('FATAL: No authentication providers configured. Set either Azure AD credentials or DEV_AUTH_ENABLED=true')
  }

  return providers
}

export const authOptions: NextAuthOptions = {
  providers: getProviders(),
  callbacks: {
    async signIn({ user }) {
      // Only allow @donyati.com emails
      if (user.email && user.email.toLowerCase().endsWith(ALLOWED_DOMAIN)) {
        return true
      }
      // Reject all other emails
      return false
    },
    async session({ session, token }) {
      // Add user ID to session
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
}

// Type augmentation for next-auth
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
