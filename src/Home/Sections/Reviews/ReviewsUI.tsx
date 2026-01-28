"use client"

import { useRef, useEffect, useState } from "react"
import { Star, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface Review {
  id: number
  rating: number
  text: string
  userName: string
  userLocation: string
  avatarUrl?: string
  isVerified: boolean
}

const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    text: "The Formula 1 Monaco Grand Prix experience was absolutely incredible! The VIP passes gave us access to areas we never dreamed of. Best trip of my life!",
    userName: "Marcus Chen",
    userLocation: "San Francisco, USA",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    isVerified: true,
  },
  {
    id: 2,
    rating: 5,
    text: "Booked Taylor Swift tickets through this platform and the entire process was seamless. Great seats, easy check-in, and amazing customer support!",
    userName: "Sophie Williams",
    userLocation: "London, UK",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    isVerified: true,
  },
  {
    id: 3,
    rating: 4,
    text: "Attended the Champions League final in Istanbul. The travel package included everything - flights, hotel, and match tickets. Highly recommend!",
    userName: "Alessandro Rossi",
    userLocation: "Milan, Italy",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    isVerified: true,
  },
  {
    id: 4,
    rating: 5,
    text: "The Coachella festival package exceeded all expectations. Glamping accommodation was luxurious and the shuttle service was perfectly timed.",
    userName: "Emma Rodriguez",
    userLocation: "Toronto, Canada",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    isVerified: false,
  },
  {
    id: 5,
    rating: 5,
    text: "Wimbledon Centre Court tickets seemed impossible to get until I found this site. Watched an epic semifinal match - absolutely worth every penny!",
    userName: "James Thompson",
    userLocation: "Sydney, Australia",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    isVerified: true,
  },
  {
    id: 6,
    rating: 4,
    text: "Super Bowl experience in Las Vegas was unforgettable! The team helped with last-minute hotel changes and made everything stress-free.",
    userName: "Michael Davis",
    userLocation: "Chicago, USA",
    avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
    isVerified: true,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  )
}

function UserAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const [imgError, setImgError] = useState(false)
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  if (!avatarUrl || imgError) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={avatarUrl || "/placeholder.svg"}
      alt={name}
      className="h-12 w-12 rounded-full object-cover"
      onError={() => setImgError(true)}
    />
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        "flex-shrink-0 w-[320px] md:w-[360px] snap-start rounded-xl bg-card p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <StarRating rating={review.rating} />
          {review.isVerified && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          )}
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-foreground/80">
          {'"'}{review.text}{'"'}
        </p>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <UserAvatar name={review.userName} avatarUrl={review.avatarUrl} />
          <div>
            <p className="font-semibold text-sm text-foreground">
              {review.userName}
            </p>
            <p className="text-xs text-muted-foreground">{review.userLocation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    const scrollSpeed = 0.5

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed

        // Reset to start when reaching the end
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollContainer.scrollLeft = 0
        }
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
            What Our Travelers Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real experiences from fans who booked unforgettable events with us
          </p>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {mockReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
