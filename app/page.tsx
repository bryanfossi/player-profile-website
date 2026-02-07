import { loadPlayer } from '@/lib/data'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/Hero'
import StatBar from '@/components/StatBar'
import SectionHeading from '@/components/SectionHeading'
import AwardsTimeline from '@/components/AwardsTimeline'
import ScheduleTable from '@/components/ScheduleTable'
import AcademicsCard from '@/components/AcademicsCard'
import HighlightsGrid from '@/components/HighlightsGrid'
import ContactCard from '@/components/ContactCard'
import EventsCard from '@/components/EventsCard'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default async function HomePage() {
  const data = await loadPlayer()
  const player = data.player || data

  // Build stat bar dynamically from player data
  const statItems: { value: string; label: string }[] = []

  // Pull from player.stats if available
  if (player.stats) {
    Object.entries(player.stats).forEach(([key, val]) => {
      if (val) {
        // Convert camelCase to readable label
        const label = key.replace(/([A-Z])/g, ' $1').trim()
        statItems.push({ value: val as string, label })
      }
    })
  }

  // Fallback: build from other fields if no stats object
  if (statItems.length === 0) {
    if (player.club) statItems.push({ value: player.club, label: 'Club' })
    if (player.position) statItems.push({ value: player.position, label: 'Position' })
    if (player.academics?.gpa) statItems.push({ value: player.academics.gpa, label: 'GPA' })
    if (player.academics?.sat) statItems.push({ value: player.academics.sat, label: 'SAT' })
  }

  return (
    <main className="bg-dark min-h-screen text-white">
      <NavBar playerName={player.name} schoolLogo={player.schoolLogo} clubLogo={player.clubLogo} />

      <Hero player={player} />

      {/* Stats bar */}
      {statItems.length > 0 && (
        <section id="stats" className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
          <StatBar stats={statItems} />
        </section>
      )}

      {/* Awards */}
      {player.awards?.length > 0 && (
        <section id="awards" className="max-w-6xl mx-auto px-6 pt-20">
          <SectionHeading title="Awards & Honors" subtitle="Athletic and academic achievements" />
          <AwardsTimeline awards={player.awards} />
        </section>
      )}

      {/* Events — Tournaments, Showcases, Camps */}
      {player.events?.length > 0 && (
        <section id="events" className="max-w-6xl mx-auto px-6 pt-20">
          <SectionHeading title="Upcoming Events" subtitle="Tournaments, showcases, and camps" />
          <EventsCard events={player.events} />
        </section>
      )}

      {/* Schedule */}
      {player.schedule?.length > 0 && (
        <section id="schedule" className="max-w-6xl mx-auto px-6 pt-20">
          <SectionHeading title="Schedule" subtitle="Upcoming and recent matches" />
          <ScheduleTable schedule={player.schedule} />
        </section>
      )}

      {/* Academics */}
      {player.academics && (
        <section id="academics" className="max-w-6xl mx-auto px-6 pt-20">
          <SectionHeading title="Academics" subtitle="Academic profile and honors" />
          <AcademicsCard academics={player.academics} />
        </section>
      )}

      {/* Highlights / Film */}
      {player.highlights?.length > 0 && (
        <section id="highlights" className="max-w-6xl mx-auto px-6 pt-20">
          <SectionHeading title="Film & Highlights" subtitle="Game film, highlight reels, and training clips" />
          <HighlightsGrid highlights={player.highlights} />
        </section>
      )}

      {/* Contact */}
      {player.contact && (
        <section id="contact" className="max-w-6xl mx-auto px-6 pt-20 pb-12">
          <SectionHeading title="Contact" subtitle="Get in touch for recruiting inquiries" />
          <ContactCard contact={player.contact} />
        </section>
      )}

      <Footer />
    </main>
  )
}
