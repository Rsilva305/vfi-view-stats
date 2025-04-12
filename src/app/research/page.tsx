"use client";

import VideoGrid from "@/components/layout/VideoGrid";
import { ZoomIn, ZoomOut, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

// Mock data for videos
const mockVideos = [
  {
    id: "1",
    title: "How to Build a Modern React Application with NextJS and TypeScript",
    thumbnail: "https://picsum.photos/id/1/640/360",
    duration: "15:42",
    channelName: "Dev Masters",
    channelAvatar: "https://picsum.photos/id/100/64/64",
    views: "246K",
    timestamp: "3 days ago"
  },
  {
    id: "2",
    title: "Learn CSS Grid Layout in 20 Minutes - Quick Tutorial for Beginners",
    thumbnail: "https://picsum.photos/id/2/640/360",
    duration: "20:15",
    channelName: "CSS Wizards",
    channelAvatar: "https://picsum.photos/id/101/64/64",
    views: "189K",
    timestamp: "1 week ago"
  },
  {
    id: "3",
    title: "JavaScript ES6: The Complete Guide to Modern JavaScript Features",
    thumbnail: "https://picsum.photos/id/3/640/360",
    duration: "32:17",
    channelName: "JS Guru",
    channelAvatar: "https://picsum.photos/id/102/64/64",
    views: "412K",
    timestamp: "2 weeks ago"
  },
  {
    id: "4",
    title: "Building Responsive Websites with Tailwind CSS - Complete Walkthrough",
    thumbnail: "https://picsum.photos/id/4/640/360",
    duration: "28:09",
    channelName: "Web Design Pro",
    channelAvatar: "https://picsum.photos/id/103/64/64",
    views: "178K",
    timestamp: "4 days ago"
  },
  {
    id: "5",
    title: "UI/UX Design Principles: Creating User-Friendly Interfaces",
    thumbnail: "https://picsum.photos/id/5/640/360",
    duration: "18:53",
    channelName: "Design Hub",
    channelAvatar: "https://picsum.photos/id/104/64/64",
    views: "95K",
    timestamp: "5 days ago"
  },
  {
    id: "6",
    title: "Introduction to TypeScript: Why You Should Use It",
    thumbnail: "https://picsum.photos/id/6/640/360",
    duration: "22:45",
    channelName: "TypeScript Masters",
    channelAvatar: "https://picsum.photos/id/105/64/64",
    views: "156K",
    timestamp: "1 month ago"
  },
  {
    id: "7",
    title: "State Management in React: Context API vs Redux",
    thumbnail: "https://picsum.photos/id/7/640/360",
    duration: "25:31",
    channelName: "React Experts",
    channelAvatar: "https://picsum.photos/id/106/64/64",
    views: "203K",
    timestamp: "3 weeks ago"
  },
  {
    id: "8",
    title: "Building a Full-Stack Application with MERN Stack",
    thumbnail: "https://picsum.photos/id/8/640/360",
    duration: "42:18",
    channelName: "Full Stack Developers",
    channelAvatar: "https://picsum.photos/id/107/64/64",
    views: "328K",
    timestamp: "2 months ago"
  }
];

export default function Research(): JSX.Element {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoomIn = (): void => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = (): void => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Recommended Videos</h1>
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex bg-[#2D2D2D] rounded-lg overflow-hidden">
            <button 
              onClick={handleZoomOut}
              className="p-2 text-white hover:bg-[#3D3D3D] transition-colors"
            >
              <ZoomOut size={18} />
            </button>
            <button 
              onClick={handleZoomIn}
              className="p-2 text-white hover:bg-[#3D3D3D] transition-colors"
            >
              <ZoomIn size={18} />
            </button>
          </div>
          {/* View Mode Controls */}
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
        </div>
      </div>

      {/* Video Grid */}
      <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
        <VideoGrid videos={mockVideos} />
      </div>
    </div>
  );
} 