import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;

async function checkWeirdTrims() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");

  const all = await col.find({}).toArray();
  console.log(`Checking ${all.length} documents for weird trims or names with '/'...`);

  const slashTrims = [];
  const emptyTrims = [];

  for (const doc of all) {
    for (const t of (doc.Trim || [])) {
      if (!t.TrimName || t.TrimName.trim() === "") {
        emptyTrims.push({ year: doc.Year, make: doc.Make, model: doc.Model });
      } else if (t.TrimName.includes("/") && !t.TrimName.includes("Standard / Base")) {
        slashTrims.push({ year: doc.Year, make: doc.Make, model: doc.Model, trim: t.TrimName });
      }
    }
  }

  console.log(`\nFound ${slashTrims.length} trim names with slashes (potential multi-generation composite placeholders):`);
  const uniqueSlashTrims = new Set(slashTrims.map((s) => `${s.make} ${s.model} -> "${s.trim}"`));
  for (const s of Array.from(uniqueSlashTrims).slice(0, 30)) {
    console.log(`  ${s}`);
  }

  console.log(`\nFound ${emptyTrims.length} empty trim names.`);

  await mongoose.disconnect();
}

checkWeirdTrims().catch(console.error);
