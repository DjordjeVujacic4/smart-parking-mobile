import {
    cancelReservation,
    createReservation,
    getReservation,
    getReservations,
} from "../api/reservations";
import { CreateReservationDto } from "../types/reservation";

export async function fetchReservations() {
  return await getReservations();
}

export async function fetchReservation(id: number) {
  return await getReservation(id);
}

export async function addReservation(data: CreateReservationDto) {
  return await createReservation(data);
}

export async function removeReservation(id: number) {
  return await cancelReservation(id);
}