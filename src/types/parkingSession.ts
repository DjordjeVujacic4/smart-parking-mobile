export interface ParkingSession {
  id: number;
  reservation_id: number;
  vehicle_id: number;
  spot_id: number;
  status: string;
  check_in_at: string;
  check_out_at: string | null;
}