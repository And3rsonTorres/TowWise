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

  const handlePasteClipboard = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        const cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 17);
        if (cleaned) {
          setVin(cleaned);
          if (error) setError(null);
          if (cleaned.length === 17) {
            handleDecode(cleaned);
          }
        }
      }
    } catch (e) {
      // Clipboard access denied or unsupported
    }
  };

  const getCountryFromVin = (v: string) => {
    if (!v || v.length < 1) return null;
    const c = v[0];
    if (["1", "4", "5"].includes(c)) return { name: "United States", flag: "🇺🇸" };
    if (c === "2") return { name: "Canada", flag: "🇨🇦" };
    if (c === "3") return { name: "Mexico", flag: "🇲🇽" };
    if (c === "J") return { name: "Japan", flag: "🇯🇵" };
    if (c === "K") return { name: "South Korea", flag: "🇰🇷" };
    if (c === "S") return { name: "United Kingdom", flag: "🇬🇧" };
    if (["W", "V"].includes(c)) return { name: "Germany / Europe", flag: "🇪🇺" };
    return null;
  };

  const country = getCountryFromVin(vin);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md p-4 sm:p-6 mb-8">
        <CardBody className="gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>🔍</span> US & Canadian VIN Decoder
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Enter your 17-character VIN to decode exact specifications and towing limits directly with the offline US DOT NHTSA vPIC engine.
              </p>
            </div>
            <Chip color="success" variant="flat" size="sm" className="self-start sm:self-auto font-semibold">
              ⚡ 100% Offline Engine
            </Chip>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
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
                color={error ? "danger" : vin.length === 17 ? "success" : "primary"}
                isInvalid={!!error}
                errorMessage={error || undefined}
                className="w-full font-mono tracking-wider text-base"
                maxLength={17}
                classNames={{
                  label: "text-slate-200 font-medium group-data-[filled=true]:text-slate-100",
                  input: "text-white font-mono tracking-wider text-base font-semibold",
                  inputWrapper: "bg-slate-950/50 border-slate-700 data-[hover=true]:border-primary",
                }}
              />
              <div className="absolute right-3 top-3 flex items-center gap-1.5 z-10">
                {vin.length > 0 && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color={vin.length === 17 ? "success" : "default"}
                    className="font-mono text-xs font-semibold"
                  >
                    {vin.length}/17
                  </Chip>
                )}
              </div>
            </div>

            <Button
              color="default"
              variant="flat"
              size="lg"
              onPress={handlePasteClipboard}
              className="px-4 font-medium h-[56px] text-slate-200 hover:text-white bg-slate-800 border border-slate-700"
              title="Paste from clipboard"
            >
              📋 Paste
            </Button>

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

          {/* VIN Structural Breakdown Preview */}
          {vin.length >= 3 && (
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
              <div className="text-slate-300 font-semibold mb-1 flex items-center justify-between">
                <span>VIN Structure Breakdown:</span>
                {country && (
                  <span className="text-slate-200">
                    {country.flag} Origin: <strong>{country.name}</strong>
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                <div className="p-1.5 bg-blue-950/40 border border-blue-800/40 rounded">
                  <span className="block text-[10px] text-blue-300 uppercase">WMI (Make/Country)</span>
                  <span className="font-bold text-blue-200">{vin.slice(0, 3)}</span>
                </div>
                <div className="p-1.5 bg-purple-950/40 border border-purple-800/40 rounded">
                  <span className="block text-[10px] text-purple-300 uppercase">VDS (Model/Specs)</span>
                  <span className="font-bold text-purple-200">{vin.slice(3, 8) || "..."}</span>
                </div>
                <div className="p-1.5 bg-amber-950/40 border border-amber-800/40 rounded">
                  <span className="block text-[10px] text-amber-300 uppercase">Check & Year</span>
                  <span className="font-bold text-amber-200">{vin.slice(8, 10) || "..."}</span>
                </div>
                <div className="p-1.5 bg-emerald-950/40 border border-emerald-800/40 rounded">
                  <span className="block text-[10px] text-emerald-300 uppercase">VIS (Serial ID)</span>
                  <span className="font-bold text-emerald-200">{vin.slice(10, 17) || "..."}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick sample VIN buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
            <span className="font-semibold">Try sample VINs:</span>
            {SAMPLE_VINS.map((sample, idx) => (
              <Button
                key={idx}
                size="sm"
                variant="flat"
                className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs h-7"
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
                  <span className="text-xs text-slate-300 uppercase font-bold tracking-wider">
                    Decoded Vehicle
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {decodedData.year} {decodedData.make} {decodedData.model}
                  </h3>
                  {decodedData.trim && (
                    <span className="text-sm text-slate-200">{decodedData.trim}</span>
                  )}
                </div>
                <Chip color="success" variant="flat" size="sm" className="font-semibold">
                  NHTSA Verified
                </Chip>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-300 block font-medium">Engine</span>
                  <span className="font-semibold text-white">{decodedData.engine || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-300 block font-medium">Drivetrain</span>
                  <span className="font-semibold text-white">{decodedData.driveType || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-300 block font-medium">Body Class</span>
                  <span className="font-semibold text-white">{decodedData.bodyClass || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-300 block font-medium">GVWR Class</span>
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
