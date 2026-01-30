"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Calendar, ChevronDown, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TravelPackage } from '@/Home/components'
import { useRouter } from 'next/navigation'
interface SearchBarProps {
  events: TravelPackage[];
}

const SearchBar = ({events}: SearchBarProps) => {
  const [category, setCategory] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [showError, setShowError] = useState(false)

  const router = useRouter()
  // Extract unique categories from events
  const categories = Array.from(new Set(events.map(event => event.category))).filter(Boolean);

  // Filter events by selected category
  const categoryEvents = category ? events.filter(event => event.category === category) : [];

  // Extract unique destinations for the selected category
  const destinations = Array.from(
    new Set(
      categoryEvents.map(event => `${event.city}, ${event.country}`)
    )
  );

  // Find matching events for selected destination
  const matchingEvents = destination 
    ? categoryEvents.filter(event => `${event.city}, ${event.country}` === destination)
    : [];

  // Calculate allowed dates (1 and 2 days before start_date)
  const allowedDates = matchingEvents.flatMap(event => {
    const startDate = new Date(event.start_date);
    const oneDayBefore = new Date(startDate);
    oneDayBefore.setDate(startDate.getDate() - 1);
    const twoDaysBefore = new Date(startDate);
    twoDaysBefore.setDate(startDate.getDate() - 2);
    
    return [
      twoDaysBefore.toISOString().split('T')[0],
      oneDayBefore.toISOString().split('T')[0]
    ];
  }).filter((date, index, self) => self.indexOf(date) === index).sort();

  const dropdownRef = useRef<HTMLDivElement>(null)

  // Reset dependent fields when category changes
  useEffect(() => {
    setDestination("")
    setDate("")
  }, [category])

  // Reset date when destination changes
  useEffect(() => {
    setDate("")
  }, [destination])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (!category) {
      setShowError(true)
      return
    }
    setShowError(false)
    console.log("Searching for:", { category, destination, date })
    // Implement actual search logic here
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (destination) params.set('destination', destination)
    if (date) params.set('date', date)
    
    router.push(`/search?${params.toString()}`)
  }

  const isSearchDisabled = !category

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-2 relative z-40">
      <div className="bg-white rounded-2xl md:rounded-full shadow-2xl p-2 md:p-3 border border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0">

          {/* Category Dropdown */}
          <div className="relative w-full md:w-1/3" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full flex items-center justify-between px-6 py-3 rounded-xl md:rounded-full hover:bg-gray-50 transition-colors text-left ${showError && !category ? 'border-2 border-red-500 md:border-none' : ''}`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Category</span>
                <span className={`text-sm font-semibold truncate ${category ? 'text-gray-900' : 'text-gray-400'}`}>
                  {category || "Select Category"}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 p-2"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat)
                        setIsOpen(false)
                        setShowError(false)
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#F17235]/10 hover:text-[#F17235] rounded-xl transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {showError && !category && (
              <div className="absolute -top-10 left-4 md:left-6 flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg">
                <AlertCircle size={12} />
                Please select a category
              </div>
            )}
          </div>

          <div className="hidden md:block w-[1px] h-10 bg-gray-100 mx-2" />

          {/* Destination Input */}
          <div className="w-full md:w-1/3">
            <div className="flex items-center px-6 py-3 rounded-xl md:rounded-full hover:bg-gray-50 transition-colors">
              <div className="flex flex-col w-full">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
                  Destination
                </span>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F17235]" />

                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    disabled={!category}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-semibold text-gray-900 outline-none cursor-pointer"
                  >
                    <option value="">
                      {category ? "Select destination" : "Select category first"}
                    </option>

                    {destinations.map((dest, index) => (
                      <option key={index} value={dest}>
                        {dest}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>


          <div className="hidden md:block w-[1px] h-10 bg-gray-100 mx-2" />

          {/* Date Dropdown */}
          <div className="w-full md:w-1/3">
            <div className="flex items-center px-6 py-3 rounded-xl md:rounded-full hover:bg-gray-50 transition-colors">
              <div className="flex flex-col w-full">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">
                  Date
                </span>

                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={!destination}
                  className="w-full bg-transparent border-none focus:ring-0 text-sm font-semibold text-gray-900 outline-none cursor-pointer"
                >
                  <option value="">
                    {destination ? "Select date" : "Select destination first"}
                  </option>

                  {allowedDates.map((d) => (
                    <option key={d} value={d}>
                      {new Date(d).toDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>


          {/* Search Button */}
          <div className="w-full md:w-auto p-1 md:p-0 ml-auto">
            <button
              onClick={handleSearch}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 md:py-5 rounded-xl md:rounded-full font-bold text-white transition-all shadow-lg shadow-[#F17235]/30 ${isSearchDisabled
                ? 'bg-gray-300 cursor-not-allowed grayscale'
                : 'button-primary'
                
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="md:hidden lg:block">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar