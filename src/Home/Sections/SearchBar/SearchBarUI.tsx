"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Calendar, ChevronDown, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateAllowedDates } from '@/Home/utils/SearchBarUtilities'
const categories = [
  {
    category: "Racing Tournaments",
    events: [
      {
        destination: {
          city: "Monza",
          country: "Italy"
        },
        startDate: "2026-09-05",
        endDate: "2026-09-07"
      },
      {
        destination: {
          city: "Silverstone",
          country: "UK"
        },
        startDate: "2026-07-10",
        endDate: "2026-07-12"
      }
    ]
  },
  {
    category: "Artist Concert",
    events: [
      {
        destination: {
          city: "Mumbai",
          country: "India"
        },
        startDate: "2026-03-18",
        endDate: "2026-03-18"
      },
      {
        destination: {
          city: "Los Angeles",
          country: "USA"
        },
        startDate: "2026-06-01",
        endDate: "2026-06-01"
      }
    ]
  },
  {
    category: "Sports (Cricket, Football)",
    events: [
      {
        destination: {
          city: "Melbourne",
          country: "Australia"
        },
        startDate: "2026-02-12",
        endDate: "2026-02-16"
      },
      {
        destination: {
          city: "Madrid",
          country: "Spain"
        },
        startDate: "2026-04-22",
        endDate: "2026-04-22"
      }
    ]
  },
  {
    category: "Stand Up – Local Shows",
    events: [
      {
        destination: {
          city: "Bengaluru",
          country: "India"
        },
        startDate: "2026-01-30",
        endDate: "2026-01-30"
      },
      {
        destination: {
          city: "Pune",
          country: "India"
        },
        startDate: "2026-02-14",
        endDate: "2026-02-14"
      }
    ]
  }
];


const SearchBar = () => {
  const [category, setCategory] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [showError, setShowError] = useState(false)

  const selectedCategoryObj = categories.find(
    (c) => c.category === category
  );

  const destinations =
    selectedCategoryObj?.events.map(
      (e) => `${e.destination.city}, ${e.destination.country}`
    ) || [];


  const matchingEvents =
    selectedCategoryObj?.events.filter(
      (e) =>
        `${e.destination.city}, ${e.destination.country}` === destination
    ) || [];

  const allowedDates = generateAllowedDates(matchingEvents);

  const dropdownRef = useRef<HTMLDivElement>(null)

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
                      key={cat.category}
                      onClick={() => {
                        setCategory(cat.category)
                        setIsOpen(false)
                        setShowError(false)
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#F17235]/10 hover:text-[#F17235] rounded-xl transition-colors"
                    >
                      {cat.category}
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