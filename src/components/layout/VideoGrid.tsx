'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

interface Video {
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
  videos: Video[]
}

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <Link 
      key={video.id} 
      href={`/video/${video.id}`}
      className="group"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={video.channelAvatar}
            alt={video.channelName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-white font-medium line-clamp-2 group-hover:text-[#d61204] transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{video.channelName}</p>
          <p className="text-gray-400 text-sm">
            {video.views} views • {video.timestamp}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function VideoGrid({ videos }: VideoGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
} 