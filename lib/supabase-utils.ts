// lib/supabase-utils.ts - Tambahkan file helper

import { PostgrestResponse } from '@supabase/supabase-js'

export async function withTimeout<T>(
  promise: () => Promise<PostgrestResponse<T>>,
  ms: number
): Promise<PostgrestResponse<T>> {
  const timeout = new Promise<PostgrestResponse<T>>((_, reject) => 
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  )
  
  return Promise.race([promise(), timeout])
}

// Contoh penggunaan:
// const result = await withTimeout(() => 
//   supabase.from('table').select('*').eq('id', 1).single(), 
//   5000
// )