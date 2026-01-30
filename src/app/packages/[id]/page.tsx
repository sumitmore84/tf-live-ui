import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, CheckCircle } from "lucide-react";
import { getEvents } from "@/lib/data-service";
import { BookNowButton } from "@/Home/components/Booking/BookNowButton";
import { AuthenticatedItinerary } from "./AuthenticatedItinerary";
import { BackButton } from "./BackButton";
import { PriceDisplay } from "./PriceDisplay";
import {IMAGES} from "@/constants/Images";
interface PackagePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PackageDetailPage(props: PackagePageProps) {
    
    const events = await getEvents();
    const params = await props.params;

    const pkg = events.find((p) => p.id === params.id);

    if (!pkg) {
        return notFound();
    }
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section with Image */}
            <div className="relative h-[400px] w-full lg:h-[500px]">
                <img
                    src={pkg.image_url || IMAGES[pkg.category as keyof typeof IMAGES] || IMAGES.CONCERT}
                    alt={pkg.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />

                {/* Back Button */}
                <div className="absolute top-6 left-6">
                    <BackButton />
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 -mt-42 relative z-10">
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Package Detail */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl bg-card border border-border p-6 shadow-lg lg:p-8">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase">
                                    {pkg.category}
                                </span>
                                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground uppercase">
                                    {pkg.status}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{pkg.title}</h1>

                            <div className="flex flex-wrap gap-6 text-muted-foreground border-y border-border py-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span>{pkg.city}, {pkg.country}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <span>{pkg.start_date} - {pkg.end_date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span>{pkg.duration}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">About the Event</h2>
                                <p className="leading-relaxed text-muted-foreground">
                                    {pkg.description || "No description available for this event."}
                                </p>

                                <h3 className="text-lg font-semibold mt-6">What's Included?</h3>
                                <ul className="grid gap-2 sm:grid-cols-2">
                                    {["Official Tickets", "Hotel Accommodation", "Airport Transfers", "Breakfast Included"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-green-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-xl bg-card border border-border p-6 shadow-lg">
                            <PriceDisplay price={pkg.current_price || 0} />

                            <div className="space-y-3">
                                <BookNowButton
                                    packageTitle={pkg.title}
                                    price={pkg.current_price || 0}
                                    toCity={pkg.city}
                                    eventType={pkg.category}
                                />
                                <AuthenticatedItinerary toCity={pkg.city} eventType={pkg.category}/>
                            </div>  

                            <p className="mt-4 text-xs text-center text-muted-foreground">
                                *Prices are subject to availability.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}