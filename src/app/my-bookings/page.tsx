import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin } from "lucide-react"

export default function MyBookingsPage() {
  const bookings: any[] = []; 

  return (
    <div className="container mx-auto px-6 py-10 md:px-16 min-h-[60vh]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2D3142]">My Bookings</h1>
        <Button variant="outline" asChild>
          <Link href="/search">Book New Trip</Link>
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-[#2D3142]">No bookings found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              You haven't booked any trips yet. Explore our events and packages to get started!
            </p>
            <Button className="mt-4 bg-[#F17235] hover:bg-[#e05d20]" asChild>
              <Link href="/search">Explore Events</Link>
            </Button>
          </div>
        </div>
      ) : (
        // List State (Ready for data integration)
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {/* TODO: Map through your bookings here later
             {bookings.map((booking) => (
                <Card key={booking.id}>...</Card>
             ))}
           */}
        </div>
      )}
    </div>
  )
}