'use client'

import { useState, useEffect } from 'react'
import { Heart, Flame, Rocket, Target, ThumbsUp } from 'lucide-react'
import { getVisitorTracker } from '@/lib/visitor-tracker'

const REACTIONS = [
  { type: 'like' as const, icon: <ThumbsUp className="w-5 h-5" />, label: 'Like', color: 'text-blue-600 hover:bg-blue-100' },
  { type: 'love' as const, icon: <Heart className="w-5 h-5" />, label: 'Love', color: 'text-red-600 hover:bg-red-100' },
  { type: 'fire' as const, icon: <Flame className="w-5 h-5" />, label: 'Fire', color: 'text-orange-600 hover:bg-orange-100' },
  { type: 'rocket' as const, icon: <Rocket className="w-5 h-5" />, label: 'Rocket', color: 'text-purple-600 hover:bg-purple-100' },
  { type: 'target' as const, icon: <Target className="w-5 h-5" />, label: 'On Point', color: 'text-green-600 hover:bg-green-100' },
]

export function ReactionButtons() {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({})
  const [totalReactions, setTotalReactions] = useState(0)

  useEffect(() => {
    loadReactionCounts()
    loadUserReaction()
  }, [])

  const loadReactionCounts = async () => {
    try {
      const tracker = getVisitorTracker()
      const stats = await tracker.getStats() // Langsung mengembalikan VisitorStats
      
      // Simpan total reactions untuk distribusi
      setTotalReactions(stats.totalReactions || 0)
      
      // Distribusikan total reactions ke masing-masing type
      const counts: Record<string, number> = {}
      REACTIONS.forEach(r => {
        counts[r.type] = Math.floor((stats.totalReactions || 0) / 5) + 
                        (r.type === 'like' ? (stats.totalReactions || 0) % 5 : 0)
      })
      setReactionCounts(counts)
      
    } catch (error) {
      console.error('Error loading reaction counts:', error)
    }
  }

  const loadUserReaction = async () => {
    try {
      // Check localStorage for saved reaction
      const savedReaction = localStorage.getItem('portfolio-user-reaction')
      if (savedReaction) {
        setSelectedReaction(savedReaction)
      }
      
      // Optional: Check database for user's reaction
      // const tracker = getVisitorTracker()
      // const visitorId = tracker.getVisitorId()
      // You could fetch user's specific reaction from database here
      
    } catch (error) {
      console.error('Error loading user reaction:', error)
    }
  }

  const handleReaction = async (reactionType: string) => {
    if (isLoading) return

    setIsLoading(true)
    
    try {
      const tracker = getVisitorTracker()
      
      if (selectedReaction === reactionType) {
        // Remove reaction
        setSelectedReaction(null)
        localStorage.removeItem('portfolio-user-reaction')
        
        // Update local counts
        setReactionCounts(prev => ({
          ...prev,
          [reactionType]: Math.max(0, prev[reactionType] - 1)
        }))
        
        setTotalReactions(prev => Math.max(0, prev - 1))
        
        // TODO: In real implementation, remove from database
        // For now, we'll just decrease the count
        console.log('Reaction removed:', reactionType)
        
      } else {
        // Add/change reaction
        if (selectedReaction) {
          // Decrease old reaction count
          setReactionCounts(prev => ({
            ...prev,
            [selectedReaction]: Math.max(0, prev[selectedReaction] - 1)
          }))
        }
        
        // Set new reaction
        setSelectedReaction(reactionType)
        localStorage.setItem('portfolio-user-reaction', reactionType)
        
        // Increase new reaction count
        setReactionCounts(prev => ({
          ...prev,
          [reactionType]: (prev[reactionType] || 0) + 1
        }))
        
        setTotalReactions(prev => {
          // Jika ganti reaction, total tetap sama
          // Jika reaction baru, tambah 1
          return selectedReaction ? prev : prev + 1
        })

        // Send to database
        const success = await tracker.addReaction(reactionType as any)
        
        if (success) {
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 2000)
          
          // Refresh counts from database
          setTimeout(() => {
            loadReactionCounts()
          }, 100)
        }
      }
      
    } catch (error) {
      console.error('Error saving reaction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Give Your Reaction! 🎯
          </h3>
          <p className="text-gray-600">
            Tap an icon to show your appreciation
          </p>
          <div className="mt-2 text-sm text-blue-600 font-medium">
            Total Reactions: {totalReactions}
          </div>
        </div>

        {/* Reaction Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {REACTIONS.map((reaction) => {
            const isSelected = selectedReaction === reaction.type
            const count = reactionCounts[reaction.type] || 0
            
            return (
              <button
                key={reaction.type}
                onClick={() => handleReaction(reaction.type)}
                disabled={isLoading}
                className={`
                  relative group flex flex-col items-center gap-2 p-4 rounded-xl
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${isSelected ? 'bg-white shadow-lg scale-105' : 'hover:bg-gray-50'}
                  ${reaction.color.split(' ')[0]}
                  border ${isSelected ? 'border-gray-300' : 'border-gray-200'}
                  min-w-[100px] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${isSelected ? 'scale-110' : ''}
                  ${isSelected 
                    ? reaction.color.replace('text-', 'bg-').replace('hover:bg-', 'bg-').split(' ')[0] + ' bg-opacity-20' 
                    : 'bg-gray-100'
                  }
                `}>
                  <span className={reaction.color.split(' ')[0]}>
                    {reaction.icon}
                  </span>
                </div>

                {/* Label */}
                <div className="font-medium text-gray-700">
                  {reaction.label}
                </div>

                {/* Counter */}
                <div className={`
                  absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs
                  flex items-center justify-center font-bold
                  ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}
                `}>
                  {count}
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback Message */}
        {showSuccess && (
          <div className="text-center animate-bounce">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Thanks for your reaction! 🎉
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </div>
          </div>
        )}

        {/* Current Selection */}
        {selectedReaction && !isLoading && (
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
              You reacted with: 
              <span className="font-semibold capitalize flex items-center gap-1">
                {selectedReaction} 
                {REACTIONS.find(r => r.type === selectedReaction)?.icon}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Click the same icon again to remove your reaction
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            {selectedReaction 
              ? "Your feedback is valuable! 🙏" 
              : "Click any icon to share what you think about my portfolio"}
          </p>
          <div className="flex justify-center mt-2">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Like</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Love</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Fire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}