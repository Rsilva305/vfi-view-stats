'use client'

import { Plus } from 'lucide-react'

export default function TrackedChannels() {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Tracked channels</h1>
      </div>
      
      {/* Empty state container */}
      <div className="flex items-center justify-center py-24">
        <div className="w-full max-w-lg h-64 border-2 border-dashed border-[#2D2D2D] rounded-lg flex flex-col items-center justify-center p-8 text-center">
          <p className="text-gray-400 mb-6">You haven't created any channel lists yet.</p>
          <button className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={18} />
            <span>Create new channel list</span>
          </button>
        </div>
      </div>
    </div>
  )
} 