/**
 * Defines the Mongoose schemas for the vehicle and contact data models.
 *
 * The `TrimSchema` defines the schema for a vehicle trim, including the engine, notes, max towing capacity, and trim name.
 *
 * The `vehicleSchema` defines the schema for a vehicle, including the year, make, model, and an array of trims.
 *
 * The `contactSchema` defines the schema for a contact, including the name, email, and message.
 */
import mongoose from "mongoose";

export const TrimSchema = new mongoose.Schema({
  Engine: { type: String, required: true },
  Notes: { type: String, required: true },
  "Max Towing Capacity": { type: Number, required: true },
  TrimName: { type: String, required: true },
});

export const vehicleSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  Year: { type: Number, required: true },
  Make: { type: String, required: true },
  Model: { type: String, required: true },
  Trim: [TrimSchema],
});
export const contactSchema = new mongoose.Schema(
  {
    Name: { type: String },
    Email: { type: String },
    Message: { type: String },
  },
  {
    timestamps: true,
  }
);
