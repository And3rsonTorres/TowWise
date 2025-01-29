/**
 * Represents a contact in the application.
 * This model is backed by a MongoDB collection using Mongoose.
 */
import mongoose from "mongoose";
import { contactSchema } from "../lib/mongo/Schema";

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;
