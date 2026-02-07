import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { validateToken } from '@/lib/auth'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    // Validate auth
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, WebP, and GIF images are allowed' }, { status: 400 })
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 })
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Try Supabase Storage first
    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabase()!
        const { error } = await supabase.storage
          .from('player-images')
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: false,
          })

        if (!error) {
          const { data: urlData } = supabase.storage
            .from('player-images')
            .getPublicUrl(filename)

          return NextResponse.json({ success: true, url: urlData.publicUrl })
        }
        console.error('Supabase upload error:', error)
      } catch (err) {
        console.error('Supabase upload failed, falling back to local:', err)
      }
    }

    // Fallback: write to local public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    fs.writeFileSync(path.join(uploadDir, filename), buffer)

    return NextResponse.json({ success: true, url: `/uploads/${filename}` })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
