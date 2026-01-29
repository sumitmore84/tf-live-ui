"use client"

import { ArrowUpDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface FilterSidebarProps {
  destinations: string[]
  selectedDestinationFilter: string | null
  onDestinationFilterChange: (destination: string | null) => void
  sortByDateAsc: boolean
  onSortToggle: () => void
  totalResults: number
}

export function FilterSidebar({
  destinations,
  selectedDestinationFilter,
  onDestinationFilterChange,
  sortByDateAsc,
  onSortToggle,
  totalResults,
}: FilterSidebarProps) {
  return (
    <aside className="w-full shrink-0 space-y-6 lg:w-64">
      {/* Results Count */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          <span className="text-2xl font-bold text-foreground">{totalResults}</span> packages found
        </p>
      </div>

      {/* Sort Toggle */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="sort-toggle" className="text-sm font-medium text-foreground">
              Sort by Date
            </Label>
          </div>
          <Switch
            id="sort-toggle"
            checked={sortByDateAsc}
            onCheckedChange={onSortToggle}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {sortByDateAsc ? "Earliest first" : "Latest first"}
        </p>
      </div>

      {/* Destination Filter */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Filter by Destination</h3>
        </div>
        <div className="space-y-2">
          <Button
            variant={selectedDestinationFilter === null ? "secondary" : "ghost"}
            className="w-full justify-start rounded-lg text-left text-sm font-normal whitespace-normal"
            onClick={() => onDestinationFilterChange(null)}
          >
            All Destinations
          </Button>
          {destinations.map((destination) => (
            <Button
              key={destination}
              variant={selectedDestinationFilter === destination ? "secondary" : "ghost"}
              className="w-full justify-start rounded-lg text-left text-sm font-normal whitespace-normal"
              onClick={() => onDestinationFilterChange(destination)}
            >
              {destination}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  )
}
