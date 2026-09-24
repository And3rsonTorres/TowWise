/**
 * Mongoose schemas for TowWise data models:
 * - TrimSchema: Engine, Transmission, Drivetrain, Max Towing Capacity, Notes, TrimName
 * - vehicleSchema: Year, Make, Model, Trim array
 * - contactSchema: Rich feedback schema with FeedbackType, Rating, VehicleContext, Message, and Status
 */
import mongoose from "mongoose";

export const TrimSchema = new mongoose.Schema({
  TrimName: { type: String, required: true },
  Engine: { type: String },
  Transmission: { type: String },
  Drivetrain: { type: String },
  "Max Towing Capacity": { type: Number, required: true },
  Notes: { type: String },
});

export const vehicleSchema = new mongoose.Schema({
  Year: { type: Number, required: true },
  Make: { type: String, required: true },
  Model: { type: String, required: true },
  Trim: [TrimSchema],
});

export const contactSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    FeedbackType: {
      type: String,
      enum: ["missing_vehicle", "incorrect_spec", "feature_request", "general"],
      default: "general",
    },
    Rating: { type: Number, min: 1, max: 5 },
    VehicleContext: {
      Year: { type: Number },
      Make: { type: String },
      Model: { type: String },
      Trim: { type: String },
      VIN: { type: String },
    },
    Message: { type: String, required: true },
    Status: {
      type: String,
      enum: ["new", "reviewed", "resolved"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);
