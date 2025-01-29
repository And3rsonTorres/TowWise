import ConnectDB from "@/app/lib/mongo";
import VehicleModel from "@/app/models/Towing";
import { NextRequest, NextResponse } from "next/server";
import { TowingSchema } from "@/app/lib/utils/Validations";

/**
 * Handles GET requests to the /towing API endpoint.
 * Retrieves vehicle information based on the provided query parameters.
 * If no parameters are provided, returns a list of all available vehicle trims.
 * If valid parameters are provided, returns the matching vehicle information.
 * If invalid parameters are provided, returns a 404 error response.
 *
 * @param {NextRequest} req - The incoming HTTP request.
 * @returns {NextResponse} - The response containing the vehicle information or an error.
 */ export async function GET(req: NextRequest) {
  await ConnectDB();

  const { searchParams } = new URL(req.url);
  const params = {
    Year: parseInt(searchParams.get("year") || "0"),
    Make: searchParams.get("make") || "",
    Model: searchParams.get("model") || "",
    TrimName: searchParams.get("trimName") || "",
  };
  let parsed = TowingSchema.safeParse(params);

  if (!params.Year && !params.Make && !params.Model && !params.TrimName) {
    const trims = await VehicleModel.find(
      {},
      {
        Year: 1,
        Make: 1,
        Model: 1,
        "Trim.TrimName": 1,
        _id: 0,
      }
    );
    return NextResponse.json(trims);
  }
  if (parsed.success) {
    const projection = params.TrimName
      ? { _id: 0, "Trim.$": 1 }
      : { _id: 0, Trim: 1 };

    const vehicles = await VehicleModel.find(
      {
        Year: params.Year,
        Make: params.Make,
        Model: params.Model,
        ...(params.TrimName && { "Trim.TrimName": params.TrimName }),
      },
      projection
    );

    return NextResponse.json(vehicles);
  } else {
    return NextResponse.json({ error: parsed.error }, { status: 404 });
  }
}

/**
 * Handles POST requests to the /towing API endpoint.
 * Returns a 405 Method Not Allowed response.
 *
 * @param {NextRequest} req - The incoming HTTP request.
 * @returns {NextResponse} - The 405 Method Not Allowed response.
 */
export async function POST(req: NextRequest) {
  return NextResponse.redirect("https://http.dog/405.jpg");
}
/**
 * Handles PUT requests to the /towing API endpoint.
 * Returns a 405 Method Not Allowed response.
 *
 * @param {NextRequest} req - The incoming HTTP request.
 * @returns {NextResponse} - The 405 Method Not Allowed response.
 */
export async function PUT(req: NextRequest) {
  return NextResponse.redirect("https://http.dog/405.jpg");
}
