import ConnectDB  from '@/app/lib/mongo';
import { Vehicles } from '@/app/lib/Types';
import VehicleModel from "@/app/models/Towing";
  
export async function GET(request: Request) {
  await ConnectDB();
  const {searchParams} = new URL(request.url);
  
  const params:Vehicles = {
    Year: parseInt(searchParams.get('year') || '0'),
    Make: searchParams.get('make') || '',
    Model: searchParams.get('model') || ''
  }
    if (params.Year < 1998) {
      return Response.json("Year must be greater than or equal to 1998 and must have a make");
    }
  
    if (params.Make.length < 3) {
      return Response.json("Make must be at least 3 characters long");
    }
  
    let vehicles: typeof VehicleModel[] | null = null; // Declare vehicles as nullable
  
    // Query vehicles based on parameters
    if (params.Model) {
      vehicles = await VehicleModel.find({Year: params.Year, Make: params.Make, Model: params.Model});

    } else {
      vehicles = await VehicleModel.find({ Year: params.Year, Make: params.Make });
    }
  
    return Response.json(vehicles);
}  
export async function POST(request: Request) {
  return Response.json({message: "405 Method Not Allowed"});
}
export async function PUT(request: Request) {
  return Response.json({message: "405 Method Not Allowed"});
}