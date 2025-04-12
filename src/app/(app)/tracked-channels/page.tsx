"use client";

import Link from "next/link";
import { Search, PlusCircle, List, Grid } from "lucide-react";
import { useState } from "react";

// Mock data for tracked channels
const mockChannels = [
  {
    id: "1",
    name: "Dev Masters",
    avatar: "https://picsum.photos/id/100/64/64",
    subscriberCount: "1.2M",
    videoCount: 342,
    lastUpdated: "2 days ago",
    category: "Technology"
  },
  {
    id: "2",
    name: "CSS Wizards",
    avatar: "https://picsum.photos/id/101/64/64",
    subscriberCount: "845K",
    videoCount: 189,
    lastUpdated: "1 week ago",
    category: "Design"
  },
  {
    id: "3",
    name: "JavaScript Guru",
    avatar: "https://picsum.photos/id/102/64/64",
    subscriberCount: "2.1M",
    videoCount: 412,
    lastUpdated: "3 days ago",
    category: "Technology"
  },
  {
    id: "4",
    name: "Web Design Pro",
    avatar: "https://picsum.photos/id/103/64/64",
    subscriberCount: "965K",
    videoCount: 278,
    lastUpdated: "5 days ago",
    category: "Design"
  },
  {
    id: "5",
    name: "UX/UI Masters",
    avatar: "https://picsum.photos/id/104/64/64",
    subscriberCount: "1.5M",
    videoCount: 195,
    lastUpdated: "1 day ago",
    category: "Design"
  },
  {
    id: "6",
    name: "TypeScript Experts",
    avatar: "https://picsum.photos/id/105/64/64",
    subscriberCount: "780K",
    videoCount: 156,
    lastUpdated: "2 weeks ago",
    category: "Technology"
  }
];

export default function TrackedChannels(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter channels based on search query
  const filteredChannels = mockChannels.filter(channel => 
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Tracked Channels</h1>
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search channels"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-60 bg-[#2D2D2D] text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none"
            />
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 text-white transition-colors ${viewMode === 'grid' ? 'bg-[#3D3D3D]' : 'hover:bg-[#3D3D3D]'}`}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 text-white transition-colors ${viewMode === 'list' ? 'bg-[#3D3D3D]' : 'hover:bg-[#3D3D3D]'}`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Add New Channel Button */}
      <div className="mb-8">
        <button className="flex items-center gap-2 bg-[#00FF8C] hover:bg-[#00DD7A] text-black font-medium py-2 px-4 rounded-lg transition-colors">
          <PlusCircle size={18} />
          <span>Add New Channel</span>
        </button>
      </div>

      {/* Channel Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map(channel => (
            <Link
              key={channel.id}
              href={`/tracked-channels/${channel.id}`}
              className="bg-[#1E1E1E] rounded-lg overflow-hidden hover:bg-[#252525] transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={channel.avatar} 
                      alt={channel.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{channel.name}</h3>
                    <p className="text-gray-400 text-sm">{channel.subscriberCount} subscribers</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div>
                    <p className="mb-1">Videos</p>
                    <p className="text-white font-medium">{channel.videoCount}</p>
                  </div>
                  <div>
                    <p className="mb-1">Category</p>
                    <p className="text-white font-medium">{channel.category}</p>
                  </div>
                  <div>
                    <p className="mb-1">Updated</p>
                    <p className="text-white font-medium">{channel.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredChannels.map(channel => (
            <Link
              key={channel.id}
              href={`/tracked-channels/${channel.id}`}
              className="flex items-center justify-between bg-[#1E1E1E] rounded-lg p-4 hover:bg-[#252525] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={channel.avatar} 
                    alt={channel.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium">{channel.name}</h3>
                  <p className="text-gray-400 text-sm">{channel.subscriberCount} subscribers</p>
                </div>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div className="text-right">
                  <p className="text-gray-400 mb-1">Videos</p>
                  <p className="text-white font-medium">{channel.videoCount}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 mb-1">Category</p>
                  <p className="text-white font-medium">{channel.category}</p>
                </div>
                <div className="text-right min-w-[100px]">
                  <p className="text-gray-400 mb-1">Updated</p>
                  <p className="text-white font-medium">{channel.lastUpdated}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 