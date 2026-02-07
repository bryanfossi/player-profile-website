'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#stats', label: 'Stats' },
  { href: '#awards', label: 'Awards' },
  { href: '#events', label: 'Events' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#academics', label: 'Academics' },
  { href: '#highlights', label: 'Film' },
  { href: '#contact', label: 'Contact' },
]

interface NavBarProps {
  playerName?: string
  schoolLogo?: string
  clubLogo?: string
}

export default function NavBar({ playerName, schoolLogo, clubLogo }: NavBarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => setOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: logos + player name */}
        <Link href="/" className="flex items-center gap-3">
          {schoolLogo && (
            <div className="relative w-8 h-8 shrink-0">
              <Image src={schoolLogo} alt="School" fill className="object-contain" />
            </div>
          )}
          {clubLogo && (
            <div className="relative w-8 h-8 shrink-0">
              <Image src={clubLogo} alt="Club" fill className="object-contain" />
            </div>
          )}
          <span className="font-display text-lg tracking-wider text-gold">
            {playerName || 'Player Profile'}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-white/70">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-gold transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${
              open ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-black/95 backdrop-blur-md border-b border-white/10 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleClick}
              className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
