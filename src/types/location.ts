export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ParkingSpot {
  id: number;
  spot_number: string;
  status: string;
}

export interface LocationStatistics {
  location_id: number;
  total_spots: number;
  available_spots: number;
  occupied_spots: number;
}