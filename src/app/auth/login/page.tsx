'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      router.refresh()
      router.push('/')
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#121212] p-8">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-400">Sign in to your VFI account</p>
        </div>

        {error && (
          <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-[#2D2D2D] bg-[#2D2D2D] px-3 py-2 text-white placeholder-gray-500 focus:border-[#00FF8C] focus:outline-none focus:ring-1 focus:ring-[#00FF8C]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-[#2D2D2D] bg-[#2D2D2D] px-3 py-2 text-white placeholder-gray-500 focus:border-[#00FF8C] focus:outline-none focus:ring-1 focus:ring-[#00FF8C]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-[#1DB954] px-4 py-2 text-sm font-medium text-white hover:bg-[#1DB954]/90 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-[#00FF8C] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 