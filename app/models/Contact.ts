import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
const contact =
  mongoose.model("Contact", contactSchema) || mongoose.models.Contact;
export default contact;
