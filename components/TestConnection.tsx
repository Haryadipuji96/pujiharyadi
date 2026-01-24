// components/TestConnection.tsx - FIXED VERSION

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Check, X, RefreshCw } from 'lucide-react'

export function TestConnection() {
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [error, setError] = useState<string>('')

  const testConnection = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Gunakan Promise.race untuk timeout
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 3s')), 3000)
      )
      
      const queryPromise = supabase
        .from('stats_summary')
        .select('*')
        .limit(1)
        .single()

      const result = await Promise.race([queryPromise, timeoutPromise]) as any
      
      if (result.error) {
        setError(result.error.message)
        setIsConnected(false)
      } else {
        setStats(result.data)
        setIsConnected(true)
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error')
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <div className={`px-4 py-3 rounded-lg shadow-lg ${isConnected ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {loading ? (
              <RefreshCw className="w-5 h-5 text-gray-500 animate-spin" />
            ) : isConnected ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <X className="w-5 h-5 text-red-600" />
            )}
          </div>
          
          <div>
            <div className="font-medium">
              {loading ? 'Testing Database...' : 
               isConnected ? 'Database Connected' : 'Database Error'}
            </div>
            
            {error && (
              <div className="text-sm text-red-700 mt-1">{error}</div>
            )}
            
            {stats && (
              <div className="text-sm text-gray-600 mt-1">
                Last updated: {new Date(stats.updated_at).toLocaleTimeString()}
              </div>
            )}
          </div>
          
          <button
            onClick={testConnection}
            disabled={loading}
            className="ml-2 p-1 hover:bg-white/50 rounded transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}