import assert from "node:assert/strict";
import {
  calculate80PercentRule,
  calculateTongueWeight,
  getHitchClass,
  calculatePayloadAllowance,
  estimateVehiclePayload,
} from "../app/lib/utils/TowCalculations.ts";

console.log("🧪 Running TowWise Towing & Weight Calculation Engine Tests...\n");

// 1. 80% Safety Rule Tests
{
  const res = calculate80PercentRule(10000, 7000);
  assert.equal(res.safetyCeiling, 8000, "Safety ceiling should be 80% (8000 lbs)");
  assert.equal(res.status, "safe", "7,000 lbs on 10,000 lbs should be safe");

  const caution = calculate80PercentRule(10000, 8500);
  assert.equal(caution.status, "caution", "8,500 lbs on 10,000 lbs should be caution");

  const overloaded = calculate80PercentRule(10000, 11000);
  assert.equal(overloaded.status, "overloaded", "11,000 lbs on 10,000 lbs should be overloaded");
  console.log("  ✓ 80% Safety Rule calculations verified");
}

// 2. Tongue Weight Range Tests
{
  const tw = calculateTongueWeight(5000);
  assert.equal(tw.minTongueWeight, 500, "10% of 5,000 lbs should be 500 lbs");
  assert.equal(tw.maxTongueWeight, 750, "15% of 5,000 lbs should be 750 lbs");
  assert.equal(tw.recommendedTongueWeight, 600, "12% of 5,000 lbs should be 600 lbs");
  assert.equal(tw.status, "optimal");

  const sway = calculateTongueWeight(5000, 350); // 7%
  assert.equal(sway.status, "sway_risk", "<10% should trigger sway risk");

  const overload = calculateTongueWeight(5000, 900); // 18%
  assert.equal(overload.status, "overload_risk", ">15% should trigger overload risk");
  console.log("  ✓ Tongue Weight 10%–15% targets & sway detection verified");
}

// 3. Hitch Class Determination Tests
{
  assert.equal(getHitchClass(1500).hitchClass, "Class I");
  assert.equal(getHitchClass(3000).hitchClass, "Class II");
  assert.equal(getHitchClass(6000).hitchClass, "Class III");
  assert.equal(getHitchClass(10000).hitchClass, "Class IV");
  assert.equal(getHitchClass(16000).hitchClass, "Class V");
  console.log("  ✓ Hitch Class classification (Class I through Class V) verified");
}

// 4. Payload Allowance Tests
{
  const p = calculatePayloadAllowance({
    maxPayload: 1500,
    adultCount: 2, // 350 lbs
    childCount: 2, // 160 lbs
    cargoWeight: 200, // 200 lbs
    tongueWeight: 500, // 500 lbs
    hitchEquipmentWeight: 75, // 75 lbs
  });

  const expectedLoad = 350 + 160 + 200 + 500 + 75; // 1,285 lbs
  assert.equal(p.totalLoad, expectedLoad);
  assert.equal(p.remainingPayload, 1500 - expectedLoad); // 215 lbs
  assert.equal(p.status, "caution");

  const over = calculatePayloadAllowance({
    maxPayload: 1000,
    adultCount: 4, // 700 lbs
    childCount: 0,
    cargoWeight: 100,
    tongueWeight: 600,
  });
  assert.equal(over.status, "overloaded");
  console.log("  ✓ Vehicle Payload & Passenger Allowance arithmetic verified");
}

// 5. Payload Estimation Tests
{
  assert.equal(estimateVehiclePayload("Ford F-150 SuperCrew", 11000), 1750);
  assert.equal(estimateVehiclePayload("Chevrolet Silverado 2500HD", 18500), 3400);
  assert.equal(estimateVehiclePayload("Toyota Tacoma TRD Off-Road", 6500), 1450);
  console.log("  ✓ Vehicle Class Payload Estimator verified");
}

console.log("\n🎉 All 5 Calculation Engine Test Suites Passed Successfully!");
