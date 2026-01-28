export type EventType = "concert" | "racing" | "sports";
export type StatusType = "coming-soon" | "opening-soon" | "high-demand";

export interface TravelPackageLocation {
  city: string;
  country: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  eventType: EventType;
  status: StatusType;
  image: string;
  location: TravelPackageLocation;
  dateRange: string;
  startingPrice: number;
  duration: string;
  description?: string;
}