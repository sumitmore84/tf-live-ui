"use client"

import { ItineraryDialog } from "@/app/itinerary/components/ItineraryDialog";
import { useAuth } from "@/context/AuthContext";

interface AuthenticatedItineraryProps {
  toCity: string;
  eventType: any;
}

export function AuthenticatedItinerary({ toCity, eventType }: AuthenticatedItineraryProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return <ItineraryDialog toCity={toCity} eventType={eventType} />;
}
