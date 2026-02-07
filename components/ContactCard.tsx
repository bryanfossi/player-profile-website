export default function ContactCard({ contact }: { contact: any }) {
  if (!contact) return null

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Player contact */}
      <div className="bg-dark-card border border-white/5 rounded-lg p-6 space-y-4">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-2">Player Contact</div>

        {contact.email && (
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <a className="text-sm text-gold hover:text-gold-light transition-colors" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        )}

        {contact.phone && (
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="text-sm text-white/70">{contact.phone}</span>
          </div>
        )}

        {/* Social links */}
        <div className="flex gap-3 pt-2">
          {contact.twitter && (
            <a href={contact.twitter} target="_blank" rel="noreferrer" className="text-white/30 hover:text-gold transition-colors text-xs uppercase tracking-wider">Twitter</a>
          )}
          {contact.instagram && (
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="text-white/30 hover:text-gold transition-colors text-xs uppercase tracking-wider">Instagram</a>
          )}
          {contact.hudl && (
            <a href={contact.hudl} target="_blank" rel="noreferrer" className="text-white/30 hover:text-gold transition-colors text-xs uppercase tracking-wider">Hudl</a>
          )}
          {contact.tiktok && (
            <a href={contact.tiktok} target="_blank" rel="noreferrer" className="text-white/30 hover:text-gold transition-colors text-xs uppercase tracking-wider">TikTok</a>
          )}
          {contact.youtube && (
            <a href={contact.youtube} target="_blank" rel="noreferrer" className="text-white/30 hover:text-gold transition-colors text-xs uppercase tracking-wider">YouTube</a>
          )}
        </div>
      </div>

      {/* Coach contact */}
      <div className="bg-dark-card border border-white/5 rounded-lg p-6 space-y-4">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-2">Coach Contact</div>

        {contact.coach && (
          <div className="text-sm text-white/80 font-medium">{contact.coach}</div>
        )}

        {contact.coachEmail && (
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <a className="text-sm text-gold hover:text-gold-light transition-colors" href={`mailto:${contact.coachEmail}`}>
              {contact.coachEmail}
            </a>
          </div>
        )}

        {contact.coachPhone && (
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="text-sm text-white/70">{contact.coachPhone}</span>
          </div>
        )}
      </div>
    </div>
  )
}
