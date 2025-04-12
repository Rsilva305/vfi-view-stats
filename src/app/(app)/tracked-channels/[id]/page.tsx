"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Search, Share2, AlignJustify, ChevronRight, ChevronLeft, ExternalLink, Bell, Link as LinkIcon, LineChart, Clock, BookmarkPlus } from "lucide-react";
import Link from "next/link";

// Mock data for a channel
const mockChannel = {
  id: "1",
  name: "Dev Masters",
  avatar: "https://picsum.photos/id/100/64/64",
  banner: "https://picsum.photos/id/1/1200/300",
  subscriberCount: "1.2M",
  videoCount: 342,
  totalViews: "42M",
  lastUpdated: "2 days ago",
  description: "Dev Masters is a channel dedicated to teaching web development, focusing on modern JavaScript frameworks, backend technologies, and career advice for developers.",
  tags: ["Web Development", "JavaScript", "React", "NodeJS", "Career Advice"],
  socialLinks: [
    { platform: "Twitter", url: "https://twitter.com/devmasters" },
    { platform: "GitHub", url: "https://github.com/devmasters" },
    { platform: "Website", url: "https://devmasters.com" }
  ],
  uploadFrequency: "2 videos per week",
  avgViewsPerVideo: "120K",
  engagementRate: "8.5%",
  popularTopics: ["React Hooks", "CSS Tricks", "JavaScript Performance", "Career Tips"]
};

// Mock data for videos from the channel
const mockVideos = [
  {
    id: "v1",
    title: "10 React Hooks You Need to Know",
    thumbnail: "https://picsum.photos/id/1/640/360",
    duration: "15:42",
    views: "246K",
    timestamp: "3 days ago",
    metrics: {
      likes: "15K",
      comments: "324",
      ctr: "6.8%",
      avgViewDuration: "8:21"
    }
  },
  {
    id: "v2",
    title: "Building a Full-Stack App with NextJS and MongoDB",
    thumbnail: "https://picsum.photos/id/2/640/360",
    duration: "28:15",
    views: "189K",
    timestamp: "1 week ago",
    metrics: {
      likes: "12K",
      comments: "256",
      ctr: "5.9%",
      avgViewDuration: "12:45"
    }
  },
  {
    id: "v3",
    title: "CSS Grid vs Flexbox: When to Use Each",
    thumbnail: "https://picsum.photos/id/3/640/360",
    duration: "12:37",
    views: "312K",
    timestamp: "2 weeks ago",
    metrics: {
      likes: "18K",
      comments: "412",
      ctr: "7.2%",
      avgViewDuration: "9:18"
    }
  },
  {
    id: "v4",
    title: "How to Ace Your Web Developer Interview",
    thumbnail: "https://picsum.photos/id/4/640/360",
    duration: "22:09",
    views: "178K",
    timestamp: "3 weeks ago",
    metrics: {
      likes: "14K",
      comments: "543",
      ctr: "8.1%",
      avgViewDuration: "15:22"
    }
  },
  {
    id: "v5",
    title: "JavaScript Performance Optimization Tips",
    thumbnail: "https://picsum.photos/id/5/640/360",
    duration: "18:53",
    views: "265K",
    timestamp: "1 month ago",
    metrics: {
      likes: "16K",
      comments: "378",
      ctr: "6.5%",
      avgViewDuration: "11:47"
    }
  }
];

export default function ChannelDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'videos' | 'about' | 'analytics'>('videos');
  
  // Filter videos based on search query
  const filteredVideos = mockVideos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-1 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Tracked Channels</span>
      </button>
      
      {/* Channel Banner */}
      <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
        <img 
          src={mockChannel.banner} 
          alt={`${mockChannel.name} banner`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
            <img 
              src={mockChannel.avatar} 
              alt={mockChannel.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">{mockChannel.name}</h1>
            <p className="text-gray-300">{mockChannel.subscriberCount} subscribers</p>
          </div>
        </div>
      </div>
      
      {/* Channel Actions */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white py-2 px-4 rounded-lg transition-colors">
            <Bell size={18} />
            <span>Track Updates</span>
          </button>
          <button className="flex items-center gap-1 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white py-2 px-4 rounded-lg transition-colors">
            <LinkIcon size={18} />
            <span>Channel Link</span>
          </button>
          <button className="flex items-center gap-1 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white py-2 px-4 rounded-lg transition-colors">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
        <a 
          href={`https://youtube.com/channel/${id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#00FF8C] hover:underline"
        >
          <span>View on YouTube</span>
          <ExternalLink size={16} />
        </a>
      </div>
      
      {/* Channel Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1E1E1E] p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Subscribers</p>
          <p className="text-white text-xl font-medium">{mockChannel.subscriberCount}</p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Videos</p>
          <p className="text-white text-xl font-medium">{mockChannel.videoCount}</p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Total Views</p>
          <p className="text-white text-xl font-medium">{mockChannel.totalViews}</p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Avg. Views/Video</p>
          <p className="text-white text-xl font-medium">{mockChannel.avgViewsPerVideo}</p>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="border-b border-[#2D2D2D] mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-3 px-1 relative ${
              activeTab === 'videos' 
                ? 'text-white font-medium' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Videos
            {activeTab === 'videos' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00FF8C]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 px-1 relative ${
              activeTab === 'about' 
                ? 'text-white font-medium' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            About
            {activeTab === 'about' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00FF8C]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-1 relative ${
              activeTab === 'analytics' 
                ? 'text-white font-medium' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Analytics
            {activeTab === 'analytics' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00FF8C]"></div>
            )}
          </button>
        </div>
      </div>
      
      {/* Videos Tab Content */}
      {activeTab === 'videos' && (
        <div>
          {/* Search and Filter Row */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search channel videos"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2D2D2D] text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Sort by:</span>
              <select className="bg-[#2D2D2D] text-white rounded-lg py-2 px-3 focus:outline-none">
                <option>Most recent</option>
                <option>Most viewed</option>
                <option>Highest engagement</option>
              </select>
            </div>
          </div>
          
          {/* Video Carousel */}
          <div className="relative mb-10">
            <h3 className="text-white font-medium mb-4">Popular Videos</h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {mockVideos.map(video => (
                <div key={video.id} className="min-w-[300px] bg-[#1E1E1E] rounded-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-medium mb-2 line-clamp-2">{video.title}</h4>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{video.views} views</span>
                      <span>{video.timestamp}</span>
                    </div>
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
          
          {/* Video List */}
          <div>
            <h3 className="text-white font-medium mb-4">All Videos</h3>
            <div className="space-y-4">
              {filteredVideos.map(video => (
                <div key={video.id} className="flex bg-[#1E1E1E] rounded-lg overflow-hidden">
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
                      <h4 className="text-white font-medium mb-1">{video.title}</h4>
                      <div className="text-xs text-gray-400 mb-2">
                        <span>{video.views} views • {video.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex gap-6 text-xs">
                      <div>
                        <p className="text-gray-400 mb-1">Likes</p>
                        <p className="text-white">{video.metrics.likes}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Comments</p>
                        <p className="text-white">{video.metrics.comments}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">CTR</p>
                        <p className="text-white">{video.metrics.ctr}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Avg. View Duration</p>
                        <p className="text-white">{video.metrics.avgViewDuration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center p-4">
                    <button className="flex items-center justify-center p-2 bg-[#2D2D2D] rounded-full hover:bg-[#3D3D3D] transition-colors">
                      <Clock size={16} className="text-white" />
                    </button>
                    <button className="flex items-center justify-center p-2 bg-[#2D2D2D] rounded-full hover:bg-[#3D3D3D] transition-colors">
                      <BookmarkPlus size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* About Tab Content */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Description</h3>
              <p className="text-gray-400">{mockChannel.description}</p>
            </div>
            
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {mockChannel.tags.map(tag => (
                  <span key={tag} className="bg-[#2D2D2D] text-white px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {mockChannel.popularTopics.map(topic => (
                  <span key={topic} className="bg-[#2D2D2D] text-white px-3 py-1 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Channel Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Upload Frequency</p>
                  <p className="text-white">{mockChannel.uploadFrequency}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg. Views Per Video</p>
                  <p className="text-white">{mockChannel.avgViewsPerVideo}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Engagement Rate</p>
                  <p className="text-white">{mockChannel.engagementRate}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p className="text-white">{mockChannel.lastUpdated}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Social Links</h3>
              <div className="space-y-3">
                {mockChannel.socialLinks.map(link => (
                  <a 
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[#00FF8C] hover:underline"
                  >
                    <span>{link.platform}</span>
                    <ExternalLink size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Analytics Tab Content */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 bg-[#1E1E1E] p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">View Growth Over Time</h3>
              <select className="bg-[#2D2D2D] text-white text-sm rounded-lg px-3 py-2 focus:outline-none">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between">
              {[0.3, 0.5, 0.4, 0.6, 0.7, 0.6, 0.9, 0.8, 0.7, 0.8, 0.9, 1].map((height, index) => (
                <div key={index} className="w-full">
                  <div 
                    className="bg-[#00FF8C] rounded-t-sm mx-1" 
                    style={{ height: `${height * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
          
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Video Performance</h3>
              <div className="space-y-4">
                {mockVideos.slice(0, 3).map(video => (
                  <div key={video.id} className="flex gap-3">
                    <div className="relative w-24 h-16 min-w-[96px]">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-white text-sm line-clamp-1">{video.title}</h4>
                      <div className="flex gap-3 text-xs text-gray-400 mt-1">
                        <span>{video.views} views</span>
                        <span>{video.metrics.likes} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Subscriber Growth</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-full bg-[#2D2D2D] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00FF8C] h-full w-3/4"></div>
                </div>
                <span className="text-white text-sm">75%</span>
              </div>
              <p className="text-gray-400 text-sm">Increased by 125K in the last 90 days</p>
            </div>
            
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Average Engagement</h3>
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-gray-400 text-xs">Likes per Video</p>
                  <p className="text-white text-xl font-medium">15.2K</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Comments per Video</p>
                  <p className="text-white text-xl font-medium">368</p>
                </div>
              </div>
              <p className="text-[#00FF8C] text-sm">+12% from previous period</p>
            </div>
            
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Upload Frequency</h3>
              <div className="grid grid-cols-7 gap-1 mb-3">
                {Array.from({ length: 28 }).map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-full aspect-square rounded-sm ${
                      [2, 6, 9, 13, 17, 20, 24, 27].includes(index) 
                        ? 'bg-[#00FF8C]' 
                        : 'bg-[#2D2D2D]'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-gray-400 text-sm">8 videos uploaded in the last 28 days</p>
            </div>
          </div>
          
          <div className="col-span-1 space-y-6">
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Top Performing Video</h3>
              <div className="relative mb-3">
                <img 
                  src={mockVideos[2].thumbnail} 
                  alt={mockVideos[2].title} 
                  className="w-full rounded"
                />
              </div>
              <h4 className="text-white text-sm mb-2">{mockVideos[2].title}</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Views</p>
                  <p className="text-white">{mockVideos[2].views}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Likes</p>
                  <p className="text-white">{mockVideos[2].metrics.likes}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">CTR</p>
                  <p className="text-white">{mockVideos[2].metrics.ctr}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Avg Duration</p>
                  <p className="text-white">{mockVideos[2].metrics.avgViewDuration}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <h3 className="text-white font-medium mb-4">Audience Retention</h3>
              <div className="h-32 mb-2">
                <div className="w-full h-full bg-[#2D2D2D] rounded relative">
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-1/4 h-full bg-[#00FF8C]/10"></div>
                    <div className="w-1/4 h-[95%] bg-[#00FF8C]/20"></div>
                    <div className="w-1/4 h-[80%] bg-[#00FF8C]/40"></div>
                    <div className="w-1/4 h-[60%] bg-[#00FF8C]/60"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
              <p className="text-gray-400 text-sm mt-3">Average viewer watches 60% of videos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 