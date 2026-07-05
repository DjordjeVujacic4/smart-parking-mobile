import {
    Location,
    LocationStatistics,
    ParkingSpot,
} from "../types/location";
import { api } from "./client";

export async function getLocations(): Promise<Location[]> {
  const response = await api.get<Location[]>("/locations");
  return response.data;
}

export async function getLocation(id: number): Promise<Location> {
  const response = await api.get<Location>(`/locations/${id}`);
  return response.data;
}

export async function getLocationSpots(id: number): Promise<ParkingSpot[]> {
  const response = await api.get<ParkingSpot[]>(`/locations/${id}/spots`);
  return response.data;
}

export async function getAvailableLocationSpots(id: number): Promise<ParkingSpot[]> {
  const response = await api.get<ParkingSpot[]>(`/locations/${id}/spots/available`);
  return response.data;
}

export async function getLocationStatistics(id: number): Promise<LocationStatistics> {
  const response = await api.get<LocationStatistics>(`/locations/${id}/statistics`);
  return response.data;
}