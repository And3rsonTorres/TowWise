import mongoose from "mongoose";


const optionsSchema = new mongoose.Schema(
  {
    Engine: { type: String, required: true },
    Transmission: { type: String, required: true },
    Notes: { type: String, required: true },
    'Max Towing Capacity': { type: Number, required: true }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        // Exclude the _id field from the transformed document
        delete ret._id;
        return ret;
      }
    }
  }
);

  
// Define vehicleSchema with toJSON transform option
const vehicleSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    Year: { type: Number, required: true },
    Make: { type: String, required: true },
    'Model Trim': { type: String, required: true },
    Options: [optionsSchema]
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        // Exclude the _id field from the transformed document
        delete ret._id;
        return ret;
      }
    }
  }
);

  
  const VehicleModel = mongoose.model('Capacities', vehicleSchema);
  
 export default VehicleModel;