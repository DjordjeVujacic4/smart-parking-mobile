import { CreateVehicleDto, UpdateVehicleDto, Vehicle } from "../types/vehicle";
import { api } from "./client";

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await api.get<Vehicle[]>("/vehicles");
  return response.data;
}

export async function getVehicle(id: number): Promise<Vehicle> {
  const response = await api.get<Vehicle>(`/vehicles/${id}`);
  return response.data;
}

export async function createVehicle(data: CreateVehicleDto): Promise<Vehicle> {
  const response = await api.post<Vehicle>("/vehicles", data);
  return response.data;
}

export async function updateVehicle(
  id: number,
  data: UpdateVehicleDto
): Promise<Vehicle> {
  const response = await api.patch<Vehicle>(`/vehicles/${id}`, data);
  return response.data;
}

export async function deleteVehicle(id: number): Promise<void> {
  await api.delete(`/vehicles/${id}`);
}