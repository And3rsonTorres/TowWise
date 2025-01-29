import { Vehicles, VehicleLookup } from "@/app/lib/Types";
/**
 * Processes a list of supported vehicles and returns a lookup object containing the make, model, and trim options.
 *
 * @param SupportedVehicles - An optional array of `Vehicles` objects representing the supported vehicles.
 * @returns A `VehicleLookup` object containing the following properties:
 *   - `makeMap`: A mapping of year to a set of makes.
 *   - `modelMap`: A mapping of year to a mapping of make to a set of models.
 *   - `trimOptionsMap`: A mapping of year to a mapping of make to a mapping of model to a set of trim options.
 */
export function processingVehicles(
  SupportedVehicles?: Vehicles[]
): VehicleLookup {
  if (!SupportedVehicles) {
    return { makeMap: {}, modelMap: {}, trimOptionsMap: {} };
  }

  const makeMap: Record<string, Set<string>> = {};
  const modelMap: Record<string, Record<string, Set<string>>> = {};
  const trimOptionsMap: Record<
    string,
    Record<string, Record<string, Set<string>>>
  > = {};

  SupportedVehicles.forEach((vehicle: Vehicles) => {
    if (!makeMap[vehicle.Year]) {
      makeMap[vehicle.Year] = new Set();
    }
    makeMap[vehicle.Year].add(vehicle.Make);

    if (!modelMap[vehicle.Year]) {
      modelMap[vehicle.Year] = {};
    }
    if (!modelMap[vehicle.Year][vehicle.Make]) {
      modelMap[vehicle.Year][vehicle.Make] = new Set();
    }
    modelMap[vehicle.Year][vehicle.Make].add(vehicle.Model);

    if (!trimOptionsMap[vehicle.Year]) {
      trimOptionsMap[vehicle.Year] = {};
    }
    if (!trimOptionsMap[vehicle.Year][vehicle.Make]) {
      trimOptionsMap[vehicle.Year][vehicle.Make] = {};
    }
    if (!trimOptionsMap[vehicle.Year][vehicle.Make][vehicle.Model]) {
      trimOptionsMap[vehicle.Year][vehicle.Make][vehicle.Model] = new Set();
    }
    if (vehicle.Trim) {
      vehicle.Trim.forEach((trim: { TrimName: string }) => {
        trimOptionsMap[vehicle.Year][vehicle.Make][vehicle.Model].add(
          trim.TrimName
        );
      });
    }
  });

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
 * Converts a promise of JSON data to an array of `Vehicles` objects.
 *
 * @param jsonPromise - A promise that resolves to an array of JSON objects.
 * @returns A promise that resolves to an array of `Vehicles` objects.
 */
async function JsonToTrim(jsonPromise: Promise<any[]>): Promise<Vehicles[]> {
  const json = await jsonPromise;
  return json.map((entry) => ({
    Year: entry.Year,
    Make: entry.Make,
    Model: entry.Model,
    Trim: entry.Trim.map((trim: any) => ({
      TrimName: trim.TrimName,
    })),
  }));
}
/**
 * Fetches the trim options for all supported vehicles.
 *
 * @returns A `VehicleLookup` object containing the make, model, and trim options for all supported vehicles.
 */
export const fetchTrims = async () => {
  const response = await fetch("/api/towing");
  const data = await response.json();
  return processingVehicles(await JsonToTrim(data));
};
/**
 * Fetches the vehicles that match the given vehicle parameters.
 *
 * @param vehicle - A `Vehicles` object representing the vehicle to fetch.
 * @returns A promise that resolves to an array of `Vehicles` objects matching the given vehicle parameters.
 */
export const fetchingVehicle = async (
  vehicle: Vehicles
): Promise<Vehicles[]> => {
  const query = new URLSearchParams({
    year: vehicle.Year.toString(),
    make: vehicle.Make,
    model: vehicle.Model,
    trimName: vehicle.Trim[0].TrimName,
  }).toString();
  const response = await fetch(`/api/towing?${query}`);
  const data = await response.json();
  return data;
};
