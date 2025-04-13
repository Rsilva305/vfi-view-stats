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
  showTextDetails?: boolean
  videosPerRow?: number
}

const VideoCard = ({ video, showTextDetails }: { video: Video, showTextDetails: boolean }) => {
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
      {showTextDetails && (
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
      )}
    </Link>
  )
}

export default function VideoGrid({ videos, showTextDetails = true, videosPerRow = 4 }: VideoGridProps): JSX.Element {
  // Determine the grid columns based on videosPerRow
  const getGridColumns = () => {
    switch (videosPerRow) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      case 5:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
      case 6:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }
  }

  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} showTextDetails={showTextDetails} />
      ))}
    </div>
  )
} 