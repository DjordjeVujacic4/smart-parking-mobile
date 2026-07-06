import { ParkingSession } from "../types/parkingSession";
import { api } from "./client";

export async function checkIn(reservationId: number): Promise<ParkingSession> {
  const response = await api.post<ParkingSession>("/checkin", {
    reservation_id: reservationId,
  });

  return response.data;
}

export async function checkOut(
  parkingSessionId: number
): Promise<ParkingSession> {
  const response = await api.post<ParkingSession>("/checkout", {
    parking_session_id: parkingSessionId,
  });

  return response.data;
}