import Image from 'next/image'

// Maps position keyword to CSS object-position
const positionMap: Record<string, string> = {
  top: 'object-top',
  center: 'object-center',
  bottom: 'object-bottom',
  'left-top': 'object-left-top',
  'right-top': 'object-right-top',
}

export default function Hero({ player }: { player: any }) {
  const imgPosition = positionMap[player.heroImagePosition] || 'object-top'

  return (
    <section id="about" className="relative min-h-[90vh] flex items-end overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={player.heroImage}
          alt={player.name}
          fill
          className={`object-cover opacity-50 ${imgPosition}`}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24 pt-32">
        <div className="flex flex-col lg:flex-row items-end gap-10">
          {/* Player info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block w-8 h-px bg-gold" />
              <p className="text-gold uppercase tracking-[0.4em] text-xs font-medium">
                {player.position} &bull; #{player.number} &bull; Class of {player.classYear || player.academics?.gradYear}
              </p>
            </div>

            <h1 className="font-display text-5xl md:text-7xl text-white mb-4 leading-tight">
              {player.name}
            </h1>

            <p className="text-white/70 text-lg max-w-xl mb-6 leading-relaxed">
              {player.bio}
            </p>

            {/* Quick bio stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60 mb-8">
              {player.height && (
                <span><span className="text-white/40">HT</span> {player.height}</span>
              )}
              {player.weight && (
                <span><span className="text-white/40">WT</span> {player.weight}</span>
              )}
              {player.hometown && (
                <span><span className="text-white/40">FROM</span> {player.hometown}</span>
              )}
              {player.club && (
                <span><span className="text-white/40">CLUB</span> {player.club}</span>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#highlights"
                className="px-8 py-3 bg-gold text-dark font-semibold text-sm uppercase tracking-wider hover:bg-gold-light transition-colors"
              >
                Watch Film
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-white/25 text-white text-sm uppercase tracking-wider hover:border-gold hover:text-gold transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Headshot */}
          {player.headshot && (
            <div className="hidden lg:block relative w-64 h-80 shrink-0">
              <div className="absolute inset-0 border border-gold/20 translate-x-3 translate-y-3" />
              <Image
                src={player.headshot}
                alt={`${player.name} headshot`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
