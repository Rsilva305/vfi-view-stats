"use client";

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Circle } from 'lucide-react'

interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  watched: boolean;
  category: 'algorithm' | 'basics' | 'research' | 'organization';
}

// Mock data for tutorial videos
const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'How To Make The Algorithm LOVE You (Step-By-Step Strategy)',
    description: 'Discover the step-by-step, data driven way to use Saved Channels to figure out exactly what topics are trending and proven to get views in your niche',
    thumbnail: '/images/tutorials/algorithm-strategy.png',
    watched: true,
    category: 'algorithm'
  },
  {
    id: '2',
    title: 'Complete Beginner Guide - How To Use Velio To Get More Views',
    description: 'Everything you need to use Velio to blow up your channel',
    thumbnail: '/images/tutorials/beginner-guide.png',
    watched: false,
    category: 'basics'
  },
  {
    id: '3',
    title: 'How To Find Data-Proven Ideas, Titles, Thumbnails & More',
    description: 'Learn exactly how to use the Research Tab to find viral video ideas, titles and thumbnails like the pros.',
    thumbnail: '/images/tutorials/research-guide.png',
    watched: false,
    category: 'research'
  },
  {
    id: '4',
    title: 'How To Properly Organize and Implement Your Research',
    description: 'How to use the Saved Videos Tab to organise all your research',
    thumbnail: '/images/tutorials/organization-guide.png',
    watched: false,
    category: 'organization'
  }
];

export default function Learn() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Function to get category-specific content
  const getCategoryContent = (category: string) => {
    switch(category) {
      case 'algorithm':
        return {
          icon: "📈",
          text: "It's Not Luck",
          bgColor: "bg-gradient-to-br from-[#121212] to-[#1A1A1A]",
          accentColor: "border-l-[#d61204]"
        };
      case 'basics':
        return {
          icon: "101",
          text: "Velio Basics",
          bgColor: "bg-gradient-to-br from-[#121212] to-[#1A1A1A]",
          accentColor: "border-l-[#00B3FF]"
        };
      case 'research':
        return {
          icon: "🔍",
          text: "Research",
          bgColor: "bg-gradient-to-br from-[#121212] to-[#1A1A1A]",
          accentColor: "border-l-[#FF8C00]"
        };
      case 'organization':
        return {
          icon: "📁",
          text: "Organization",
          bgColor: "bg-gradient-to-br from-[#121212] to-[#1A1A1A]",
          accentColor: "border-l-[#9966FF]"
        };
      default:
        return {
          icon: "📚",
          text: "Tutorial",
          bgColor: "bg-gradient-to-br from-[#121212] to-[#1A1A1A]",
          accentColor: "border-l-[#1DB954]"
        };
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Learn</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial) => {
          const categoryContent = getCategoryContent(tutorial.category);
          
          return (
            <div 
              key={tutorial.id} 
              className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2D2D2D]"
              onMouseEnter={() => setHoveredCard(tutorial.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Tutorial image area - takes 1/3 of the card on desktop */}
                <div className={`relative h-48 md:h-full ${categoryContent.bgColor} border-l-4 ${categoryContent.accentColor}`}>
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-5xl font-bold">{categoryContent.icon}</div>
                    {tutorial.category === 'algorithm' && (
                      <div className="absolute bottom-4 left-4 right-4 text-2xl font-bold text-[#d61204]">
                        It's Not Luck
                      </div>
                    )}
                    {tutorial.category === 'basics' && (
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <span className="text-6xl font-bold text-[#00B3FF]">101</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Tutorial content - takes 2/3 of the card on desktop */}
                <div className="p-6 md:col-span-2 relative">
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-white">{tutorial.title}</h2>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{tutorial.description}</p>
                  
                  {/* Watched status */}
                  <div className="flex items-center gap-2">
                    {tutorial.watched ? (
                      <>
                        <CheckCircle size={18} className="text-[#d61204]" />
                        <span className="text-[#d61204] text-sm">Watched</span>
                      </>
                    ) : (
                      <>
                        <Circle size={18} className="text-gray-400" />
                        <span className="text-gray-400 text-sm">Watched</span>
                      </>
                    )}
                  </div>

                  {/* Hover state button (only visible on hover) */}
                  {hoveredCard === tutorial.id && (
                    <div className="absolute bottom-6 right-6">
                      <Link 
                        href={`/learn/${tutorial.id}`}
                        className="bg-[#d61204] hover:bg-[#b81003] text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Watch Tutorial
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
} 