export default function AcademicsCard({ academics }: { academics: any }) {
  if (!academics) return null

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Academic stats */}
      <div className="bg-dark-card border border-white/5 rounded-lg p-6 space-y-4">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">Academic Profile</div>

        <div className="grid grid-cols-2 gap-4">
          {academics.gpa && (
            <div>
              <div className="text-2xl font-display text-white">{academics.gpa}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">GPA</div>
            </div>
          )}
          {academics.sat && (
            <div>
              <div className="text-2xl font-display text-white">{academics.sat}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">SAT</div>
            </div>
          )}
          {academics.act && (
            <div>
              <div className="text-2xl font-display text-white">{academics.act}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">ACT</div>
            </div>
          )}
          {academics.classRank && (
            <div>
              <div className="text-2xl font-display text-white">{academics.classRank}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Rank</div>
            </div>
          )}
        </div>

        <div className="border-t border-white/5 pt-4 space-y-2 text-sm text-white/60">
          {academics.school && <div><span className="text-white/30">School:</span> {academics.school}</div>}
          {academics.gradYear && <div><span className="text-white/30">Graduation:</span> {academics.gradYear}</div>}
          {academics.intendedMajor && <div><span className="text-white/30">Intended Major:</span> {academics.intendedMajor}</div>}
        </div>
      </div>

      {/* Honors */}
      <div className="bg-dark-card border border-white/5 rounded-lg p-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">Honors & Recognition</div>
        <div className="space-y-3">
          {(academics.honors || []).map((h: string, i: number) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/70">
              <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
