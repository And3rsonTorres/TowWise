/**
 * Contact and Feedback Model for MongoDB Atlas.
 * Can be bound to a dedicated feedback connection or global mongoose.
 */
import mongoose, { Model } from "mongoose";
import { contactSchema } from "../lib/mongo/Schema";

export const getFeedbackModel = (conn?: mongoose.Connection | null): Model<any> => {
  if (conn) {
    return conn.models.Feedback || conn.model("Feedback", contactSchema);
  }
  return mongoose.models.Feedback || mongoose.model("Feedback", contactSchema);
};

const Contact = getFeedbackModel();
export default Contact;
