import mongoose from "mongoose";


const TrimSchema = new mongoose.Schema(
  {
    Engine: { type: String, required: true },
    Transmission: { type: String, required: true },
    Notes: { type: String, required: true },
    'Max Towing Capacity': { type: Number, required: true }
  }
);

  
const vehicleSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    Year: { type: Number, required: true },
    Make: { type: String, required: true },
    Model: { type: String, required: true },
    Trim: [TrimSchema]
  }
);

  
  const VehicleModel = mongoose.model('Capacities', vehicleSchema) || mongoose.models.Capacities;
  
 export default VehicleModel;