import crypto from 'crypto'

export function generateToken(): string {
  const secret = process.env.SESSION_SECRET || 'default-dev-secret'
  const timestamp = Date.now().toString()
  return crypto.createHmac('sha256', secret).update(timestamp).digest('hex') + '.' + timestamp
}

export function validateToken(token: string): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [hash, timestamp] = parts
  const secret = process.env.SESSION_SECRET || 'default-dev-secret'
  const expected = crypto.createHmac('sha256', secret).update(timestamp).digest('hex')
  if (hash !== expected) return false
  // Token valid for 24 hours
  const age = Date.now() - parseInt(timestamp)
  return age < 24 * 60 * 60 * 1000
}
