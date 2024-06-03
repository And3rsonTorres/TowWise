/**
 * GET handler for towing vehicle data API route.
 * Connects to MongoDB, validates query parameters, finds vehicles matching parameters, and returns vehicle trim data.
 * POST and PUT handlers redirect to error images.
 */
import ConnectDB from "@/app/lib/mongo";
import VehicleModel from "@/app/models/Towing";
import { NextRequest, NextResponse } from "next/server";
import { TowingSchema } from "@/app/lib/utils/Validations";

export async function GET(req: NextRequest) {
  await ConnectDB();

  const { searchParams } = new URL(req.url);
  const params = {
    Year: parseInt(searchParams.get("year") || "0"),
    Make: searchParams.get("make") || "",
    Model: searchParams.get("model") || "",
    TrimName: searchParams.get("trimName") || "",
  };
  let parsed = TowingSchema.safeParse(params);

  if (parsed.success) {
    return NextResponse.json(
      await VehicleModel.find(
        {
          Year: params.Year,
          Make: params.Make,
          Model: params.Model,
          "Trim.TrimName": params.TrimName,
        },
        { _id: 0, "Trim.$": 1 }
      )
    );
  } else {
    return NextResponse.json({ error: parsed.error }, { status: 404 });
  }
}
export async function POST(req: NextRequest) {
  return NextResponse.redirect("https://http.dog/405.jpg");
}
export async function PUT(req: NextRequest) {
  return NextResponse.redirect("https://http.dog/405.jpg");
}
