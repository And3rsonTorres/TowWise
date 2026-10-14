"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, Chip, Slider } from "@heroui/react";
import { calculateEvTowingRange, isElectricVehicle } from "@/app/lib/utils/EvRangeCalculator";

interface EvRangeAdvisorProps {
  vehicleModel: string;
  engineDesc?: string;
  notes?: string;
  trailerWeight: number;
}

export default function EvRangeAdvisor({
  vehicleModel,
  engineDesc,
  notes,
  trailerWeight,
}: EvRangeAdvisorProps) {
  const isEv = isElectricVehicle(vehicleModel, engineDesc, notes);
  const [cruisingSpeed, setCruisingSpeed] = useState<number>(65);

  if (!isEv) return null;

  const evResult = calculateEvTowingRange(
    vehicleModel,
    trailerWeight,
    cruisingSpeed,
    engineDesc
  );

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <Card className="bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-teal-950/70 border border-teal-800/60 shadow-2xl backdrop-blur-md">
        <CardHeader className="flex flex-col items-start gap-1 pb-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                Electric Vehicle (EV) Towing Range Estimator
              </h3>
            </div>
            <Chip color="secondary" variant="flat" size="sm" className="font-semibold">
              Aerodynamic Drag Model
            </Chip>
          </div>
          <p className="text-xs text-slate-300">
            Real-world battery range degradation analysis for{" "}
            <span className="text-teal-300 font-semibold">{vehicleModel}</span> while towing.
          </p>
        </CardHeader>

        <CardBody className="gap-5 pt-2">
          {/* Key Range Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/70">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                EPA Unloaded Range
              </span>
              <p className="text-xl font-extrabold text-slate-200 mt-0.5">
                {evResult.baseRangeMiles} <span className="text-xs font-normal">miles</span>
              </p>
              <span className="text-[10px] text-slate-400">Solo vehicle highway</span>
            </div>

            <div className="bg-teal-950/50 p-3 rounded-xl border border-teal-700/60">
              <span className="text-[11px] uppercase tracking-wider text-teal-300 font-bold block">
                Estimated Towing Range
              </span>
              <p className="text-xl font-extrabold text-teal-300 mt-0.5">
                {evResult.towingRangeMiles} <span className="text-xs font-normal">miles</span>
              </p>
              <Chip color="danger" variant="flat" size="sm" className="mt-0.5 text-[10px] h-5">
                -{evResult.rangeDropPercent}% Drop
              </Chip>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/70">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Energy Consumption
              </span>
              <p className="text-xl font-extrabold text-sky-400 mt-0.5">
                ~{evResult.consumptionWhPerMile} <span className="text-xs font-normal">Wh/mi</span>
              </p>
              <span className="text-[10px] text-slate-400">~1.2–1.5 mi/kWh</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/70">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Recommended Staging
              </span>
              <p className="text-xs font-semibold text-amber-300 mt-1 leading-snug">
                {evResult.chargingStopsRecommended}
              </p>
            </div>
          </div>

          {/* Speed Impact Slider */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-200">
                Highway Cruising Speed: <span className="text-teal-400 font-extrabold">{cruisingSpeed} MPH</span>
              </label>
              <span className="text-xs text-slate-400">Speed drastically affects aero drag</span>
            </div>

            <Slider
              size="sm"
              step={1}
              minValue={50}
              maxValue={80}
              value={cruisingSpeed}
              onChange={(v) => setCruisingSpeed(typeof v === "number" ? v : v[0])}
              color="primary"
              className="max-w-full"
            />

            <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
              <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-slate-400 block">At 55 MPH</span>
                <strong className="text-emerald-400 font-bold">{evResult.speedImpact.at55mph} mi</strong>
              </div>
              <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-slate-400 block">At 65 MPH</span>
                <strong className="text-teal-300 font-bold">{evResult.speedImpact.at65mph} mi</strong>
              </div>
              <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-slate-400 block">At 75 MPH</span>
                <strong className="text-rose-400 font-bold">{evResult.speedImpact.at75mph} mi</strong>
              </div>
            </div>

            <p className="text-xs text-slate-300 mt-3 italic">
              💡 {evResult.advice} Look for pull-through DC fast chargers to avoid unhitching your trailer at charge stops.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
