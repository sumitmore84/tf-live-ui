"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AuthenticatioModel } from "@/Home/components/AuthenticationModel";

export const BookNowButton = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleBookClick = () => {
    if (!isAuthenticated) {
      // User is not logged in, show the login modal
      setShowLogin(true);
    } else {
      // User IS logged in, proceed to booking logic
      console.log("User is authenticated. Proceeding to booking page...");
      // router.push('/booking/...'); 
    }
  };

  return (
    <>
      <Button onClick={handleBookClick} className="w-full text-lg h-12 bg-[#353535] hover:bg-[#131313] cursor-pointer">
        Book Now
      </Button>
      <AuthenticatioModel 
        vt="login" 
        open={showLogin} 
        onOpenChange={setShowLogin}
        hideTrigger={true}
      />
    </>
  );
};