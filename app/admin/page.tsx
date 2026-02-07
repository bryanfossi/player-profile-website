'use client'

import { useState, useEffect } from 'react'
import LoginScreen from '@/components/admin/LoginScreen'
import AdminEditor from '@/components/admin/AdminEditor'

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null)
  const [playerData, setPlayerData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  // Check for existing token on mount
  useEffect(() => {
    const stored = localStorage.getItem('admin_token')
    if (stored) {
      // Validate it by trying to fetch data
      fetch('/api/player')
        .then((r) => r.json())
        .then((data) => {
          setPlayerData(data)
          setToken(stored)
        })
        .catch(() => {
          localStorage.removeItem('admin_token')
        })
        .finally(() => {
          setAuthChecked(true)
          setLoading(false)
        })
    } else {
      setAuthChecked(true)
      setLoading(false)
    }
  }, [])

  const handleLogin = async (newToken: string) => {
    setToken(newToken)
    setLoading(true)
    try {
      const res = await fetch('/api/player')
      const data = await res.json()
      setPlayerData(data)
    } catch {
      // Fallback
      setPlayerData({ player: {} })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
    setPlayerData(null)
  }

  // Loading state
  if (!authChecked || loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white/30 text-sm uppercase tracking-wider">Loading...</div>
      </div>
    )
  }

  // Not logged in
  if (!token) {
    return <LoginScreen onLogin={handleLogin} />
  }

  // Logged in
  if (!playerData) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white/30 text-sm">Could not load player data.</div>
      </div>
    )
  }

  return <AdminEditor initialData={playerData} token={token} onLogout={handleLogout} />
}
