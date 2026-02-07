export default function StatBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
      {stats.map((s, i) => (
        <div
          key={i}
          className="text-center py-6 px-4 bg-dark-card hover:bg-dark-soft transition-colors duration-300"
        >
          <div className="text-2xl md:text-3xl font-display text-gold-gradient mb-1">
            {s.value}
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
