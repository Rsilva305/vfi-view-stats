'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Shuffle, Zap, HelpCircle, User, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function TopNav() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="h-16 bg-[#121212] border-b border-[#2D2D2D]/50 flex items-center justify-between px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-white font-bold text-xl">VFI</span>
        <span className="text-[#00FF8C] text-xs font-medium px-1.5 py-0.5 bg-[#00FF8C]/10 rounded">Beta</span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search a concept"
            className="w-full bg-[#2D2D2D] text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#00FF8C]"
          />
        </div>
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-4">
        <button className="text-white p-2 rounded-full hover:bg-[#2D2D2D] transition-colors">
          <Shuffle className="h-5 w-5" />
        </button>
        <button className="flex items-center gap-1 text-white bg-[#1DB954] hover:bg-[#1DB954]/90 px-3 py-1.5 rounded-lg transition-colors">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-medium">Extension</span>
        </button>
        <button className="text-white p-2 rounded-full hover:bg-[#2D2D2D] transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
        
        {!loading && (
          user ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full bg-[#2D2D2D] overflow-hidden flex items-center justify-center"
              >
                {user.user_metadata?.avatar_url ? (
                  <Image 
                    src={user.user_metadata.avatar_url} 
                    alt="User avatar" 
                    width={32} 
                    height={32} 
                    className="object-cover" 
                  />
                ) : (
                  <User className="h-5 w-5 text-gray-300" />
                )}
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2D2D2D] z-10">
                  <div className="px-4 py-3 border-b border-[#2D2D2D]">
                    <p className="text-sm text-white font-medium truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link 
                      href="/tracked-channels"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2D2D2D] hover:text-white"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Tracked Channels
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-[#2D2D2D]"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1 text-white border border-[#2D2D2D] hover:bg-[#2D2D2D] px-3 py-1.5 rounded-lg transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Sign in</span>
            </Link>
          )
        )}
      </div>
    </header>
  )
} 