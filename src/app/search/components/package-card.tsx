"use client"

import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PriceDisplay } from "@/app/packages/[id]/PriceDisplay"

interface Package {
  id: string
  title: string
  category: string
  city: string
  country: string
  start_date: string
  image_url?: string | null
  current_price?: number
}

interface PackageCardProps {
  pkg: Package
}

const categoryColors: Record<string, string> = {
  Sports: "bg-emerald-100 text-emerald-700",
  Music: "bg-pink-100 text-pink-700",
  Racing: "bg-orange-100 text-orange-700",
  Festival: "bg-blue-100 text-blue-700",
  Culture: "bg-amber-100 text-amber-700",
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getTravelDateRange(startDate: string): string {
  const eventDate = new Date(startDate)
  const travelStart = new Date(eventDate)
  travelStart.setDate(eventDate.getDate() - 2)
  const travelEnd = new Date(eventDate)
  travelEnd.setDate(eventDate.getDate() + 1)

  const formatShort = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return `${formatShort(travelStart)} - ${formatShort(travelEnd)}, ${eventDate.getFullYear()}`
}

export function PackageCard({ pkg }: PackageCardProps) {
  console.log("Price", pkg.id);
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row">
      {/* Image */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-64 md:w-72">
        <Image
          src={pkg.image_url || "/placeholder.svg"}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge
          className={`absolute left-3 top-3 rounded-lg border-0 px-2.5 py-1 text-xs font-medium ${
            categoryColors[pkg.category] || "bg-secondary text-secondary-foreground"
          }`}
        >
          {pkg.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {pkg.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>
                {pkg.city}, {pkg.country}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{getTravelDateRange(pkg.start_date)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full sm:w-auto pt-4">
            <PriceDisplay price={pkg.current_price || 0} />
          </div>
          <Link href={`/packages/${pkg.id}`}>
            <Button className="w-full rounded-xl px-6 py-2.5 font-medium sm:w-auto">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
