'use client'

import { useEffect, useState } from 'react'
import { Eye, Users, TrendingUp } from 'lucide-react'
import { getVisitorTracker } from '@/lib/visitor-tracker'

export function VisitorBadge() {
  const [totalVisits, setTotalVisits] = useState(0)
  const [todayVisits, setTodayVisits] = useState(0)

  useEffect(() => {
    const loadStats = async () => {
      const tracker = getVisitorTracker()
      const stats = await tracker.getStats()
      setTotalVisits(stats.totalVisits)
      setTodayVisits(stats.todayVisits)
    }

    loadStats()
    
    // Update every 60 seconds
    const interval = setInterval(loadStats, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-3 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-3">
          {/* Visitor Count */}
          <div className="text-center">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-3 h-3" />
              <span className="text-xs font-medium">Visitors</span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              {totalVisits.toLocaleString()}
            </div>
          </div>
          
          {/* Separator */}
          <div className="h-6 w-px bg-gray-300"></div>
          
          {/* Today's Views */}
          <div className="text-center">
            <div className="flex items-center gap-1 text-gray-600">
              <Eye className="w-3 h-3" />
              <span className="text-xs font-medium">Today</span>
            </div>
            <div className="text-xl font-bold text-green-600">
              {todayVisits}
            </div>
          </div>
          
          {/* Separator */}
          <div className="h-6 w-px bg-gray-300"></div>
          
          {/* Live Indicator */}
          <div className="text-center">
            <div className="flex items-center gap-1 text-gray-600">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">Live</span>
            </div>
            <div className="text-xs text-gray-500 animate-pulse">
              ●
            </div>
          </div>
        </div>
        
        {/* Tooltip on hover */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            Real-time visitor counter
          </div>
        </div>
      </div>
    </div>
  )
}