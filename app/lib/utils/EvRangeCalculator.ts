/**
 * EV Towing Range Degradation Calculator
 * Calculates estimated range reduction for electric vehicles (Rivian, Cybertruck, F-150 Lightning, Model X/Y)
 * factoring in aerodynamic drag, gross trailer weight, and highway speeds.
 */

export interface EvRangeResult {
  isEv: boolean;
  baseRangeMiles: number;
  towingRangeMiles: number;
  rangeDropPercent: number;
  consumptionWhPerMile: number;
  chargingStopsRecommended: string;
  speedImpact: {
    at55mph: number;
    at65mph: number;
    at75mph: number;
  };
  advice: string;
}

const EV_MODELS: Record<string, { baseRange: number; baseEfficiency: number }> = {
  "r1t": { baseRange: 328, baseEfficiency: 480 },
  "r1s": { baseRange: 321, baseEfficiency: 490 },
  "cybertruck": { baseRange: 318, baseEfficiency: 470 },
  "f-150 lightning": { baseRange: 320, baseEfficiency: 510 },
  "silverado ev": { baseRange: 440, baseEfficiency: 520 },
  "model x": { baseRange: 335, baseEfficiency: 360 },
  "model y": { baseRange: 310, baseEfficiency: 300 },
};

/**
 * Checks whether vehicle is an EV based on Model or Engine description
 */
export function isElectricVehicle(model: string, engine?: string, notes?: string): boolean {
  const combined = `${model} ${engine || ""} ${notes || ""}`.toLowerCase();
  return (
    combined.includes("electric") ||
    combined.includes("bev") ||
    combined.includes("dual motor") ||
    combined.includes("tri-motor") ||
    combined.includes("kwh") ||
    combined.includes("cybertruck") ||
    combined.includes("lightning") ||
    combined.includes("r1t") ||
    combined.includes("r1s") ||
    combined.includes("e-tron")
  );
}

/**
 * Calculates EV towing range degradation based on trailer weight and highway speed
 */
export function calculateEvTowingRange(
  vehicleModel: string,
  trailerWeight: number,
  cruisingSpeedMph: number = 65,
  engineDesc?: string
): EvRangeResult {
  const m = vehicleModel.toLowerCase();
  const isEv = isElectricVehicle(vehicleModel, engineDesc);

  // Match model baseline or default to standard EV pickup spec
  let baseRange = 310;
  for (const [key, spec] of Object.entries(EV_MODELS)) {
    if (m.includes(key)) {
      baseRange = spec.baseRange;
      break;
    }
  }

  // Aero drag + weight penalty model (trailers double drag area CdA)
  // Weight penalty: ~0.8% per 1,000 lbs
  const weightPenalty = (trailerWeight / 1000) * 0.008;

  // Base aerodynamic penalty for towing a box/camper/boat
  const aeroPenalty = 0.42;

  // Speed factor: 65 mph baseline, +/- 1.2% per mph difference from 65
  const speedDelta = cruisingSpeedMph - 65;
  const speedPenalty = speedDelta * 0.012;

  const totalDrop = Math.min(0.68, Math.max(0.35, aeroPenalty + weightPenalty + speedPenalty));
  const towingRange = Math.round(baseRange * (1 - totalDrop));
  const dropPercent = Math.round(totalDrop * 100);

  // Estimated Wh/mi
  const consumption = Math.round(480 * (1 + totalDrop));

  // Range at different cruising speeds
  const range55 = Math.round(baseRange * (1 - (aeroPenalty + weightPenalty - 0.12)));
  const range65 = Math.round(baseRange * (1 - (aeroPenalty + weightPenalty)));
  const range75 = Math.round(baseRange * (1 - (aeroPenalty + weightPenalty + 0.12)));

  let advice = "Expect approximately 45%–55% range reduction when towing on the highway due to aerodynamic drag.";
  if (cruisingSpeedMph >= 70) {
    advice = "High cruising speed (70+ mph) significantly accelerates battery drain. Slowing down to 60–65 mph can reclaim 20–30 miles of range.";
  }

  const stops =
    towingRange <= 130
      ? "Plan charging stops every 90–110 miles (Leave 15–20% safety buffer)."
      : "Plan charging stops every 120–140 miles.";

  return {
    isEv,
    baseRangeMiles: baseRange,
    towingRangeMiles: towingRange,
    rangeDropPercent: dropPercent,
    consumptionWhPerMile: consumption,
    chargingStopsRecommended: stops,
    speedImpact: {
      at55mph: range55,
      at65mph: range65,
      at75mph: range75,
    },
    advice,
  };
}
