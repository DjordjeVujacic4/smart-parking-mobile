import * as parkingApi from "../api/parkingSession";

export async function createCheckIn(reservationId: number) {
  return parkingApi.checkIn(reservationId);
}

export async function createCheckOut(sessionId: number) {
  return parkingApi.checkOut(sessionId);
}