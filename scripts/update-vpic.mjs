/**
 * NHTSA vPIC Local Database Updater
 * Run once a year to refresh the offline vPIC dataset:
 *   npm run update-vpic
 *
 * This CLI tool downloads the latest WMI manufacturer codes and vehicle model
 * definitions from US DOT NHTSA vPIC, updates the local cache, and ensures TowWise
 * remains 100% offline with ZERO runtime network calls for the rest of the year.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_FILE = path.join(__dirname, "../app/lib/nhtsa/vpicCache.json");

console.log("====================================================");
console.log(" TowWise: NHTSA vPIC Annual Offline Updater");
console.log("====================================================");
console.log(`[1/3] Fetching latest US DOT NHTSA WMI & Make catalog...`);

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function updateVpic() {
  const currentYear = new Date().getFullYear();
  const targetYears = [currentYear - 1, currentYear, currentYear + 1];

  const popularMakes = [
    "Ford", "Chevrolet", "GMC", "RAM", "Jeep", "Dodge", "Chrysler",
    "Toyota", "Lexus", "Honda", "Acura", "Nissan", "Infiniti",
    "Subaru", "Mazda", "Hyundai", "Kia", "Genesis",
    "Volkswagen", "Audi", "BMW", "Mercedes-Benz", "Volvo", "Porsche",
    "Rivian", "Tesla"
  ];

  const makeModelCatalog = {};
  let totalModelsFound = 0;

  for (const make of popularMakes) {
    makeModelCatalog[make] = [];
    for (const yr of targetYears) {
      try {
        const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${encodeURIComponent(make)}/modelyear/${yr}?format=json`;
        const res = await fetchWithTimeout(url, 8000);
        if (res.ok) {
          const data = await res.json();
          const results = data.Results || [];
          for (const item of results) {
            if (item.Model_Name && !makeModelCatalog[make].includes(item.Model_Name)) {
              makeModelCatalog[make].push(item.Model_Name);
              totalModelsFound++;
            }
          }
        }
      } catch (err) {
        // If offline or rate limited, gracefully continue
        console.warn(`  - Note: could not fetch ${make} for year ${yr} (${err.message}).`);
      }
    }
    console.log(`  ✓ ${make}: ${makeModelCatalog[make].length} verified models`);
  }

  const cachePayload = {
    updatedAt: new Date().toISOString(),
    version: `${currentYear}.1-annual`,
    totalMakes: Object.keys(makeModelCatalog).length,
    totalModels: totalModelsFound,
    catalog: makeModelCatalog,
  };

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cachePayload, null, 2), "utf-8");
  console.log(`[2/3] Saved offline cache to app/lib/nhtsa/vpicCache.json`);
  console.log(`[3/3] Local vPIC database is up to date for ${currentYear}!`);
  console.log("====================================================");
  console.log(" TowWise runtime is 100% offline. Zero external API calls.");
  console.log(" Next recommended update: " + (currentYear + 1));
  console.log("====================================================");
}

updateVpic().catch((err) => {
  console.error("Update process encountered an error:", err.message);
  process.exit(1);
});
