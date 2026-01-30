"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from "@/context/AuthContext" // 1. Import the hook
import { AuthenticationModel } from "@/Home/components/AuthenticationModel"
import { Button } from "@/components/ui/button"

const Header = () => {
  const { user, isAuthenticated, signOut } = useAuth(); // 3. Consume Auth state

  const navLinks = [
    { name: 'Home', href: '/', active: true },
    { name: 'Explore Events', href: '/search' },
    { name: 'Trending', href: '/search' },
    { name: 'destinations', href: '/search' },
    { name: 'upcoming', href: '/search' },
    { name: 'My Bookings', href: '/my-bookings' },
  ]

  const [activeLink, setActiveLink] = useState('Home')
  const username = user?.email
    ? user.email.split("@")[0]
    : "User";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm md:px-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="relative w-12 h-12">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={48} 
            height={48} 
            className="w-12 h-12 object-contain rounded-full"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition-colors ${activeLink === link.name
              ? 'text-[#F17235]'
              : 'text-[#2D3142] hover:text-[#F17235]'
              }`}
            onClick={() => setActiveLink(link.name)}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-6">
        {/* <Link href="#" className="hidden sm:block text-sm font-medium text-[#2D3142] hover:text-[#F17235]">
          Help
        </Link> */}

        {isAuthenticated ? (
          // 4. Show User Profile / Logout if logged in
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium text-[#2D3142]  leading-none cursor-pointer">
              Hi, {user?.email?.split("@")[0]}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            >
              Logout
            </Button>
          </div>

        ) : (
          // 5. Show Sign Up and Login Modal if logged out
          <>
            <AuthenticationModel vt={"signup"} />
            <AuthenticationModel vt={"login"} />
          </>
        )}
      </div>
    </nav>
  )
}

export default Header