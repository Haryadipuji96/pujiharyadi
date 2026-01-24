// lib/visitor-tracker.ts
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

  constructor() {
    this.visitorId = this.getOrCreateVisitorId()
    this.sessionId = uuidv4()
    this.pageStartTime = Date.now()
    
    // Track page view on initialization
    this.trackPageView()
    
    // Track session end when user leaves
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.trackSessionEnd()
      })
    }
  }

  private getOrCreateVisitorId(): string {
    if (typeof window === 'undefined') return 'server-side'
    
    let visitorId = localStorage.getItem('portfolio-visitor-id')
    
    if (!visitorId) {
      visitorId = `visitor_${uuidv4()}`
      localStorage.setItem('portfolio-visitor-id', visitorId)
      console.log('👤 New visitor created:', visitorId)
    }
    
    return visitorId
  }

  getVisitorId(): string {
    return this.visitorId
  }

  // Di visitor-tracker.ts, ganti fungsi trackPageView dengan ini:

async trackPageView(pagePath: string = '/'): Promise<void> {
  try {
    console.log('📊 Tracking page view for:', this.visitorId)
    
    // 1. Cek apakah visitor sudah ada
    const { data: existingVisitor, error: fetchError } = await supabase
      .from('visitors')
      .select('visitor_id, total_visits')
      .eq('visitor_id', this.visitorId)
      .maybeSingle()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('Error checking visitor:', fetchError)
    }

    if (existingVisitor) {
      // 2. UPDATE jika visitor sudah ada
      console.log('🔄 Updating existing visitor...')
      const { error: updateError } = await supabase
        .from('visitors')
        .update({
          last_visit: new Date().toISOString(),
          total_visits: existingVisitor.total_visits + 1,
          updated_at: new Date().toISOString()
        })
        .eq('visitor_id', this.visitorId)

      if (updateError) {
        console.error('Visitor update error:', updateError)
      }
    } else {
      // 3. INSERT jika visitor baru
      console.log('🆕 Creating new visitor...')
      const visitorInfo = await this.getVisitorInfo()
      
      const { error: insertError } = await supabase
        .from('visitors')
        .insert({
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
        })

      if (insertError) {
        console.error('Visitor insert error:', insertError)
      }
    }

    // 4. Insert visit record (FIX: hapus session_id karena tidak ada di schema)
    const { error: visitError } = await supabase
      .from('visits')
      .insert({
        visitor_id: this.visitorId,
        page_path: pagePath || window.location.pathname,
        referrer: document.referrer || 'direct',
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        // session_duration akan diupdate nanti saat session end
        created_at: new Date().toISOString()
      })

    if (visitError) {
      console.error('Visit insert error:', visitError)
      console.error('Visit error details:', {
        visitor_id: this.visitorId,
        page_path: pagePath,
        error: visitError
      })
    }

    console.log('✅ Page view tracked successfully')

  } catch (error) {
    console.error('❌ Error tracking page view:', error)
  }
}

// Tambahkan helper function ini di dalam class:
private getIncrementExpression() {
  // Supabase increment syntax
  return { total_visits: 'total_visits + 1' }
}

private async updateStatsSummary(): Promise<void> {
  try {
    // Call the database function we created
    const { error } = await supabase.rpc('update_stats_summary')
    if (error) {
      console.warn('Stats summary update error:', error)
    }
  } catch (error) {
    console.warn('Failed to update stats summary:', error)
  }
}

  private async getVisitorInfo(): Promise<{
    country: string
    city: string
    deviceType: string
    browser: string
  }> {
    // Default info
    const defaultInfo = {
      country: 'Unknown',
      city: 'Unknown',
      deviceType: this.getDeviceType(),
      browser: this.getBrowser()
    }

    try {
      // Try to get location from IP (free service)
      const response = await fetch('https://ipapi.co/json/')
      if (!response.ok) throw new Error('IP API failed')
      
      const data = await response.json()
      
      return {
        country: data.country_name || defaultInfo.country,
        city: data.city || defaultInfo.city,
        deviceType: defaultInfo.deviceType,
        browser: defaultInfo.browser
      }
    } catch (error) {
      console.log('Using default visitor info')
      return defaultInfo
    }
  }

  private getDeviceType(): string {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  private getBrowser(): string {
    const ua = navigator.userAgent
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari'
    if (ua.includes('Edge')) return 'Edge'
    return 'Other'
  }

  async trackSessionEnd(): Promise<void> {
    try {
      const sessionDuration = Math.floor((Date.now() - this.pageStartTime) / 1000) // in seconds
      
      await supabase
        .from('visits')
        .update({ session_duration: sessionDuration })
        .eq('session_id', this.sessionId)
        .is('session_duration', null) // Only update if not already set
        
      console.log('📊 Session tracked:', sessionDuration, 'seconds')
    } catch (error) {
      console.error('Error tracking session:', error)
    }
  }

  async getStats(): Promise<VisitorStats> {
    try {
      // Get summary stats
      const { data: summary, error: summaryError } = await supabase
        .from('stats_summary')
        .select('*')
        .single()

      if (summaryError) throw summaryError

      // Get today's visits
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const { count: todayVisits, error: todayError } = await supabase
        .from('visits')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())

      if (todayError) throw todayError

      return {
        totalVisitors: summary.total_visitors || 0,
        totalVisits: summary.total_visits || 0,
        totalReactions: summary.total_reactions || 0,
        totalDownloads: summary.total_downloads || 0,
        todayVisits: todayVisits || 0
      }
    } catch (error) {
      console.error('Error getting stats:', error)
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
      // Check if user already reacted
      const { data: existing } = await supabase
        .from('reactions')
        .select('reaction_type')
        .eq('visitor_id', this.visitorId)
        .maybeSingle()

      if (existing) {
        // Update existing reaction
        const { error } = await supabase
          .from('reactions')
          .update({ 
            reaction_type: type,
            updated_at: new Date().toISOString()
          })
          .eq('visitor_id', this.visitorId)

        if (error) throw error
      } else {
        // Insert new reaction
        const { error } = await supabase
          .from('reactions')
          .insert({
            visitor_id: this.visitorId,
            reaction_type: type
          })

        if (error) throw error
      }

      // Update stats summary
      await supabase.rpc('update_stats_summary')
      
      console.log('✅ Reaction added:', type)
      return true
    } catch (error) {
      console.error('Error adding reaction:', error)
      return false
    }
  }

  async trackDownload(fileName: string): Promise<void> {
    try {
      await supabase
        .from('downloads')
        .insert({
          visitor_id: this.visitorId,
          file_name: fileName
        })

      // Update stats summary
      await supabase.rpc('update_stats_summary')
      
      console.log('✅ Download tracked:', fileName)
    } catch (error) {
      console.error('Error tracking download:', error)
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