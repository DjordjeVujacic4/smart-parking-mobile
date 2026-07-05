export interface Vehicle {
  id: number;
  license_plate: string;
  make: string;
  model: string;
}

export interface CreateVehicleDto {
  license_plate: string;
  make: string;
  model: string;
}

export interface UpdateVehicleDto {
  license_plate: string;
  make: string;
  model: string;
}