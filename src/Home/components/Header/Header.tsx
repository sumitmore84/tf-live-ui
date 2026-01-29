"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from "@/context/AuthContext" // 1. Import the hook
import { AuthenticationModel } from "@/Home/components/AuthenticationModel"
import { Button } from "@/components/ui/button"

const Header = () => {
  const { user, isAuthenticated, signOut } = useAuth(); // 3. Consume Auth state

  const navLinks = [
    { name: 'Home', href: '/', active: true },
    { name: 'Explore Events', href: '#' },
    { name: 'Trending', href: '#' },
    { name: 'destinations', href: '#' },
    { name: 'upcoming', href: '#' },
  ]

  const [activeLink, setActiveLink] = useState('Home')
  const username = user?.email
    ? user.email.split("@")[0]
    : "User";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm md:px-16">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="relative w-8 h-8">
          <svg viewBox="0 0 100 100" className="w-full h-full text-orange-600 fill-current">
            <path d="M50 20c-8.28 0-15 6.72-15 15s6.72 15 15 15 15-6.72 15-15-6.72-15-15-15zm0 35c-15 0-35 15-35 25v5h70v-5c0-10-20-25-35-25z" className="opacity-20" />
            <circle cx="50" cy="30" r="10" />
            <path d="M50 45c-15 0-25 10-25 25 0 10 10 15 25 15s25-5 25-15c0-15-10-25-25-25z" />
          </svg>
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