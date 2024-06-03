/**
 * Preprocesses vehicle data from a list of Vehicles into lookup maps for efficient searching.
 *
 * Returns an object with makeMap, modelMap, and trimOptionsMap for looking up makes, models and trim options by year.
 */

import { Vehicles, VehicleLookupData } from "@/app/lib/Types";

export function preprocessVehicleData(
  SupportedVehicles: Vehicles[]
): VehicleLookupData {
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
    makeMap[year] = new Set([...makeMap[year]].sort());
    for (const make in modelMap[year]) {
      modelMap[year][make] = new Set([...modelMap[year][make]].sort());
      for (const model in trimOptionsMap[year][make]) {
        trimOptionsMap[year][make][model] = new Set(
          [...trimOptionsMap[year][make][model]].sort()
        );
      }
    }
  }

  return { makeMap, modelMap, trimOptionsMap };
}
