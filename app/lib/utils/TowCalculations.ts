/**
 * TowWise Towing & Weight Calculation Engine
 * Pure mathematical models for 80% safety margins, tongue weight, hitch classification, and payload headroom.
 */

export interface EightyPercentResult {
  maxCapacity: number;
  testWeight: number;
  safetyCeiling: number; // 80% of max capacity
  utilizationPercent: number;
  status: "safe" | "caution" | "overloaded";
  badgeText: string;
  advice: string;
}

export interface TongueWeightResult {
  trailerWeight: number;
  minTongueWeight: number; // 10%
  maxTongueWeight: number; // 15%
  recommendedTongueWeight: number; // 12%
  currentPercentage: number;
  status: "sway_risk" | "optimal" | "overload_risk";
  statusText: string;
  advice: string;
}

export interface HitchClassResult {
  hitchClass: "Class I" | "Class II" | "Class III" | "Class IV" | "Class V";
  receiverSize: string;
  maxGrossTrailerWeight: number;
  maxTongueWeight: number;
  description: string;
}

export interface PayloadResult {
  maxPayload: number;
  totalLoad: number;
  remainingPayload: number;
  utilizationPercent: number;
  status: "safe" | "caution" | "overloaded";
  statusText: string;
  advice: string;
  breakdown: {
    passengers: number;
    cargo: number;
    tongueWeight: number;
    hitchEquipment: number;
  };
}

/**
 * Calculates 80% Towing Safety Rule
 * Ensures drivers keep a 20% safety margin for mountain passes, high crosswinds, and heat.
 */
export function calculate80PercentRule(
  maxCapacity: number,
  testWeight: number
): EightyPercentResult {
  const cap = Math.max(0, maxCapacity);
  const wt = Math.max(0, testWeight);
  const safetyCeiling = Math.round(cap * 0.8);
  const utilizationPercent = cap > 0 ? Math.round((wt / cap) * 100) : 0;

  let status: EightyPercentResult["status"] = "safe";
  let badgeText = "Safe Towing Margin";
  let advice = "Weight is comfortably below the 80% safety threshold. Ideal for mountain climbs and high crosswinds.";

  if (wt > cap) {
    status = "overloaded";
    badgeText = "DANGER: Exceeds Manufacturer Tow Rating";
    advice = `Trailer exceeds vehicle rating by ${(wt - cap).toLocaleString()} lbs! Serious risk of transmission failure and loss of control.`;
  } else if (wt > safetyCeiling) {
    status = "caution";
    badgeText = "Caution: Within 80%–100% Buffer";
    advice = "Operating above the recommended 80% safety margin. Drive with extra stopping distance and monitor engine/transmission temperature.";
  }

  return {
    maxCapacity: cap,
    testWeight: wt,
    safetyCeiling,
    utilizationPercent,
    status,
    badgeText,
    advice,
  };
}

/**
 * Calculates Tongue Weight Target (10% to 15% of Loaded Trailer Weight)
 */
export function calculateTongueWeight(
  trailerWeight: number,
  customTongueWeight?: number
): TongueWeightResult {
  const tw = Math.max(0, trailerWeight);
  const minTW = Math.round(tw * 0.1);
  const maxTW = Math.round(tw * 0.15);
  const recommendedTW = Math.round(tw * 0.12);

  const actualTongue = customTongueWeight !== undefined ? Math.max(0, customTongueWeight) : recommendedTW;
  const currentPercentage = tw > 0 ? Number(((actualTongue / tw) * 100).toFixed(1)) : 12;

  let status: TongueWeightResult["status"] = "optimal";
  let statusText = "Optimal Tongue Weight (10%–15%)";
  let advice = "Tongue weight is properly balanced. Trailer will track securely without sway or excessive rear sag.";

  if (currentPercentage < 10 && tw > 0) {
    status = "sway_risk";
    statusText = "DANGER: Tongue Weight < 10% (High Sway Risk)";
    advice = "Trailer tail is too heavy! Insufficient tongue weight causes severe high-speed sway. Move cargo forward toward the trailer tongue.";
  } else if (currentPercentage > 15 && tw > 0) {
    status = "overload_risk";
    statusText = "Caution: Tongue Weight > 15% (Rear Axle Overload)";
    advice = "Too much weight is on the hitch ball. This can squat the rear suspension, lift front steering tires, and cause headlight misaim.";
  }

  return {
    trailerWeight: tw,
    minTongueWeight: minTW,
    maxTongueWeight: maxTW,
    recommendedTongueWeight: recommendedTW,
    currentPercentage,
    status,
    statusText,
    advice,
  };
}

/**
 * Determines required Hitch Receiver Class based on gross trailer weight and tongue weight
 */
export function getHitchClass(trailerWeight: number, tongueWeight?: number): HitchClassResult {
  const wt = Math.max(0, trailerWeight);
  const tw = tongueWeight !== undefined ? tongueWeight : wt * 0.10;

  if (wt <= 2000 && tw <= 200) {
    return {
      hitchClass: "Class I",
      receiverSize: '1-1/4" Receiver',
      maxGrossTrailerWeight: 2000,
      maxTongueWeight: 200,
      description: "Light-duty receiver for jet skis, small utility trailers, and bike racks.",
    };
  }

  if (wt <= 3500 && tw <= 350) {
    return {
      hitchClass: "Class II",
      receiverSize: '1-1/4" Receiver',
      maxGrossTrailerWeight: 3500,
      maxTongueWeight: 350,
      description: "Mid-light receiver suitable for pop-up campers and small fishing boats.",
    };
  }

  if (wt <= 8000 && tw <= 800) {
    return {
      hitchClass: "Class III",
      receiverSize: '2" Standard Receiver',
      maxGrossTrailerWeight: 8000,
      maxTongueWeight: 800,
      description: "Industry-standard hitch for midsize travel trailers, boats, and dual-axle cargo trailers.",
    };
  }

  if (wt <= 12000 && tw <= 1200) {
    return {
      hitchClass: "Class IV",
      receiverSize: '2" Heavy-Duty Receiver',
      maxGrossTrailerWeight: 12000,
      maxTongueWeight: 1200,
      description: "Heavy-duty hitch for large RVs, heavy toy haulers, and commercial equipment trailers.",
    };
  }

  return {
    hitchClass: "Class V",
    receiverSize: '2-1/2" or 3" Commercial Receiver',
    maxGrossTrailerWeight: 30000,
    maxTongueWeight: 3000,
    description: "Commercial / heavy-duty chassis rating for multi-vehicle haulers and industrial fifth-wheels / goosenecks.",
  };
}

/**
 * Calculates remaining vehicle payload allowance based on passengers, cargo, and hitch load
 */
export function calculatePayloadAllowance(params: {
  maxPayload: number;
  adultCount?: number;
  childCount?: number;
  cargoWeight?: number;
  tongueWeight?: number;
  hitchEquipmentWeight?: number;
}): PayloadResult {
  const maxPayload = Math.max(0, params.maxPayload);
  const adults = Math.max(0, params.adultCount || 0);
  const children = Math.max(0, params.childCount || 0);
  const passengerWeight = adults * 175 + children * 80;
  const cargo = Math.max(0, params.cargoWeight || 0);
  const tongue = Math.max(0, params.tongueWeight || 0);
  const hitchEquipment = Math.max(0, params.hitchEquipmentWeight || 0);

  const totalLoad = passengerWeight + cargo + tongue + hitchEquipment;
  const remainingPayload = maxPayload - totalLoad;
  const utilizationPercent = maxPayload > 0 ? Math.round((totalLoad / maxPayload) * 100) : 0;

  let status: PayloadResult["status"] = "safe";
  let statusText = "Payload Within Safe Limits";
  let advice = `You have ${remainingPayload.toLocaleString()} lbs of remaining payload capacity available.`;

  if (totalLoad > maxPayload) {
    status = "overloaded";
    statusText = "DANGER: Vehicle Payload Capacity Exceeded!";
    advice = `Vehicle is overloaded by ${Math.abs(remainingPayload).toLocaleString()} lbs! You must reduce cargo, passenger count, or trailer tongue weight.`;
  } else if (totalLoad > maxPayload * 0.85) {
    status = "caution";
    statusText = "Caution: Approaching Maximum Payload Limit";
    advice = `Only ${remainingPayload.toLocaleString()} lbs of payload capacity remaining. Avoid adding further cargo to vehicle cab or bed.`;
  }

  return {
    maxPayload,
    totalLoad,
    remainingPayload,
    utilizationPercent,
    status,
    statusText,
    advice,
    breakdown: {
      passengers: passengerWeight,
      cargo,
      tongueWeight: tongue,
      hitchEquipment,
    },
  };
}

/**
 * Estimates baseline vehicle factory payload rating based on vehicle class / name if not specified
 */
export function estimateVehiclePayload(vehicleName: string, maxTowing: number): number {
  const v = vehicleName.toLowerCase();

  // Heavy Duty Trucks (F-250, F-350, 2500, 3500)
  if (v.includes("2500") || v.includes("3500") || v.includes("f-250") || v.includes("f-350") || v.includes("350")) {
    return 3400;
  }

  // Full-Size Half-Ton Trucks (F-150, 1500, Tundra, Titan)
  if (v.includes("1500") || v.includes("f-150") || v.includes("tundra") || v.includes("titan")) {
    return 1750;
  }

  // Midsize Trucks (Tacoma, Colorado, Canyon, Ranger, Frontier, Gladiator)
  if (v.includes("tacoma") || v.includes("colorado") || v.includes("canyon") || v.includes("ranger") || v.includes("gladiator")) {
    return 1450;
  }

  // Full-Size SUVs (Tahoe, Suburban, Yukon, Expedition, Sequoia, Armada)
  if (v.includes("tahoe") || v.includes("suburban") || v.includes("yukon") || v.includes("expedition") || v.includes("sequoia") || v.includes("armada")) {
    return 1550;
  }

  // Compact / Midsize SUVs and Crossovers (Outback, RAV4, CR-V, Explorer, Highlander)
  if (maxTowing >= 3500) {
    return 1300;
  }

  return 1050;
}
