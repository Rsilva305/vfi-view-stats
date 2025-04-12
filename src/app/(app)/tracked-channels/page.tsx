"use client";

import { useState, useRef, useEffect } from 'react'
import { Plus, X, MoreVertical, Pin, Edit2, Copy, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface ChannelList {
  id: number;
  name: string;
  isPinned: boolean;
}

export default function TrackedChannels() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [channelListName, setChannelListName] = useState('')
  const [channelLists, setChannelLists] = useState<ChannelList[]>([])
  const [editingListId, setEditingListId] = useState<number | null>(null)
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

  const openModal = (listId?: number) => {
    if (listId !== undefined) {
      setEditingListId(listId)
      const list = channelLists.find(l => l.id === listId)
      if (list) setChannelListName(list.name)
    } else {
      setEditingListId(null)
      setChannelListName('')
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setChannelListName('')
    setEditingListId(null)
  }

  const handleSave = () => {
    if (channelListName.trim()) {
      if (editingListId !== null) {
        // Update existing list
        setChannelLists(
          channelLists.map(list => 
            list.id === editingListId 
              ? { ...list, name: channelListName } 
              : list
          )
        )
      } else {
        // Create new list
        const newList = {
          id: Date.now(),
          name: channelListName,
          isPinned: false
        }
        setChannelLists([...channelLists, newList])
      }
      setChannelListName('')
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

  const pinList = (id: number) => {
    setChannelLists(
      channelLists.map(list => 
        list.id === id 
          ? { ...list, isPinned: !list.isPinned } 
          : list
      )
    )
    closeAllMenus()
  }

  const duplicateList = (id: number) => {
    const listToDuplicate = channelLists.find(list => list.id === id)
    if (listToDuplicate) {
      const duplicatedList = {
        ...listToDuplicate,
        id: Date.now(),
        name: `${listToDuplicate.name} (copy)`,
      }
      setChannelLists([...channelLists, duplicatedList])
    }
    closeAllMenus()
  }

  const deleteList = (id: number) => {
    setChannelLists(channelLists.filter(list => list.id !== id))
    closeAllMenus()
  }

  // Sort lists so pinned items appear first
  const sortedLists = [...channelLists].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Tracked channels</h1>
      </div>
      
      {channelLists.length === 0 ? (
        // Empty state container
        <div className="flex items-center justify-center py-24">
          <div className="w-full max-w-lg h-64 border-2 border-dashed border-[#2D2D2D] rounded-lg flex flex-col items-center justify-center p-8 text-center">
            <p className="text-gray-400 mb-6">You haven't created any channel lists yet.</p>
            <button 
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-[#d61204] hover:bg-[#b81003] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span>Create new channel list</span>
            </button>
          </div>
        </div>
      ) : (
        // Channel lists grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Create new channel list button - Always first */}
          <div 
            className="border border-dashed border-[#2D2D2D] rounded-lg p-5 cursor-pointer hover:bg-[#1A1A1A] transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              openModal()
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-[#d61204]">
                <Plus size={18} />
                <span className="font-medium">Create new channel list</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-1">Add a new collection</p>
          </div>
          
          {/* Channel lists */}
          {sortedLists.map((list) => (
            <div key={list.id} className="relative">
              <Link href={`/tracked-channels/${list.id}?name=${encodeURIComponent(list.name)}`}>
                <div className="bg-[#1A1A1A] hover:bg-[#2D2D2D] border border-[#2D2D2D] rounded-lg p-5 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium text-lg">{list.name}</h3>
                    <button 
                      onClick={(e) => toggleMenu(list.id, e)}
                      className="text-gray-400 hover:text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">0 channels</p>
                </div>
              </Link>

              {/* Context menu */}
              {openMenuId === list.id && (
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
                      pinList(list.id)
                    }}
                  >
                    <Pin size={16} className={list.isPinned ? 'text-[#d61204]' : ''} />
                    {list.isPinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button 
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-[#3A3A3A] transition-colors text-left"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openModal(list.id)
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
                      duplicateList(list.id)
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
                      deleteList(list.id)
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
          onClick={(e) => e.stopPropagation()}
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
            <h3 className="text-xl font-bold text-white mb-4">
              {editingListId !== null ? 'Rename channel list' : 'Create channel list'}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Name</label>
              <input 
                type="text" 
                value={channelListName}
                onChange={(e) => setChannelListName(e.target.value)}
                className="w-full bg-[#2A2A2A] border border-[#3A3A3A] text-white rounded-lg py-2 px-3 focus:outline-none focus:border-[#d61204]"
                placeholder="Enter list name"
                autoFocus
              />
            </div>
            <div className="flex justify-end">
              <button 
                onClick={closeModal}
                className="bg-transparent text-white hover:text-gray-300 px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="bg-[#d61204] hover:bg-[#b81003] text-white px-4 py-2 rounded-lg"
                disabled={!channelListName.trim()}
              >
                {editingListId !== null ? 'Save' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 