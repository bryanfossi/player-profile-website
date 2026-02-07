import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123'

    if (password === adminPassword) {
      const token = generateToken()
      return NextResponse.json({ success: true, token })
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false, error: 'Bad request' }, { status: 400 })
  }
}
