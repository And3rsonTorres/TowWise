import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;

async function auditBrands() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");

  const makes = await col.aggregate([
    {
      $group: {
        _id: "$Make",
        minYear: { $min: "$Year" },
        maxYear: { $max: "$Year" },
        years: { $addToSet: "$Year" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]).toArray();

  console.log("=== ALL MAKES IN MONGODB ===");
  for (const item of makes) {
    const missing = [];
    for (let y = 2000; y <= 2026; y++) {
      if (!item.years.includes(y)) missing.push(y);
    }
    console.log(
      `${item._id.padEnd(16)} | Span: ${item.minYear}-${item.maxYear} | Docs: ${String(item.count).padStart(3)} | Missing years: ${
        missing.length === 0 ? "NONE (Full 2000-2026)" : missing.length + " years: " + missing.join(",")
      }`
    );
  }

  await mongoose.disconnect();
}

auditBrands().catch(console.error);
