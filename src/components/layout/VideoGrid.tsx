'use client'

import React from 'react'
import Image from 'next/image'
import { Clock } from 'lucide-react'

interface VideoItem {
  id: string
  title: string
  thumbnail: string
  duration: string
  channelName: string
  channelAvatar: string
  views: string
  timestamp: string
}

interface VideoGridProps {
  videos: VideoItem[]
}

const VideoCard = ({ video }: { video: VideoItem }) => {
  return (
    <div className="flex flex-col group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
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
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0 h-8 w-8 mt-1">
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image 
              src={video.channelAvatar} 
              alt={video.channelName}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">{video.title}</h3>
          <p className="text-gray-400 text-xs mb-1">{video.channelName}</p>
          <div className="flex items-center text-gray-400 text-xs">
            <span>{video.views} views</span>
            <span className="mx-1">•</span>
            <span className="flex items-center gap-0.5">
              <Clock size={12} />
              {video.timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
} 