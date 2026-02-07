export default function EventsCard({ events }: { events: any[] }) {
  if (!events || !events.length) return null

  // Group by type
  const grouped: Record<string, any[]> = {}
  events.forEach((e) => {
    const type = e.type || 'Event'
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(e)
  })

  const typeColors: Record<string, string> = {
    tournament: 'text-amber-400/80 border-amber-400/20',
    showcase: 'text-emerald-400/80 border-emerald-400/20',
    camp: 'text-sky-400/80 border-sky-400/20',
    event: 'text-purple-400/80 border-purple-400/20',
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map((event, i) => {
        const colorClass = typeColors[event.type?.toLowerCase()] || typeColors.event
        return (
          <div
            key={i}
            className="bg-dark-card border border-white/5 rounded-lg p-5 hover:border-gold/20 transition-colors group"
          >
            {/* Type badge + date */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${colorClass}`}
              >
                {event.type || 'Event'}
              </span>
              <span className="text-white/40 text-xs">{event.date}</span>
            </div>

            {/* Name */}
            <div className="text-white font-semibold text-sm mb-1 group-hover:text-gold transition-colors">
              {event.name}
            </div>

            {/* Location */}
            {event.location && (
              <div className="text-white/50 text-xs mb-2">{event.location}</div>
            )}

            {/* Description */}
            {event.description && (
              <div className="text-white/40 text-xs leading-relaxed">{event.description}</div>
            )}

            {/* Link */}
            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-gold/70 hover:text-gold text-xs uppercase tracking-wider transition-colors"
              >
                Details &rarr;
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}
