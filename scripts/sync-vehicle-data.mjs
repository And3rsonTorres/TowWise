import fs from "fs";
import path from "path";
import { getGenerationAccurateTrims } from "./sanitize-all-db-trims.mjs";

const targetFile = path.resolve("app/lib/data/vehicleData.ts");
let content = fs.readFileSync(targetFile, "utf8");

// Extract the getGenerationAccurateTrims function text from sanitize-all-db-trims.mjs
const sanitizeFile = fs.readFileSync(path.resolve("scripts/sanitize-all-db-trims.mjs"), "utf8");
const fnStart = sanitizeFile.indexOf("export function getGenerationAccurateTrims(");
const fnEnd = sanitizeFile.indexOf("async function sanitizeDatabase()");
const fnBody = sanitizeFile.slice(fnStart, fnEnd).trim();

// Convert to TypeScript function for vehicleData.ts
const tsFn = fnBody
  .replace("export function getGenerationAccurateTrims(make, model, year) {", "function getGenerationalTrims(make: string, model: string, year: number): any[] | \"UNRELEASED\" | null {")
  .replace(/return null;/g, "return \"UNRELEASED\";")
  .replace("return null;", "return null;"); // last fallback

// Now replace getGenerationalTrims in vehicleData.ts
const originalStart = content.indexOf("function getGenerationalTrims(make: string, model: string, year: number)");
const originalEnd = content.indexOf("function generateServerlessVehicles(): Vehicles[] {");

if (originalStart !== -1 && originalEnd !== -1) {
  content = content.slice(0, originalStart) + tsFn + "\n\n" + content.slice(originalEnd);
  fs.writeFileSync(targetFile, content, "utf8");
  console.log("Successfully synchronized app/lib/data/vehicleData.ts with generation-accurate trims!");
} else {
  console.error("Could not find getGenerationalTrims block in vehicleData.ts");
}
