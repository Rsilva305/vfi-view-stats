'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Search } from 'lucide-react'
import Link from 'next/link'

export default function ChannelListDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [searchQuery, setSearchQuery] = useState('')

  // In a real app, you would fetch the channel list and its channels from an API or state management
  const channelListId = Array.isArray(id) ? id[0] : id

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="mb-8">
        <Link 
          href="/tracked-channels" 
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to tracked channels</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Channel List {channelListId}</h1>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for a YouTube channel"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2D2D2D] text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#00FF8C]"
          />
        </div>
      </div>

      {/* Empty state or placeholder */}
      <div className="border-2 border-dashed border-[#2D2D2D] rounded-lg flex flex-col items-center justify-center p-12 text-center">
        <p className="text-gray-400 mb-4">No channels added yet.</p>
        <p className="text-gray-400 mb-6">Search for YouTube channels above to add them to this list.</p>
        <button className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={18} />
          <span>Add example channel</span>
        </button>
      </div>
    </div>
  )
} 