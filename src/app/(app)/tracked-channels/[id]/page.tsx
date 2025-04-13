"use client";

import { useState, useRef, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Plus, Search, Info, ChevronDown, BarChart2, Calendar, MessageSquare, Download, AlignJustify, LayoutGrid, Minus, Plus as PlusIcon, Filter, X, ChevronRight, ChevronLeft, SlidersHorizontal, Monitor } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import VideoGrid from '@/components/layout/VideoGrid'

// Mock data for chart
const mockChannels = [
  { id: 1, name: 'TMZ', avatar: '/tmz.jpg', subscribers: 8400000, views: 550000000, videos: 12500 },
  { id: 2, name: 'E! News', avatar: '/enews.jpg', subscribers: 5000000, views: 420000000, videos: 9800 },
  { id: 3, name: 'Entertainment Tonight', avatar: '/et.jpg', subscribers: 2500000, views: 320000000, videos: 8500 },
  { id: 4, name: 'Hollywood Reporter', avatar: '/hr.jpg', subscribers: 2500000, views: 280000000, videos: 7200 },
  { id: 5, name: 'Variety', avatar: '/variety.jpg', subscribers: 2300000, views: 260000000, videos: 6800 },
  { id: 6, name: 'People Magazine', avatar: '/people.jpg', subscribers: 2000000, views: 230000000, videos: 5900 },
]

// Mock suggested channels
const suggestedChannels = [
  { id: 101, name: 'Bodycam Files', avatar: 'https://picsum.photos/id/237/200/200', subscribers: '208K' },
  { id: 102, name: 'Police Insider', avatar: 'https://picsum.photos/id/238/200/200', subscribers: '620K' },
  { id: 103, name: 'Body Cam Watch', avatar: 'https://picsum.photos/id/239/200/200', subscribers: '779K' },
  { id: 104, name: 'Crime Scene Cam', avatar: 'https://picsum.photos/id/240/200/200', subscribers: '318K' },
  { id: 105, name: 'Law Enforcement Daily', avatar: 'https://picsum.photos/id/241/200/200', subscribers: '455K' },
  { id: 106, name: 'Police Activity', avatar: 'https://picsum.photos/id/242/200/200', subscribers: '1.2M' },
]

// Mock video data
const mockVideos = [
  {
    id: '1',
    title: 'Target Shoplifter Breaks Down After $1,200 Clothing Heist Fails',
    thumbnail: 'https://picsum.photos/id/237/640/360',
    channel: 'policewatch',
    views: '583K',
    timestamp: '2 hours ago',
    duration: '23:20'
  },
  {
    id: '2',
    title: 'Cop Detains Pregnant Black Woman For Walking In Her Own Neighborhood',
    thumbnail: 'https://picsum.photos/id/238/640/360',
    channel: 'auditingcops',
    views: '176K',
    timestamp: '7 hours ago',
    duration: '10:15'
  },
  {
    id: '3',
    title: 'New Auditor Doesn\'t BACKDOWN Against Idiotic Female Employees',
    thumbnail: 'https://picsum.photos/id/239/640/360',
    channel: 'surreal_cam',
    views: '72.1K',
    timestamp: 'a day ago',
    duration: '14:10'
  },
  {
    id: '4',
    title: 'The Future of Law Enforcement and The Rise of Citizen Journalism',
    thumbnail: 'https://picsum.photos/id/240/640/360',
    channel: 'transparency',
    views: '204K',
    timestamp: 'a day ago',
    duration: '34:37'
  },
  {
    id: '5',
    title: 'Cop Pulls Over Man For Driving An Expensive Car Then Tries To Find A Reason To Arrest Him',
    thumbnail: 'https://picsum.photos/id/241/640/360',
    channel: 'auditingcops',
    views: '174K',
    timestamp: 'a day ago',
    duration: '14:56'
  },
  {
    id: '6',
    title: 'The Quickest Way To Lose Custody Of Your Toddler',
    thumbnail: 'https://picsum.photos/id/242/640/360',
    channel: 'policeactivity',
    views: '583K',
    timestamp: '2 days ago',
    duration: '14:50'
  },
]

export default function ChannelListDetail() {
  const router = useRouter()
  const { id } = useParams()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [conceptSearchQuery, setConceptSearchQuery] = useState('')
  const [chartMetric, setChartMetric] = useState('Subscribers')
  const [subscribersOnly, setSubscribersOnly] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newChannelUrl, setNewChannelUrl] = useState('')
  const [channels, setChannels] = useState(mockChannels)
  const [trackedChannels, setTrackedChannels] = useState<number[]>([])
  const [sortBy, setSortBy] = useState('date')
  const [gridView, setGridView] = useState(true)
  const [showTextDetails, setShowTextDetails] = useState<boolean>(true)
  const [videosPerRow, setVideosPerRow] = useState<number>(4)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // Filter states
  const [dateAdded, setDateAdded] = useState<string>('all')
  const [duration, setDuration] = useState<string>('any')
  const [timeRange, setTimeRange] = useState<string>('all')
  const [whenPosted, setWhenPosted] = useState<boolean>(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false)
  
  // Advanced filter states
  const [viewsRange, setViewsRange] = useState<[number, number]>([0, 1000000000])
  const [subscribersRange, setSubscribersRange] = useState<[number, number]>([0, 500000000])
  const [durationRange, setDurationRange] = useState<[string, string]>(["00:00:00", "07:00:00"])
  
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

  // Get the channel list name from URL query parameters
  const channelListName = searchParams.get('name') 
    ? decodeURIComponent(searchParams.get('name') || '') 
    : 'Channel List'

  const handleAddChannel = () => {
    if (newChannelUrl.trim()) {
      // In a real app, you would parse the URL and fetch channel data
      setShowAddModal(false)
      setNewChannelUrl('')
      alert('Channel would be added in a real implementation')
    }
  }

  const toggleTrackChannel = (channelId: number) => {
    if (trackedChannels.includes(channelId)) {
      setTrackedChannels(trackedChannels.filter(id => id !== channelId))
    } else {
      setTrackedChannels([...trackedChannels, channelId])
    }
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
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/tracked-channels" 
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">{channelListName}</h1>
      </div>

      {/* Performance Section */}
      <div className="bg-[#1A1A1A] rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Performance</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={subscribersOnly} 
                    onChange={() => setSubscribersOnly(!subscribersOnly)} 
                  />
                  <div className={`block w-10 h-6 rounded-full ${subscribersOnly ? 'bg-[#d61204]' : 'bg-[#2D2D2D]'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${subscribersOnly ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className="ml-2 text-white text-sm">Subscribers</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-white bg-transparent p-1 rounded hover:bg-[#2D2D2D]">
                <BarChart2 size={20} />
              </button>
              <button className="text-gray-400 bg-transparent p-1 rounded hover:bg-[#2D2D2D]">
                <MessageSquare size={20} />
              </button>
              <button className="text-gray-400 bg-transparent p-1 rounded hover:bg-[#2D2D2D]">
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Chart dropdown */}
        <div className="mb-4">
          <div className="relative inline-block">
            <button className="flex items-center gap-2 bg-[#2D2D2D] text-white px-3 py-1.5 rounded text-sm">
              <span>{chartMetric}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="h-[200px] w-full relative">
          <div className="absolute left-0 top-0 h-full w-16 flex flex-col justify-between text-right pr-2 text-xs text-gray-400">
            <span>583K</span>
            <span>300K</span>
            <span>150K</span>
            <span>0</span>
          </div>
          <div className="ml-16 h-full flex items-end gap-4">
            {channels.map((channel, index) => (
              <div key={channel.id} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full rounded-t-sm" 
                  style={{ 
                    height: `${Math.max((channel.subscribers / 8400000) * 180, 10)}px`,
                    backgroundColor: '#d61204',
                    opacity: index === 0 ? 1 : (index === 1 ? 0.8 : (index === 2 ? 0.65 : (index === 3 ? 0.55 : (index === 4 ? 0.5 : 0.45))))
                  }}
                ></div>
                <div className="w-8 h-8 rounded-full bg-[#2D2D2D] mt-2 overflow-hidden flex items-center justify-center">
                  <span className="text-white text-xs">
                    {['T', 'E', 'E', 'H', 'V', 'P'][index]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested channels */}
      <div className="bg-[#1A1A1A] rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Suggested channels</h2>
            <Info size={16} className="text-gray-400" />
          </div>
          <div className="flex items-center text-gray-400">
            <button className="p-1 hover:text-white">
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Channel Carousel */}
        <div className="relative mb-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4">
            {suggestedChannels.map((channel) => (
              <div key={channel.id} className="flex-shrink-0 w-[220px] bg-[#1E1E1E] rounded-lg overflow-hidden">
                <div className="p-4 flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 bg-[#2D2D2D]">
                    <Image 
                      src={channel.avatar}
                      alt={channel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white font-medium text-base mb-1">{channel.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{channel.subscribers} subscribers</p>
                  <button 
                    className="w-full flex items-center justify-center gap-1 bg-transparent border border-[#d61204] text-[#d61204] hover:bg-[#d61204]/10 px-3 py-1.5 rounded-md text-sm transition-colors"
                    onClick={() => toggleTrackChannel(channel.id)}
                  >
                    <Plus size={14} />
                    <span>Track channel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4">
            <button className="bg-[#1A1A1A]/90 text-white p-2 rounded-full hover:bg-[#2D2D2D] transition-colors">
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4">
            <button className="bg-[#1A1A1A]/90 text-white p-2 rounded-full hover:bg-[#2D2D2D] transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button 
            className="bg-[#2D2D2D] hover:bg-[#3D3D3D] p-2 rounded-lg text-white mr-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={18} />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search a concept"
              value={conceptSearchQuery}
              onChange={(e) => setConceptSearchQuery(e.target.value)}
              className="w-60 bg-[#2D2D2D] text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
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
          
          <div className="flex items-center">
            <button className="flex items-center gap-2 bg-[#2D2D2D] text-white px-3 py-2 rounded-lg text-sm">
              <span>Sort by date</span>
              <ChevronDown size={16} />
            </button>
          </div>
          
          <div className="flex items-center">
            <button 
              className="flex items-center gap-2 bg-[#d61204] hover:bg-[#b81003] text-white px-3 py-2 rounded-lg text-sm transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={16} />
              <span>Add channels</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-white">Filter channels</h3>
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
                  <label className="block text-sm text-gray-400 mb-2">Channel type</label>
                  <select 
                    className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d61204]/50"
                    value={dateAdded}
                    onChange={(e) => setDateAdded(e.target.value)}
                  >
                    <option value="all">All channels</option>
                    <option value="tracked">Tracked only</option>
                    <option value="suggested">Suggested only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Content focus</label>
                  <select 
                    className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d61204]/50"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="any">Any content</option>
                    <option value="news">News</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="tech">Technology</option>
                    <option value="gaming">Gaming</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Sort by</label>
                  <select 
                    className="w-full bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d61204]/50"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Date added (newest)</option>
                    <option value="subscribers">Subscribers (high to low)</option>
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
                      <label className="text-sm text-gray-400">Channel Views</label>
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
                      <label className="text-sm text-gray-400">Subscribers</label>
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

      {/* Video Grid - Update to use the enhanced VideoGrid component */}
      <div className="bg-[#1A1A1A] rounded-lg p-6 mb-8">
        <VideoGrid 
          videos={mockVideos.map(video => ({
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail,
            duration: video.duration,
            channelName: video.channel,
            channelAvatar: video.thumbnail, // Using thumbnail as channel avatar for demo
            views: video.views,
            timestamp: video.timestamp
          }))}
          showTextDetails={showTextDetails}
          videosPerRow={videosPerRow}
        />
      </div>

      {/* Add Channel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#222222] rounded-lg w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowAddModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">Add YouTube Channel</h2>
            
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">
                Enter YouTube Channel URL
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/@ChannelName"
                value={newChannelUrl}
                onChange={(e) => setNewChannelUrl(e.target.value)}
                className="w-full bg-[#333333] text-white border-none rounded-md p-3 mb-2 focus:outline-none"
                autoFocus
              />
              <p className="text-gray-500 text-sm">Example: https://www.youtube.com/@Romayron</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleAddChannel}
                className="bg-[#d61204] hover:bg-[#b81003] text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                Add Channel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 