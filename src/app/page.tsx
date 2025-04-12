"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home(): JSX.Element {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to Velio</h1>
        <p className="text-gray-400 text-center max-w-2xl mb-8">
          Your personalized video discovery platform. Explore recommended content, track channels, and save videos for later.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <Link 
            href="/research" 
            className="bg-[#2D2D2D] hover:bg-[#3D3D3D] p-6 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-white">Recommended Videos</h2>
              <ArrowRight className="text-[#00FF8C] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
            <p className="text-gray-400 text-sm">
              Browse through our curated collection of recommended videos based on popular topics.
            </p>
          </Link>
          
          <Link 
            href="/tracked-channels" 
            className="bg-[#2D2D2D] hover:bg-[#3D3D3D] p-6 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-white">Tracked Channels</h2>
              <ArrowRight className="text-[#00FF8C] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </div>
            <p className="text-gray-400 text-sm">
              View and manage your tracked channels for easy access to their content.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
