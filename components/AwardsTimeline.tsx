export default function AwardsTimeline({ awards }: { awards: any[] }) {
  if (!awards.length) return null

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

      <div className="space-y-6">
        {awards.map((award, i) => (
          <div
            key={i}
            className="flex gap-4 md:gap-6 items-start group"
          >
            {/* Year badge */}
            <div className="text-gold font-display text-lg w-14 shrink-0 text-right pt-0.5">
              {award.year}
            </div>

            {/* Dot */}
            <div className="hidden md:flex items-center justify-center w-3 h-3 mt-1.5 shrink-0">
              <div className="w-2 h-2 rounded-full bg-gold/50 group-hover:bg-gold transition-colors ring-2 ring-dark" />
            </div>

            {/* Content */}
            <div className="flex-1 bg-dark-card border border-white/5 rounded-lg p-4 group-hover:border-gold/20 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <span className="text-white font-semibold">{award.title}</span>
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${
                    award.type === 'academic'
                      ? 'text-blue-400/80 border-blue-400/20'
                      : 'text-gold/80 border-gold/20'
                  }`}
                >
                  {award.type === 'academic' ? 'Academic' : 'Athletic'}
                </span>
              </div>
              <div className="text-white/60 text-sm">{award.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
