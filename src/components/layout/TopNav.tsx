'use client'

import Link from 'next/link'
import { Shuffle, Zap, HelpCircle, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface TopNavProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function TopNav({ collapsed, toggleSidebar }: TopNavProps): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-[#121212] border-b border-[#2D2D2D]/50 flex items-center justify-between px-6">
      {/* Empty div to maintain spacing */}
      <div></div>

      {/* User Controls */}
      <div className="flex items-center gap-4">
        <button className="text-white p-2 rounded-full hover:bg-[#2D2D2D] transition-colors">
          <Shuffle className="h-5 w-5" />
        </button>
        <button className="flex items-center gap-1 text-white bg-[#d61204] hover:bg-[#b81003] px-3 py-1.5 rounded-lg transition-colors">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-medium">Extension</span>
        </button>
        <button className="text-white p-2 rounded-full hover:bg-[#2D2D2D] transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
        
        {/* User profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-[#2D2D2D] overflow-hidden">
              <User className="h-full w-full text-gray-300 p-1.5" />
            </div>
            {dropdownOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 15L12 9L18 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg shadow-lg z-50 py-2 text-white">
              <div className="px-4 py-2 border-b border-[#2D2D2D] mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2D2D2D] overflow-hidden">
                    <User className="h-full w-full text-gray-300 p-1.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ruben S.</p>
                  </div>
                </div>
              </div>
              
              <Link href="/discord" className="block px-4 py-2 hover:bg-[#2D2D2D]">
                Discord
              </Link>
              <Link href="/billing" className="block px-4 py-2 hover:bg-[#2D2D2D]">
                Billing
              </Link>
              <Link href="/affiliates" className="block px-4 py-2 hover:bg-[#2D2D2D]">
                Affiliates
              </Link>
              <Link href="/support" className="block px-4 py-2 hover:bg-[#2D2D2D]">
                Contact support
              </Link>
              <Link href="/bug-report" className="block px-4 py-2 hover:bg-[#2D2D2D]">
                Report a bug
              </Link>
              
              <div className="border-t border-[#2D2D2D] mt-2 pt-2">
                <button 
                  className="block w-full text-left px-4 py-2 hover:bg-[#2D2D2D]"
                  onClick={() => window.location.href = '/'}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 