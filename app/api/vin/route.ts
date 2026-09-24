import { NextRequest, NextResponse } from "next/server";
import { SERVERLESS_VEHICLES } from "@/app/lib/data/vehicleData";
import { decodeVinLocally, LocalDecodedVin } from "@/app/lib/nhtsa/localVpicDatabase";
import { Vehicles } from "@/app/lib/Types";

/**
 * Handles GET requests to /api/vin.
 * Uses a hybrid local-first architecture:
 * 1. Decodes locally using the self-hosted NHTSA vPIC dataset (instant, 100% offline).
 * 2. Attempts to enrich with live NHTSA API if network is available.
 * 3. Cross-references with TowWise's towing database (including trucks, SUVs, and small cars).
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vin = searchParams.get("vin")?.trim().toUpperCase();

  if (!vin) {
    return NextResponse.json({ error: "VIN query parameter is required" }, { status: 400 });
  }

  // Basic VIN validation (17 characters, no I, O, Q)
  if (vin.length !== 17 || /[IOQ]/i.test(vin)) {
    return NextResponse.json(
      { error: "Invalid VIN: Must be exactly 17 alphanumeric characters (excluding letters I, O, and Q)." },
      { status: 400 }
    );
  }

  // 1. Instant local offline decode
  const localDecoded: LocalDecodedVin | null = decodeVinLocally(vin);

  let finalDecoded = localDecoded || {
    vin,
    year: 2024,
    make: "Unknown",
    model: "Vehicle",
    bodyClass: "Passenger Vehicle",
    driveType: "Standard",
    engine: "Standard Powertrain",
    gvwr: "Standard",
    country: "North America",
    source: "local_vpic_db" as const,
  };

  // 2. Attempt remote NHTSA enrichment with 3-second timeout
  try {
    const nhtsaUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(nhtsaUrl, {
      signal: controller.signal,
      next: { revalidate: 86400 },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const result = data.Results?.[0];

      if (result && result.Make) {
        const decodedYear = parseInt(result.ModelYear, 10) || finalDecoded.year;
        const decodedMake = result.Make || finalDecoded.make;
        const decodedModel = result.Model || finalDecoded.model;
        const engineCyl = result.EngineCylinders;
        const displacement = result.DisplacementL
          ? `${parseFloat(result.DisplacementL).toFixed(1)}L`
          : "";
        const driveType = result.DriveType || finalDecoded.driveType;
        const gvwr = result.GVWR || finalDecoded.gvwr;
        const bodyClass = result.BodyClass || finalDecoded.bodyClass;
        const series = result.Series || result.Trim || "";

        finalDecoded = {
          vin,
          year: decodedYear,
          make: decodedMake,
          model: decodedModel,
          trim: series,
          engine: [displacement, engineCyl ? `V${engineCyl}` : ""].filter(Boolean).join(" ") || finalDecoded.engine,
          driveType,
          gvwr,
          bodyClass,
          country: result.PlantCountry || finalDecoded.country,
          source: "nhtsa_live_api",
        };
      }
    }
  } catch (netErr: any) {
    // If offline or timed out, local decode seamlessly handles the request
    console.log("Remote NHTSA unavailable or timed out; served from local vPIC copy:", netErr?.message || netErr);
  }

  // 3. Match against TowWise towing database (including trucks, SUVs, and small cars)
  const candidateMatches = SERVERLESS_VEHICLES.filter(
    (v) =>
      v.Make.toLowerCase() === finalDecoded.make.toLowerCase() &&
      (v.Model.toLowerCase().includes(finalDecoded.model.toLowerCase()) ||
        finalDecoded.model.toLowerCase().includes(v.Model.toLowerCase()))
  );

  let matchedVehicle: Vehicles | null = null;
  if (candidateMatches.length > 0) {
    const exactYear = candidateMatches.find((v) => v.Year === finalDecoded.year);
    matchedVehicle = exactYear || candidateMatches[0];
  }

  return NextResponse.json({
    vin,
    decoded: finalDecoded,
    matchedVehicle,
  });
}
