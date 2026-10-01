import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;

async function checkAcura() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");

  const acuraDocs = await col.find({ Make: "Acura" }).sort({ Year: 1 }).toArray();
  console.log(`Found ${acuraDocs.length} Acura documents:`);
  for (const doc of acuraDocs) {
    console.log(`  [${doc.Year}] Acura ${doc.Model} -> Trims: ${(doc.Trim || []).map(t => t.TrimName).join("; ")}`);
  }

  // Also check other brands that have missing years
  const makes = ["Audi", "BMW", "Buick", "Cadillac", "Infiniti", "Lexus", "Lincoln", "Mercedes-Benz", "Porsche", "Volvo", "Kia", "Land Rover", "Mitsubishi"];
  console.log("\nSample models for other luxury/volume brands currently in DB:");
  for (const mk of makes) {
    const sample = await col.find({ Make: mk }).limit(3).toArray();
    console.log(`  ${mk} (${sample.length ? sample.map(s => s.Model).join(", ") : "None in DB"})`);
  }

  await mongoose.disconnect();
}

checkAcura().catch(console.error);
