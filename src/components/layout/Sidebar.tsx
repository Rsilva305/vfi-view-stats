'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Bookmark, Layers, Search, AlignJustify } from 'lucide-react'

// SidebarItem component for rendering individual navigation items
interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  isActive?: boolean
  collapsed?: boolean
}

const SidebarItem = ({ icon, label, href, isActive, collapsed }: SidebarItemProps): JSX.Element => {
  return (
    <Link 
      href={href}
      className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-3'} py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-[#d61204]/10 text-[#d61204]' 
          : 'text-gray-400 hover:bg-[#2D2D2D] hover:text-white'
      }`}
    >
      <div className={collapsed ? 'flex justify-center items-center w-full' : ''}>
        {icon}
      </div>
      {!collapsed && <span className="text-sm font-medium transition-opacity duration-200">{label}</span>}
    </Link>
  )
}

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ collapsed, toggleSidebar }: SidebarProps): JSX.Element {
  const pathname = usePathname()
  
  const isActive = (path: string): boolean => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }
  
  return (
    <div 
      className={`${
        collapsed ? 'w-[84px]' : 'w-[240px]'
      } min-h-screen bg-[#121212] border-r border-[#2D2D2D]/50 py-6 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {collapsed ? (
        <>
          <div className="flex justify-center mb-6">
            <button 
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#2D2D2D] transition-colors"
              aria-label="Expand sidebar"
            >
              <AlignJustify className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex justify-center mb-6">
            <Link href="/research">
              <div className="text-[#d61204]">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0C8.95 0 0 8.95 0 20C0 31.05 8.95 40 20 40C31.05 40 40 31.05 40 20C40 8.95 31.05 0 20 0ZM16 29V11L30 20L16 29Z" fill="#d61204"/>
                </svg>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className="px-4 mb-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/research" className="flex items-center gap-2">
            <div className="text-[#d61204]">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C8.95 0 0 8.95 0 20C0 31.05 8.95 40 20 40C31.05 40 40 31.05 40 20C40 8.95 31.05 0 20 0ZM16 29V11L30 20L16 29Z" fill="#d61204"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl">VUEIQ</span>
            <span className="text-[#d61204] text-xs font-medium px-1.5 py-0.5 bg-[#d61204]/10 rounded">Beta</span>
          </Link>

          <button 
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#2D2D2D] transition-colors ml-auto"
            aria-label="Collapse sidebar"
          >
            <AlignJustify className="h-5 w-5" />
          </button>
        </div>
      )}
      
      <div className="flex flex-col gap-1 px-2">
        <SidebarItem 
          icon={<Search size={20} />} 
          label="Research" 
          href="/research"
          isActive={isActive('/research')} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Layers size={20} />} 
          label="Tracked channels" 
          href="/tracked-channels"
          isActive={isActive('/tracked-channels')} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Bookmark size={20} />} 
          label="Saved videos" 
          href="/saved-videos"
          isActive={isActive('/saved-videos')} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<BookOpen size={20} />} 
          label="Learn" 
          href="/learn"
          isActive={isActive('/learn')} 
          collapsed={collapsed}
        />
      </div>
      
      <div className="mt-auto px-4">
        {!collapsed && (
          <div className="border-t border-[#2D2D2D]/50 pt-4">
            <p className="text-[#808080] text-xs">© 2025 VueIQ</p>
          </div>
        )}
      </div>
    </div>
  )
} 