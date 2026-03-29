// Type-safe Supabase admin client wrapper
import { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseAdmin } from './supabase'

// Type-safe helper for typed table operations
export function typedTable<T extends Record<string, any>>(
  table: string
): any {
  const admin = getSupabaseAdmin()
  return admin.from(table)
}

// Type-safe upsert function for typed tables
export function typedUpsert<T extends Record<string, any>>(
  table: string,
  data: T,
  options?: { onConflict?: string }
): Promise<T> {
  const admin = getSupabaseAdmin()
  return (admin as any).from(table).upsert(data, options).select().single() as any
}

// Type-safe update function for typed tables
export async function typedUpdate<T extends Record<string, any>>(
  table: string,
  data: Partial<T>,
  matchCondition: Record<string, any>
): Promise<T | null> {
  const admin = getSupabaseAdmin()
  
  let query = (admin as any).from(table).update(data)
  
  for (const [key, value] of Object.entries(matchCondition)) {
    query = query.eq(key, value)
  }
  
  const result = await query.select().single()
  
  if (result.error) {
    throw new Error(`Update failed: ${result.error.message}`)
  }
  
  return result.data as T | null
}

// Type-safe delete function for typed tables
export async function typedDelete(
  table: string,
  matchCondition: Record<string, any>
): Promise<void> {
  const admin = getSupabaseAdmin()
  
  let query = admin.from(table).delete()
  
  for (const [key, value] of Object.entries(matchCondition)) {
    query = query.eq(key, value)
  }
  
  const { error } = await query
  
  if (error) {
    throw new Error(`Delete failed: ${error.message}`)
  }
}
