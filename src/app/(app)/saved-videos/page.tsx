"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, LayoutGrid, List, AlignLeft, CheckCircle2, Clock, BookmarkPlus } from "lucide-react";

// Mock data for saved videos
const mockVideos = [
  {
    id: "1",
    title: "How to Build a Modern React Application with NextJS and TypeScript",
    thumbnail: "https://picsum.photos/id/1/640/360",
    duration: "15:42",
    channelName: "Dev Masters",
    channelAvatar: "https://picsum.photos/id/100/64/64",
    views: "246K",
    timestamp: "3 days ago",
    status: "Watched",
    category: "Web Development"
  },
  {
    id: "2",
    title: "Learn CSS Grid Layout in 20 Minutes - Quick Tutorial for Beginners",
    thumbnail: "https://picsum.photos/id/2/640/360",
    duration: "20:15",
    channelName: "CSS Wizards",
    channelAvatar: "https://picsum.photos/id/101/64/64",
    views: "189K",
    timestamp: "1 week ago",
    status: "Not Started",
    category: "CSS"
  },
  {
    id: "3",
    title: "JavaScript ES6: The Complete Guide to Modern JavaScript Features",
    thumbnail: "https://picsum.photos/id/3/640/360",
    duration: "32:17",
    channelName: "JS Guru",
    channelAvatar: "https://picsum.photos/id/102/64/64",
    views: "412K",
    timestamp: "2 weeks ago",
    status: "In Progress",
    category: "JavaScript"
  },
  {
    id: "4",
    title: "Building Responsive Websites with Tailwind CSS - Complete Walkthrough",
    thumbnail: "https://picsum.photos/id/4/640/360",
    duration: "28:09",
    channelName: "Web Design Pro",
    channelAvatar: "https://picsum.photos/id/103/64/64",
    views: "178K",
    timestamp: "4 days ago",
    status: "Not Started",
    category: "Tailwind CSS"
  },
  {
    id: "5",
    title: "UI/UX Design Principles: Creating User-Friendly Interfaces",
    thumbnail: "https://picsum.photos/id/5/640/360",
    duration: "18:53",
    channelName: "Design Hub",
    channelAvatar: "https://picsum.photos/id/104/64/64",
    views: "95K",
    timestamp: "5 days ago",
    status: "Watched",
    category: "UI/UX Design"
  },
  {
    id: "6",
    title: "Introduction to TypeScript: Why You Should Use It",
    thumbnail: "https://picsum.photos/id/6/640/360",
    duration: "22:45",
    channelName: "TypeScript Masters",
    channelAvatar: "https://picsum.photos/id/105/64/64",
    views: "156K",
    timestamp: "1 month ago",
    status: "In Progress",
    category: "TypeScript"
  }
];

// Status icon mapping
const statusIcons: Record<string, JSX.Element> = {
  "Watched": <CheckCircle2 size={16} className="text-green-500" />,
  "In Progress": <Clock size={16} className="text-yellow-500" />,
  "Not Started": <BookmarkPlus size={16} className="text-blue-500" />
};

export default function SavedVideos(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter videos based on search query
  const filteredVideos = mockVideos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Saved Videos</h1>
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search saved videos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-60 bg-[#2D2D2D] text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none"
            />
          </div>
          
          {/* Filter Button */}
          <button className="p-2 text-white bg-[#2D2D2D] rounded-lg hover:bg-[#3D3D3D] transition-colors">
            <Filter size={18} />
          </button>
          
          {/* View Mode Toggle */}
          <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 text-white transition-colors ${viewMode === 'grid' ? 'bg-[#3D3D3D]' : 'hover:bg-[#3D3D3D]'}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
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

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button className="flex items-center gap-1 bg-[#00FF8C]/10 text-[#00FF8C] py-1 px-3 rounded-full text-sm font-medium">
          <CheckCircle2 size={14} />
          <span>Watched</span>
        </button>
        <button className="flex items-center gap-1 bg-[#2D2D2D] text-white py-1 px-3 rounded-full text-sm font-medium hover:bg-[#3D3D3D] transition-colors">
          <Clock size={14} />
          <span>In Progress</span>
        </button>
        <button className="flex items-center gap-1 bg-[#2D2D2D] text-white py-1 px-3 rounded-full text-sm font-medium hover:bg-[#3D3D3D] transition-colors">
          <BookmarkPlus size={14} />
          <span>Not Started</span>
        </button>
        <button className="flex items-center gap-1 bg-[#2D2D2D] text-white py-1 px-3 rounded-full text-sm font-medium hover:bg-[#3D3D3D] transition-colors">
          <AlignLeft size={14} />
          <span>Category</span>
        </button>
      </div>

      {/* Videos Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <Link
              key={video.id}
              href={`/saved-videos/${video.id}`}
              className="bg-[#1E1E1E] rounded-lg overflow-hidden hover:bg-[#252525] transition-colors"
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </div>
                <div className="absolute top-2 right-2 bg-black/80 text-white flex items-center gap-1 px-2 py-1 text-xs rounded">
                  {statusIcons[video.status]}
                  <span>{video.status}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium mb-2 line-clamp-2">{video.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img 
                      src={video.channelAvatar} 
                      alt={video.channelName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-400 text-sm">{video.channelName}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{video.views} views</span>
                  <span>{video.timestamp}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVideos.map(video => (
            <Link
              key={video.id}
              href={`/saved-videos/${video.id}`}
              className="flex bg-[#1E1E1E] rounded-lg overflow-hidden hover:bg-[#252525] transition-colors"
            >
              <div className="relative w-64 min-w-[256px]">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </div>
              </div>
              <div className="flex flex-col justify-between p-4 flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium">{video.title}</h3>
                    <div className="flex items-center gap-1 bg-black/20 text-white px-2 py-1 text-xs rounded">
                      {statusIcons[video.status]}
                      <span>{video.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img 
                        src={video.channelAvatar} 
                        alt={video.channelName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-gray-400 text-sm">{video.channelName}</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    <span>{video.views} views • {video.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#2D2D2D] text-white text-xs px-2 py-1 rounded">
                    {video.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 