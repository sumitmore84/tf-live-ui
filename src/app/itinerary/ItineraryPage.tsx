"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, CalendarDays, Wallet, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

async function fetchItinerary(params: any) {
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_NAME
  try {
    const value = typeof params.value === 'string' ? JSON.parse(params.value) : params.value;
    const response = await fetch(`${BASE_URL}/api/ai/itinerary/json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromCity: value.fromCity,
        toCity: value.toCity,
        days: Number(value.days),
        travelers: Number(value.travelers),
        eventType: value.eventType,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch itinerary");
    return response.json();
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    throw error;
  }
}

interface ItineraryPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ItineraryPage({ searchParams }: ItineraryPageProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchItinerary(searchParams)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl py-10 px-4 text-center">
        <p className="text-lg">Loading your itinerary...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto max-w-4xl py-10 px-4 text-center">
        <p className="text-lg text-red-600">Error: {error || "Failed to load itinerary"}</p>
      </div>
    );
  }
  const total = data.days.reduce((sum: number, day: any) => sum + day.dayTotal, 0);
    return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Your Custom Trip</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 text-1xl"><MapPin className="h-4 w-4" /> {data.summary.destination}</div>
          <div className="flex items-center gap-1 text-1xl"><CalendarDays className="h-4 w-4" /> {data.summary.totalDays} Days</div>
          <div className="flex items-center gap-1 text-1xl"><Users className="h-4 w-4" /> {data.summary.travelers} Travelers</div>
          <Badge variant="secondary" className="text-primary text-2xl">
            Total Est: ₹{total.toLocaleString()}
          </Badge>
        </div>
      </header>

      <div className="space-y-12">
        {data.days.map((day: any) => (
          <section key={day.day} className="relative pl-8 border-l-2 border-primary/20">
            <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-primary border-4 border-background" />
            <h2 className="text-2xl font-bold mb-6">Day {day.day}</h2>
            
            <div className="grid gap-4">
              {day.activities.map((activity: any, idx: number) => (
                <Card key={idx} className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">{activity.title}</h4>
                      <Badge variant="outline" className="capitalize text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {activity.cost > 0 ? `₹${activity.cost.toLocaleString()}` : "Free"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4 text-right font-semibold text-muted-foreground">
              Day {day.day} Total: ₹{day.dayTotal.toLocaleString()}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}