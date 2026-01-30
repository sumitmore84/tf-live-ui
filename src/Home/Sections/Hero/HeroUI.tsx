"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Note: Replace these placeholder image URLs with your actual image paths
const images = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
    title: 'Feel the Pulse of the Night',
    subtitle: 'From the front row to the final encore, secure your spot at the world’s most electrifying performances.'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1679865745026-24ca998bee72',
    title: 'Discover New Horizons',
    subtitle: 'Book your next Racing Tournament with exclusive event packages.'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1652513842544-ca66b676757a',
    title: 'Live in the Fast Lane',
    subtitle: 'Real speed. Real drama. Real-time access to every Grand Prix on the map.'
  }
]


const HeroUI = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100.1%' : '-100.1%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100.1%' : '-100.1%',
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  }

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length)
  }, [])

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      paginate(1)
    }, 5000)
    return () => clearInterval(timer)
  }, [paginate, isHovered])

  return (
    <div
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl group mt-4 md:mt-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top spacing buffer for fixed search bar/elements: pt-16 to pt-24 depending on mobile/desktop */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Image Container */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex].url})` }}
          >
            <div className="absolute inset-0 bg-black/20 md:bg-black/10 transition-colors duration-500" />
            {/* Soft gradient from bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16 md:pt-24">
            <div className="max-w-4xl mx-auto">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl"
              >
                {images[currentIndex].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-2xl text-white/90 mb-10 drop-shadow-md font-medium"
              >
                {images[currentIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <button className="group relative px-10 py-4 bg-[#F17235] text-white rounded-full font-bold text-lg hover:bg-[#d9622d] transition-all overflow-hidden shadow-[0_0_20px_rgba(241,114,53,0.4)]">
                  <span className="relative z-10">Start Your Journey</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Desktop only or better UX for touch */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-30 pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className="relative h-2 group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`h-full rounded-full transition-all duration-500 ease-out ${index === currentIndex ? 'w-10 bg-[#F17235]' : 'w-2 bg-white/40 group-hover:bg-white/70'
              }`} />
          </button>
        ))}
      </div>

      {/* Glassmorphism Badge (Optional Premium Feel) */}
      <div className="absolute bottom-10 right-10 hidden lg:block z-30">
        <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium animate-pulse">
          Live Event Tickets Available Now
        </div>
      </div>
    </div>
  )
}

export default HeroUI