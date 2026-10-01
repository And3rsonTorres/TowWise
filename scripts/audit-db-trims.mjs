import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;
if (!uri) {
  console.error("No TOWING_URI found.");
  process.exit(1);
}

async function audit() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");
  const all = await col.find({}).toArray();
  console.log(`Total documents in capacities: ${all.length}`);

  // Let's inspect all makes and models, and list trims that look modern or model-specific
  const findings = [];

  for (const doc of all) {
    const year = doc.Year;
    const make = doc.Make;
    const model = doc.Model;
    const trims = doc.Trim || [];

    for (const t of trims) {
      const trimName = t.TrimName || "";
      const lower = trimName.toLowerCase();

      // Check known brand-specific modern trims
      // 1. TrailSport (Honda introduced TrailSport ~2022)
      if (lower.includes("trailsport") && year < 2022) {
        findings.push({ year, make, model, trim: trimName, issue: "Honda TrailSport did not exist before 2022" });
      }

      // 2. Timberline (Ford introduced Timberline in 2021/2022 on Explorer / Expedition)
      if (lower.includes("timberline") && year < 2021) {
        findings.push({ year, make, model, trim: trimName, issue: "Ford Timberline did not exist before 2021" });
      }

      // 3. Tremor (Ford Tremor package on F-150 / Ranger / Maverick reintroduced in 2020-2021, and 2014 sport)
      if (lower.includes("tremor") && make.toLowerCase() === "ford" && year < 2021 && year !== 2014) {
        findings.push({ year, make, model, trim: trimName, issue: "Tremor package not present in this year" });
      }

      // 4. Badlands (Bronco / Bronco Sport introduced in 2021)
      if (lower.includes("badlands") && year < 2021) {
        findings.push({ year, make, model, trim: trimName, issue: "Badlands introduced in 2021" });
      }

      // 5. AT4 / AT4X (GMC AT4 introduced in 2019, AT4X in 2022)
      if (lower.includes("at4x") && year < 2022) {
        findings.push({ year, make, model, trim: trimName, issue: "GMC AT4X introduced in 2022" });
      }
      if (lower.includes("at4") && !lower.includes("at4x") && year < 2019) {
        findings.push({ year, make, model, trim: trimName, issue: "GMC AT4 introduced in 2019" });
      }

      // 6. Trailhawk (Jeep Cherokee Trailhawk in 2014, Grand Cherokee Trailhawk in 2017)
      if (lower.includes("trailhawk") && year < 2014) {
        findings.push({ year, make, model, trim: trimName, issue: "Jeep Trailhawk did not exist before 2014" });
      }

      // 7. 4xe (Jeep 4xe plug-in hybrid launched in 2021 for Wrangler, 2022 for Grand Cherokee)
      if (lower.includes("4xe") && year < 2021) {
        findings.push({ year, make, model, trim: trimName, issue: "Jeep 4xe launched in 2021" });
      }

      // 8. Rubicon 392 (launched in 2021)
      if (lower.includes("392") && year < 2021 && make.toLowerCase() === "jeep") {
        findings.push({ year, make, model, trim: trimName, issue: "Jeep Rubicon 392 launched in 2021" });
      }

      // 9. TRX (Ram 1500 TRX launched in 2021)
      if (lower.includes("trx") && year < 2021 && make.toLowerCase() === "ram") {
        findings.push({ year, make, model, trim: trimName, issue: "Ram TRX launched in 2021" });
      }

      // 10. Raptor R (launched in 2023)
      if (lower.includes("raptor r") && year < 2023) {
        findings.push({ year, make, model, trim: trimName, issue: "Raptor R launched in 2023" });
      }

      // 11. Lightning (F-150 Lightning EV launched in 2022)
      if (lower.includes("lightning") && year < 2022 && make.toLowerCase() === "ford" && year >= 2005) {
        findings.push({ year, make, model, trim: trimName, issue: "Ford F-150 Lightning EV launched in 2022 (SVT was 1999-2004)" });
      }

      // 12. Wilderness (Outback 2022, Forester 2022, Crosstrek 2024)
      if (lower.includes("wilderness")) {
        if (model.toLowerCase().includes("outback") && year < 2022) {
          findings.push({ year, make, model, trim: trimName, issue: "Outback Wilderness launched in 2022" });
        }
        if (model.toLowerCase().includes("forester") && year < 2022) {
          findings.push({ year, make, model, trim: trimName, issue: "Forester Wilderness launched in 2022" });
        }
        if (model.toLowerCase().includes("crosstrek") && year < 2024) {
          findings.push({ year, make, model, trim: trimName, issue: "Crosstrek Wilderness launched in 2024" });
        }
      }

      // 13. PowerBoost (Ford launched in 2021)
      if (lower.includes("powerboost") && year < 2021) {
        findings.push({ year, make, model, trim: trimName, issue: "PowerBoost launched in 2021" });
      }

      // 14. Hurricane (Ram introduced in 2025)
      if (lower.includes("hurricane") && year < 2025) {
        findings.push({ year, make, model, trim: trimName, issue: "Hurricane inline-6 introduced in 2025" });
      }

      // 15. i-FORCE MAX (Tundra in 2022, Tacoma / Land Cruiser in 2024)
      if (lower.includes("i-force max") || lower.includes("iforce max")) {
        if (model.toLowerCase().includes("tundra") && year < 2022) {
          findings.push({ year, make, model, trim: trimName, issue: "Tundra i-FORCE MAX launched in 2022" });
        }
        if (model.toLowerCase().includes("tacoma") && year < 2024) {
          findings.push({ year, make, model, trim: trimName, issue: "Tacoma i-FORCE MAX launched in 2024" });
        }
      }

      // 16. TRD Pro (Toyota introduced TRD Pro lineup in 2015)
      if (lower.includes("trd pro") && year < 2015) {
        findings.push({ year, make, model, trim: trimName, issue: "Toyota TRD Pro lineup introduced in 2015" });
      }

      // 17. ZR2 (Colorado ZR2 launched in 2017, Silverado ZR2 in 2022)
      if (lower.includes("zr2")) {
        if (model.toLowerCase().includes("silverado") && year < 2022) {
          findings.push({ year, make, model, trim: trimName, issue: "Silverado ZR2 introduced in 2022" });
        }
        if (model.toLowerCase().includes("colorado") && year < 2017) {
          findings.push({ year, make, model, trim: trimName, issue: "Colorado ZR2 introduced in 2017" });
        }
      }

      // 18. Trail Boss (Silverado Trail Boss introduced in 2019)
      if (lower.includes("trail boss") && year < 2019) {
        findings.push({ year, make, model, trim: trimName, issue: "Silverado Trail Boss introduced in 2019" });
      }

      // 19. Pro-4X (Nissan introduced Pro-4X in 2008)
      if (lower.includes("pro-4x") && year < 2008) {
        findings.push({ year, make, model, trim: trimName, issue: "Nissan Pro-4X introduced in 2008 (was Nismo Off-Road prior)" });
      }

      // 20. Rebel (Ram 1500 Rebel introduced in 2015)
      if (lower.includes("rebel") && year < 2015 && make.toLowerCase() === "ram") {
        findings.push({ year, make, model, trim: trimName, issue: "Ram Rebel introduced in 2015" });
      }

      // 21. Denali Ultimate (GMC introduced Denali Ultimate in 2023)
      if (lower.includes("denali ultimate") && year < 2023) {
        findings.push({ year, make, model, trim: trimName, issue: "Denali Ultimate introduced in 2023" });
      }

      // 22. High Country (Chevrolet introduced High Country in 2014)
      if (lower.includes("high country") && year < 2014 && make.toLowerCase() === "chevrolet") {
        findings.push({ year, make, model, trim: trimName, issue: "Silverado High Country introduced in 2014" });
      }

      // 23. Limited Longhorn (Ram introduced in 2011)
      if (lower.includes("longhorn") && year < 2011) {
        findings.push({ year, make, model, trim: trimName, issue: "Longhorn introduced in 2011" });
      }

      // 24. Dark Horse (Mustang Dark Horse introduced in 2024)
      if (lower.includes("dark horse") && year < 2024) {
        findings.push({ year, make, model, trim: trimName, issue: "Mustang Dark Horse introduced in 2024" });
      }

      // 25. e-Hybrid / 4xe / Prime (Toyota Prime PHEV introduced RAV4 Prime in 2021, Prius Prime in 2017)
      if (lower.includes("prime") && model.toLowerCase().includes("rav4") && year < 2021) {
        findings.push({ year, make, model, trim: trimName, issue: "RAV4 Prime introduced in 2021" });
      }

      // 26. Check for vehicles that didn't exist in older years
      // e.g. Telluride (launched 2020), Palisade (launched 2020), Atlas (launched 2018), Ascent (launched 2019)
      // Bronco Sport (launched 2021), Maverick (launched 2022), Santa Cruz (launched 2022)
      if (model.toLowerCase() === "telluride" && year < 2020) {
        findings.push({ year, make, model, trim: trimName, issue: "Kia Telluride launched in 2020" });
      }
      if (model.toLowerCase() === "palisade" && year < 2020) {
        findings.push({ year, make, model, trim: trimName, issue: "Hyundai Palisade launched in 2020" });
      }
      if (model.toLowerCase() === "atlas" && year < 2018) {
        findings.push({ year, make, model, trim: trimName, issue: "VW Atlas launched in 2018" });
      }
      if (model.toLowerCase() === "ascent" && year < 2019) {
        findings.push({ year, make, model, trim: trimName, issue: "Subaru Ascent launched in 2019" });
      }
      if (model.toLowerCase() === "maverick" && year >= 2000 && year < 2022) {
        findings.push({ year, make, model, trim: trimName, issue: "Ford Maverick compact pickup launched in 2022" });
      }
      if (model.toLowerCase() === "gladiator" && year >= 2000 && year < 2020) {
        findings.push({ year, make, model, trim: trimName, issue: "Jeep Gladiator pickup launched in 2020" });
      }
    }
  }

  console.log(`\nFound ${findings.length} potential anachronisms / mismatched trims:`);
  for (const f of findings) {
    console.log(`- [${f.year}] ${f.make} ${f.model} -> "${f.trim}": ${f.issue}`);
  }

  // Also collect all unique trims across the entire database to see what trims exist
  const uniqueTrims = new Set();
  for (const doc of all) {
    for (const t of (doc.Trim || [])) {
      if (t.TrimName) uniqueTrims.add(t.TrimName);
    }
  }

  console.log(`\nTotal unique TrimNames across database: ${uniqueTrims.size}`);

  await mongoose.disconnect();
}

audit().catch(console.error);
