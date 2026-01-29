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
}

export const BookingModal = ({ 
  isOpen, 
  onOpenChange, 
  packageTitle, 
  price 
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
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};