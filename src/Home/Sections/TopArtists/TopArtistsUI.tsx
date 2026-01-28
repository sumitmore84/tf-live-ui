"use client"

const artists = [
  { name: "Taylor Swift", city: "Cornelia" },
  { name: "The Weeknd", city: "LA" },
  { name: "Ariana Grande", city: "New York" },
  { name: "Bruno Mars", city: "Nashville" },
  { name: "Sabrina Carpenter", city: "London" },
  { name: "Lady Gaga", city: "Toronto" },
  { name: "Drake", city: "Vancouver" },
  { name: "Justin Bieber", city: "Seattle" },
  { name: "Arijit Singh", city: "Delhi" },
]

function ArtistCard({ name, city }: { name: string; city: string }) {
  return (
    <div className="flex items-center gap-4 h-24 w-[280px] shrink-0 md:w-full">
      <img
        src="/placeholder.svg?height=80&width=80"
        alt={name}
        className="w-20 h-20 rounded-xl object-cover"
      />
      <div className="flex flex-col justify-center">
        <span className="text-lg font-semibold text-foreground">
          {name}
        </span>
        <span className="text-sm text-muted-foreground">{city}</span>
      </div>
    </div>
  )
}

export default function TopArtists() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground text-balance">
          Top Artists
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          See all
        </a>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
        {artists.map((artist) => (
          <ArtistCard key={artist.name} name={artist.name} city={artist.city} />
        ))}
      </div>

      {/* Desktop/Tablet: 3-column grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {artists.map((artist) => (
          <ArtistCard key={artist.name} name={artist.name} city={artist.city} />
        ))}
      </div>
    </section>
  )
}
