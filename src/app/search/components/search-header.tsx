"use client"

import { ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SearchHeaderProps {
  categories: string[]
  destinations: string[]
  dates: string[]
  selectedCategory: string | null
  selectedDestination: string | null
  selectedDate: string | null
  onCategoryChange: (category: string | null) => void
  onDestinationChange: (destination: string | null) => void
  onDateChange: (date: string | null) => void
}

export function SearchHeader({
  categories,
  destinations,
  dates,
  selectedCategory,
  selectedDestination,
  selectedDate,
  onCategoryChange,
  onDestinationChange,
  onDateChange,
}: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Search className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">TravelEvents</span>
          </div>

          {/* Search Filters */}
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:justify-center lg:gap-2">
            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between gap-2 rounded-xl border-border bg-card px-4 py-2.5 text-left font-normal sm:w-48"
                >
                  <span className={selectedCategory ? "text-foreground" : "text-muted-foreground"}>
                    {selectedCategory || "Category"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-xl">
                <DropdownMenuItem
                  onClick={() => onCategoryChange(null)}
                  className="rounded-lg"
                >
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className="rounded-lg"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Destination Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between gap-2 rounded-xl border-border bg-card px-4 py-2.5 text-left font-normal sm:w-48 whitespace-normal"
                  disabled={!selectedCategory && destinations.length === 0}
                >
                  <span className={selectedDestination ? "text-foreground " : "text-muted-foreground"}>
                    {selectedDestination || "Destination"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-xl">
                <DropdownMenuItem
                  onClick={() => onDestinationChange(null)}
                  className="rounded-lg"
                >
                  All Destinations
                </DropdownMenuItem>
                {destinations.map((destination) => (
                  <DropdownMenuItem
                    key={destination}
                    onClick={() => onDestinationChange(destination)}
                    className="rounded-lg"
                  >
                    {destination}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Date Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between gap-2 rounded-xl border-border bg-card px-4 py-2.5 text-left font-normal sm:w-48"
                  disabled={!selectedDestination && dates.length === 0}
                >
                  <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
                    {selectedDate || "Travel Date"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-xl">
                <DropdownMenuItem
                  onClick={() => onDateChange(null)}
                  className="rounded-lg"
                >
                  All Dates
                </DropdownMenuItem>
                {dates.map((date) => (
                  <DropdownMenuItem
                    key={date}
                    onClick={() => onDateChange(date)}
                    className="rounded-lg"
                  >
                    {date}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Button */}
          <Button className="rounded-xl px-6 py-2.5 font-medium">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </header>
  )
}
