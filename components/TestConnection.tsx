'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function TestConnection() {
  const [isConnected, setIsConnected] = useState(false)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test query ke stats_summary
        const { data, error } = await supabase
          .from('stats_summary')
          .select('*')
          .limit(1)
          .single()

        if (error) throw error
        
        setIsConnected(true)
        setStats(data)
        console.log('✅ Database connected!', data)
      } catch (error) {
        console.error('❌ Database connection failed:', error)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className={`px-4 py-2 rounded-lg ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {isConnected ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">DB Connected</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium">DB Disconnected</span>
          </div>
        )}
      </div>
    </div>
  )
}