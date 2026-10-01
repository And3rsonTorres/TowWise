import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;

async function checkAllTemplates() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");

  // Check models where year starts <= 2010
  const docs = await col.find({ Year: { $lte: 2014 } }).toArray();
  console.log(`Checking ${docs.length} documents from years <= 2014...`);

  const report = {};

  for (const doc of docs) {
    const key = `${doc.Make} ${doc.Model}`;
    if (!report[key]) report[key] = [];

    for (const t of (doc.Trim || [])) {
      report[key].push({
        year: doc.Year,
        trim: t.TrimName,
        engine: t.Engine,
        trans: t.Transmission,
        capacity: t["Max Towing Capacity"],
      });
    }
  }

  // Print sample for each model
  for (const [model, trims] of Object.entries(report)) {
    console.log(`\n========================================`);
    console.log(`MODEL: ${model} (${trims.length} trim entries <= 2014)`);
    // Sample earliest year (e.g. 2000) and later (e.g. 2010)
    const y2000 = trims.filter((t) => t.year === 2000);
    const y2005 = trims.filter((t) => t.year === 2005);
    const y2010 = trims.filter((t) => t.year === 2010);

    if (y2000.length > 0) {
      console.log(`  [Year 2000 Trims]:`);
      for (const t of y2000) console.log(`    - "${t.trim}" | Eng: ${t.engine} | Trans: ${t.trans} | Max: ${t.capacity} lbs`);
    }
    if (y2005.length > 0 && y2000.length === 0) {
      console.log(`  [Year 2005 Trims]:`);
      for (const t of y2005) console.log(`    - "${t.trim}" | Eng: ${t.engine} | Trans: ${t.trans} | Max: ${t.capacity} lbs`);
    }
    if (y2010.length > 0) {
      console.log(`  [Year 2010 Trims]:`);
      for (const t of y2010) console.log(`    - "${t.trim}" | Eng: ${t.engine} | Trans: ${t.trans} | Max: ${t.capacity} lbs`);
    }
  }

  await mongoose.disconnect();
}

checkAllTemplates().catch(console.error);
