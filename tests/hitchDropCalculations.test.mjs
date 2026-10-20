import assert from "node:assert/strict";
import {
  calculateHitchDrop,
  getVehicleDefaultHitchHeight,
} from "../app/lib/utils/HitchDropCalculator.ts";

console.log("🧪 Running Hitch Drop / Rise & Leveling Calculator Tests...\n");

// 1. Drop Calculation Test (Hitch higher than coupler)
{
  const res = calculateHitchDrop({
    hitchReceiverHeight: 21,
    trailerCouplerHeight: 17,
    accountForSquat: false,
    grossTrailerWeight: 5000,
  });

  assert.equal(res.mountType, "drop");
  assert.equal(res.requiredInches, 4);
  assert.equal(res.recommendedMountSize, '4" Drop Ball Mount');
  assert.equal(res.trailerStance, "nose_high");
  assert.equal(res.ballDiameterRecommendation, '2"');
  console.log("  ✓ Standard 4\" Drop calculation verified");
}

// 2. Rise Calculation Test (Hitch lower than coupler)
{
  const res = calculateHitchDrop({
    hitchReceiverHeight: 15,
    trailerCouplerHeight: 17,
    accountForSquat: false,
    grossTrailerWeight: 1800,
  });

  assert.equal(res.mountType, "rise");
  assert.equal(res.requiredInches, 2);
  assert.equal(res.recommendedMountSize, '2" Rise Ball Mount (Inverted)');
  assert.equal(res.trailerStance, "nose_low");
  assert.equal(res.ballDiameterRecommendation, '1-7/8"');
  console.log("  ✓ Standard 2\" Rise calculation verified");
}

// 3. Level Trailer Test
{
  const res = calculateHitchDrop({
    hitchReceiverHeight: 17.2,
    trailerCouplerHeight: 17,
    accountForSquat: false,
  });

  assert.equal(res.mountType, "level");
  assert.equal(res.recommendedMountSize, 'Straight / 0" Drop (Level Mount)');
  console.log("  ✓ Level mount detection verified");
}

// 4. Squat Compensation Test
{
  const withoutSquat = calculateHitchDrop({
    hitchReceiverHeight: 20,
    trailerCouplerHeight: 16,
    accountForSquat: false,
  });
  assert.equal(withoutSquat.requiredInches, 4);

  const withSquat = calculateHitchDrop({
    hitchReceiverHeight: 20,
    trailerCouplerHeight: 16,
    accountForSquat: true,
    customSquatInches: 1.5,
  });
  // Effective hitch height = 20 - 1.5 = 18.5 -> difference = 18.5 - 16 = 2.5
  assert.equal(withSquat.effectiveHitchHeight, 18.5);
  assert.equal(withSquat.requiredInches, 2.5);
  console.log("  ✓ Suspension squat compensation verified (4\" unladen -> 2.5\" loaded)");
}

// 5. Heavy Duty Ball Diameter Test (GTW > 7000 lbs)
{
  const res = calculateHitchDrop({
    hitchReceiverHeight: 22,
    trailerCouplerHeight: 18,
    grossTrailerWeight: 10000,
  });
  assert.equal(res.ballDiameterRecommendation, '2-5/16"');
  console.log("  ✓ Heavy-duty 2-5/16\" ball recommendation verified");
}

// 6. Vehicle Class Default Height Test
{
  assert.equal(getVehicleDefaultHitchHeight("Ford F-250 Super Duty"), 22);
  assert.equal(getVehicleDefaultHitchHeight("Ford F-150"), 19.5);
  assert.equal(getVehicleDefaultHitchHeight("Subaru Outback"), 14.5);
  console.log("  ✓ Vehicle class factory hitch height baselines verified");
}

console.log("\n🎉 All 6 Hitch Drop Calculation Engine Tests Passed Successfully!");
