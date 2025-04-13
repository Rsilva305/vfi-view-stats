"use client";

import VideoGrid from "@/components/layout/VideoGrid";
import { ZoomIn, ZoomOut, LayoutGrid, List, Search, Filter, Shuffle, SlidersHorizontal, X, Calendar, Info, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Monitor, Minus, Plus } from "lucide-react";
import { useState, useEffect, useRef } from 'react';

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [showTextDetails, setShowTextDetails] = useState<boolean>(true);
  const [videosPerRow, setVideosPerRow] = useState<number>(4);
  
  // Filter state variables
  const [searchPrecision, setSearchPrecision] = useState<'specific' | 'hybrid'>('hybrid');
  const [contentFormat, setContentFormat] = useState<'videos' | 'shorts'>('videos');
  const [timeRange, setTimeRange] = useState<string>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [whenPosted, setWhenPosted] = useState<boolean>(false);

  // Additional state for advanced filters
  const [viewsSubsRatio, setViewsSubsRatio] = useState<[number, number]>([0, 500]);
  const [medianViews, setMedianViews] = useState<[number, number]>([0, 400000]);
  const [channelTotalViews, setChannelTotalViews] = useState<[number, number]>([0, 1000000]);
  const [channelVideosCount, setChannelVideosCount] = useState<[number, number]>([0, 100]);
  const [videoLikes, setVideoLikes] = useState<[number, number]>([0, 50000]);
  const [videoComments, setVideoComments] = useState<[number, number]>([0, 5000]);
  const [engagementRate, setEngagementRate] = useState<[number, number]>([0, 100]);
  const [channelAge, setChannelAge] = useState<[string, string]>(["Brand new", "20 years ago"]);

  // Exclude filters
  const [excludeIndianVideos, setExcludeIndianVideos] = useState<boolean>(false);
  const [excludeMusicVideos, setExcludeMusicVideos] = useState<boolean>(false);

  // Additional input fields for advanced filters
  const [includeChannels, setIncludeChannels] = useState<string>('');
  const [includeKeywords, setIncludeKeywords] = useState<string>('');
  const [excludeChannels, setExcludeChannels] = useState<string>('');
  const [excludeKeywords, setExcludeKeywords] = useState<string>('');

  // Add state for sliders and input values
  const [multiplierRange, setMultiplierRange] = useState<[number, number]>([0, 500]);
  const [viewsRange, setViewsRange] = useState<[number, number]>([0, 1000000000]);
  const [subscribersRange, setSubscribersRange] = useState<[number, number]>([0, 500000000]);
  const [durationRange, setDurationRange] = useState<[string, string]>(["00:00:00", "07:00:00"]);
  
  // Create refs for slider elements
  const multiplierMinRef = useRef<HTMLDivElement>(null);
  const multiplierMaxRef = useRef<HTMLDivElement>(null);
  const viewsMinRef = useRef<HTMLDivElement>(null);
  const viewsMaxRef = useRef<HTMLDivElement>(null);
  const subscribersMinRef = useRef<HTMLDivElement>(null);
  const subscribersMaxRef = useRef<HTMLDivElement>(null);
  const durationMinRef = useRef<HTMLDivElement>(null);
  const durationMaxRef = useRef<HTMLDivElement>(null);
  
  // State to track which thumb is being dragged
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [currentSlider, setCurrentSlider] = useState<string | null>(null);
  const [currentThumb, setCurrentThumb] = useState<number | null>(null);
  
  // Helper function to format large numbers
  const formatLargeNumber = (value: number): string => {
    if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value.toString();
  };
  
  // Handle mouse down on slider thumbs
  const handleThumbMouseDown = (event: React.MouseEvent, slider: string, thumbIndex: number) => {
    event.preventDefault();
    setIsDragging(true);
    setCurrentSlider(slider);
    setCurrentThumb(thumbIndex);
    
    // Add event listeners for drag
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Handle mouse move for dragging
  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !currentSlider || currentThumb === null) return;
    
    let trackElement: HTMLDivElement | null = null;
    let thumbElement: HTMLDivElement | null = null;
    let minValue = 0;
    let maxValue = 0;
    
    // Determine which slider is being dragged
    switch (currentSlider) {
      case 'multiplier':
        trackElement = multiplierMinRef.current?.parentElement as HTMLDivElement;
        thumbElement = currentThumb === 0 ? multiplierMinRef.current : multiplierMaxRef.current;
        minValue = 0;
        maxValue = 500;
        break;
      case 'views':
        trackElement = viewsMinRef.current?.parentElement as HTMLDivElement;
        thumbElement = currentThumb === 0 ? viewsMinRef.current : viewsMaxRef.current;
        minValue = 0;
        maxValue = 1000000000; // 1B
        break;
      case 'subscribers':
        trackElement = subscribersMinRef.current?.parentElement as HTMLDivElement;
        thumbElement = currentThumb === 0 ? subscribersMinRef.current : subscribersMaxRef.current;
        minValue = 0;
        maxValue = 500000000; // 500M
        break;
      default:
        return;
    }
    
    if (!trackElement || !thumbElement) return;
    
    // Calculate new position
    const trackRect = trackElement.getBoundingClientRect();
    const newPosition = Math.max(0, Math.min(1, (event.clientX - trackRect.left) / trackRect.width));
    const newValue = minValue + newPosition * (maxValue - minValue);
    
    // Update state based on which slider and thumb
    if (currentSlider === 'multiplier') {
      const newRange = [...multiplierRange] as [number, number];
      newRange[currentThumb] = Math.round(newValue * 10) / 10; // Round to 1 decimal place
      
      // Ensure min <= max
      if (currentThumb === 0 && newRange[0] > newRange[1]) {
        newRange[0] = newRange[1];
      } else if (currentThumb === 1 && newRange[1] < newRange[0]) {
        newRange[1] = newRange[0];
      }
      
      setMultiplierRange(newRange);
    } else if (currentSlider === 'views') {
      const newRange = [...viewsRange] as [number, number];
      newRange[currentThumb] = Math.round(newValue);
      
      // Ensure min <= max
      if (currentThumb === 0 && newRange[0] > newRange[1]) {
        newRange[0] = newRange[1];
      } else if (currentThumb === 1 && newRange[1] < newRange[0]) {
        newRange[1] = newRange[0];
      }
      
      setViewsRange(newRange);
    } else if (currentSlider === 'subscribers') {
      const newRange = [...subscribersRange] as [number, number];
      newRange[currentThumb] = Math.round(newValue);
      
      // Ensure min <= max
      if (currentThumb === 0 && newRange[0] > newRange[1]) {
        newRange[0] = newRange[1];
      } else if (currentThumb === 1 && newRange[1] < newRange[0]) {
        newRange[1] = newRange[0];
      }
      
      setSubscribersRange(newRange);
    }
  };
  
  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentSlider(null);
    setCurrentThumb(null);
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  // Set up and clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  // Function to handle time range selection
  const handleTimeRangeSelect = (value: string) => {
    setTimeRange(value);
  };

  // Functions to handle input changes
  const handleMultiplierInputChange = (index: 0 | 1, value: string) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue)) {
      const newRange = [...multiplierRange] as [number, number];
      newRange[index] = newValue;
      setMultiplierRange(newRange);
    }
  };
  
  const handleViewsInputChange = (index: 0 | 1, value: string) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue)) {
      const newRange = [...viewsRange] as [number, number];
      newRange[index] = newValue;
      setViewsRange(newRange);
    }
  };
  
  const handleSubscribersInputChange = (index: 0 | 1, value: string) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue)) {
      const newRange = [...subscribersRange] as [number, number];
      newRange[index] = newValue;
      setSubscribersRange(newRange);
    }
  };
  
  const handleDurationInputChange = (index: 0 | 1, value: string) => {
    const newRange = [...durationRange] as [string, string];
    newRange[index] = value;
    setDurationRange(newRange);
  };

  const handleZoomIn = (): void => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = (): void => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const increaseVideosPerRow = () => {
    if (videosPerRow < 6) {
      setVideosPerRow(videosPerRow + 1);
    }
  };
  
  const decreaseVideosPerRow = () => {
    if (videosPerRow > 2) {
      setVideosPerRow(videosPerRow - 1);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Top Navigation Bar */}
      <div className="flex items-center mb-6 py-3">
        <div className="flex items-center gap-3 mr-4">
          {/* Width/Focus Control */}
          <button 
            className="bg-[#2D2D2D] p-2 rounded-full text-white hover:bg-[#3D3D3D] transition-colors"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={20} />
          </button>
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search a concept"
              className="bg-[#2D2D2D] text-white border border-[#3D3D3D] rounded-full px-4 py-2 pl-10 w-[450px] focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Random Button */}
        <button className="bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
          Random
        </button>
      </div>

      {/* Advanced Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70">
          <div className="h-[95vh] w-[97%] overflow-y-auto bg-[#1A1A1A] p-0 shadow-lg rounded-b-lg">
            <div className="flex items-center justify-between border-b border-[#343A40] px-8 py-4">
              <h2 className="text-xl font-medium text-white">Search filters</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222222] text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-6">
              {/* Presets Section */}
              <div className="mb-8">
                <p className="mb-2 text-base font-medium text-white">Presets</p>
                <div className="relative">
                  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#1A1A1A80] to-transparent opacity-0"></div>
                  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#1A1A1A80] to-transparent opacity-0"></div>
                  <div className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex w-full max-w-full flex-row flex-nowrap gap-2 py-2">
                      {/* Preset buttons would go here */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">
                {/* Left column - main controls */}
                <div className="w-[70%] pr-6">
                  {/* Search precision & Content format */}
                  <div className="mb-6 grid grid-cols-2 gap-x-16 gap-y-6">
                    {/* Search Precision */}
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-white font-medium">Search precision</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      <div className="flex h-10 w-full select-none flex-row items-center rounded-[30px] bg-[#222222] px-2">
                        <div 
                          className={`flex h-8 flex-1 items-center justify-center rounded-[20px] text-[15px] font-medium hover:cursor-pointer ${
                            searchPrecision === 'specific' ? 'bg-[#d61204] text-white' : 'text-gray-400'
                          }`}
                          onClick={() => setSearchPrecision('specific')}
                        >
                          Specific
                        </div>
                        <div 
                          className={`flex h-8 flex-1 items-center justify-center rounded-[20px] text-[15px] font-medium hover:cursor-pointer ${
                            searchPrecision === 'hybrid' ? 'bg-[#d61204] text-white' : 'text-gray-400'
                          }`}
                          onClick={() => setSearchPrecision('hybrid')}
                        >
                          Hybrid
                        </div>
                      </div>
                    </div>

                    {/* Content Format */}
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-white font-medium">Content format</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      <div className="flex h-10 w-full select-none flex-row items-center rounded-[30px] bg-[#222222] px-2">
                        <div 
                          className={`flex h-8 flex-1 items-center justify-center rounded-[20px] text-[15px] font-medium hover:cursor-pointer ${
                            contentFormat === 'videos' ? 'bg-[#d61204] text-white' : 'text-gray-400'
                          }`}
                          onClick={() => setContentFormat('videos')}
                        >
                          <LayoutGrid size={14} className="mr-2" />
                          Videos
                        </div>
                        <div 
                          className={`flex h-8 flex-1 items-center justify-center rounded-[20px] text-[15px] font-medium hover:cursor-pointer ${
                            contentFormat === 'shorts' ? 'bg-[#d61204] text-white' : 'text-gray-400'
                          }`}
                          onClick={() => setContentFormat('shorts')}
                        >
                          Shorts
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sliders: Multiplier, Views, Subscribers, Duration */}
                  <div className="grid grid-cols-2 gap-x-16 gap-y-5">
                    {/* Multiplier */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Multiplier</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((multiplierRange[1] - multiplierRange[0]) / 500) * 100}%`,
                            left: `${(multiplierRange[0] / 500) * 100}%` 
                          }}
                        ></div>
                        <div 
                          ref={multiplierMinRef}
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(multiplierRange[0] / 500) * 100}%` }}
                          onMouseDown={(e) => handleThumbMouseDown(e, 'multiplier', 0)}
                        ></div>
                        <div 
                          ref={multiplierMaxRef}
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(multiplierRange[1] / 505) * 100}%` }}
                          onMouseDown={(e) => handleThumbMouseDown(e, 'multiplier', 1)}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={multiplierRange[0] + 'x'}
                            onChange={(e) => handleMultiplierInputChange(0, e.target.value.replace('x', ''))}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={multiplierRange[1] + 'x+'}
                            onChange={(e) => handleMultiplierInputChange(1, e.target.value.replace('x+', ''))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Views */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Views</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((viewsRange[1] - viewsRange[0]) / 1000000000) * 100}%`,
                            left: `${(viewsRange[0] / 1000000000) * 100}%` 
                          }}
                        ></div>
                        <div 
                          ref={viewsMinRef}
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(viewsRange[0] / 1000000000) * 100}%` }}
                          onMouseDown={(e) => handleThumbMouseDown(e, 'views', 0)}
                        ></div>
                        <div 
                          ref={viewsMaxRef}
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(viewsRange[1] / 1000000000) * 100}%` }}
                          onMouseDown={(e) => handleThumbMouseDown(e, 'views', 1)}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={viewsRange[0]}
                            onChange={(e) => handleViewsInputChange(0, e.target.value)}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={viewsRange[1] === 1000000000 ? "1B+" : formatLargeNumber(viewsRange[1]) + '+'}
                            onChange={(e) => handleViewsInputChange(1, e.target.value.replace('+', ''))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subscribers */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">Subscribers</span>
                          <Info size={14} className="text-gray-400" />
                        </div>
                        <label className="flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={whenPosted}
                            onChange={() => setWhenPosted(!whenPosted)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-2 text-sm text-white">
                            When posted
                            <div className={`flex h-4 w-4 items-center justify-center rounded border ${whenPosted ? 'border-[#d61204] bg-[#d61204]' : 'border-white'}`}>
                              {whenPosted && (
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((subscribersRange[1] - subscribersRange[0]) / 500000000) * 100}%`,
                            left: `${(subscribersRange[0] / 500000000) * 100}%` 
                          }}
                        ></div>
                        <div 
                          ref={subscribersMinRef}
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(subscribersRange[0] / 500000000) * 100}%` }}
                          onMouseDown={(e) => handleThumbMouseDown(e, 'subscribers', 0)}
                        ></div>
                        <div 
                          ref={subscribersMaxRef}
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(subscribersRange[1] / 500000000) * 100}%` }}
                          onMouseDown={(e) => handleThumbMouseDown(e, 'subscribers', 1)}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={subscribersRange[0]}
                            onChange={(e) => handleSubscribersInputChange(0, e.target.value)}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={subscribersRange[1] === 500000000 ? "500M+" : formatLargeNumber(subscribersRange[1]) + '+'}
                            onChange={(e) => handleSubscribersInputChange(1, e.target.value.replace('+', ''))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Video Duration */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Video duration</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div className="absolute left-0 top-0 h-[3px] w-[calc(100%-16px)] rounded-full bg-[#d61204]"></div>
                        <div 
                          ref={durationMinRef}
                          className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white"
                        ></div>
                        <div 
                          ref={durationMaxRef}
                          className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white"
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={durationRange[0]}
                            onChange={(e) => handleDurationInputChange(0, e.target.value)}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={durationRange[1] + '+'}
                            onChange={(e) => handleDurationInputChange(1, e.target.value.replace('+', ''))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column - Time range & Calendar side by side */}
                <div className="w-[30%] ml-6 border-l border-[#343A40] pl-6">
                  <div className="mb-3">
                    <span className="text-white font-medium">Time range</span>
                  </div>
                  
                  <div className="flex">
                    {/* Time range options */}
                    <div className="w-1/2 pr-2">
                      {["Last 30 Days", "Last 90 Days", "Last 180 Days", "Last 365 Days", "Last 3 Years"].map((option) => (
                        <button 
                          key={option} 
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-white ${
                            timeRange === option.toLowerCase().replace(/\s/g, '_') ? 'bg-[#d61204]' : 'hover:bg-[#2A2A2A]'
                          } mb-1 text-sm`}
                          onClick={() => handleTimeRangeSelect(option.toLowerCase().replace(/\s/g, '_'))}
                        >
                          <span>{option}</span>
                          <ChevronRight size={14} />
                        </button>
                      ))}
                      
                      <button 
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-white ${
                          timeRange === 'all' ? 'bg-[#d61204]' : 'hover:bg-[#2A2A2A]'
                        } mb-1 text-sm`}
                        onClick={() => handleTimeRangeSelect('all')}
                      >
                        <span>All Time</span>
                        <ChevronRight size={14} />
                      </button>
                      
                      <button 
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-white ${
                          timeRange === 'custom' ? 'bg-[#d61204]' : 'hover:bg-[#2A2A2A]'
                        } text-sm`}
                        onClick={() => handleTimeRangeSelect('custom')}
                      >
                        <span>Custom</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                    
                    {/* Calendar */}
                    <div className="w-1/2 pl-1">
                      {/* Date picker inputs */}
                      <div className="mb-2 flex space-x-1">
                        <input 
                          type="text"
                          className="w-full rounded-lg border border-[#343A40] bg-transparent px-2 py-1.5 text-white text-xs"
                          placeholder="Start Date"
                          value="Feb 13, 2005"
                          readOnly
                        />
                        <input 
                          type="text"
                          className="w-full rounded-lg border border-[#343A40] bg-transparent px-2 py-1.5 text-white text-xs"
                          placeholder="End Date"
                          value="Apr 12, 2025"
                          readOnly
                        />
                      </div>
                      
                      {/* Month navigation */}
                      <div className="mb-1 flex items-center justify-between text-gray-400 text-xs">
                        <button className="p-0.5 hover:text-white">
                          <ChevronLeft size={12} />
                        </button>
                        <div>
                          <span>February</span>
                          <span className="ml-1">2005</span>
                        </div>
                        <button className="p-0.5 hover:text-white">
                          <ChevronRight size={12} />
                        </button>
                      </div>
                      
                      {/* Calendar grid */}
                      <div>
                        {/* Day names */}
                        <div className="mb-0.5 grid grid-cols-7 text-center text-[10px] text-gray-400">
                          <div>Su</div>
                          <div>Mo</div>
                          <div>Tu</div>
                          <div>We</div>
                          <div>Th</div>
                          <div>Fr</div>
                          <div>Sa</div>
                        </div>
                        
                        {/* Calendar days */}
                        <div className="mb-0.5 grid grid-cols-7 gap-[1px]">
                          {/* Previous month days */}
                          {[30, 31, 1, 2, 3, 4, 5].map((day, i) => (
                            <div key={`prev-${i}`} className="text-center py-0.5 text-[10px] text-gray-500">{day}</div>
                          ))}
                        </div>
                        
                        <div className="mb-0.5 grid grid-cols-7 gap-[1px]">
                          {[6, 7, 8, 9, 10, 11, 12].map((day, i) => (
                            <div key={`week2-${i}`} className="text-center py-0.5 text-[10px] text-gray-500">{day}</div>
                          ))}
                        </div>
                        
                        <div className="mb-0.5 grid grid-cols-7 gap-[1px]">
                          {[13, 14, 15, 16, 17, 18, 19].map((day, i) => (
                            <div 
                              key={`week3-${i}`} 
                              className={`text-center py-0.5 text-[10px] ${i === 0 ? 'rounded-l-full' : ''} ${i === 6 ? 'rounded-r-full' : ''} bg-[#d61204] text-white`}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mb-0.5 grid grid-cols-7 gap-[1px]">
                          {[20, 21, 22, 23, 24, 25, 26].map((day, i) => (
                            <div 
                              key={`week4-${i}`} 
                              className="text-center py-0.5 text-[10px] bg-[#d61204] text-white"
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-[1px]">
                          {[27, 28, 1, 2, 3, 4, 5].map((day, i) => (
                            <div 
                              key={`week5-${i}`} 
                              className={`text-center py-0.5 text-[10px] ${i === 0 ? 'rounded-l-full' : ''} ${i === 6 ? 'rounded-r-full' : ''} bg-[#d61204] text-white`}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced filters section */}
              {showAdvancedFilters && (
                <div className="mt-6 pt-4 border-t border-[#343A40]">
                  <div className="text-white mb-4">
                    <h3 className="font-medium mb-1">Advanced filters</h3>
                    <p className="text-sm text-gray-400">Find outliers with</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-16 gap-y-5">
                    {/* Views : Subs ratio */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Views : Subs ratio</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((viewsSubsRatio[1] - viewsSubsRatio[0]) / 500) * 100}%`,
                            left: `${(viewsSubsRatio[0] / 500) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(viewsSubsRatio[0] / 500) * 100}%` }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(viewsSubsRatio[1] / 500) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={viewsSubsRatio[0].toFixed(1)}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={viewsSubsRatio[1] === 500 ? "500.0+" : viewsSubsRatio[1].toFixed(1)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Median views */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Median views</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((medianViews[1] - medianViews[0]) / 400000) * 100}%`,
                            left: `${(medianViews[0] / 400000) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(medianViews[0] / 400000) * 100}%` }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(medianViews[1] / 400000) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={medianViews[0]}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={medianViews[1] === 400000 ? "400M+" : formatLargeNumber(medianViews[1]) + '+'}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Channel total views */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Channel total views</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((channelTotalViews[1] - channelTotalViews[0]) / 1000000) * 100}%`,
                            left: `${(channelTotalViews[0] / 1000000) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(channelTotalViews[0] / 1000000) * 100}%` }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(channelTotalViews[1] / 1000000) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={channelTotalViews[0]}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={channelTotalViews[1] === 1000000 ? "100B+" : formatLargeNumber(channelTotalViews[1]) + '+'}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Channel number of videos */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Channel number of videos</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((channelVideosCount[1] - channelVideosCount[0]) / 100) * 100}%`,
                            left: `${(channelVideosCount[0] / 100) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(channelVideosCount[0] / 100) * 100}%` }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(channelVideosCount[1] / 100) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={channelVideosCount[0]}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={channelVideosCount[1] === 100 ? "100+" : channelVideosCount[1] + '+'}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Video likes */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Video likes</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((videoLikes[1] - videoLikes[0]) / 50000) * 100}%`,
                            left: `${(videoLikes[0] / 50000) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(videoLikes[0] / 50000) * 100}%` }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(videoLikes[1] / 50000) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={videoLikes[0]}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={videoLikes[1] === 50000 ? "50M+" : formatLargeNumber(videoLikes[1]) + '+'}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Video comments */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Video comments</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((videoComments[1] - videoComments[0]) / 5000) * 100}%`,
                            left: `${(videoComments[0] / 5000) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(videoComments[0] / 5000) * 100}%` }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(videoComments[1] / 5000) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={videoComments[0]}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={videoComments[1] === 5000 ? "5M+" : formatLargeNumber(videoComments[1]) + '+'}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Engagement rate */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Engagement rate</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] rounded-full bg-[#d61204]" 
                          style={{ 
                            width: `${((engagementRate[1] - engagementRate[0]) / 100) * 100}%`,
                            left: `${(engagementRate[0] / 100) * 100}%` 
                          }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(engagementRate[0] / 100) * 100}%` }}
                        ></div>
                        <div 
                          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white" 
                          style={{ left: `${(engagementRate[1] / 100) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={engagementRate[0]}
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value={engagementRate[1] + '+'}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Channel age */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Channel age</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      
                      {/* Slider */}
                      <div className="group relative mb-3 h-[3px] w-full rounded-full bg-[#343A40]">
                        <div 
                          className="absolute top-0 h-[3px] w-full rounded-full bg-[#d61204]"
                        ></div>
                        <div 
                          className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white"
                        ></div>
                        <div 
                          className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-white"
                        ></div>
                      </div>
                      
                      {/* Range inputs */}
                      <div className="flex items-center space-x-3">
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value="Brand new"
                            readOnly
                          />
                        </div>
                        <span className="text-white text-sm">TO</span>
                        <div className="w-full">
                          <input 
                            type="text" 
                            className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                            value="20 years ago+"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Include/Exclude Channels & Keywords */}
                  <div className="mt-5 grid grid-cols-2 gap-x-16 gap-y-5">
                    {/* Include these channels */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Include these channels</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                        placeholder="Produced by these channels"
                        value={includeChannels}
                        onChange={(e) => setIncludeChannels(e.target.value)}
                      />
                    </div>
                    
                    {/* Include these keywords */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Include these keywords</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                        placeholder="This exact phrase in the title"
                        value={includeKeywords}
                        onChange={(e) => setIncludeKeywords(e.target.value)}
                      />
                    </div>
                    
                    {/* Exclude these channels */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Exclude these channels</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                        placeholder="None of these channels"
                        value={excludeChannels}
                        onChange={(e) => setExcludeChannels(e.target.value)}
                      />
                    </div>
                    
                    {/* Exclude keywords */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-white font-medium">Exclude keywords</span>
                        <Info size={14} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        className="w-full rounded-lg border border-[#343A40] bg-transparent px-3 py-2 text-white focus:border-[#d61204] focus:outline-none"
                        placeholder="None of these phrases in the title"
                        value={excludeKeywords}
                        onChange={(e) => setExcludeKeywords(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Exclude these */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-white font-medium">Exclude these</span>
                      <Info size={14} className="text-gray-400" />
                    </div>
                    <div className="flex items-center gap-6">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={excludeIndianVideos}
                          onChange={() => setExcludeIndianVideos(!excludeIndianVideos)}
                          className="sr-only"
                        />
                        <div className={`flex h-4 w-4 items-center justify-center rounded border ${excludeIndianVideos ? 'border-[#d61204] bg-[#d61204]' : 'border-white'}`}>
                          {excludeIndianVideos && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white text-sm">Indian videos</span>
                      </label>
                      
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={excludeMusicVideos}
                          onChange={() => setExcludeMusicVideos(!excludeMusicVideos)}
                          className="sr-only"
                        />
                        <div className={`flex h-4 w-4 items-center justify-center rounded border ${excludeMusicVideos ? 'border-[#d61204] bg-[#d61204]' : 'border-white'}`}>
                          {excludeMusicVideos && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white text-sm">Music videos</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-[#343A40] pt-5">
                <button 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center text-[#d61204] text-sm"
                >
                  <span className="font-medium">Advanced filters</span>
                  {showAdvancedFilters ? (
                    <ChevronUp size={14} className="ml-1" />
                  ) : (
                    <ChevronDown size={14} className="ml-1" />
                  )}
                </button>
                
                <div className="flex items-center space-x-4">
                  <button className="font-medium text-[#d61204] hover:underline text-sm">
                    Save preset
                  </button>
                  <button className="rounded-full bg-[#343A40] px-6 py-2 font-medium text-white hover:bg-[#424242] text-sm">
                    Reset
                  </button>
                  <button className="rounded-full bg-[#d61204] px-6 py-2 font-medium text-white hover:bg-[#b81003] text-sm">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Controls */}
      <div className="flex justify-end items-center mb-6">
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
        </div>
      </div>

      {/* Video Grid */}
      <div>
        <VideoGrid 
          videos={mockVideos} 
          showTextDetails={showTextDetails}
          videosPerRow={videosPerRow}
        />
      </div>
    </div>
  );
} 