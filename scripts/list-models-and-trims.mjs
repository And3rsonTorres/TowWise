import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;

async function run() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");

  const results = await col.aggregate([
    {
      $group: {
        _id: { Make: "$Make", Model: "$Model" },
        minYear: { $min: "$Year" },
        maxYear: { $max: "$Year" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.Make": 1, "_id.Model": 1 } },
  ]).toArray();

  console.log(`Found ${results.length} distinct Make/Model pairs in MongoDB:`);
  for (const r of results) {
    console.log(`${r._id.Make} | ${r._id.Model} | ${r.minYear} - ${r.maxYear} (${r.count} docs)`);
  }

  await mongoose.disconnect();
}

run().catch(console.error);
