'use client'

import { useEffect } from 'react'
import { getVisitorTracker } from '@/lib/visitor-tracker'

export function VisitorInitializer() {
  useEffect(() => {
    // Initialize tracker
    const tracker = getVisitorTracker()
    console.log('🚀 Visitor tracker initialized:', tracker.getVisitorId())
    
    // Track current page
    const pagePath = window.location.pathname + window.location.hash
    tracker.trackPageView(pagePath)
    
    // Track hash changes (for single page navigation)
    const handleHashChange = () => {
      const newPath = window.location.pathname + window.location.hash
      tracker.trackPageView(newPath)
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      tracker.trackSessionEnd()
    }
  }, [])

  return null // This component doesn't render anything
}