import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI || process.env.FEEDBACK_DB_URI;

if (!uri) {
  console.error("No TOWING_URI or FEEDBACK_DB_URI found in .env.local or environment.");
  process.exit(1);
}

async function run() {
  console.log("Connecting to MongoDB Atlas...");
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log("✓ Successfully connected to MongoDB Atlas!");

    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("✓ Collections found in database:", collections.map((c) => c.name));

    const capacitiesCount = await db.collection("capacities").countDocuments();
    console.log(`✓ Capacities collection ('Towing/capacities'): ${capacitiesCount} vehicle documents`);

    const contactsCount = await db.collection("contacts").countDocuments();
    console.log(`✓ Contacts collection ('Towing/contacts'): ${contactsCount} feedback documents`);

    await mongoose.disconnect();
    console.log("✓ Disconnected cleanly.");
    process.exit(0);
  } catch (err) {
    console.error("✕ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

run();
