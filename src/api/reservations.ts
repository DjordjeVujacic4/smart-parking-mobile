import {
    CreateReservationDto,
    Reservation,
    ReservationListResponse,
} from "../types/reservation";
import { api } from "./client";

export async function getReservations(): Promise<ReservationListResponse> {
  const response = await api.get<ReservationListResponse>("/reservations");
  return response.data;
}

export async function getReservation(id: number): Promise<Reservation> {
  const response = await api.get<Reservation>(`/reservations/${id}`);
  return response.data;
}

export async function createReservation(
  data: CreateReservationDto
): Promise<Reservation> {
  const response = await api.post<Reservation>("/reservations", data);
  return response.data;
}

export async function cancelReservation(id: number): Promise<Reservation> {
  const response = await api.delete<Reservation>(`/reservations/${id}`);
  return response.data;
}