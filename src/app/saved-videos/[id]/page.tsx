'use client'

import { useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Plus, Search, Filter, X, LayoutGrid, List } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Mock video data
const mockVideos = [
  {
    id: '1',
    title: 'How to Build a Modern React Application with NextJS and TypeScript',
    thumbnail: 'https://picsum.photos/id/11/640/360',
    duration: '15:42',
    channelName: 'Dev Masters',
    channelAvatar: 'https://picsum.photos/id/100/64/64',
    views: '246K',
    timestamp: '3 days ago'
  },
  {
    id: '2',
    title: 'Learn CSS Grid Layout in 20 Minutes - Quick Tutorial for Beginners',
    thumbnail: 'https://picsum.photos/id/22/640/360',
    duration: '20:15',
    channelName: 'CSS Wizards',
    channelAvatar: 'https://picsum.photos/id/101/64/64',
    views: '189K',
    timestamp: '1 week ago'
  },
  {
    id: '3',
    title: 'JavaScript ES6: The Complete Guide to Modern JavaScript Features',
    thumbnail: 'https://picsum.photos/id/33/640/360',
    duration: '32:17',
    channelName: 'JS Guru',
    channelAvatar: 'https://picsum.photos/id/102/64/64',
    views: '412K',
    timestamp: '2 weeks ago'
  },
  {
    id: '4',
    title: 'Building Responsive Websites with Tailwind CSS - Complete Walkthrough',
    thumbnail: 'https://picsum.photos/id/44/640/360',
    duration: '28:09',
    channelName: 'Web Design Pro',
    channelAvatar: 'https://picsum.photos/id/103/64/64',
    views: '178K',
    timestamp: '4 days ago'
  },
  {
    id: '5',
    title: 'UI/UX Design Principles: Creating User-Friendly Interfaces',
    thumbnail: 'https://picsum.photos/id/55/640/360',
    duration: '18:53',
    channelName: 'Design Hub',
    channelAvatar: 'https://picsum.photos/id/104/64/64',
    views: '95K',
    timestamp: '5 days ago'
  }
];

export default function SavedVideoDetail() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const collectionName = searchParams.get('name') || 'Saved Videos'
  const collectionId = params.id
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.back()}
          className="p-2 text-white hover:bg-[#2D2D2D] rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-white">{collectionName}</h1>
      </div>
      
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search in this collection"
              className="bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-4 py-2 pl-10 w-[280px] focus:outline-none focus:ring-1 focus:ring-[#00FF8C]/50"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-[#2D2D2D] text-white px-3 py-2 rounded-lg hover:bg-[#3D3D3D] transition-colors"
          >
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View mode controls */}
          <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 text-white transition-colors ${viewMode === 'grid' ? 'bg-[#3D3D3D]' : 'hover:bg-[#3D3D3D]'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 text-white transition-colors ${viewMode === 'list' ? 'bg-[#3D3D3D]' : 'hover:bg-[#3D3D3D]'}`}
            >
              <List size={18} />
            </button>
          </div>
          
          <button 
            className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Add video</span>
          </button>
        </div>
      </div>
      
      {/* Filter panel */}
      {isFilterOpen && (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Filter videos</h3>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date added</label>
              <select className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#00FF8C]/50">
                <option>All time</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Duration</label>
              <select className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#00FF8C]/50">
                <option>Any duration</option>
                <option>Under 5 minutes</option>
                <option>5-15 minutes</option>
                <option>15-30 minutes</option>
                <option>Over 30 minutes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Sort by</label>
              <select className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#00FF8C]/50">
                <option>Date added (newest)</option>
                <option>Date added (oldest)</option>
                <option>Views (high to low)</option>
                <option>Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Videos */}
      {mockVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-gray-400 mb-4">No videos in this collection yet.</p>
          <button className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={18} />
            <span>Add your first video</span>
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "flex flex-col space-y-4"
        }>
          {mockVideos.map((video) => (
            viewMode === 'grid' ? (
              // Grid view
              <div key={video.id} className="bg-[#1A1A1A] rounded-lg overflow-hidden group cursor-pointer">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium line-clamp-2 group-hover:text-[#00FF8C] transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center mt-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                      <Image
                        src={video.channelAvatar}
                        alt={video.channelName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-gray-400 text-sm">{video.channelName}</p>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {video.views} views • {video.timestamp}
                  </p>
                </div>
              </div>
            ) : (
              // List view
              <div key={video.id} className="flex bg-[#1A1A1A] rounded-lg overflow-hidden cursor-pointer group">
                <div className="relative w-64 min-w-64">
                  <div className="relative aspect-video">
                    <Image 
                      src={video.thumbnail} 
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-white font-medium group-hover:text-[#00FF8C] transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center mt-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                      <Image
                        src={video.channelAvatar}
                        alt={video.channelName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-gray-400 text-sm">{video.channelName}</p>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {video.views} views • {video.timestamp}
                  </p>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
} 