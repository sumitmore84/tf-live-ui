"use client"

import { useMemo, useState } from "react"
import { EmptyState, PackageCard, SearchHeader, FilterSidebar } from "./components"
import { TravelPackage } from "@/types/travelPackageType"

// Helper to format date for display (travel dates are 1-2 days before event)
function getTravelDates(startDate: string): string[] {
  const eventDate = new Date(startDate)
  const dates: string[] = []

  // 2 days before
  const twoDaysBefore = new Date(eventDate)
  twoDaysBefore.setDate(eventDate.getDate() - 2)
  dates.push(
    twoDaysBefore.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  )

  // 1 day before
  const oneDayBefore = new Date(eventDate)
  oneDayBefore.setDate(eventDate.getDate() - 1)
  dates.push(
    oneDayBefore.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  )

  return dates
}
interface SearchResultsPageProps {
    events: TravelPackage[];
}
export default function SearchResultsPage({ events }: SearchResultsPageProps) {
  // Search header state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Filter sidebar state
  const [destinationFilter, setDestinationFilter] = useState<string | null>(null)
  const [sortByDateAsc, setSortByDateAsc] = useState(true)

  // Get all unique categories
  const allCategories = useMemo(() => {
    return [...new Set(events.map((p) => p.category))]
  }, [events])

  // Get destinations based on selected category
  const availableDestinations = useMemo(() => {
    const filtered = selectedCategory
      ? events.filter((p) => p.category === selectedCategory)
      : events

    return [...new Set(filtered.map((p) => `${p.city}, ${p.country}`))]
  }, [selectedCategory, events])

  // Get travel dates based on selected destination
  const availableDates = useMemo(() => {
    if (!selectedDestination) return []

    const filtered = events.filter(
      (p) => `${p.city}, ${p.country}` === selectedDestination
    )

    const allDates = filtered.flatMap((p) => getTravelDates(p.start_date))
    return [...new Set(allDates)].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  }, [selectedDestination, events])

  // Handle category change - reset downstream selections
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setSelectedDestination(null)
    setSelectedDate(null)
  }

  // Handle destination change - reset date selection
  const handleDestinationChange = (destination: string | null) => {
    setSelectedDestination(destination)
    setSelectedDate(null)
  }

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    let result = [...events]

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by destination (from header)
    if (selectedDestination) {
      result = result.filter(
        (p) => `${p.city}, ${p.country}` === selectedDestination
      )
    }

    // Filter by date (travel date matches 1-2 days before event)
    if (selectedDate) {
      result = result.filter((p) => {
        const travelDates = getTravelDates(p.start_date)
        return travelDates.includes(selectedDate)
      })
    }

    // Apply sidebar destination filter
    if (destinationFilter) {
      result = result.filter(
        (p) => `${p.city}, ${p.country}` === destinationFilter
      )
    }

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.start_date).getTime()
      const dateB = new Date(b.start_date).getTime()
      return sortByDateAsc ? dateA - dateB : dateB - dateA
    })

    return result
  }, [selectedCategory, selectedDestination, selectedDate, destinationFilter, sortByDateAsc, events])

  // Get unique destinations for sidebar filter
  const sidebarDestinations = useMemo(() => {
    const basePackages = selectedCategory
      ? events.filter((p) => p.category === selectedCategory)
      : events

    return [...new Set(basePackages.map((p) => `${p.city}, ${p.country}`))]
  }, [selectedCategory, events])

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory(null)
    setSelectedDestination(null)
    setSelectedDate(null)
    setDestinationFilter(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader
        categories={allCategories}
        destinations={availableDestinations}
        dates={availableDates}
        selectedCategory={selectedCategory}
        selectedDestination={selectedDestination}
        selectedDate={selectedDate}
        onCategoryChange={handleCategoryChange}
        onDestinationChange={handleDestinationChange}
        onDateChange={setSelectedDate}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <FilterSidebar
            destinations={sidebarDestinations}
            selectedDestinationFilter={destinationFilter}
            onDestinationFilterChange={setDestinationFilter}
            sortByDateAsc={sortByDateAsc}
            onSortToggle={() => setSortByDateAsc(!sortByDateAsc)}
            totalResults={filteredPackages.length}
          />

          {/* Package Listings */}
          <div className="flex-1">
            {filteredPackages.length > 0 ? (
              <div className="space-y-4">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <EmptyState onReset={handleResetFilters} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
