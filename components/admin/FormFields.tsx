'use client'

interface FieldProps {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  type?: 'text' | 'textarea' | 'email' | 'tel' | 'url'
}

export function Field({ label, value, onChange, placeholder, type = 'text' }: FieldProps) {
  const base = 'w-full bg-dark border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors'

  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-wider text-white/50">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={base + ' resize-y'}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function Section({ title, children, defaultOpen = false }: SectionProps) {
  return (
    <details open={defaultOpen} className="group border border-white/5 rounded-lg overflow-hidden">
      <summary className="flex items-center justify-between px-5 py-4 bg-dark-card cursor-pointer hover:bg-dark-soft transition-colors select-none">
        <span className="font-display text-sm tracking-wider text-gold">{title}</span>
        <svg
          className="w-4 h-4 text-white/30 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="p-5 space-y-4 bg-dark-card/50">{children}</div>
    </details>
  )
}
