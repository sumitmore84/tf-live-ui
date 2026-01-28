"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { UpcomingTravelCard, type TravelPackage } from "@/Home/components/"
import { Button } from "@/components/ui/button"

const upcomingPackages: TravelPackage[] = [
  {
    id: "1",
    title: "Coldplay Music of the Spheres World Tour 2026",
    eventType: "concert",
    status: "high-demand",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop",
    location: { city: "Mumbai", country: "India" },
    dateRange: "Jan 18 - 21, 2026",
    startingPrice: 85000,
    duration: "4D / 3N",
  },
  {
    id: "2",
    title: "Formula 1 Singapore Grand Prix 2026",
    eventType: "racing",
    status: "coming-soon",
    image: "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=600&h=400&fit=crop",
    location: { city: "Singapore", country: "Singapore" },
    dateRange: "Sep 18 - 20, 2026",
    startingPrice: 125000,
    duration: "5D / 4N",
  },
  {
    id: "3",
    title: "ICC T20 World Cup Finals 2026",
    eventType: "sports",
    status: "opening-soon",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
    location: { city: "Melbourne", country: "Australia" },
    dateRange: "Nov 8 - 15, 2026",
    startingPrice: 175000,
    duration: "8D / 7N",
  },
  {
    id: "4",
    title: "Ed Sheeran Mathematics Tour Asia",
    eventType: "concert",
    status: "coming-soon",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    location: { city: "Bangkok", country: "Thailand" },
    dateRange: "Mar 12 - 14, 2026",
    startingPrice: 65000,
    duration: "3D / 2N",
  },
  {
    id: "5",
    title: "MotoGP Qatar Grand Prix 2026",
    eventType: "racing",
    status: "high-demand",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=400&fit=crop",
    location: { city: "Doha", country: "Qatar" },
    dateRange: "Mar 6 - 8, 2026",
    startingPrice: 95000,
    duration: "4D / 3N",
  },
  {
    id: "6",
    title: "IPL 2026 Finals Experience",
    eventType: "sports",
    status: "coming-soon",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=400&fit=crop",
    location: { city: "Ahmedabad", country: "India" },
    dateRange: "May 28 - 30, 2026",
    startingPrice: 55000,
    duration: "3D / 2N",
  },
]

export default function UpcomingTravel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 320
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20" aria-labelledby="upcoming-travel-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="upcoming-travel-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
            >
              Upcoming Event Packages
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Be the first to know when these exclusive event-based travel packages open for booking.
            </p>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="h-10 w-10 rounded-full border-border hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="h-10 w-10 rounded-full border-border hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          role="region"
          aria-label="Upcoming travel packages carousel"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {upcomingPackages.map((pkg) => (
            <div key={pkg.id} style={{ scrollSnapAlign: "start" }}>
              <UpcomingTravelCard package={pkg} />
            </div>
          ))}
        </div>

        {/* Mobile Scroll Hint */}
        <p className="mt-4 text-center text-sm text-muted-foreground sm:hidden">
          Swipe to see more packages
        </p>
      </div>
    </section>
  )
}
