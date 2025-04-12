'use client'

import Link from 'next/link'
import { Shuffle, Zap, HelpCircle, User } from 'lucide-react'

interface TopNavProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function TopNav({ collapsed, toggleSidebar }: TopNavProps): JSX.Element {
  return (
    <header className="h-16 bg-[#121212] border-b border-[#2D2D2D]/50 flex items-center justify-between px-6">
      {/* Logo */}
      <Link href="/research" className="flex items-center gap-2">
        <span className="text-white font-bold text-xl">VELIO</span>
        <span className="text-[#00FF8C] text-xs font-medium px-1.5 py-0.5 bg-[#00FF8C]/10 rounded">Beta</span>
      </Link>

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