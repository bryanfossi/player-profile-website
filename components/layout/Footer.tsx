import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <span className="text-sm text-white/50">&copy; {new Date().getFullYear()} Player Profile</span>

        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/fuse-id-logo.png" alt="Fuse-ID" fill className="object-contain" />
          </div>
          <div className="text-center">
            <span className="text-white/30 text-[10px] tracking-[0.15em] uppercase block">
              Built by Fuse-ID
            </span>
            <span className="text-white/30 text-[10px] tracking-[0.15em] uppercase block">
              Powered by Promoted Soccer Consultants, LLC
            </span>
          </div>
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/promoted-logo.png" alt="Promoted Soccer Consultants" fill className="object-contain" />
          </div>
        </div>
      </div>
    </footer>
  )
}
