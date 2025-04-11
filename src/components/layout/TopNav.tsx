'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, Shuffle, Zap, HelpCircle, User } from 'lucide-react'

export default function TopNav(): JSX.Element {
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
        <button className="w-8 h-8 rounded-full bg-[#2D2D2D] overflow-hidden">
          <User className="h-full w-full text-gray-300 p-1.5" />
        </button>
      </div>
    </header>
  )
} 