import { UpcomingTravelCard } from "@/Home/components/"

const packages = [
  {
    id: 1,
    image: "/f1-abu-dhabi.jpg",
    tag: "Motorsport",
    icon: "🏎️",
    title: "Formula 1 Abu Dhabi GP",
    location: {
      city: "Abu Dhabi",
      country: "UAE"
    },
    dateRange: "Nov 20 – Nov 22",
    startingPrice: 89999,
    duration: "3D / 2N",
    href: "#",
  },
  {
    id: 2,
    image: "/f1-abu-dhabi.jpg",
    tag: "Tennis",
    icon: "🎾",
    title: "Wimbledon Championships",
    location: {
      city: "London",
      country: "UK"
    },
    dateRange: "Jul 1 – Jul 14",
    startingPrice: 149999,
    duration: "5D / 4N",
    href: "#",
  },
  {
    id: 3,
    image: "/f1-abu-dhabi.jpg",
    tag: "Football",
    icon: "⚽",
    title: "UEFA Champions League Final",
    location: {
      city: "Munich",
      country: "Germany"
    },
    dateRange: "May 31 – Jun 2",
    startingPrice: 229999,
    duration: "4D / 3N",
    href: "#",
  },
  {
    id: 4,
    image: "/f1-abu-dhabi.jpg",
    tag: "Football",
    icon: "⚽",
    title: "UEFA Champions League Final",
    location: {
      city: "Munich",
      country: "Germany"
    },
    dateRange: "May 31 – Jun 2",
    startingPrice: 229999,
    duration: "4D / 3N",
    href: "#",
  },
  {
    id: 5,
    image: "/f1-abu-dhabi.jpg",
    tag: "Football",
    icon: "⚽",
    title: "UEFA Champions League Final",
    location: { 
      city: "Munich",
      country: "Germany"
    },    
    dateRange: "May 31 – Jun 2",
    startingPrice: 229999,
    duration: "4D / 3N",
    href: "#",
  },
]

export default function TravelForEvents() {
  return (
    <section className="min-h-screen bg-background px-4 mx-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Travel For Events
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Your front-row seat to the world's biggest events
          </p>
        </div>

        {/* Card Grid - Updated to Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto py-8 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory">
          {packages.map((pkg) => (
            <div key={pkg.id} className="w-[85vw] flex-shrink-0 snap-start sm:w-[350px]">
              <UpcomingTravelCard package={pkg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
