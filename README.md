# Player Recruiting Profile — Template

A clean, dark-themed recruiting profile website for high school and club athletes. Built with **Next.js 14**, **Tailwind CSS**, and driven entirely by a single JSON file.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customizing for a Player

**All player data lives in one file:** `data/player.json`

Edit this file to update everything on the site — no code changes needed.

### Player Fields

| Field | Description |
|---|---|
| `name` | Full display name |
| `position` | Playing position |
| `club` | Club or school team |
| `number` | Jersey number |
| `classYear` | Graduation year |
| `height` / `weight` | Physical measurables |
| `hometown` | City, State |
| `bio` | 1–2 sentence intro for coaches |
| `heroImage` | URL for the hero background image |
| `headshot` | URL for headshot (shown on desktop) |

### Stats

Add any key stats to `player.stats`. Keys become labels automatically:

```json
"stats": {
  "gamesPlayed": "48",
  "goals": "22",
  "assists": "15",
  "passAccuracy": "87%"
}
```

### Awards, Schedule, Highlights, Academics, Contact

See `data/player.json` for the full structure with examples.

### Images

- **Hero image**: Use a high-res action shot (1600px+ wide)
- **Headshot**: Cropped portrait (600px+ wide)
- **Highlight thumbnails**: 800px+ wide
- Host images on Unsplash, Imgur, or your own CDN
- To use local images, place them in `/public/images/` and reference as `/images/filename.jpg`

## Deploying

### Vercel (recommended)
1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Deploy — done

### Custom Domain
Add your domain in Vercel dashboard → Settings → Domains

## File Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (assembles all sections)
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx      # Fixed nav with mobile menu
│   │   └── Footer.tsx
│   ├── Hero.tsx            # Hero section with background image
│   ├── StatBar.tsx         # Key stats strip
│   ├── SectionHeading.tsx  # Reusable section headers
│   ├── AwardsTimeline.tsx  # Awards & honors timeline
│   ├── ScheduleTable.tsx   # Game schedule table
│   ├── AcademicsCard.tsx   # Academic profile cards
│   ├── HighlightsGrid.tsx  # Filterable video highlights grid
│   └── ContactCard.tsx     # Contact information cards
├── data/
│   └── player.json         # ← EDIT THIS FILE to customize
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## Selling as a Template

To deploy for multiple players:
1. Fork/duplicate this repo per player
2. Edit `data/player.json` with their info
3. Deploy to Vercel (free tier works)
4. Point their custom domain

---

Built with Next.js · Powered by Significance Inc.
