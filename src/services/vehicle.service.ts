import {
    createVehicle,
    deleteVehicle,
    getVehicle,
    getVehicles,
    updateVehicle,
} from "../api/vehicles";

import {
    CreateVehicleDto,
    UpdateVehicleDto,
} from "../types/vehicle";

export async function fetchVehicles() {
  return await getVehicles();
}

export async function fetchVehicle(id: number) {
  return await getVehicle(id);
}

export async function addVehicle(data: CreateVehicleDto) {
  return await createVehicle(data);
}

export async function editVehicle(
  id: number,
  data: UpdateVehicleDto
) {
  return await updateVehicle(id, data);
}

export async function removeVehicle(id: number) {
  return await deleteVehicle(id);
}