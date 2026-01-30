"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingForm } from "./BookingForm";

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  packageTitle: string;
  price: number;
  toCity: string;
  eventType: string;
}

export const BookingModal = ({ 
  isOpen, 
  onOpenChange, 
  packageTitle, 
  price,
  toCity,
  eventType
}: BookingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Complete your Booking
          </DialogTitle>
        </DialogHeader>
        
        <BookingForm 
          packageTitle={packageTitle} 
          price={price} 
          toCity={toCity}
          eventType={eventType}
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};