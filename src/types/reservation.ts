export interface Reservation {
  id: number;
  vehicle_id: number;
  spot_id: number;
  status: string;
  expires_at: string;
  created_at: string;
}

export interface ReservationListResponse {
  items: Reservation[];
  total: number;
}

export interface CreateReservationDto {
  vehicle_id: number;
  spot_id: number;
}