// lib/visitor-tracker.ts - FINAL FIXED VERSION

import { v4 as uuidv4 } from 'uuid'
import { supabase } from './supabase'

export interface VisitorStats {
  totalVisitors: number
  totalVisits: number
  totalReactions: number
  totalDownloads: number
  todayVisits: number
}

export class VisitorTracker {
  private visitorId: string
  private sessionId: string
  private pageStartTime: number
  private statsCache: VisitorStats | null = null
  private lastFetchTime: number = 0
  private readonly CACHE_DURATION = 30000

  constructor() {
    this.visitorId = this.getOrCreateVisitorId()
    this.sessionId = uuidv4()
    this.pageStartTime = Date.now()
    
    setTimeout(() => {
      this.initializeTracking()
    }, 1000)
    
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.trackSessionEnd()
      })
    }
  }

  private async initializeTracking(): Promise<void> {
    try {
      await this.trackPageView()
      
      // Initialize stats_summary jika belum ada
      setTimeout(() => {
        this.ensureStatsSummary()
      }, 3000)
    } catch (error) {
      console.warn('Initialization warning:', error)
    }
  }

  private getOrCreateVisitorId(): string {
    if (typeof window === 'undefined') return 'server-side'
    
    let visitorId = localStorage.getItem('portfolio-visitor-id')
    
    if (!visitorId) {
      visitorId = `visitor_${uuidv4()}`
      localStorage.setItem('portfolio-visitor-id', visitorId)
      console.log('👤 New visitor created:', visitorId)
      sessionStorage.setItem('current-visitor-id', visitorId)
    }
    
    return visitorId
  }

  getVisitorId(): string {
    return this.visitorId
  }

  async trackPageView(pagePath: string = '/'): Promise<void> {
    try {
      console.log('📊 Tracking page view for:', this.visitorId, 'on page:', pagePath)
      
      // 1. Handle visitor record
      const visitorInfo = await this.getVisitorInfo()
      
      // Coba upsert visitor
      const { error: visitorError } = await supabase
        .from('visitors')
        .upsert({
          visitor_id: this.visitorId,
          country: visitorInfo.country,
          city: visitorInfo.city,
          device_type: visitorInfo.deviceType,
          browser: visitorInfo.browser,
          first_visit: new Date().toISOString(),
          last_visit: new Date().toISOString(),
          total_visits: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'visitor_id',
          ignoreDuplicates: false
        })
      
      if (visitorError) {
        console.warn('Visitor error:', visitorError.message)
        
        // Jika duplicate, coba update saja
        if (visitorError.code === '23505') {
          await this.incrementVisitorCount()
        }
      }
      
      // 2. Insert visit record
      const { error: visitError } = await supabase
        .from('visits')
        .insert({
          visitor_id: this.visitorId,
          page_path: pagePath || window.location.pathname,
          referrer: document.referrer || 'direct',
          user_agent: navigator.userAgent.substring(0, 500),
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          created_at: new Date().toISOString()
        })
      
      if (visitError) {
        console.warn('Visit error:', visitError.message)
      }
      
      console.log('✅ Page view tracked')
      
      // Update stats summary dengan delay
      setTimeout(() => {
        this.updateStatsSummary()
      }, 2000)
      
      // Invalidate cache
      this.statsCache = null
      
    } catch (error) {
      console.error('❌ Error tracking page view:', error)
    }
  }

  private async incrementVisitorCount(): Promise<void> {
    try {
      // Get current count
      const { data } = await supabase
        .from('visitors')
        .select('total_visits')
        .eq('visitor_id', this.visitorId)
        .single()
      
      if (data) {
        await supabase
          .from('visitors')
          .update({
            last_visit: new Date().toISOString(),
            total_visits: (data.total_visits || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('visitor_id', this.visitorId)
      }
    } catch (error) {
      console.warn('Increment visitor count error:', error)
    }
  }

  private async getVisitorInfo(): Promise<{
    country: string
    city: string
    deviceType: string
    browser: string
  }> {
    const defaultInfo = {
      country: 'Unknown',
      city: 'Unknown',
      deviceType: this.getDeviceType(),
      browser: this.getBrowser()
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2000)
      
      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) throw new Error('IP API failed')
      
      const data = await response.json()
      
      return {
        country: data.country_name || defaultInfo.country,
        city: data.city || defaultInfo.city,
        deviceType: defaultInfo.deviceType,
        browser: defaultInfo.browser
      }
    } catch (error) {
      return defaultInfo
    }
  }

  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'desktop'
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  private getBrowser(): string {
    if (typeof window === 'undefined') return 'Other'
    const ua = navigator.userAgent
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
    if (ua.includes('Edge')) return 'Edge'
    return 'Other'
  }

  async trackSessionEnd(): Promise<void> {
    try {
      const sessionDuration = Math.floor((Date.now() - this.pageStartTime) / 1000)
      
      if (sessionDuration < 3) return
      
      // Cari visit terbaru
      const { data: latestVisit, error } = await supabase
        .from('visits')
        .select('id, created_at')
        .eq('visitor_id', this.visitorId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      
      if (!error && latestVisit) {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
        const visitTime = new Date(latestVisit.created_at)
        
        if (visitTime > fiveMinutesAgo) {
          await supabase
            .from('visits')
            .update({ session_duration: sessionDuration })
            .eq('id', latestVisit.id)
        }
      }
    } catch (error) {
      console.warn('Session tracking warning:', error)
    }
  }

  async getStats(forceRefresh: boolean = false): Promise<VisitorStats> {
    const now = Date.now()
    if (!forceRefresh && this.statsCache && (now - this.lastFetchTime) < this.CACHE_DURATION) {
      return this.statsCache
    }

    try {
      console.log('📊 Fetching fresh stats...')
      
      // Coba dari stats_summary dulu
      let summary = null
      let summaryError = null
      
      try {
        // Gunakan Promise.race untuk timeout
        const queryPromise = supabase
          .from('stats_summary')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single()
          .then(response => ({ data: response.data, error: response.error }))
        
        const timeoutPromise = new Promise<{data: null, error: Error}>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout after 5000ms')), 5000)
        )
        
        const result = await Promise.race([queryPromise, timeoutPromise])
        summary = result.data
        summaryError = result.error
      } catch (timeoutError) {
        summaryError = timeoutError instanceof Error ? timeoutError : new Error('Timeout error')
      }

      let stats: VisitorStats
      
      if (!summaryError && summary) {
        // Hitung today visits
        let todayVisits = 0
        try {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          
          // Query untuk today visits dengan timeout
          const todayQueryPromise = supabase
            .from('visits')
            .select('id', { count: 'exact', head: true })
            .gte('created_at', today.toISOString())
            .then(response => ({ count: response.count, error: response.error }))
          
          const todayTimeoutPromise = new Promise<{count: number, error: Error}>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout after 3000ms')), 3000)
          )
          
          const todayResult = await Promise.race([todayQueryPromise, todayTimeoutPromise])
          todayVisits = todayResult.count || 0
        } catch (error) {
          console.warn('Today visits error:', error)
        }
        
        stats = {
          totalVisitors: Number(summary.total_visitors) || 0,
          totalVisits: Number(summary.total_visits) || 0,
          totalReactions: Number(summary.total_reactions) || 0,
          totalDownloads: Number(summary.total_downloads) || 0,
          todayVisits: todayVisits
        }
      } else {
        // Fallback ke hitung manual
        stats = await this.calculateStatsManual()
      }
      
      this.statsCache = stats
      this.lastFetchTime = now
      
      return stats
      
    } catch (error) {
      console.error('Error getting stats:', error)
      
      return this.statsCache || {
        totalVisitors: 0,
        totalVisits: 0,
        totalReactions: 0,
        totalDownloads: 0,
        todayVisits: 0
      }
    }
  }

  private async calculateStatsManual(): Promise<VisitorStats> {
    try {
      // Gunakan Promise.allSettled untuk handle semua query sekaligus
      const promises = [
        supabase.from('visitors').select('visitor_id', { count: 'exact', head: true }),
        supabase.from('visits').select('id', { count: 'exact', head: true }),
        supabase.from('reactions').select('id', { count: 'exact', head: true }),
        supabase.from('downloads').select('id', { count: 'exact', head: true })
      ] as const

      const [visitorsRes, visitsRes, reactionsRes, downloadsRes] = await Promise.allSettled(promises)

      // Extract counts dengan type safety
      const totalVisitors = visitorsRes.status === 'fulfilled' && visitorsRes.value.data ? 
        (visitorsRes.value.count || 0) : 0
      
      const totalVisits = visitsRes.status === 'fulfilled' && visitsRes.value.data ? 
        (visitsRes.value.count || 0) : 0
      
      const totalReactions = reactionsRes.status === 'fulfilled' && reactionsRes.value.data ? 
        (reactionsRes.value.count || 0) : 0
      
      const totalDownloads = downloadsRes.status === 'fulfilled' && downloadsRes.value.data ? 
        (downloadsRes.value.count || 0) : 0

      // Hitung today visits
      let todayVisits = 0
      try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const { count } = await supabase
          .from('visits')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', today.toISOString())
        
        todayVisits = count || 0
      } catch (error) {
        console.warn('Today visits calculation error:', error)
      }

      return {
        totalVisitors,
        totalVisits,
        totalReactions,
        totalDownloads,
        todayVisits
      }
    } catch (error) {
      console.error('Manual calculation error:', error)
      return {
        totalVisitors: 0,
        totalVisits: 0,
        totalReactions: 0,
        totalDownloads: 0,
        todayVisits: 0
      }
    }
  }

  async addReaction(type: 'like' | 'love' | 'fire' | 'rocket' | 'target'): Promise<boolean> {
    try {
      console.log('🎯 Adding reaction:', type)
      
      // Cek apakah sudah ada reaction dari visitor ini
      const { data: existing } = await supabase
        .from('reactions')
        .select('id')
        .eq('visitor_id', this.visitorId)
        .maybeSingle()
      
      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('reactions')
          .update({
            reaction_type: type,
            updated_at: new Date().toISOString()
          })
          .eq('visitor_id', this.visitorId)
        
        if (error) throw error
      } else {
        // Insert new
        const { error } = await supabase
          .from('reactions')
          .insert({
            visitor_id: this.visitorId,
            reaction_type: type,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        
        if (error) throw error
      }
      
      // Update stats summary
      await this.updateStatsSummary()
      
      this.statsCache = null
      
      console.log('✅ Reaction added:', type)
      return true
      
    } catch (error) {
      console.error('Error adding reaction:', error)
      return false
    }
  }

  async trackDownload(fileName: string): Promise<void> {
    try {
      console.log('📥 Tracking download:', fileName)
      
      const { error } = await supabase
        .from('downloads')
        .insert({
          visitor_id: this.visitorId,
          file_name: fileName,
          file_version: '1.0',
          created_at: new Date().toISOString()
        })
      
      if (error) throw error
      
      // Update stats summary
      await this.updateStatsSummary()
      
      this.statsCache = null
      
      console.log('✅ Download tracked:', fileName)
      
    } catch (error) {
      console.error('Error tracking download:', error)
    }
  }

  private async ensureStatsSummary(): Promise<void> {
    try {
      // Cek apakah ada data di stats_summary
      const { data, error } = await supabase
        .from('stats_summary')
        .select('id')
        .limit(1)
      
      if (error) throw error
      
      if (!data || data.length === 0) {
        // Buat record pertama
        const { error: insertError } = await supabase
          .from('stats_summary')
          .insert({
            total_visitors: 0,
            total_visits: 0,
            total_reactions: 0,
            total_downloads: 0,
            total_testimonials: 0,
            updated_at: new Date().toISOString()
          })
        
        if (insertError) throw insertError
        console.log('✅ Created initial stats_summary record')
      }
    } catch (error) {
      console.warn('Could not ensure stats_summary:', error)
    }
  }

  private async updateStatsSummary(): Promise<void> {
    try {
      // Hitung semua stats
      const visitorsPromise = supabase.from('visitors').select('visitor_id', { count: 'exact', head: true })
      const visitsPromise = supabase.from('visits').select('id', { count: 'exact', head: true })
      const reactionsPromise = supabase.from('reactions').select('id', { count: 'exact', head: true })
      const downloadsPromise = supabase.from('downloads').select('id', { count: 'exact', head: true })
      const testimonialsPromise = supabase.from('testimonials').select('id', { count: 'exact', head: true })

      const [visitorsRes, visitsRes, reactionsRes, downloadsRes, testimonialsRes] = await Promise.allSettled([
        visitorsPromise,
        visitsPromise,
        reactionsPromise,
        downloadsPromise,
        testimonialsPromise
      ])

      const totalVisitors = visitorsRes.status === 'fulfilled' ? 
        (visitorsRes.value as any).count || 0 : 0
      const totalVisits = visitsRes.status === 'fulfilled' ? 
        (visitsRes.value as any).count || 0 : 0
      const totalReactions = reactionsRes.status === 'fulfilled' ? 
        (reactionsRes.value as any).count || 0 : 0
      const totalDownloads = downloadsRes.status === 'fulfilled' ? 
        (downloadsRes.value as any).count || 0 : 0
      const totalTestimonials = testimonialsRes.status === 'fulfilled' ? 
        (testimonialsRes.value as any).count || 0 : 0

      // Update stats_summary
      const { error } = await supabase
        .from('stats_summary')
        .update({
          total_visitors: totalVisitors,
          total_visits: totalVisits,
          total_reactions: totalReactions,
          total_downloads: totalDownloads,
          total_testimonials: totalTestimonials,
          updated_at: new Date().toISOString()
        })
        .neq('id', '00000000-0000-0000-0000-000000000000')

      if (error) {
        // Jika tidak ada record, insert baru
        if (error.code === 'PGRST116') {
          await supabase
            .from('stats_summary')
            .insert({
              total_visitors: totalVisitors,
              total_visits: totalVisits,
              total_reactions: totalReactions,
              total_downloads: totalDownloads,
              total_testimonials: totalTestimonials,
              updated_at: new Date().toISOString()
            })
        } else {
          console.warn('Stats summary update error:', error)
        }
      }
      
    } catch (error) {
      console.warn('Stats summary update failed:', error)
    }
  }
}

// Singleton instance
let trackerInstance: VisitorTracker | null = null

export function getVisitorTracker(): VisitorTracker {
  if (!trackerInstance) {
    trackerInstance = new VisitorTracker()
  }
  return trackerInstance
}