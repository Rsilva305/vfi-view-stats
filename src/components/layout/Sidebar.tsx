'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Bookmark, Layers, Search, Home } from 'lucide-react'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  isActive?: boolean
}

const SidebarItem = ({ icon, label, href, isActive = false }: SidebarItemProps) => {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-[#2D2D2D] text-[#00FF8C]' 
        : 'text-white hover:bg-[#2D2D2D]/70'
    }`}>
      <div className="text-xl">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname === path
  }
  
  return (
    <div className="w-[240px] min-h-screen bg-[#121212] border-r border-[#2D2D2D]/50 py-6 flex flex-col">
      <div className="px-4 mb-6">
        <h2 className="text-white font-bold text-lg">Navigation</h2>
      </div>
      
      <div className="flex flex-col gap-1 px-2">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Home" 
          href="/"
          isActive={isActive('/')} 
        />
        <SidebarItem 
          icon={<Search size={20} />} 
          label="Research" 
          href="/research"
          isActive={isActive('/research')} 
        />
        <SidebarItem 
          icon={<Layers size={20} />} 
          label="Tracked channels" 
          href="/tracked-channels"
          isActive={isActive('/tracked-channels')} 
        />
        <SidebarItem 
          icon={<Bookmark size={20} />} 
          label="Saved videos" 
          href="/saved-videos"
          isActive={isActive('/saved-videos')} 
        />
        <SidebarItem 
          icon={<BookOpen size={20} />} 
          label="Learn" 
          href="/learn"
          isActive={isActive('/learn')} 
        />
      </div>
      
      <div className="mt-auto px-4">
        <div className="border-t border-[#2D2D2D]/50 pt-4">
          <p className="text-[#808080] text-xs">© 2025 VFI Beta</p>
        </div>
      </div>
    </div>
  )
} 