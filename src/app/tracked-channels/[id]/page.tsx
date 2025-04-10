'use client'

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
  const [chartMetric, setChartMetric] = useState('Subscribers')
  const [subscribersOnly, setSubscribersOnly] = useState(true)
  const [addingChannel, setAddingChannel] = useState(false)
  const [newChannelUrl, setNewChannelUrl] = useState('')
  const [channels, setChannels] = useState(mockChannels)
  const [trackedChannels, setTrackedChannels] = useState<number[]>([])

  // Get the channel list name from URL query parameters
  const channelListName = searchParams.get('name') 
    ? decodeURIComponent(searchParams.get('name') || '') 
    : 'Channel List'

  const handleAddChannel = () => {
    if (newChannelUrl.trim()) {
      // In a real app, you would parse the URL and fetch channel data
      setAddingChannel(false)
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
                  <div className={`block w-10 h-6 rounded-full ${subscribersOnly ? 'bg-[#1DB954]' : 'bg-[#2D2D2D]'}`}></div>
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
                  className="w-full bg-[#1DB954] rounded-t-sm" 
                  style={{ 
                    height: `${Math.max((channel.subscribers / 8400000) * 180, 10)}px`,
                    opacity: index === 0 ? 1 : 0.8 - (index * 0.1)
                  }}
                ></div>
                <div className="w-8 h-8 rounded-full bg-[#2D2D2D] mt-2 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-white text-xs">
                    {channel.name.charAt(0)}
                  </div>
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
                    className="w-full flex items-center justify-center gap-1 bg-transparent border border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 px-3 py-1.5 rounded-md text-sm transition-colors"
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
          <button className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-[#2D2D2D] rounded-full p-2 text-white hover:bg-[#3D3D3D] transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-[#2D2D2D] rounded-full p-2 text-white hover:bg-[#3D3D3D] transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center bg-[#2D2D2D] rounded-full text-gray-400 hover:text-white">
              <AlignJustify size={20} />
            </button>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search a concept"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2D2D2D] text-white rounded-full py-2 pl-10 pr-4 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
              <button className="flex items-center gap-2 text-gray-400 px-3 py-1.5 text-sm hover:bg-[#3D3D3D]">
                <Minus size={16} />
                <span>4</span>
                <PlusIcon size={16} />
              </button>
            </div>
            <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
              <button className="flex items-center gap-2 text-white bg-[#3D3D3D] px-3 py-1.5 text-sm">
                <LayoutGrid size={16} />
              </button>
              <button className="flex items-center gap-2 text-gray-400 px-3 py-1.5 text-sm hover:bg-[#3D3D3D]">
                <AlignJustify size={16} />
              </button>
            </div>
            <button className="flex items-center gap-2 text-gray-200 bg-[#2D2D2D] px-3 py-1.5 text-sm rounded-lg">
              <span>Sort by date</span>
              <ChevronDown size={16} />
            </button>
            <button 
              className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-4 py-2 rounded-lg"
              onClick={() => setAddingChannel(true)}
            >
              <PlusIcon size={16} />
              <span>Add channels</span>
            </button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockVideos.map((video) => (
            <div key={video.id} className="bg-[#2D2D2D]/50 rounded-lg overflow-hidden group cursor-pointer">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={video.thumbnail} 
                  alt={video.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-3">
                <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">{video.title}</h3>
                <p className="text-gray-400 text-xs">{video.channel}</p>
                <div className="flex items-center text-gray-400 text-xs mt-1">
                  <span>{video.views} views</span>
                  <span className="mx-1">•</span>
                  <span>{video.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Channel Modal */}
      {addingChannel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1F1F1F] rounded-lg w-full max-w-md p-6 relative">
            <button 
              onClick={() => setAddingChannel(false)} 
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-6">Add YouTube Channel</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Enter YouTube Channel URL
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/@ChannelName"
                value={newChannelUrl}
                onChange={(e) => setNewChannelUrl(e.target.value)}
                className="w-full bg-[#2D2D2D] text-white border-none rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#00FF8C]"
              />
              <p className="text-xs text-gray-500 mt-1">Example: https://www.youtube.com/@Romayroh</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleAddChannel}
                className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-medium px-4 py-2 rounded-md transition-colors"
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