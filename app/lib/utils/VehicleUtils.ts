import { Vehicles, VehicleLookup } from "@/app/lib/Types";

/**
 * Processes a list of vehicles and returns a lookup object containing make, model, and trim hierarchies.
 *
 * @param SupportedVehicles - An array of `Vehicles` objects.
 * @returns A `VehicleLookup` object containing makeMap, modelMap, and trimOptionsMap.
 */
export function processingVehicles(
  SupportedVehicles?: Vehicles[]
): VehicleLookup {
  if (!SupportedVehicles || !Array.isArray(SupportedVehicles) || SupportedVehicles.length === 0) {
    return { makeMap: {}, modelMap: {}, trimOptionsMap: {} };
  }

  const makeMap: Record<string, Set<string>> = {};
  const modelMap: Record<string, Record<string, Set<string>>> = {};
  const trimOptionsMap: Record<
    string,
    Record<string, Record<string, Set<string>>>
  > = {};

  SupportedVehicles.forEach((vehicle: Vehicles) => {
    if (!vehicle || !vehicle.Year || !vehicle.Make || !vehicle.Model) return;

    const yearKey = vehicle.Year.toString();

    if (!makeMap[yearKey]) {
      makeMap[yearKey] = new Set();
    }
    makeMap[yearKey].add(vehicle.Make);

    if (!modelMap[yearKey]) {
      modelMap[yearKey] = {};
    }
    if (!modelMap[yearKey][vehicle.Make]) {
      modelMap[yearKey][vehicle.Make] = new Set();
    }
    modelMap[yearKey][vehicle.Make].add(vehicle.Model);

    if (!trimOptionsMap[yearKey]) {
      trimOptionsMap[yearKey] = {};
    }
    if (!trimOptionsMap[yearKey][vehicle.Make]) {
      trimOptionsMap[yearKey][vehicle.Make] = {};
    }
    if (!trimOptionsMap[yearKey][vehicle.Make][vehicle.Model]) {
      trimOptionsMap[yearKey][vehicle.Make][vehicle.Model] = new Set();
    }

    if (Array.isArray(vehicle.Trim)) {
      vehicle.Trim.forEach((trim) => {
        if (trim?.TrimName) {
          trimOptionsMap[yearKey][vehicle.Make][vehicle.Model].add(trim.TrimName);
        }
      });
    }
  });

  // Sort sets for consistent alphabetical dropdown presentation
  for (const year in makeMap) {
    makeMap[year] = new Set(Array.from(makeMap[year]).sort());
    for (const make in modelMap[year]) {
      modelMap[year][make] = new Set(Array.from(modelMap[year][make]).sort());
      for (const model in trimOptionsMap[year][make]) {
        trimOptionsMap[year][make][model] = new Set(
          Array.from(trimOptionsMap[year][make][model]).sort()
        );
      }
    }
  }

  return { makeMap, modelMap, trimOptionsMap };
}

/**
 * Fetches the trim options for all supported vehicles.
 * Returns a `VehicleLookup` object.
 */
export const fetchTrims = async (): Promise<VehicleLookup> => {
  try {
    const response = await fetch("/api/towing");
    if (!response.ok) {
      console.warn("Failed to fetch trims from /api/towing, status:", response.status);
      return processingVehicles([]);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      return processingVehicles([]);
    }
    return processingVehicles(data);
  } catch (error) {
    console.error("fetchTrims error:", error);
    return processingVehicles([]);
  }
};

/**
 * Fetches the vehicle that matches the given parameters.
 *
 * @param vehicle - A `Vehicles` object representing the vehicle to fetch.
 * @returns A promise resolving to an array of matching `Vehicles`.
 */
export const fetchingVehicle = async (
  vehicle: Vehicles
): Promise<Vehicles[]> => {
  try {
    const query = new URLSearchParams({
      year: vehicle.Year.toString(),
      make: vehicle.Make,
      model: vehicle.Model,
      trimName: vehicle.Trim?.[0]?.TrimName || "",
    }).toString();

    const response = await fetch(`/api/towing?${query}`);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("fetchingVehicle error:", error);
    return [];
  }
};
