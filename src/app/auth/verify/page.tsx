'use client'

import Link from 'next/link'

export default function VerifyEmail() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#121212] p-8">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-[#2D2D2D] bg-[#1A1A1A] p-8 text-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Check your email</h1>
          <p className="mt-4 text-gray-400">
            We've sent you a verification email. Please click the link in that email to verify your account.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <div className="rounded-md bg-[#2D2D2D] p-4 text-sm text-gray-300">
            <p>
              <strong>Didn't receive an email?</strong>
            </p>
            <p className="mt-2">
              Check your spam folder or try signing up again with the same email.
            </p>
          </div>

          <Link
            href="/auth/login"
            className="mt-4 inline-flex w-full justify-center rounded-md bg-[#1DB954] px-4 py-2 text-sm font-medium text-white hover:bg-[#1DB954]/90 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] focus:ring-offset-2"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
} 