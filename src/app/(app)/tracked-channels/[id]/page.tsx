"use client";

import { useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Plus, Search, Info, ChevronDown, BarChart2, Calendar, MessageSquare, Download, AlignJustify, LayoutGrid, Minus, Plus as PlusIcon, Filter, X, ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
          <button className="bg-[#2D2D2D] hover:bg-[#3D3D3D] p-2 rounded-lg text-white mr-2">
            <AlignJustify size={18} />
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
          <div className="flex items-center">
            <button className="flex items-center gap-1 text-gray-400 hover:bg-[#2D2D2D] px-2 py-2 rounded-lg text-sm">
              <Minus size={16} />
            </button>
            <span className="text-white mx-1">4</span>
            <button className="flex items-center gap-1 text-gray-400 hover:bg-[#2D2D2D] px-2 py-2 rounded-lg text-sm">
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              className="p-2 text-white transition-colors bg-[#3D3D3D]"
              onClick={() => setGridView(true)}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className="p-2 text-white transition-colors"
              onClick={() => setGridView(false)}
            >
              <AlignJustify size={18} />
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

      {/* Video Grid */}
      <div className="bg-[#1A1A1A] rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVideos.map((video) => (
            <div key={video.id} className="bg-[#1E1E1E] rounded-lg overflow-hidden hover:bg-[#252525] transition-colors cursor-pointer">
              {/* Thumbnail */}
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-white font-medium text-base line-clamp-2 mb-2">{video.title}</h3>
                <div className="flex justify-between text-xs text-gray-400">
                  <div>{video.channel}</div>
                  <div className="flex items-center gap-2">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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