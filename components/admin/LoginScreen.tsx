'use client'

import { useState } from 'react'

export default function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.success && data.token) {
        localStorage.setItem('admin_token', data.token)
        onLogin(data.token)
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-display text-2xl text-gold mb-2">Admin Panel</h1>
          <p className="text-white/50 text-sm">Enter your password to edit the player profile.</p>
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
            autoFocus
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full py-3 bg-gold text-dark font-semibold text-sm uppercase tracking-wider hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Checking...' : 'Sign In'}
        </button>

        <a href="/" className="block text-center text-white/30 text-xs hover:text-white/50 transition-colors">
          &larr; Back to site
        </a>
      </form>
    </div>
  )
}
