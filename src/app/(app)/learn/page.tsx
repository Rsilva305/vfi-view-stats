"use client";

import Link from "next/link";
import { Search, Play, Clock, CheckCircle, Circle } from "lucide-react";
import { useState } from "react";

// Mock data for tutorials
const mockTutorials = [
  {
    id: "1",
    title: "Getting Started with YouTube Research",
    thumbnail: "https://picsum.photos/id/11/640/360",
    duration: "5:42",
    description: "Learn how to effectively research popular topics on YouTube",
    category: "Fundamentals",
    isWatched: true
  },
  {
    id: "2",
    title: "Finding Your Niche on YouTube",
    thumbnail: "https://picsum.photos/id/12/640/360",
    duration: "8:15",
    description: "Discover how to identify and develop your unique niche",
    category: "Strategy",
    isWatched: false
  },
  {
    id: "3",
    title: "Creating Compelling Thumbnails",
    thumbnail: "https://picsum.photos/id/13/640/360",
    duration: "12:37",
    description: "Master the art of creating thumbnails that drive clicks",
    category: "Design",
    isWatched: false
  },
  {
    id: "4",
    title: "Writing Titles That Convert",
    thumbnail: "https://picsum.photos/id/14/640/360",
    duration: "7:29",
    description: "Learn the psychology behind high-converting video titles",
    category: "Copy Writing",
    isWatched: true
  },
  {
    id: "5",
    title: "Growing Your Subscriber Base",
    thumbnail: "https://picsum.photos/id/15/640/360",
    duration: "15:03",
    description: "Strategies to increase your subscriber count quickly",
    category: "Growth",
    isWatched: false
  },
  {
    id: "6",
    title: "YouTube Analytics Deep Dive",
    thumbnail: "https://picsum.photos/id/16/640/360",
    duration: "18:45",
    description: "Understanding key metrics to improve your content strategy",
    category: "Analytics",
    isWatched: false
  }
];

// Categories for filter
const categories = ["All", "Fundamentals", "Strategy", "Design", "Copy Writing", "Growth", "Analytics"];

export default function Learn(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Filter tutorials based on search query and category
  const filteredTutorials = mockTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Learn</h1>
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tutorials"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2D2D2D] text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-1 px-3 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[#00FF8C]/10 text-[#00FF8C]'
                : 'bg-[#2D2D2D] text-white hover:bg-[#3D3D3D]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="bg-[#1E1E1E] p-4 rounded-lg mb-8">
        <h2 className="text-white font-medium mb-2">Your Progress</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-[#00FF8C]" size={18} />
            <span className="text-white">{mockTutorials.filter(t => t.isWatched).length} Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-500" size={18} />
            <span className="text-white">{mockTutorials.filter(t => !t.isWatched).length} Remaining</span>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00FF8C]" 
                style={{ width: `${(mockTutorials.filter(t => t.isWatched).length / mockTutorials.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map(tutorial => (
          <Link
            key={tutorial.id}
            href={`/learn/${tutorial.id}`}
            className="bg-[#1E1E1E] rounded-lg overflow-hidden hover:bg-[#252525] transition-colors group"
          >
            <div className="relative">
              <img 
                src={tutorial.thumbnail} 
                alt={tutorial.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="bg-white/20 rounded-full p-3">
                  <Play fill="white" className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                {tutorial.duration}
              </div>
              <div className="absolute top-2 left-2">
                {tutorial.isWatched ? (
                  <div className="bg-[#00FF8C]/20 text-[#00FF8C] flex items-center gap-1 px-2 py-1 text-xs rounded-full">
                    <CheckCircle size={12} />
                    <span>Watched</span>
                  </div>
                ) : (
                  <div className="bg-[#2D2D2D] text-white flex items-center gap-1 px-2 py-1 text-xs rounded-full">
                    <Circle size={12} />
                    <span>Not watched</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{tutorial.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{tutorial.description}</p>
              <div className="flex justify-between items-center">
                <span className="bg-[#2D2D2D] text-white text-xs px-2 py-1 rounded">
                  {tutorial.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 