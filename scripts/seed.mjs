import mongoose from "mongoose";
import dotenv from "dotenv";
import { SERVERLESS_VEHICLES } from "../app/lib/data/vehicleData.js";

dotenv.config({ path: ".env.local" });
dotenv.config();

const URI = process.env.TOWING_URI;

if (!URI) {
  console.error("Error: Please set TOWING_URI in your .env or .env.local file to run the database seeder.");
  process.exit(1);
}

const TrimSchema = new mongoose.Schema({
  Engine: { type: String, required: true },
  Notes: { type: String, required: true },
  "Max Towing Capacity": { type: Number, required: true },
  TrimName: { type: String, required: true },
  Transmission: { type: String },
  Drivetrain: { type: String },
});

const vehicleSchema = new mongoose.Schema({
  Year: { type: Number, required: true },
  Make: { type: String, required: true },
  Model: { type: String, required: true },
  Trim: [TrimSchema],
});

const Capacities = mongoose.models.Capacities || mongoose.model("Capacities", vehicleSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(URI);
    console.log("Connected successfully!");

    console.log("Clearing existing vehicle capacities collection...");
    await Capacities.deleteMany({});

    console.log(`Seeding ${SERVERLESS_VEHICLES.length} vehicles into 'Capacities' collection...`);
    const inserted = await Capacities.insertMany(SERVERLESS_VEHICLES);
    console.log(`Successfully seeded ${inserted.length} vehicles into MongoDB!`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB. Database seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
