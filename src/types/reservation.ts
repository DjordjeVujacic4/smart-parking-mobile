export interface Reservation {
  id: number;
  vehicle_id: number;
  spot_id: number;
  status: string;
  expires_at: string;
  created_at: string;
  vehicle: ReservationVehicle;
  parking_spot: ReservationParkingSpot;
}

export interface ReservationListResponse {
  items: Reservation[];
  total: number;
}

export interface CreateReservationDto {
  vehicle_id: number;
  spot_id: number;
}

export interface ReservationVehicle {
  id: number;
  make: string;
  model: string;
  license_plate: string;
}

export interface ReservationLocation {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ReservationParkingSpot {
  id: number;
  location_id: number;
  spot_number: string;
  status: string;
  location: ReservationLocation;
}