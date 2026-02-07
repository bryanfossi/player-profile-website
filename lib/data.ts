import { getSupabase, isSupabaseConfigured } from './supabase'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'player.json')

/**
 * Load player data.
 * Uses Supabase if configured, otherwise falls back to local JSON file.
 */
export async function loadPlayer(): Promise<any> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase()!
      const { data, error } = await supabase
        .from('players')
        .select('data')
        .eq('id', 'default')
        .single()

      if (data && !error) {
        return data.data
      }

      // If no row exists yet, seed from JSON file and return
      console.log('No Supabase data found, seeding from JSON...')
      const jsonData = loadFromJson()
      await savePlayer(jsonData.player || jsonData)
      return jsonData
    } catch (err) {
      console.error('Supabase read failed, falling back to JSON:', err)
      return loadFromJson()
    }
  }

  return loadFromJson()
}

/**
 * Save player data.
 * Uses Supabase if configured, otherwise writes to local JSON file.
 */
export async function savePlayer(playerData: any): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabase()!
      const { error } = await supabase
        .from('players')
        .upsert({
          id: 'default',
          data: { player: playerData },
          updated_at: new Date().toISOString(),
        })

      if (error) {
        console.error('Supabase write failed:', error)
        return false
      }
      return true
    } catch (err) {
      console.error('Supabase save failed:', err)
      return false
    }
  }

  // Fallback: write to JSON
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify({ player: playerData }, null, 2), 'utf8')
    return true
  } catch {
    return false
  }
}

/**
 * Load from local JSON file
 */
function loadFromJson(): any {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8')
    const json = JSON.parse(raw)
    return json
  } catch {
    return { player: {} }
  }
}
