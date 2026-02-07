export default function ScheduleTable({ schedule }: { schedule: any[] }) {
  if (!schedule.length) return null

  return (
    <div className="overflow-x-auto border border-white/10 rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-dark-card text-white/50 uppercase tracking-[0.2em] text-[10px]">
            <th className="p-3 text-left font-medium">Date</th>
            <th className="p-3 text-left font-medium">Opponent</th>
            <th className="p-3 text-left font-medium hidden sm:table-cell">Competition</th>
            <th className="p-3 text-left font-medium hidden md:table-cell">Location</th>
            <th className="p-3 text-left font-medium hidden sm:table-cell">Time</th>
            <th className="p-3 text-left font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((g, i) => {
            const isWin = g.result?.startsWith('W')
            const isLoss = g.result?.startsWith('L')
            return (
              <tr
                key={i}
                className="border-t border-white/5 text-white/75 hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-3 text-white/50">{g.date}</td>
                <td className="p-3 font-medium text-white/90">{g.opponent}</td>
                <td className="p-3 hidden sm:table-cell">{g.competition}</td>
                <td className="p-3 hidden md:table-cell">
                  <span className={g.location === 'Home' ? 'text-green-400/70' : 'text-white/50'}>
                    {g.location}
                  </span>
                </td>
                <td className="p-3 hidden sm:table-cell">{g.time}</td>
                <td className="p-3">
                  <span
                    className={`${
                      isWin ? 'text-green-400' : isLoss ? 'text-red-400/70' : 'text-white/40'
                    }`}
                  >
                    {g.result}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
