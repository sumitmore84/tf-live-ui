"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Clock, MapPin } from "lucide-react"
import { TravelPackage, EventType, StatusType } from "@/types/travelPackageType"

const eventTypeIcons: Record<EventType, string> = {
    concert: "🎤",
    racing: "🏎️",
    sports: "🏏",
}

const statusLabels: Record<StatusType, string> = {
    "coming-soon": "Coming Soon",
    "opening-soon": "Opening Soon",
    "high-demand": "High Demand",
}

const statusStyles: Record<StatusType, string> = {
    "coming-soon": "bg-secondary text-secondary-foreground",
    "opening-soon": "bg-primary text-primary-foreground",
    "high-demand": "bg-destructive text-destructive-foreground",
}

interface TravelPackageCardProps {
    package: TravelPackage
}

export default function UpcomingTravelCard({ package: pkg }: TravelPackageCardProps) {
    return (
        <article className="group relative flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl bg-card transition-transform duration-300 hover:scale-[1.02]">
            {/* Image Container */}
            <div className="relative h-[200px] overflow-hidden">
                <img
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

                {/* Status Tag */}
                <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[pkg.status]}`}
                >
                    {statusLabels[pkg.status]}
                </span>

                {/* Event Type Icon */}
                <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-lg backdrop-blur-sm">
                    {eventTypeIcons[pkg.eventType]}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-4">
                {/* Title */}
                <h3 className="line-clamp-2 text-lg font-bold leading-tight text-foreground">
                    {pkg.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>
                        {pkg.location.city}, {pkg.location.country}
                    </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{pkg.dateRange}</span>
                </div>

                {/* Price and Duration */}
                <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            From
                        </p>
                        <p className="text-lg font-bold text-primary">
                            ₹{pkg.startingPrice.toLocaleString("en-IN")}*
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                        <span className="text-sm font-medium text-foreground">{pkg.duration}</span>
                    </div>
                </div>

                {/* CTA Button */}
                <Link href={`/packages/${pkg.id}`} className="mt-2 w-full">
                    <Button
                        variant="outline"
                        className="w-full gap-2 border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground bg-transparent"
                    >
                        <Bell className="h-4 w-4" aria-hidden="true" />
                        <span>Notify Me</span>
                    </Button>
                </Link>
            </div>
        </article>
    )
}