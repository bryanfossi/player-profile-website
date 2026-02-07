'use client'

import { useState } from 'react'
import { Field, Section } from './FormFields'
import ImageUploader from './ImageUploader'

import TagInput from './TagInput'

// Extract YouTube video ID from various URL formats
function getYouTubeId(url: string): string | null {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const match = url.match(p)
    if (match) return match[1]
  }
  return null
}

function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}

interface Props {
  initialData: any
  token: string
  onLogout: () => void
}

export default function AdminEditor({ initialData, token, onLogout }: Props) {
  const [player, setPlayer] = useState(initialData.player || {})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Helper to update nested fields
  const set = (key: string, val: any) => {
    setPlayer((prev: any) => ({ ...prev, [key]: val }))
    setSaved(false)
  }

  const setNested = (parent: string, key: string, val: any) => {
    setPlayer((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: val },
    }))
    setSaved(false)
  }

  // Array helpers
  const addItem = (key: string, template: any) => {
    setPlayer((prev: any) => ({
      ...prev,
      [key]: [...(prev[key] || []), template],
    }))
    setSaved(false)
  }

  const updateItem = (key: string, index: number, field: string, val: any) => {
    setPlayer((prev: any) => {
      const arr = [...(prev[key] || [])]
      arr[index] = { ...arr[index], [field]: val }
      return { ...prev, [key]: arr }
    })
    setSaved(false)
  }

  const removeItem = (key: string, index: number) => {
    setPlayer((prev: any) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_: any, i: number) => i !== index),
    }))
    setSaved(false)
  }

  // Save
  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/player', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ player }),
      })
      const data = await res.json()
      if (data.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError(data.error || 'Save failed')
      }
    } catch {
      setError('Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-sm text-gold hover:text-gold-light transition-colors">
              &larr; View Site
            </a>
            <span className="text-white/20">|</span>
            <span className="text-xs uppercase tracking-wider text-white/40">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-green-400 text-xs uppercase tracking-wider animate-fade-in">Saved!</span>
            )}
            {error && (
              <span className="text-red-400 text-xs">{error}</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-gold text-dark text-xs font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">

        {/* Player Info */}
        <Section title="Player Info" defaultOpen={true}>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Full Name" value={player.name || ''} onChange={(v) => set('name', v)} placeholder="First Last" />
            <Field label="Position" value={player.position || ''} onChange={(v) => set('position', v)} placeholder="e.g. Goalkeeper" />
            <Field label="Club / School" value={player.club || ''} onChange={(v) => set('club', v)} placeholder="e.g. Lancaster Catholic" />
            <Field label="Jersey Number" value={player.number || ''} onChange={(v) => set('number', v)} placeholder="e.g. 1" />
            <Field label="Class Year" value={player.classYear || ''} onChange={(v) => set('classYear', v)} placeholder="e.g. 2026" />
            <Field label="Height" value={player.height || ''} onChange={(v) => set('height', v)} placeholder="e.g. 6'1&quot;" />
            <Field label="Weight" value={player.weight || ''} onChange={(v) => set('weight', v)} placeholder="e.g. 175 lbs" />
            <Field label="Hometown" value={player.hometown || ''} onChange={(v) => set('hometown', v)} placeholder="e.g. Lancaster, PA" />
          </div>
          <Field label="Bio" value={player.bio || ''} onChange={(v) => set('bio', v)} type="textarea" placeholder="Short intro about the player..." />
        </Section>

        {/* Images */}
        <Section title="Images">
          <ImageUploader label="Hero Background Image" value={player.heroImage || ''} onChange={(v) => set('heroImage', v)} token={token} />
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-white/50">Hero Image Focus Point</label>
            <p className="text-white/30 text-xs mb-2">Controls which part of the image stays visible when cropped. Use &quot;Top&quot; for photos where the head is near the top.</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'top', label: 'Top' },
                { value: 'center', label: 'Center' },
                { value: 'bottom', label: 'Bottom' },
                { value: 'left-top', label: 'Left Top' },
                { value: 'right-top', label: 'Right Top' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set('heroImagePosition', opt.value)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider border rounded transition-all ${
                    (player.heroImagePosition || 'top') === opt.value
                      ? 'bg-gold text-dark border-gold font-medium'
                      : 'border-white/15 text-white/50 hover:border-white/30'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <ImageUploader label="Headshot" value={player.headshot || ''} onChange={(v) => set('headshot', v)} token={token} />

          <div className="border-t border-white/5 pt-4 mt-2">
            <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Team Logos</p>
            <p className="text-white/30 text-xs mb-4">Upload your high school and club logos. PNG with transparent background works best. These appear in the hero section next to your name.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <ImageUploader label="High School Logo" value={player.schoolLogo || ''} onChange={(v) => set('schoolLogo', v)} token={token} />
              <ImageUploader label="Club Logo" value={player.clubLogo || ''} onChange={(v) => set('clubLogo', v)} token={token} />
            </div>
          </div>
        </Section>

        {/* Stats */}
        <Section title="Stats">
          <p className="text-white/40 text-xs mb-3">Add key performance stats. These appear in the stats bar on the homepage.</p>
          {Object.entries(player.stats || {}).map(([key, val], i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <Field label="Stat Name" value={key} onChange={(newKey) => {
                  const stats = { ...(player.stats || {}) }
                  const value = stats[key]
                  delete stats[key]
                  stats[newKey] = value
                  set('stats', stats)
                }} placeholder="e.g. gamesPlayed" />
              </div>
              <div className="flex-1">
                <Field label="Value" value={(val as string) || ''} onChange={(v) => setNested('stats', key, v)} placeholder="e.g. 48" />
              </div>
              <button
                type="button"
                onClick={() => {
                  const stats = { ...(player.stats || {}) }
                  delete stats[key]
                  set('stats', stats)
                }}
                className="pb-2 text-red-400/60 hover:text-red-400 text-xs transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const stats = { ...(player.stats || {}) }
              stats[`newStat${Object.keys(stats).length + 1}`] = ''
              set('stats', stats)
            }}
            className="text-xs text-gold/70 hover:text-gold transition-colors uppercase tracking-wider"
          >
            + Add Stat
          </button>
        </Section>

        {/* Awards */}
        <Section title="Awards & Honors">
          {(player.awards || []).map((award: any, i: number) => (
            <div key={i} className="border border-white/5 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem('awards', i)}
                className="absolute top-3 right-3 text-red-400/50 hover:text-red-400 text-xs transition-colors"
              >
                Remove
              </button>
              <div className="grid md:grid-cols-3 gap-3">
                <Field label="Year" value={award.year || ''} onChange={(v) => updateItem('awards', i, 'year', v)} placeholder="2025" />
                <Field label="Title" value={award.title || ''} onChange={(v) => updateItem('awards', i, 'title', v)} placeholder="Award name" />
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-white/50">Type</label>
                  <select
                    value={award.type || 'soccer'}
                    onChange={(e) => updateItem('awards', i, 'type', e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/40"
                  >
                    <option value="soccer">Athletic</option>
                    <option value="academic">Academic</option>
                  </select>
                </div>
              </div>
              <Field label="Description" value={award.body || ''} onChange={(v) => updateItem('awards', i, 'body', v)} placeholder="Brief description" />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem('awards', { year: new Date().getFullYear().toString(), title: '', body: '', type: 'soccer' })}
            className="text-xs text-gold/70 hover:text-gold transition-colors uppercase tracking-wider"
          >
            + Add Award
          </button>
        </Section>

        {/* Events */}
        <Section title="Events, Tournaments, Showcases & Camps">
          {(player.events || []).map((event: any, i: number) => (
            <div key={i} className="border border-white/5 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem('events', i)}
                className="absolute top-3 right-3 text-red-400/50 hover:text-red-400 text-xs transition-colors"
              >
                Remove
              </button>
              <div className="grid md:grid-cols-3 gap-3">
                <Field label="Event Name" value={event.name || ''} onChange={(v) => updateItem('events', i, 'name', v)} placeholder="Jefferson Cup" />
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-white/50">Type</label>
                  <select
                    value={event.type || 'Tournament'}
                    onChange={(e) => updateItem('events', i, 'type', e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/40"
                  >
                    <option value="Tournament">Tournament</option>
                    <option value="Showcase">Showcase</option>
                    <option value="Camp">Camp</option>
                    <option value="Event">Other Event</option>
                  </select>
                </div>
                <Field label="Date" value={event.date || ''} onChange={(v) => updateItem('events', i, 'date', v)} placeholder="2026-03-14" />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Location" value={event.location || ''} onChange={(v) => updateItem('events', i, 'location', v)} placeholder="Richmond, VA" />
                <Field label="Link / URL" value={event.url || ''} onChange={(v) => updateItem('events', i, 'url', v)} type="url" placeholder="https://..." />
              </div>
              <Field label="Description" value={event.description || ''} onChange={(v) => updateItem('events', i, 'description', v)} type="textarea" placeholder="Brief description of the event..." />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem('events', { name: '', type: 'Tournament', date: '', location: '', description: '', url: '' })}
            className="text-xs text-gold/70 hover:text-gold transition-colors uppercase tracking-wider"
          >
            + Add Event
          </button>
        </Section>

        {/* Schedule */}
        <Section title="Schedule">
          {(player.schedule || []).map((game: any, i: number) => (
            <div key={i} className="border border-white/5 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem('schedule', i)}
                className="absolute top-3 right-3 text-red-400/50 hover:text-red-400 text-xs transition-colors"
              >
                Remove
              </button>
              <div className="grid md:grid-cols-3 gap-3">
                <Field label="Date" value={game.date || ''} onChange={(v) => updateItem('schedule', i, 'date', v)} placeholder="2026-03-01" />
                <Field label="Opponent" value={game.opponent || ''} onChange={(v) => updateItem('schedule', i, 'opponent', v)} placeholder="Opponent name" />
                <Field label="Competition" value={game.competition || ''} onChange={(v) => updateItem('schedule', i, 'competition', v)} placeholder="League, Cup, etc." />
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <Field label="Location" value={game.location || ''} onChange={(v) => updateItem('schedule', i, 'location', v)} placeholder="Home / Away" />
                <Field label="Time" value={game.time || ''} onChange={(v) => updateItem('schedule', i, 'time', v)} placeholder="7:00 PM" />
                <Field label="Result" value={game.result || ''} onChange={(v) => updateItem('schedule', i, 'result', v)} placeholder="W 2-0 or —" />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem('schedule', { date: '', opponent: '', competition: '', location: '', time: '', result: '—' })}
            className="text-xs text-gold/70 hover:text-gold transition-colors uppercase tracking-wider"
          >
            + Add Game
          </button>
        </Section>

        {/* Academics */}
        <Section title="Academics">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="School" value={player.academics?.school || ''} onChange={(v) => setNested('academics', 'school', v)} placeholder="School name" />
            <Field label="Graduation Year" value={player.academics?.gradYear || ''} onChange={(v) => setNested('academics', 'gradYear', v)} placeholder="2026" />
            <Field label="GPA" value={player.academics?.gpa || ''} onChange={(v) => setNested('academics', 'gpa', v)} placeholder="3.9" />
            <Field label="SAT" value={player.academics?.sat || ''} onChange={(v) => setNested('academics', 'sat', v)} placeholder="1450" />
            <Field label="ACT" value={player.academics?.act || ''} onChange={(v) => setNested('academics', 'act', v)} placeholder="32" />
            <Field label="Class Rank" value={player.academics?.classRank || ''} onChange={(v) => setNested('academics', 'classRank', v)} placeholder="Top 10%" />
            <Field label="Intended Major" value={player.academics?.intendedMajor || ''} onChange={(v) => setNested('academics', 'intendedMajor', v)} placeholder="Business Administration" />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs uppercase tracking-wider text-white/50">Honors</label>
            {(player.academics?.honors || []).map((h: string, i: number) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => {
                    const honors = [...(player.academics?.honors || [])]
                    honors[i] = e.target.value
                    setNested('academics', 'honors', honors)
                  }}
                  className="flex-1 bg-dark border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/40"
                />
                <button
                  type="button"
                  onClick={() => {
                    const honors = (player.academics?.honors || []).filter((_: any, idx: number) => idx !== i)
                    setNested('academics', 'honors', honors)
                  }}
                  className="text-red-400/50 hover:text-red-400 text-xs transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const honors = [...(player.academics?.honors || []), '']
                setNested('academics', 'honors', honors)
              }}
              className="text-xs text-gold/70 hover:text-gold transition-colors uppercase tracking-wider"
            >
              + Add Honor
            </button>
          </div>
        </Section>

        {/* Highlights */}
        <Section title="Film & Highlights">
          {(player.highlights || []).map((h: any, i: number) => (
            <div key={i} className="border border-white/5 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeItem('highlights', i)}
                className="absolute top-3 right-3 text-red-400/50 hover:text-red-400 text-xs transition-colors"
              >
                Remove
              </button>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Title" value={h.title || ''} onChange={(v) => updateItem('highlights', i, 'title', v)} placeholder="Highlight title" />
                <Field
                  label="Video URL"
                  value={h.url || ''}
                  onChange={(v) => {
                    updateItem('highlights', i, 'url', v)
                    // Auto-generate thumbnail from YouTube URL if no thumb set
                    const autoThumb = getYouTubeThumbnail(v)
                    if (autoThumb && !h.thumb) {
                      updateItem('highlights', i, 'thumb', autoThumb)
                    }
                  }}
                  type="url"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Date" value={h.date || ''} onChange={(v) => updateItem('highlights', i, 'date', v)} placeholder="2025-10-12" />
                <TagInput label="Tags" tags={h.tags || []} onChange={(tags) => updateItem('highlights', i, 'tags', tags)} placeholder="e.g. shot-stopping, reflex" />
              </div>
              <div className="space-y-2">
                <ImageUploader
                  label="Thumbnail"
                  value={h.thumb || ''}
                  onChange={(v) => updateItem('highlights', i, 'thumb', v)}
                  token={token}
                />
                {h.url && getYouTubeThumbnail(h.url) && h.thumb !== getYouTubeThumbnail(h.url) && (
                  <button
                    type="button"
                    onClick={() => updateItem('highlights', i, 'thumb', getYouTubeThumbnail(h.url)!)}
                    className="text-xs text-gold/70 hover:text-gold transition-colors uppercase tracking-wider"
                  >
                    ↻ Use YouTube Thumbnail
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addItem('highlights', { title: '', url: '', date: '', tags: [], thumb: '' })}
            className="text-xs text-gold/70 hover:text-gold transition-colors uppercase tracking-wider"
          >
            + Add Highlight
          </button>
        </Section>

        {/* Contact */}
        <Section title="Contact Info">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Email" value={player.contact?.email || ''} onChange={(v) => setNested('contact', 'email', v)} type="email" placeholder="player@email.com" />
            <Field label="Phone" value={player.contact?.phone || ''} onChange={(v) => setNested('contact', 'phone', v)} type="tel" placeholder="123-456-7890" />
            <Field label="Twitter URL" value={player.contact?.twitter || ''} onChange={(v) => setNested('contact', 'twitter', v)} type="url" placeholder="https://twitter.com/..." />
            <Field label="Instagram URL" value={player.contact?.instagram || ''} onChange={(v) => setNested('contact', 'instagram', v)} type="url" placeholder="https://instagram.com/..." />
            <Field label="Hudl Profile" value={player.contact?.hudl || ''} onChange={(v) => setNested('contact', 'hudl', v)} type="url" placeholder="https://hudl.com/..." />
            <Field label="TikTok URL" value={player.contact?.tiktok || ''} onChange={(v) => setNested('contact', 'tiktok', v)} type="url" placeholder="https://tiktok.com/@..." />
            <Field label="YouTube URL" value={player.contact?.youtube || ''} onChange={(v) => setNested('contact', 'youtube', v)} type="url" placeholder="https://youtube.com/@..." />
          </div>
          <div className="border-t border-white/5 pt-4 mt-2">
            <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Coach Contact</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Coach Name" value={player.contact?.coach || ''} onChange={(v) => setNested('contact', 'coach', v)} placeholder="Coach Name" />
              <Field label="Coach Email" value={player.contact?.coachEmail || ''} onChange={(v) => setNested('contact', 'coachEmail', v)} type="email" placeholder="coach@email.com" />
              <Field label="Coach Phone" value={player.contact?.coachPhone || ''} onChange={(v) => setNested('contact', 'coachPhone', v)} type="tel" placeholder="123-456-7890" />
            </div>
          </div>
        </Section>

        {/* Bottom save */}
        <div className="pt-6 pb-16 flex items-center justify-between">
          <a href="/" className="text-white/30 text-sm hover:text-white/50 transition-colors">&larr; View Site</a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-gold text-dark font-semibold text-sm uppercase tracking-wider hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
