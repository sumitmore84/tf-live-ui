"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Clock, MapPin, Ticket, ArrowRight } from "lucide-react"
import { TravelPackage, EventType, StatusType } from "@/types/travelPackageType"
import { IMAGES } from "@/constants/Images"

const eventTypeIcons: Record<string, string> = {
    CONCERT: "🎤",
    RACING: "🏎️",
    SPORTS: "🏏",
    THEATRE: "🎭",
}


interface TravelPackageCardProps {
    package: TravelPackage
}

export default function UpcomingTravelCard({ package: pkg }: TravelPackageCardProps) {
    const [imageError, setImageError] = useState(false);
    const Icon = pkg.ctaTitle === "Book Now" ? Ticket : Bell;
    
    // Calculate date range from start_date and end_date
    const dateRange = `${new Date(pkg.start_date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    })} - ${new Date(pkg.end_date).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    })}`;

    // Get fallback image based on category
    const fallbackImage = IMAGES[pkg.category as keyof typeof IMAGES] || IMAGES.CONCERT;
    const imageSrc = (imageError || !pkg.image_url) ? fallbackImage : pkg.image_url;

    return (
        <article className="group relative flex h-[442px] w-[300px] shrink-0 flex-col overflow-hidden rounded-xl bg-card transition-transform duration-300 hover:scale-[1.02]">
            {/* Image Container */}
            <div className="relative h-[200px] overflow-hidden">
                
                <Image
                    src={imageSrc}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => setImageError(true)}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

                {/* Status Tag */}
                {/* {pkg.status && (
                    <span
                        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[pkg.status]}`}
                    >
                        {statusLabels[pkg.status]}
                    </span>
                )} */}

                {/* Event Type Icon */}
                <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-lg backdrop-blur-sm">
                    {eventTypeIcons[pkg.category] || "🎫"}
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
                        {pkg.city}, {pkg.country}
                    </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{dateRange}</span>
                </div>

                {/* Price and Duration */}
                <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                    <div>
                        {pkg.current_price ? (
                            <>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    From
                                </p>
                                <p className="text-lg font-bold text-primary">
                                    ₹{pkg.current_price.toLocaleString("en-IN")}*
                                </p>
                            </>
                        ) : (
                            <Link href="/contact-us">
                                <p className="text-sm font-semibold cursor-pointer transition-colors duration-200" 
                                   style={{ color: '#F17235' }}>
                                    Contact for price →
                                </p>
                            </Link>
                        )}
                    </div>
                    {pkg.duration && (
                        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                            <span className="text-sm font-medium text-foreground">{pkg.duration}</span>
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <Link href={`/packages/${pkg.id}`} className="mt-2 w-full">
                    <Button
                        variant="outline"
                        className="w-full gap-2 border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground bg-transparent"
                    >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span>{pkg.ctaTitle || "Notify Me"}</span>
                    </Button>
                </Link>
            </div>
        </article>
    )
}