'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Plus, Search, Filter, X, LayoutGrid, List, SlidersHorizontal, Monitor, Minus, Calendar, Info, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import VideoGrid from '@/components/layout/VideoGrid'

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
  const [showTextDetails, setShowTextDetails] = useState<boolean>(true)
  const [videosPerRow, setVideosPerRow] = useState<number>(4)
  
  // Filter states
  const [dateAdded, setDateAdded] = useState<string>('all')
  const [duration, setDuration] = useState<string>('any')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [whenPosted, setWhenPosted] = useState<boolean>(false)
  const [timeRange, setTimeRange] = useState<string>('all')
  
  // Advanced filter states
  const [viewsRange, setViewsRange] = useState<[number, number]>([0, 1000000000])
  const [subscribersRange, setSubscribersRange] = useState<[number, number]>([0, 500000000])
  const [durationRange, setDurationRange] = useState<[string, string]>(["00:00:00", "07:00:00"])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false)
  
  // Create refs for slider elements
  const viewsMinRef = useRef<HTMLDivElement>(null)
  const viewsMaxRef = useRef<HTMLDivElement>(null)
  const subscribersMinRef = useRef<HTMLDivElement>(null)
  const subscribersMaxRef = useRef<HTMLDivElement>(null)
  const durationMinRef = useRef<HTMLDivElement>(null)
  const durationMaxRef = useRef<HTMLDivElement>(null)
  
  // State to track which thumb is being dragged
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [currentSlider, setCurrentSlider] = useState<string | null>(null)
  const [currentThumb, setCurrentThumb] = useState<number | null>(null)

  // Helper function to format large numbers
  const formatLargeNumber = (value: number): string => {
    if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B'
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M'
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K'
    return value.toString()
  }
  
  // Handle mouse down on slider thumbs
  const handleThumbMouseDown = (event: React.MouseEvent, slider: string, thumbIndex: number) => {
    event.preventDefault()
    setIsDragging(true)
    setCurrentSlider(slider)
    setCurrentThumb(thumbIndex)
    
    // Add event listeners for drag
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  // Handle mouse move for dragging
  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !currentSlider || currentThumb === null) return
    
    let trackElement: HTMLDivElement | null = null
    let thumbElement: HTMLDivElement | null = null
    let minValue = 0
    let maxValue = 0
    
    // Determine which slider is being dragged
    switch (currentSlider) {
      case 'views':
        trackElement = viewsMinRef.current?.parentElement as HTMLDivElement
        thumbElement = currentThumb === 0 ? viewsMinRef.current : viewsMaxRef.current
        minValue = 0
        maxValue = 1000000000 // 1B
        break
      case 'subscribers':
        trackElement = subscribersMinRef.current?.parentElement as HTMLDivElement
        thumbElement = currentThumb === 0 ? subscribersMinRef.current : subscribersMaxRef.current
        minValue = 0
        maxValue = 500000000 // 500M
        break
      default:
        return
    }
    
    if (!trackElement || !thumbElement) return
    
    // Calculate new position
    const trackRect = trackElement.getBoundingClientRect()
    const newPosition = Math.max(0, Math.min(1, (event.clientX - trackRect.left) / trackRect.width))
    const newValue = minValue + newPosition * (maxValue - minValue)
    
    // Update state based on which slider and thumb
    if (currentSlider === 'views') {
      const newRange = [...viewsRange] as [number, number]
      newRange[currentThumb] = Math.round(newValue)
      
      // Ensure min <= max
      if (currentThumb === 0 && newRange[0] > newRange[1]) {
        newRange[0] = newRange[1]
      } else if (currentThumb === 1 && newRange[1] < newRange[0]) {
        newRange[1] = newRange[0]
      }
      
      setViewsRange(newRange)
    } else if (currentSlider === 'subscribers') {
      const newRange = [...subscribersRange] as [number, number]
      newRange[currentThumb] = Math.round(newValue)
      
      // Ensure min <= max
      if (currentThumb === 0 && newRange[0] > newRange[1]) {
        newRange[0] = newRange[1]
      } else if (currentThumb === 1 && newRange[1] < newRange[0]) {
        newRange[1] = newRange[0]
      }
      
      setSubscribersRange(newRange)
    }
  }
  
  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false)
    setCurrentSlider(null)
    setCurrentThumb(null)
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  // Set up and clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  
  // Functions to handle input changes
  const handleViewsInputChange = (index: 0 | 1, value: string) => {
    const newValue = parseInt(value)
    if (!isNaN(newValue)) {
      const newRange = [...viewsRange] as [number, number]
      newRange[index] = newValue
      setViewsRange(newRange)
    }
  }
  
  const handleSubscribersInputChange = (index: 0 | 1, value: string) => {
    const newValue = parseInt(value)
    if (!isNaN(newValue)) {
      const newRange = [...subscribersRange] as [number, number]
      newRange[index] = newValue
      setSubscribersRange(newRange)
    }
  }
  
  const handleDurationInputChange = (index: 0 | 1, value: string) => {
    const newRange = [...durationRange] as [string, string]
    newRange[index] = value
    setDurationRange(newRange)
  }

  const increaseVideosPerRow = () => {
    if (videosPerRow < 6) {
      setVideosPerRow(videosPerRow + 1)
    }
  }
  
  const decreaseVideosPerRow = () => {
    if (videosPerRow > 2) {
      setVideosPerRow(videosPerRow - 1)
    }
  }

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
              className="bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-4 py-2 pl-10 w-[280px] focus:outline-none focus:ring-1 focus:ring-[#d61204]/50"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-[#2D2D2D] text-white px-3 py-2 rounded-lg hover:bg-[#3D3D3D] transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Display Mode Toggle */}
          <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              className={`p-2 text-white transition-colors ${showTextDetails ? 'bg-[#3D3D3D]' : ''}`}
              onClick={() => setShowTextDetails(true)}
              title="Show video details"
            >
              <Monitor size={18} />
            </button>
            <button 
              className={`p-2 text-white transition-colors ${!showTextDetails ? 'bg-[#3D3D3D]' : ''}`}
              onClick={() => setShowTextDetails(false)}
              title="Hide video details"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
          
          {/* Videos Per Row Control */}
          <div className="flex items-center bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              className="p-2 text-white hover:bg-[#3D3D3D] transition-colors"
              onClick={decreaseVideosPerRow}
              disabled={videosPerRow <= 2}
              title="Decrease videos per row"
            >
              <Minus size={18} />
            </button>
            <span className="text-white px-2">{videosPerRow}</span>
            <button 
              className="p-2 text-white hover:bg-[#3D3D3D] transition-colors"
              onClick={increaseVideosPerRow}
              disabled={videosPerRow >= 6}
              title="Increase videos per row"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <button 
            className="flex items-center gap-2 bg-[#d61204] hover:bg-[#b81003] text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Add video</span>
          </button>
        </div>
      </div>
      
      {/* Filter panel */}
      {isFilterOpen && (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-white">Filter videos</h3>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex mb-6">
            <div className="w-[70%] pr-6">
              {/* Basic filters grid */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date added</label>
                  <select 
                    className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d61204]/50"
                    value={dateAdded}
                    onChange={(e) => setDateAdded(e.target.value)}
                  >
                    <option value="all">All time</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Duration</label>
                  <select 
                    className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d61204]/50"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="any">Any duration</option>
                    <option value="short">Under 5 minutes</option>
                    <option value="medium">5-15 minutes</option>
                    <option value="long">15-30 minutes</option>
                    <option value="veryllong">Over 30 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Sort by</label>
                  <select 
                    className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d61204]/50"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Date added (newest)</option>
                    <option value="oldest">Date added (oldest)</option>
                    <option value="views">Views (high to low)</option>
                    <option value="alpha">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>
              
              {/* Advanced filters toggle */}
              <button 
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <span>Advanced filters</span>
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {/* Advanced filters */}
              {showAdvancedFilters && (
                <div className="space-y-6">
                  {/* Views Range */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-gray-400">Views</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={viewsRange[0]}
                          onChange={(e) => handleViewsInputChange(0, e.target.value)}
                          className="w-24 bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-2 py-1 text-sm focus:outline-none"
                        />
                        <span className="text-gray-400">to</span>
                        <input
                          type="text"
                          value={viewsRange[1]}
                          onChange={(e) => handleViewsInputChange(1, e.target.value)}
                          className="w-24 bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-2 py-1 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="relative h-2 bg-[#2D2D2D] rounded-full">
                      <div
                        className="absolute h-full bg-[#d61204] rounded-full"
                        style={{
                          left: `${(viewsRange[0] / 1000000000) * 100}%`,
                          right: `${100 - (viewsRange[1] / 1000000000) * 100}%`
                        }}
                      ></div>
                      <div
                        ref={viewsMinRef}
                        className="absolute w-4 h-4 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2 cursor-pointer hover:bg-gray-200"
                        style={{ left: `${(viewsRange[0] / 1000000000) * 100}%` }}
                        onMouseDown={(e) => handleThumbMouseDown(e, 'views', 0)}
                      ></div>
                      <div
                        ref={viewsMaxRef}
                        className="absolute w-4 h-4 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2 cursor-pointer hover:bg-gray-200"
                        style={{ left: `${(viewsRange[1] / 1000000000) * 100}%` }}
                        onMouseDown={(e) => handleThumbMouseDown(e, 'views', 1)}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>{formatLargeNumber(1000000000)}</span>
                    </div>
                  </div>
                  
                  {/* Subscribers Range */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-gray-400">Channel Subscribers</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={subscribersRange[0]}
                          onChange={(e) => handleSubscribersInputChange(0, e.target.value)}
                          className="w-24 bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-2 py-1 text-sm focus:outline-none"
                        />
                        <span className="text-gray-400">to</span>
                        <input
                          type="text"
                          value={subscribersRange[1]}
                          onChange={(e) => handleSubscribersInputChange(1, e.target.value)}
                          className="w-24 bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-2 py-1 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="relative h-2 bg-[#2D2D2D] rounded-full">
                      <div
                        className="absolute h-full bg-[#d61204] rounded-full"
                        style={{
                          left: `${(subscribersRange[0] / 500000000) * 100}%`,
                          right: `${100 - (subscribersRange[1] / 500000000) * 100}%`
                        }}
                      ></div>
                      <div
                        ref={subscribersMinRef}
                        className="absolute w-4 h-4 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2 cursor-pointer hover:bg-gray-200"
                        style={{ left: `${(subscribersRange[0] / 500000000) * 100}%` }}
                        onMouseDown={(e) => handleThumbMouseDown(e, 'subscribers', 0)}
                      ></div>
                      <div
                        ref={subscribersMaxRef}
                        className="absolute w-4 h-4 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2 cursor-pointer hover:bg-gray-200"
                        style={{ left: `${(subscribersRange[1] / 500000000) * 100}%` }}
                        onMouseDown={(e) => handleThumbMouseDown(e, 'subscribers', 1)}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>0</span>
                      <span>{formatLargeNumber(500000000)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-[30%] pl-6 border-l border-[#2D2D2D]">
              <div className="mb-5">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-white mr-2">When posted</span>
                  <Info size={14} className="text-gray-400" />
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={whenPosted} 
                      onChange={() => setWhenPosted(!whenPosted)} 
                    />
                    <div className={`block w-10 h-6 rounded-full ${whenPosted ? 'bg-[#d61204]' : 'bg-[#2D2D2D]'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${whenPosted ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <span className="ml-2 text-gray-400">Only when published dates matter</span>
                </label>
              </div>
              
              <div className="mb-4">
                <div className="mb-2 flex items-center">
                  <Calendar size={16} className="text-white mr-2" />
                  <span className="text-white">Time range</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${timeRange === 'all' ? 'bg-[#d61204] text-white' : 'bg-[#2D2D2D] text-gray-300'}`} 
                    onClick={() => setTimeRange('all')}
                  >
                    All time
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${timeRange === 'hour' ? 'bg-[#d61204] text-white' : 'bg-[#2D2D2D] text-gray-300'}`}
                    onClick={() => setTimeRange('hour')}
                  >
                    Last hour
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${timeRange === 'today' ? 'bg-[#d61204] text-white' : 'bg-[#2D2D2D] text-gray-300'}`}
                    onClick={() => setTimeRange('today')}
                  >
                    Today
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${timeRange === 'week' ? 'bg-[#d61204] text-white' : 'bg-[#2D2D2D] text-gray-300'}`}
                    onClick={() => setTimeRange('week')}
                  >
                    This week
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${timeRange === 'month' ? 'bg-[#d61204] text-white' : 'bg-[#2D2D2D] text-gray-300'}`}
                    onClick={() => setTimeRange('month')}
                  >
                    This month
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${timeRange === 'year' ? 'bg-[#d61204] text-white' : 'bg-[#2D2D2D] text-gray-300'}`}
                    onClick={() => setTimeRange('year')}
                  >
                    This year
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filter Actions */}
          <div className="flex justify-end items-center gap-4 mt-4 pt-4 border-t border-[#2D2D2D]">
            <button className="px-4 py-2 text-white bg-transparent hover:bg-[#2D2D2D] rounded-lg transition-colors">
              Reset
            </button>
            <button className="px-4 py-2 text-white bg-[#d61204] hover:bg-[#b81003] rounded-lg transition-colors">
              Apply
            </button>
          </div>
        </div>
      )}
      
      {/* Videos */}
      {mockVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-gray-400 mb-4">No videos in this collection yet.</p>
          <button className="flex items-center gap-2 bg-[#d61204] hover:bg-[#b81003] text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={18} />
            <span>Add your first video</span>
          </button>
        </div>
      ) : (
        <VideoGrid 
          videos={mockVideos.map(video => ({
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail,
            duration: video.duration,
            channelName: video.channelName,
            channelAvatar: video.channelAvatar,
            views: video.views,
            timestamp: video.timestamp
          }))}
          showTextDetails={showTextDetails}
          videosPerRow={videosPerRow}
        />
      )}
    </div>
  )
} 