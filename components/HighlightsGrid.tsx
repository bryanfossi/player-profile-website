'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
}

export default function HighlightsGrid({ highlights }: { highlights: any[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest')

  const tags = useMemo(() => {
    const set = new Set<string>()
    highlights.forEach((h) => (h.tags || []).forEach((t: string) => set.add(t)))
    return Array.from(set)
  }, [highlights])

  const filtered = useMemo(() => {
    return highlights
      .filter((h) => selectedTags.length === 0 || selectedTags.every((t) => h.tags?.includes(t)))
      .sort((a, b) => {
        const da = new Date(a.date).getTime()
        const db = new Date(b.date).getTime()
        return sort === 'newest' ? db - da : da - db
      })
  }, [highlights, selectedTags, sort])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  if (!highlights.length) return null

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Filter:</div>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 text-[10px] uppercase tracking-[0.15em] border rounded-full transition-all duration-200 ${
              selectedTags.includes(tag)
                ? 'bg-gold text-dark border-gold font-medium'
                : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/70'
            }`}
          >
            {tag}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-[0.15em]">
          <span>Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="bg-dark-card border border-white/15 px-2 py-1 text-white text-[10px] rounded cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((h, i) => (
          <a
            key={i}
            href={h.url}
            target="_blank"
            rel="noreferrer"
            className="group border border-white/5 rounded-lg overflow-hidden bg-dark-card hover:border-gold/20 transition-all duration-300"
          >
            {(h.thumb || getYouTubeThumbnail(h.url)) && (
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={h.thumb || getYouTubeThumbnail(h.url)!}
                  alt={h.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/80 group-hover:scale-110 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-white ml-0.5 group-hover:text-dark transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <div className="p-4 space-y-2">
              <div className="text-white font-medium text-sm group-hover:text-gold transition-colors">
                {h.title}
              </div>
              <div className="text-white/40 text-xs">{h.date}</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(h.tags || []).map((t: string) => (
                  <span
                    key={t}
                    className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
