import Image from "next/image"
import { ArrowRight, MapPin, Calendar } from "lucide-react"

interface TravelPackageCardProps {
    image: string
    tag: string
    icon?: string
    title: string
    location: string
    dateRange: string
    price: string
    duration: string
    href?: string
}

export default function TravelPackageCard({
    image,
    tag,
    icon,
    title,
    location,
    dateRange,
    price,
    duration,
    href = "#",
}: TravelPackageCardProps) {
    return (
        <a
            href={href}
            className="group relative flex h-[542px] flex-col overflow-hidden rounded-xl bg-card transition-all duration-300 hover:ring-2 hover:ring-primary/50"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="relative flex flex-1 flex-col gap-3 p-5">
                {/* Tag Row */}
                <div className="flex items-center justify-between">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                        {tag}
                    </span>
                    {icon && <span className="text-lg">{icon}</span>}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground text-balance">
                    {title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{location}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{dateRange}</span>
                </div>

                {/* Price & Duration */}
                <div className="mt-auto flex items-baseline gap-2 pt-2">
                    <span className="text-lg font-bold text-primary">{price}</span>
                    <span className="text-sm text-muted-foreground">
                        <span className="mx-1.5 text-border">•</span>
                        {duration}
                    </span>
                </div>

                {/* CTA Button */}
                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-sm font-medium text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground button-primary">
                    Explore Trips
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </a>
    )
}
