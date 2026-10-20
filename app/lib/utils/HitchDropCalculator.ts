/**
 * Hitch Drop / Rise & Ball Mount Leveling Calculator
 * Calculates the required ball mount drop or rise to ensure a trailer tows completely level,
 * with optional suspension squat compensation and ball diameter recommendations.
 */

export interface HitchDropResult {
  hitchReceiverHeight: number; // inches from ground to top of inside receiver tube
  trailerCouplerHeight: number; // inches from ground to bottom of coupler when level
  squatInches: number; // suspension drop under tongue weight (typically 1" to 1.5")
  effectiveHitchHeight: number;
  difference: number; // effectiveHitchHeight - trailerCouplerHeight
  mountType: "drop" | "rise" | "level";
  requiredInches: number; // positive number of drop or rise needed
  recommendedMountSize: string; // e.g., "2\" Drop", "4\" Drop", "6\" Drop", "2\" Rise", "Straight / 0\" Drop"
  ballDiameterRecommendation: "1-7/8\"" | "2\"" | "2-5/16\"";
  trailerStance: "level" | "nose_high" | "nose_low";
  stanceAdvice: string;
}

/**
 * Calculates required ball mount drop or rise
 */
export function calculateHitchDrop(params: {
  hitchReceiverHeight: number;
  trailerCouplerHeight: number;
  accountForSquat?: boolean;
  customSquatInches?: number;
  grossTrailerWeight?: number;
}): HitchDropResult {
  const hitchHeight = Math.max(8, params.hitchReceiverHeight || 19);
  const couplerHeight = Math.max(8, params.trailerCouplerHeight || 17);
  const gtw = Math.max(0, params.grossTrailerWeight || 3500);

  // Default squat: 1.25" if enabled, or custom
  const squat = params.accountForSquat ? (params.customSquatInches ?? 1.25) : 0;
  const effectiveHitchHeight = Number((hitchHeight - squat).toFixed(2));
  const diff = Number((effectiveHitchHeight - couplerHeight).toFixed(2));

  let mountType: HitchDropResult["mountType"] = "level";
  let requiredInches = 0;
  let recommendedMountSize = 'Straight / 0" Drop (Level Mount)';
  let trailerStance: HitchDropResult["trailerStance"] = "level";
  let stanceAdvice = "Trailer will tow completely level. Optimum axle weight distribution and stability.";

  if (diff > 0.5) {
    mountType = "drop";
    requiredInches = Math.abs(diff);

    // Standard commercial drop sizes (2", 4", 6", 8", 10")
    if (requiredInches <= 2.5) {
      recommendedMountSize = '2" Drop Ball Mount';
    } else if (requiredInches <= 4.5) {
      recommendedMountSize = '4" Drop Ball Mount';
    } else if (requiredInches <= 6.5) {
      recommendedMountSize = '6" Drop Ball Mount';
    } else if (requiredInches <= 8.5) {
      recommendedMountSize = '8" Drop Ball Mount';
    } else {
      recommendedMountSize = `${Math.round(requiredInches)}" Deep Drop or Adjustable Shank`;
    }

    trailerStance = "nose_high";
    stanceAdvice = `Vehicle hitch is ${diff}" higher than the level coupler. Without a ${recommendedMountSize}, the trailer will ride nose-high, causing severe rear sway and uneven tire wear.`;
  } else if (diff < -0.5) {
    mountType = "rise";
    requiredInches = Math.abs(diff);

    if (requiredInches <= 2.5) {
      recommendedMountSize = '2" Rise Ball Mount (Inverted)';
    } else if (requiredInches <= 4.5) {
      recommendedMountSize = '4" Rise Ball Mount (Inverted)';
    } else {
      recommendedMountSize = `${Math.round(requiredInches)}" Rise Mount or Adjustable Shank`;
    }

    trailerStance = "nose_low";
    stanceAdvice = `Vehicle hitch is ${Math.abs(diff)}" lower than the level coupler. Without a ${recommendedMountSize}, the trailer will ride nose-low, overloading the front trailer axle and risking ground strikes with the trailer jack.`;
  }

  // Recommended Ball Diameter based on Gross Trailer Weight (SAE standard)
  let ballDiameter: HitchDropResult["ballDiameterRecommendation"] = '2"';
  if (gtw <= 2000) {
    ballDiameter = '1-7/8"';
  } else if (gtw <= 7000) {
    ballDiameter = '2"';
  } else {
    ballDiameter = '2-5/16"';
  }

  return {
    hitchReceiverHeight: hitchHeight,
    trailerCouplerHeight: couplerHeight,
    squatInches: squat,
    effectiveHitchHeight,
    difference: diff,
    mountType,
    requiredInches,
    recommendedMountSize,
    ballDiameterRecommendation: ballDiameter,
    trailerStance,
    stanceAdvice,
  };
}

/**
 * Common factory baseline hitch heights for vehicle classes
 */
export function getVehicleDefaultHitchHeight(vehicleName: string): number {
  const v = vehicleName.toLowerCase();
  // Lifted or 4WD Heavy Duty Pickups (F-250, 2500, 3500)
  if (v.includes("2500") || v.includes("3500") || v.includes("f-250") || v.includes("f-350")) {
    return 22;
  }
  // Full-Size Half-Ton Trucks (F-150, 1500, Tundra, Silverado)
  if (v.includes("1500") || v.includes("f-150") || v.includes("tundra") || v.includes("titan") || v.includes("silverado") || v.includes("sierra")) {
    return 19.5;
  }
  // Midsize Pickups (Tacoma, Colorado, Ranger, Frontier, Gladiator)
  if (v.includes("tacoma") || v.includes("colorado") || v.includes("ranger") || v.includes("frontier") || v.includes("gladiator")) {
    return 18.5;
  }
  // Full-Size SUVs (Tahoe, Suburban, Yukon, Expedition, Sequoia, Armada)
  if (v.includes("tahoe") || v.includes("suburban") || v.includes("yukon") || v.includes("expedition") || v.includes("sequoia")) {
    return 18;
  }
  // Crossovers and Compact SUVs (Outback, RAV4, CR-V, CX-5, Highlander)
  return 14.5;
}
