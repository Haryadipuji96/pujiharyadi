'use client'

import { useEffect, useState } from 'react'
import { Eye, Users, Heart, Download, TrendingUp, Globe, Clock } from 'lucide-react'
import { getVisitorTracker, VisitorStats } from '@/lib/visitor-tracker'

export function StatsWidget() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [realtimeUpdate, setRealtimeUpdate] = useState(0)

  useEffect(() => {
    const tracker = getVisitorTracker()
    
    const loadStats = async () => {
      setLoading(true)
      const data = await tracker.getStats()
      setStats(data)
      setLoading(false)
    }

    loadStats()

    // Real-time updates every 30 seconds
    const interval = setInterval(() => {
      setRealtimeUpdate(prev => prev + 1)
    }, 30000)

    return () => clearInterval(interval)
  }, [realtimeUpdate])

  useEffect(() => {
    // Refresh stats when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        getVisitorTracker().getStats().then(setStats)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="text-sm text-gray-600">Loading stats...</div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Portfolio Analytics
          </h3>
          <p className="text-sm text-gray-600 mt-1">Real-time visitor statistics</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          Live
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Visitors */}
        <div className="bg-white rounded-xl p-4 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stats.totalVisitors.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Visitors</div>
          <div className="text-xs text-blue-500 mt-2 flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+{stats.todayVisits} today</span>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-xl p-4 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stats.totalVisits.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Page Views</div>
          <div className="text-xs text-green-500 mt-2">
            Global Reach
          </div>
        </div>

        {/* Reactions */}
        <div className="bg-white rounded-xl p-4 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stats.totalReactions.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Reactions</div>
          <div className="text-xs text-pink-500 mt-2">
            Community Love ❤️
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-white rounded-xl p-4 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stats.totalDownloads.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">CV Downloads</div>
          <div className="text-xs text-purple-500 mt-2">
            Professional Interest
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-blue-100">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            Last updated: Just now
          </div>
          <div className="text-blue-600 font-medium">
            Auto-refresh every 30s
          </div>
        </div>
      </div>
    </div>
  )
}