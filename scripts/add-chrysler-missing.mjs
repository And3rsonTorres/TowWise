import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;

async function addChrysler() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");
  for (let yr = 2009; yr <= 2016; yr++) {
    const exists = await col.findOne({ Year: yr, Make: "Chrysler", Model: "Town & Country" });
    if (!exists) {
      await col.insertOne({
        Year: yr,
        Make: "Chrysler",
        Model: "Town & Country",
        Trim: [{
          TrimName: "Standard / Regular Model (Trailer Tow Prep Package)",
          Engine: yr <= 2010 ? "3.8L / 4.0L V6 (197–251 hp)" : "3.6L Pentastar V6 (283 hp / 260 lb-ft)",
          Transmission: "6-Speed 62TE Automatic with Heavy-Duty Engine & Transmission Cooling",
          Drivetrain: "Front-Wheel Drive",
          "Max Towing Capacity": 3600,
          Notes: "Class II receiver hitch with heavy-duty radiator, transmission fluid cooler, and load-leveling suspension."
        }]
      });
    }
  }
  console.log("Chrysler 2009-2016 Town & Country inserted.");
  await mongoose.disconnect();
}

addChrysler().catch(console.error);
