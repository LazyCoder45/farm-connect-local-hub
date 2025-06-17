
export interface Transport {
  id: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  vehicleType: string; // truck, pickup, van, etc.
  capacity: string; // e.g., "5 tons", "20 bags"
  pricePerKm: number;
  availableDate: Date;
  availableDistricts: string[];
  isAvailable: boolean;
  rating: number;
  completedTrips: number;
  createdAt: Date;
}
