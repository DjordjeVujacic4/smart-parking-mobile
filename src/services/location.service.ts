import {
    getAvailableLocationSpots,
    getLocation,
    getLocations,
    getLocationSpots,
    getLocationStatistics,
} from "../api/locations";

export async function fetchLocations() {
  return await getLocations();
}

export async function fetchLocation(id: number) {
  return await getLocation(id);
}

export async function fetchLocationSpots(id: number) {
  return await getLocationSpots(id);
}

export async function fetchAvailableLocationSpots(id: number) {
  return await getAvailableLocationSpots(id);
}

export async function fetchLocationStatistics(id: number) {
  return await getLocationStatistics(id);
}