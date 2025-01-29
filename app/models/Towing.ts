/**
 * Exports a Mongoose model for the 'Capacities' collection, based on the `vehicleSchema`.
 * This model can be used to interact with the 'Capacities' collection in the MongoDB database.
 */
import mongoose from "mongoose";
import { vehicleSchema } from "../lib/mongo/Schema";

const VehicleModel =
  mongoose.models.Capacities || mongoose.model("Capacities", vehicleSchema);

export default VehicleModel;
