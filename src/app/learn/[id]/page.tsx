'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react'
import Link from 'next/link'

interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  watched: boolean;
  category: 'algorithm' | 'basics' | 'research' | 'organization';
  videoUrl?: string;
  // Additional content for the detail page
  content: string;
  relatedTutorials: string[];
}

// Mock data for tutorial videos
const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'How To Make The Algorithm LOVE You (Step-By-Step Strategy)',
    description: 'Discover the step-by-step, data driven way to use Saved Channels to figure out exactly what topics are trending and proven to get views in your niche',
    thumbnail: '/images/tutorials/algorithm-strategy.png',
    watched: true,
    category: 'algorithm',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: 'This comprehensive tutorial walks you through the exact process top creators use to analyze trends and create algorithm-friendly content. Follow these steps to boost your channel performance.',
    relatedTutorials: ['2', '3']
  },
  {
    id: '2',
    title: 'Complete Beginner Guide - How To Use Velio To Get More Views',
    description: 'Everything you need to use Velio to blow up your channel',
    thumbnail: '/images/tutorials/beginner-guide.png',
    watched: false,
    category: 'basics',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: 'New to Velio? This beginner guide covers all the essentials to get you started with our platform and maximize your channel growth from day one.',
    relatedTutorials: ['1', '4']
  },
  {
    id: '3',
    title: 'How To Find Data-Proven Ideas, Titles, Thumbnails & More',
    description: 'Learn exactly how to use the Research Tab to find viral video ideas, titles and thumbnails like the pros.',
    thumbnail: '/images/tutorials/research-guide.png',
    watched: false,
    category: 'research',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: 'The Research tab is your gateway to discovering what works in your niche. This tutorial shows you how to leverage data to create compelling titles, thumbnails, and content ideas.',
    relatedTutorials: ['1', '4']
  },
  {
    id: '4',
    title: 'How To Properly Organize and Implement Your Research',
    description: 'How to use the Saved Videos Tab to organise all your research',
    thumbnail: '/images/tutorials/organization-guide.png',
    watched: false,
    category: 'organization',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: 'Stay organized and never lose track of your best ideas. This tutorial shows you how to effectively use the Saved Videos feature to categorize and implement your research.',
    relatedTutorials: ['2', '3']
  }
];

export default function TutorialDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [isWatched, setIsWatched] = useState(false);
  const [relatedContent, setRelatedContent] = useState<Tutorial[]>([]);
  
  useEffect(() => {
    // Find the current tutorial
    const currentTutorial = tutorials.find(t => t.id === id);
    
    if (currentTutorial) {
      setTutorial(currentTutorial);
      setIsWatched(currentTutorial.watched);
      
      // Find related tutorials
      const related = tutorials.filter(t => 
        currentTutorial.relatedTutorials.includes(t.id)
      );
      setRelatedContent(related);
    }
  }, [id]);
  
  const toggleWatched = () => {
    setIsWatched(!isWatched);
    // In a real app, this would update the database
  };
  
  if (!tutorial) {
    return (
      <div className="w-full max-w-[1200px] mx-auto py-12 text-center">
        <p className="text-white">Loading tutorial...</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.back()}
          className="p-2 text-white hover:bg-[#2D2D2D] rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-white">{tutorial.title}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Video and description */}
        <div className="lg:col-span-2">
          {/* Video embed */}
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mb-6">
            <iframe 
              src={tutorial.videoUrl} 
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title={tutorial.title}
            ></iframe>
          </div>
          
          {/* Tutorial info */}
          <div className="bg-[#1A1A1A] rounded-lg p-6 mb-6">
            <h2 className="text-white text-xl font-medium mb-2">About this tutorial</h2>
            <p className="text-gray-400 mb-6">{tutorial.content}</p>
            
            <div className="flex items-center">
              <button 
                onClick={toggleWatched}
                className="flex items-center gap-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white py-2 px-4 rounded-md transition-colors"
              >
                {isWatched ? (
                  <>
                    <CheckCircle size={18} className="text-[#00FF8C]" />
                    <span>Marked as watched</span>
                  </>
                ) : (
                  <>
                    <Circle size={18} />
                    <span>Mark as watched</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Sidebar - Related tutorials */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <h2 className="text-white text-xl font-medium mb-4">Related tutorials</h2>
            
            <div className="space-y-4">
              {relatedContent.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/learn/${related.id}`}
                  className="block"
                >
                  <div className="flex gap-3 group">
                    <div className="w-16 h-16 flex-shrink-0 bg-[#2D2D2D] rounded flex items-center justify-center">
                      {related.category === 'algorithm' && <span className="text-2xl">📈</span>}
                      {related.category === 'basics' && <span className="text-2xl">101</span>}
                      {related.category === 'research' && <span className="text-2xl">🔍</span>}
                      {related.category === 'organization' && <span className="text-2xl">📁</span>}
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm group-hover:text-[#00FF8C] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {related.watched ? (
                          <CheckCircle size={14} className="text-[#00FF8C]" />
                        ) : (
                          <Circle size={14} className="text-gray-400" />
                        )}
                        <span className={`text-xs ${related.watched ? 'text-[#00FF8C]' : 'text-gray-400'}`}>
                          {related.watched ? 'Watched' : 'Not watched'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 