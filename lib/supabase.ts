// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Gunakan hardcoded values untuk testing dulu
// Ganti dengan URL dan KEY milikmu!
const supabaseUrl = 'https://dwekmxlubxevpksozeqh.supabase.co'  // GANTI!
const supabaseAnonKey = 'sb_publishable_ATmopRiqdPUTVY4EJmdbEg_j8EWVfMs'  // GANTI!

// Fallback ke environment variables
const url = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = supabaseAnonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validasi
if (!url) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing!')
  console.log('Current env:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(-10) : 'missing'
  })
}

if (!key) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing!')
}

export const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
})