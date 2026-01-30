"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
 type EventType = "CONCERT" | "RACING" | "SPORTS";
interface ItineraryDialogProps {
  toCity: string;
  eventType: EventType;
}

export function ItineraryDialog({ toCity, eventType }: ItineraryDialogProps) {
  const router = useRouter();
  const [fromCity, setFromCity] = useState("");
  const [days, setDays] = useState("3");
  const [travelers, setTravelers] = useState("2");

  const handleGenerate = () => {
    const params = new URLSearchParams({
      fromCity,
      toCity,
      days,
      travelers,
      eventType,
    });
    router.push(`/itinerary?${params.toString()}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full cursor-pointer">
          Show Itinerary & Price Estimation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Your Journey</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Destination City</Label>
            <Input value={toCity} disabled className="bg-muted" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fromCity">Leaving From</Label>
            <Input
              id="fromCity"
              placeholder="e.g. Delhi"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="days">Total Days</Label>
            <Input
              id="days"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="travelers">Travelers</Label>
            <Input
              id="travelers"
              type="number"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Event Type</Label>
            <Select disabled={true} defaultValue={eventType}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RACING">Racing</SelectItem>
                <SelectItem value="THEATRE">Theatre</SelectItem>
                <SelectItem value="SPORTS">Sports</SelectItem>
                <SelectItem value="CONCERT">Concert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleGenerate} className="w-full">
          Generate Plan
        </Button>
      </DialogContent>
    </Dialog>
  );
}