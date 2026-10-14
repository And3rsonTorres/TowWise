import assert from "node:assert/strict";
import {
  isElectricVehicle,
  calculateEvTowingRange,
} from "../app/lib/utils/EvRangeCalculator.ts";

console.log("🧪 Running EV Towing Range Engine Tests...\n");

// 1. EV Model Detection
assert.equal(isElectricVehicle("Rivian R1T"), true);
assert.equal(isElectricVehicle("Tesla Cybertruck"), true);
assert.equal(isElectricVehicle("F-150 Lightning"), true);
assert.equal(isElectricVehicle("Ford F-150", "3.5L EcoBoost V6"), false);
assert.equal(isElectricVehicle("Toyota Tundra", "3.4L Twin Turbo V6"), false);
console.log("  ✓ EV Powertrain identification verified");

// 2. Range Degradation Range
const r1t = calculateEvTowingRange("Rivian R1T", 7000, 65);
assert.equal(r1t.isEv, true);
assert(r1t.towingRangeMiles < r1t.baseRangeMiles * 0.6, "Range should drop > 40%");
assert(r1t.towingRangeMiles > r1t.baseRangeMiles * 0.35, "Range should not drop > 65%");
console.log("  ✓ Aerodynamic drag & weight penalty degradation verified (~" + r1t.towingRangeMiles + " mi / " + r1t.baseRangeMiles + " mi)");

// 3. Cruising Speed Impact
const speed55 = calculateEvTowingRange("Rivian R1T", 7000, 55);
const speed75 = calculateEvTowingRange("Rivian R1T", 7000, 75);
assert(speed55.towingRangeMiles > speed75.towingRangeMiles, "55 MPH must yield significantly higher range than 75 MPH");
console.log("  ✓ Cruising speed aerodynamic sensitivity verified (55 MPH: " + speed55.towingRangeMiles + " mi vs 75 MPH: " + speed75.towingRangeMiles + " mi)");

console.log("\n🎉 All EV Towing Range Engine Tests Passed Successfully!");
