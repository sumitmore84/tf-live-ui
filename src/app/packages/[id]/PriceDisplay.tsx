"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PriceDisplayProps {
  price: number;
}

export function PriceDisplay({ price }: PriceDisplayProps) {
  if (price === 0) {
    return (
      <div className="mb-6">
        <Link href="/contact-us">
          <Button 
            className="w-full h-9 text-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            style={{ backgroundColor: '#F17235' }}
          >
            Contact for Price
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-1">Starting from</p>
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-3xl font-bold">₹{price?.toLocaleString("en-IN")}</span>
        <span className="text-sm text-muted-foreground">/ person</span>
      </div>
    </>
  );
}
