'use client'

import VideoGrid from "@/components/layout/VideoGrid";
import { ZoomIn, ZoomOut, LayoutGrid, List } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

// Mock data for videos
const mockVideos = [
  {
    id: "1",
    title: "How to Build a Modern React Application with NextJS and TypeScript",
    thumbnail: "https://picsum.photos/id/1/640/360",
    duration: "15:42",
    channelName: "Dev Masters",
    channelAvatar: "https://picsum.photos/id/100/64/64",
    views: "246K",
    timestamp: "3 days ago"
  },
  {
    id: "2",
    title: "Learn CSS Grid Layout in 20 Minutes - Quick Tutorial for Beginners",
    thumbnail: "https://picsum.photos/id/2/640/360",
    duration: "20:15",
    channelName: "CSS Wizards",
    channelAvatar: "https://picsum.photos/id/101/64/64",
    views: "189K",
    timestamp: "1 week ago"
  },
  {
    id: "3",
    title: "JavaScript ES6: The Complete Guide to Modern JavaScript Features",
    thumbnail: "https://picsum.photos/id/3/640/360",
    duration: "32:17",
    channelName: "JS Guru",
    channelAvatar: "https://picsum.photos/id/102/64/64",
    views: "412K",
    timestamp: "2 weeks ago"
  },
  {
    id: "4",
    title: "Building Responsive Websites with Tailwind CSS - Complete Walkthrough",
    thumbnail: "https://picsum.photos/id/4/640/360",
    duration: "28:09",
    channelName: "Web Design Pro",
    channelAvatar: "https://picsum.photos/id/103/64/64",
    views: "178K",
    timestamp: "4 days ago"
  }
];

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const router = useRouter()
  const supabase = createClient()
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        if (!data.user) {
          console.log("Not logged in, redirecting to login")
          router.push('/auth/login')
        } else {
          console.log("User authenticated:", data.user.email)
          setUser(data.user)
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [supabase, router])

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><p className="text-white text-xl">Loading...</p></div>
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen"><p className="text-white text-xl">Redirecting to login...</p></div>
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Recommended Videos</h1>
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              onClick={handleZoomOut}
              className="p-2 text-white hover:bg-[#3D3D3D] transition-colors"
            >
              <ZoomOut size={18} />
            </button>
            <button 
              onClick={handleZoomIn}
              className="p-2 text-white hover:bg-[#3D3D3D] transition-colors"
            >
              <ZoomIn size={18} />
            </button>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'text-[#00FF8C] bg-[#3D3D3D]' : 'text-white hover:bg-[#3D3D3D]'} transition-colors`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'text-[#00FF8C] bg-[#3D3D3D]' : 'text-white hover:bg-[#3D3D3D]'} transition-colors`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Video Grid */}
      <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
        <VideoGrid videos={mockVideos} />
      </div>
    </div>
  )
}
