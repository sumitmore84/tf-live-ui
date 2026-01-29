"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AuthenticationModel } from "@/Home/components/AuthenticationModel";
import { BookingModal } from "@/Home/components/Booking/BookingModal";

// 1. Accept package details as props
interface BookNowButtonProps {
  packageTitle: string;
  price: number;
}

export const BookNowButton = ({ packageTitle, price }: BookNowButtonProps) => {
  const { isAuthenticated } = useAuth();
  
  // 2. State for both modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookClick = () => {
    if (!isAuthenticated) {
      // If not logged in, trigger the login modal
      setShowAuthModal(true);
    } else {
      // If logged in, trigger the booking modal
      setShowBookingModal(true);
    }
  };

  return (
    <>
      <Button 
        onClick={handleBookClick} 
        className="w-full text-lg h-12 bg-[#353535] hover:bg-[#121212] cursor-pointer"
      >
        Book Now
      </Button>

      {/* Login Modal (Hidden Trigger) */}
      <AuthenticationModel
        vt="login" 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        hideTrigger={true}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onOpenChange={setShowBookingModal}
        packageTitle={packageTitle}
        price={price}
      />
    </>
  );
};