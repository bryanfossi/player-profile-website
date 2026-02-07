import { NextRequest, NextResponse } from 'next/server'
import { loadPlayer, savePlayer } from '@/lib/data'
import { validateToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await loadPlayer()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: 'Could not read player data', detail: err?.message }, { status: 500 })
  }
}

// Debug endpoint - DELETE THIS LATER
export async function PATCH() {
  const { isSupabaseConfigured } = await import('@/lib/supabase')
  const configured = isSupabaseConfigured()
  
  // Try a direct Supabase read
  let supabaseResult = null
  let supabaseError = null
  if (configured) {
    const { getSupabase } = await import('@/lib/supabase')
    const supabase = getSupabase()
    if (supabase) {
      const { data, error } = await supabase
        .from('players')
        .select('data')
        .eq('id', 'default')
        .single()
      supabaseResult = data ? 'found' : 'no data'
      supabaseError = error ? error.message : null
    }
  }

  return NextResponse.json({
    supabaseConfigured: configured,
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseResult,
    supabaseError,
  })
}

export async function PUT(req: NextRequest) {
  try {
    // Validate auth token
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Validate structure
    if (!body.player || !body.player.name) {
      return NextResponse.json({ error: 'Invalid player data' }, { status: 400 })
    }

    const success = await savePlayer(body.player)
    if (!success) {
      return NextResponse.json({ error: 'Could not save player data' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Could not save player data' }, { status: 500 })
  }
}
