"use client";
import React, { useState } from "react";
import { Input, Button, Card, CardBody, Chip, Spinner } from "@heroui/react";
import { Vehicles } from "@/app/lib/Types";
import TowingTable from "./TowingTables";

interface DecodedVin {
  year: number;
  make: string;
  model: string;
  trim: string;
  engine: string;
  driveType: string;
  gvwr: string;
  bodyClass: string;
  country?: string;
  source?: string;
}

const SAMPLE_VINS = [
  { label: "2021 Ford F-150 (Truck)", vin: "1FTFW1ED4MFB12345" },
  { label: "2022 Chevy Tahoe (SUV)", vin: "1GNSKCKC4NR198273" },
  { label: "2023 Toyota Corolla (Small Car)", vin: "4T1B11HK5PU123456" },
  { label: "2022 Honda Civic (Small Car)", vin: "1HGCV1F18NA098765" },
  { label: "2023 Tesla Model 3 (EV)", vin: "5YJ3E1EB8PF123456" },
];

export default function VinSearch() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decodedData, setDecodedData] = useState<DecodedVin | null>(null);
  const [matchedVehicle, setMatchedVehicle] = useState<Vehicles | null>(null);

  const handleDecode = async (targetVin?: string) => {
    const vinToQuery = (targetVin || vin).trim().toUpperCase();
    if (!vinToQuery) {
      setError("Please enter a 17-character VIN");
      return;
    }

    if (vinToQuery.length !== 17) {
      setError(`VIN must be exactly 17 characters long (current length: ${vinToQuery.length})`);
      return;
    }

    if (/[IOQ]/i.test(vinToQuery)) {
      setError("Invalid VIN: Letters I, O, and Q are not permitted in standard vehicle VINs");
      return;
    }

    setError(null);
    setLoading(true);
    setDecodedData(null);
    setMatchedVehicle(null);

    try {
      const response = await fetch(`/api/vin?vin=${encodeURIComponent(vinToQuery)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to decode VIN. Please verify the number.");
        setLoading(false);
        return;
      }

      setDecodedData(data.decoded);
      if (data.matchedVehicle) {
        setMatchedVehicle(data.matchedVehicle);
      }
    } catch (err: any) {
      setError("Network error while connecting to VIN decoder service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md p-4 sm:p-6 mb-8">
        <CardBody className="gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔍</span> US & Canadian VIN Decoder
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Enter your vehicle&apos;s 17-character VIN (found on your dashboard, driver door jamb, or insurance card) to decode exact specifications and towing limits directly from the US DOT NHTSA database.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              label="Vehicle Identification Number (VIN)"
              placeholder="e.g. 1FTFW1ED4MFB12345"
              value={vin}
              onChange={(e) => {
                setVin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 17));
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleDecode();
              }}
              variant="bordered"
              color={error ? "danger" : "primary"}
              isInvalid={!!error}
              errorMessage={error || undefined}
              className="flex-1 font-mono tracking-wider text-base"
              maxLength={17}
            />

            <Button
              color="primary"
              size="lg"
              variant="shadow"
              onPress={() => handleDecode()}
              isDisabled={vin.length < 11 || loading}
              className="px-8 font-semibold h-[56px]"
            >
              {loading ? <Spinner size="sm" color="current" /> : "Decode VIN"}
            </Button>
          </div>

          {/* Quick sample VIN buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
            <span>Try sample VINs:</span>
            {SAMPLE_VINS.map((sample, idx) => (
              <Button
                key={idx}
                size="sm"
                variant="flat"
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs h-7"
                onPress={() => {
                  setVin(sample.vin);
                  handleDecode(sample.vin);
                }}
              >
                {sample.label}
              </Button>
            ))}
          </div>

          {/* Decoded NHTSA Specifications Summary */}
          {decodedData && (
            <div className="mt-4 p-5 rounded-xl bg-slate-800/70 border border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3 mb-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                    Decoded Vehicle
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {decodedData.year} {decodedData.make} {decodedData.model}
                  </h3>
                  {decodedData.trim && (
                    <span className="text-sm text-slate-300">{decodedData.trim}</span>
                  )}
                </div>
                <Chip color="success" variant="flat" size="sm">
                  NHTSA Verified
                </Chip>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">Engine</span>
                  <span className="font-semibold text-white">{decodedData.engine || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Drivetrain</span>
                  <span className="font-semibold text-white">{decodedData.driveType || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Body Class</span>
                  <span className="font-semibold text-white">{decodedData.bodyClass || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">GVWR Class</span>
                  <span className="font-semibold text-white text-xs">{decodedData.gvwr || "N/A"}</span>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Towing capacity table & safety advisor for matched vehicle */}
      {matchedVehicle && (
        <div className="mt-6">
          <TowingTable vehicle={matchedVehicle} />
        </div>
      )}
    </div>
  );
}
