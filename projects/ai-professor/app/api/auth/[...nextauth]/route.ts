// NextAuth.js Authentication Route

import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getSupabaseAdmin } from '@/lib/supabase'

// Conditionally import OAuth providers
let GoogleProvider: any = null
let GitHubProvider: any = null
try {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    GoogleProvider = require('next-auth/providers/google').default
  }
} catch {}
try {
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    GitHubProvider = require('next-auth/providers/github').default
  }
} catch {}

// Auth options factory - creates options at runtime
function getAuthOptions(): NextAuthOptions {
  // Only include OAuth providers if credentials are configured
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: any[] = [
    // Email/Password authentication
    CredentialsProvider( {
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password required')
          }

          const supabaseAdmin = getSupabaseAdmin()
          const { data, error } = await supabaseAdmin.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            throw new Error(error.message)
          }

          if (!data.user) {
            throw new Error('User not found')
          }

          // Get user profile
          const { data: profile } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single() as any

          return {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || data.user.email!.split('@')[0],
            image: data.user.user_metadata?.avatar_url,
            subscription_tier: profile?.subscription_tier || 'free',
          }
        },
      }),

      // Conditionally add OAuth providers
      ...(GoogleProvider ? [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      })] : []),
      ...(GitHubProvider ? [GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      })] : []),
    ]

    return {
      providers,

      callbacks: {
      async jwt({ token, user, account }) {
        // Initial sign in
        if (account && user) {
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.id = user.id
          token.subscription_tier = (user as any).subscription_tier || 'free'
        }

        return token
      },

      async session({ session, token }) {
        if (token) {
          session.user.id = token.id as string
          session.user.subscription_tier = token.subscription_tier as string
          session.accessToken = token.accessToken as string
        }

        return session
      },

      async signIn({ user, account, profile }) {
        // Handle OAuth sign in
        if (account?.provider !== 'credentials') {
          const supabaseAdmin = getSupabaseAdmin()
          // Check if user exists
          const { data: existingUser } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', user.email!)
            .single()

          if (!existingUser) {
            // Create new user
            const { error } = await supabaseAdmin.from('users').insert({
              id: user.id,
              email: user.email!,
              subscription_tier: 'free',
            } as any)

            if (error) {
              console.error('Failed to create user:', error)
              return false
            }
          }
        }

        return true
      },
    },

    pages: {
      signIn: '/auth/login',
      signOut: '/auth/signout',
      error: '/auth/error',
      verifyRequest: '/auth/verify-request',
      newUser: '/auth/new-user',
    },

    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    events: {
      async createUser({ user }) {
        // Send welcome email
        try {
          const { sendEmail, emailTemplates } = await import('@/lib/email')
          const template = emailTemplates.welcome(
            user.name || user.email!.split('@')[0],
            user.email!
          )
          
          await sendEmail({
            to: user.email!,
            subject: template.subject,
            html: template.html,
            text: template.text,
          })
        } catch (error) {
          console.error('Failed to send welcome email:', error)
        }
      },
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
  }
}

// Export authOptions as a getter for backward compatibility
export const authOptions = new Proxy({} as NextAuthOptions, {
  get(target, prop) {
    const options = getAuthOptions()
    return options[prop as keyof NextAuthOptions]
  }
})

const handler = NextAuth(getAuthOptions())

export { handler as GET, handler as POST }
