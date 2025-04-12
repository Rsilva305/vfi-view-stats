"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-[#00FF8C] text-3xl font-bold flex items-center">
            <span className="mr-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C8.95 0 0 8.95 0 20C0 31.05 8.95 40 20 40C31.05 40 40 31.05 40 20C40 8.95 31.05 0 20 0ZM16 29V11L30 20L16 29Z" fill="#00FF8C"/>
              </svg>
            </span>
            VELIO
          </div>
        </div>
        <Link href="/login" className="text-[#CCC] hover:text-white transition-colors">
          Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        <div className="w-full max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
          {/* Left Content - Text */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The fastest way to
              <span className="block text-[#00FF8C]">unf*ck your</span>
              <span className="block">YouTube Channel</span>
            </h1>
            
            <p className="text-[#9CA3AF] mb-8 max-w-md">
              Velio filters through 179+ million YouTube videos to give you proven video ideas, topics, titles, thumbnails and hooks that will blow up your channel
            </p>
            
            <button 
              className="flex items-center bg-white text-black px-6 py-3 rounded-full font-medium"
              onClick={() => window.location.href = '/api/auth/google?redirect=/research'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                <path d="M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
                <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3037 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
              </svg>
              Sign up with Google
            </button>
          </div>
          
          {/* Right Content - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image 
                src="/landing-mockup.svg" 
                alt="Velio App Interface" 
                width={600} 
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
