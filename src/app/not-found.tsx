import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4">
      <div className="flex items-center mb-8">
        <h1 className="text-6xl font-bold text-white border-r border-[#333] pr-6 mr-6">404</h1>
        <p className="text-xl text-[#999]">This page could not be found.</p>
      </div>
      <Link 
        href="/" 
        className="bg-[#d61204] hover:bg-[#b81003] text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
} 