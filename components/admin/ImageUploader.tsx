'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface Props {
  label: string
  value: string
  onChange: (url: string) => void
  token: string
}

export default function ImageUploader({ label, value, onChange, token }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const data = await res.json()

      if (data.success && data.url) {
        onChange(data.url)
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider text-white/50">{label}</label>

      {/* URL input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL or upload below"
        className="w-full bg-dark border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/40"
      />

      <div className="flex items-center gap-3">
        {/* Upload button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 text-xs uppercase tracking-wider border border-white/15 text-white/60 hover:border-gold/40 hover:text-gold transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Preview */}
        {value && (
          <div className="relative w-12 h-12 rounded border border-white/10 overflow-hidden shrink-0">
            <Image src={value} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </div>

      {error && <div className="text-red-400 text-xs">{error}</div>}
    </div>
  )
}
