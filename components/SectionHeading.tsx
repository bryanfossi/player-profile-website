export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-px bg-gold" />
        <h2 className="font-display text-2xl md:text-3xl text-white tracking-wide">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-white/50 text-sm ml-11">{subtitle}</p>
      )}
    </div>
  )
}
