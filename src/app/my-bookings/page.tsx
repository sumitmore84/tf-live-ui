'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users, DollarSign, Loader2 } from "lucide-react"
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

interface Booking {
  id: string
  created_at: string
  user_id: string
  event_id: string
  event_title: string
  from_city: string
  to_city: string
  travelers: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_id: string | null
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  console.log("my bookings ",bookings);
  useEffect(() => {
    fetchBookings()
  }, [user])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!user) {
        setBookings([])
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('travel_requests')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setBookings(data || [])
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError('Failed to load bookings. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10 md:px-16 min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#F17235]" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-10 md:px-16 min-h-[60vh]">
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-[#2D3142]">Please log in</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              You need to be logged in to view your bookings.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10 md:px-16 min-h-[60vh]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2D3142]">My Bookings</h1>
        <Button variant="outline" asChild>
          <Link href="/search">Book New Trip</Link>
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-[#2D3142] line-clamp-2">
                    {booking.event_title}
                  </CardTitle>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-[#F17235]" />
                  <span>{booking.from_city} → {booking.to_city}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarDays className="h-4 w-4 mr-2 text-[#F17235]" />
                  <span>Booked on {formatDate(booking.created_at)}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-[#F17235]" />
                  <span>{booking.travelers} {booking.travelers === 1 ? 'Traveler' : 'Travelers'}</span>
                </div>
                
                {booking.total_price && booking.total_price > 0 ? (
                  <div className="flex items-center text-sm font-semibold text-[#2D3142] pt-2 border-t">
                    <DollarSign className="h-4 w-4 mr-1 text-[#F17235]" />
                    <span>${booking.total_price}</span>
                  </div>
                ) : (
                  <div className="pt-2 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full text-[#F17235] border-[#F17235] hover:bg-[#F17235] hover:text-white" 
                      asChild
                    >
                      <Link href="/contact-us">Contact for Price</Link>
                    </Button>
                  </div>
                )}

                <Button 
                  className="w-full mt-4 bg-[#F17235] hover:bg-[#e05d20]" 
                  asChild
                >
                  <Link href={`/packages/${booking.event_id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}