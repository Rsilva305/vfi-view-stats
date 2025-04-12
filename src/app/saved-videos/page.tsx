'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, X, MoreVertical, Pin, Edit2, Copy, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface SavedVideoCollection {
  id: number;
  name: string;
  isPinned: boolean;
  videoCount: number;
}

// Mock data for saved videos
const mockVideos = [
  {
    id: "1",
    title: "How to Build a Modern React Application with NextJS",
    thumbnail: "https://picsum.photos/id/11/640/360",
    duration: "15:42",
    channelName: "Dev Masters",
    channelAvatar: "https://picsum.photos/id/100/64/64",
    views: "246K",
    timestamp: "3 days ago"
  },
  {
    id: "2",
    title: "Learn CSS Grid Layout in 20 Minutes - Quick Tutorial",
    thumbnail: "https://picsum.photos/id/22/640/360",
    duration: "20:15",
    channelName: "CSS Wizards",
    channelAvatar: "https://picsum.photos/id/101/64/64",
    views: "189K",
    timestamp: "1 week ago"
  },
  {
    id: "3",
    title: "JavaScript ES6: The Complete Guide to Modern Features",
    thumbnail: "https://picsum.photos/id/33/640/360",
    duration: "32:17",
    channelName: "JS Guru",
    channelAvatar: "https://picsum.photos/id/102/64/64",
    views: "412K",
    timestamp: "2 weeks ago"
  }
];

export default function SavedVideos() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const [videoCollections, setVideoCollections] = useState<SavedVideoCollection[]>([])
  const [editingCollectionId, setEditingCollectionId] = useState<number | null>(null)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const openModal = (collectionId?: number) => {
    if (collectionId !== undefined) {
      setEditingCollectionId(collectionId)
      const collection = videoCollections.find(c => c.id === collectionId)
      if (collection) setCollectionName(collection.name)
    } else {
      setEditingCollectionId(null)
      setCollectionName('')
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCollectionName('')
    setEditingCollectionId(null)
  }

  const handleSave = () => {
    if (collectionName.trim()) {
      if (editingCollectionId !== null) {
        // Update existing collection
        setVideoCollections(
          videoCollections.map(collection => 
            collection.id === editingCollectionId 
              ? { ...collection, name: collectionName } 
              : collection
          )
        )
      } else {
        // Create new collection
        const newCollection = {
          id: Date.now(),
          name: collectionName,
          isPinned: false,
          videoCount: 0
        }
        setVideoCollections([...videoCollections, newCollection])
      }
      setCollectionName('')
      closeModal()
    }
  }

  const toggleMenu = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const closeAllMenus = () => {
    setOpenMenuId(null)
  }

  const pinCollection = (id: number) => {
    setVideoCollections(
      videoCollections.map(collection => 
        collection.id === id 
          ? { ...collection, isPinned: !collection.isPinned } 
          : collection
      )
    )
    closeAllMenus()
  }

  const duplicateCollection = (id: number) => {
    const collectionToDuplicate = videoCollections.find(collection => collection.id === id)
    if (collectionToDuplicate) {
      const duplicatedCollection = {
        ...collectionToDuplicate,
        id: Date.now(),
        name: `${collectionToDuplicate.name} (copy)`,
      }
      setVideoCollections([...videoCollections, duplicatedCollection])
    }
    closeAllMenus()
  }

  const deleteCollection = (id: number) => {
    setVideoCollections(videoCollections.filter(collection => collection.id !== id))
    closeAllMenus()
  }

  // Sort collections so pinned items appear first
  const sortedCollections = [...videoCollections].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Saved videos</h1>
      </div>
      
      {videoCollections.length === 0 ? (
        // Empty state container
        <div className="flex items-center justify-center py-24">
          <div className="w-full max-w-lg h-64 border-2 border-dashed border-[#2D2D2D] rounded-lg flex flex-col items-center justify-center p-8 text-center">
            <p className="text-gray-400 mb-6">You haven't created any video collections yet.</p>
            <button 
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span>Create new collection</span>
            </button>
          </div>
        </div>
      ) : (
        // Video collections grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Create new collection button - Always first */}
          <div 
            className="border border-dashed border-[#2D2D2D] rounded-lg p-5 cursor-pointer hover:bg-[#1A1A1A] transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              openModal()
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-[#00FF8C]">
                <Plus size={18} />
                <span className="font-medium">Create new collection</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-1">Add a new video collection</p>
          </div>
          
          {/* Video collections */}
          {sortedCollections.map((collection) => (
            <div key={collection.id} className="relative">
              <Link href={`/saved-videos/${collection.id}?name=${encodeURIComponent(collection.name)}`}>
                <div className="bg-[#1A1A1A] hover:bg-[#2D2D2D] border border-[#2D2D2D] rounded-lg p-5 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium text-lg">{collection.name}</h3>
                    <button 
                      onClick={(e) => toggleMenu(collection.id, e)}
                      className="text-gray-400 hover:text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{collection.videoCount} videos</p>
                </div>
              </Link>

              {/* Context menu */}
              {openMenuId === collection.id && (
                <div 
                  ref={menuRef}
                  className="absolute top-12 right-3 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md shadow-lg py-2 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#3A3A3A] transition-colors text-left"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      pinCollection(collection.id)
                    }}
                  >
                    <Pin size={16} className={collection.isPinned ? 'text-[#00FF8C]' : ''} />
                    {collection.isPinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button 
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#3A3A3A] transition-colors text-left"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openModal(collection.id)
                    }}
                  >
                    <Edit2 size={16} />
                    Rename
                  </button>
                  <button 
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#3A3A3A] transition-colors text-left"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      duplicateCollection(collection.id)
                    }}
                  >
                    <Copy size={16} />
                    Duplicate
                  </button>
                  <button 
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#3A3A3A] transition-colors text-left text-red-400 hover:text-red-300"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      deleteCollection(collection.id)
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-[#1F1F1F] rounded-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold text-white mb-6">
              {editingCollectionId ? 'Rename collection' : 'Create new collection'}
            </h3>
            <div className="mb-6">
              <label htmlFor="collectionName" className="block text-sm font-medium text-gray-300 mb-2">
                Collection name
              </label>
              <input
                type="text"
                id="collectionName"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                className="w-full px-4 py-2 bg-[#2D2D2D] border border-[#3A3A3A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF8C]/50"
                placeholder="Enter collection name"
                autoFocus
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-transparent hover:bg-[#2D2D2D] rounded-md transition-colors mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white rounded-md transition-colors"
                disabled={!collectionName.trim()}
              >
                {editingCollectionId ? 'Save changes' : 'Create collection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 