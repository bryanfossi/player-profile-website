'use client'

import { useState, KeyboardEvent } from 'react'

interface Props {
  label: string
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

export default function TagInput({ label, tags, onChange, placeholder }: Props) {
  const [input, setInput] = useState('')

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase()
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag])
    }
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    }
    // Backspace on empty input removes last tag
    if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  const handleBlur = () => {
    if (input.trim()) {
      addTag(input)
    }
  }

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-wider text-white/50">{label}</label>
      <div className="flex flex-wrap gap-1.5 bg-dark border border-white/10 rounded px-3 py-2 focus-within:border-gold/40 transition-colors">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-white/40 hover:text-red-400 transition-colors leading-none"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? (placeholder || 'Type and press Enter') : ''}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-white placeholder-white/20 outline-none"
        />
      </div>
      <p className="text-white/25 text-[10px]">Press Enter or comma to add a tag</p>
    </div>
  )
}
