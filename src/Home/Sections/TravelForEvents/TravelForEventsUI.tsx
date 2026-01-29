// Home/Sections/TravelForEvents/index.tsx
import { UpcomingTravelCard } from "@/Home/components/";
import { TravelPackage } from "@/types/travelPackageType";

interface TravelForEventsProps {
  events: TravelPackage[];
}

export default function TravelForEvents({ events }: TravelForEventsProps) {
  // 1. Filter: Only show high-intent travel categories 
  // 2. Map: Convert Supabase fields to UI-friendly fields
  const displayPackages = events
    .filter((event) => ["RACING", "SPORTS", "CONCERT"].includes(event.category))
    .map((event) => {
      // Calculate date range string (e.g., "Apr 10 – Apr 12")
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      const dateRange = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

      return {
        ...event,
        // Map DB fields to UI Component names
        image: event.image_url || "/placeholder.svg", // Fallback for null images
        eventType: event.category.toLowerCase(), // "RACING" -> "racing"
        location: {
          city: event.city,
          country: event.country,
        },
        dateRange: dateRange,
        startingPrice: event.current_price || 0,
        duration: event.duration || "4D / 3N", // Default fallback
        status: event.status || "coming-soon", // Logic could be added to set based on dates
        ctaTitle: event.current_price && event.current_price > 0 ? "Book Now" : "Notify Me",
      };
    });

  if (displayPackages.length === 0) return null;

  return (
    <section className="min-h-[60vh] bg-background px-4 mx-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Travel For Events
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Exclusive travel packages for the world's most anticipated events.
          </p>
        </div>

        {/* Horizontal Scroll Grid */}
        <div className="flex gap-6 overflow-x-auto py-8 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory">
          {displayPackages.map((pkg) => (
            <div key={pkg.id} className="snap-start">
              {/* Ensure the card gets the transformed pkg object */}
              <UpcomingTravelCard package={pkg as any} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}