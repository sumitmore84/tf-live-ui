"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/Home/login/LoginForm"; // Import the Supabase-integrated form

export const LoginModal = () => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  // Automatically close the modal when the user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Using your custom orange button style from the Header */}
        <button className="px-6 py-2 bg-[#F17235] text-white rounded-full text-sm font-medium hover:bg-[#d9622d] transition-colors">
          Log in
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome back
          </DialogTitle>
        </DialogHeader>
        
        {/* We now render the LoginForm here. 
            It handles the email/password fields, validation, 
            and the Supabase call.
        */}
        <LoginForm />
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? <span className="text-[#F17235] cursor-pointer hover:underline">Sign up</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};