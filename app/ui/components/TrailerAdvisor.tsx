"use client";
import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  Chip,
  Input,
  Tabs,
  Tab,
} from "@heroui/react";
import {
  calculate80PercentRule,
  calculateTongueWeight,
  getHitchClass,
  calculatePayloadAllowance,
  estimateVehiclePayload,
} from "@/app/lib/utils/TowCalculations";

interface TrailerAdvisorProps {
  maxTowingCapacity: number;
  vehicleName: string;
}

interface TrailerCategory {
  title: string;
  weightRange: string;
  minWeight: number;
  maxWeight: number;
  icon: string;
  examples: string;
}

const TRAILER_CATEGORIES: TrailerCategory[] = [
  {
    title: "Class I: Light Utility & Watercraft",
    weightRange: "Up to 2,000 lbs",
    minWeight: 500,
    maxWeight: 2000,
    icon: "🚤",
    examples: "Jet skis, canoe/kayak trailer, motorcycle trailer, teardrop micro-camper",
  },
  {
    title: "Class II: Small Campers & Fishing Boats",
    weightRange: "2,001 – 3,500 lbs",
    minWeight: 2001,
    maxWeight: 3500,
    icon: "🏕️",
    examples: "Pop-up tent campers, 16–20 ft aluminum fishing boats, small enclosed cargo trailers",
  },
  {
    title: "Class III: Mid-Size Travel Trailers",
    weightRange: "3,501 – 5,000 lbs",
    minWeight: 3501,
    maxWeight: 5000,
    icon: "🚙",
    examples: "20–24 ft travel trailers, fiberglass bowriders/ski boats, single-horse trailers",
  },
  {
    title: "Class IV: Heavy Travel Trailers & Toy Haulers",
    weightRange: "5,001 – 10,000 lbs",
    minWeight: 5001,
    maxWeight: 10000,
    icon: "🚐",
    examples: "25–34 ft travel trailers, dual-horse trailers, multi-ATV toy haulers, heavy dump trailers",
  },
  {
    title: "Class V: 5th Wheels & Commercial Hauling",
    weightRange: "10,001+ lbs",
    minWeight: 10001,
    maxWeight: 30000,
    icon: "🚛",
    examples: "Fifth-wheel RVs, multi-car haulers, industrial machinery, gooseneck trailers",
  },
];

export default function TrailerAdvisor({
  maxTowingCapacity,
  vehicleName,
}: TrailerAdvisorProps) {
  // Unified Reactive State
  const [activeTab, setActiveTab] = useState<string>("compatibility");
  const [trailerWeight, setTrailerWeight] = useState<number>(
    Math.round(maxTowingCapacity * 0.7)
  );

  // Payload inputs
  const estimatedPayload = useMemo(
    () => estimateVehiclePayload(vehicleName, maxTowingCapacity),
    [vehicleName, maxTowingCapacity]
  );
  const [maxPayload, setMaxPayload] = useState<number>(estimatedPayload);
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [cargoWeight, setCargoWeight] = useState<number>(150);
  const [hitchEquipmentWeight, setHitchEquipmentWeight] = useState<number>(75);

  // Computed Values via Calculation Engine
  const eightyPercent = useMemo(
    () => calculate80PercentRule(maxTowingCapacity, trailerWeight),
    [maxTowingCapacity, trailerWeight]
  );

  const tongueWeightResult = useMemo(
    () => calculateTongueWeight(trailerWeight),
    [trailerWeight]
  );

  const hitchClassResult = useMemo(
    () => getHitchClass(trailerWeight, tongueWeightResult.recommendedTongueWeight),
    [trailerWeight, tongueWeightResult.recommendedTongueWeight]
  );

  const payloadResult = useMemo(
    () =>
      calculatePayloadAllowance({
        maxPayload,
        adultCount,
        childCount,
        cargoWeight,
        tongueWeight: tongueWeightResult.recommendedTongueWeight,
        hitchEquipmentWeight,
      }),
    [
      maxPayload,
      adultCount,
      childCount,
      cargoWeight,
      tongueWeightResult.recommendedTongueWeight,
      hitchEquipmentWeight,
    ]
  );

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <Card className="bg-slate-900/85 border border-slate-800 shadow-2xl backdrop-blur-md">
        <CardHeader className="flex flex-col items-start gap-1 pb-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Towing Safety & Weight Calculator Studio
              </h3>
            </div>
            <Chip color="primary" variant="flat" size="sm" className="hidden sm:flex font-semibold">
              v1.1 Unified Suite
            </Chip>
          </div>
          <p className="text-sm text-slate-300">
            Real-time multi-metric calculations for{" "}
            <span className="text-amber-400 font-semibold">{vehicleName}</span>{" "}
            ({maxTowingCapacity.toLocaleString()} lbs rated).
          </p>
        </CardHeader>

        <CardBody className="gap-6 pt-2">
          {/* Multi-Metric Safety Dashboard Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* 80% Rule Metric */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                80% Safe Tow Limit
              </span>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">
                {eightyPercent.safetyCeiling.toLocaleString()}{" "}
                <span className="text-xs font-normal text-slate-300">lbs</span>
              </p>
              <Chip
                color={
                  eightyPercent.status === "safe"
                    ? "success"
                    : eightyPercent.status === "caution"
                    ? "warning"
                    : "danger"
                }
                variant="flat"
                size="sm"
                className="mt-1 text-[10px] h-5"
              >
                {eightyPercent.utilizationPercent}% Used
              </Chip>
            </div>

            {/* Tongue Weight Target */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Tongue Weight (12%)
              </span>
              <p className="text-xl font-extrabold text-sky-400 mt-0.5">
                {tongueWeightResult.recommendedTongueWeight.toLocaleString()}{" "}
                <span className="text-xs font-normal text-slate-300">lbs</span>
              </p>
              <span className="text-[11px] text-slate-300 block mt-1 font-medium">
                Safe: {tongueWeightResult.minTongueWeight}–{tongueWeightResult.maxTongueWeight} lbs
              </span>
            </div>

            {/* Hitch Receiver Class */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Hitch Class Required
              </span>
              <p className="text-xl font-extrabold text-amber-400 mt-0.5">
                {hitchClassResult.hitchClass}
              </p>
              <span className="text-[11px] text-slate-300 block mt-1 font-medium">
                {hitchClassResult.receiverSize}
              </span>
            </div>

            {/* Remaining Payload Headroom */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Remaining Payload
              </span>
              <p
                className={`text-xl font-extrabold mt-0.5 ${
                  payloadResult.remainingPayload >= 0
                    ? "text-teal-400"
                    : "text-rose-400"
                }`}
              >
                {payloadResult.remainingPayload.toLocaleString()}{" "}
                <span className="text-xs font-normal text-slate-300">lbs</span>
              </p>
              <Chip
                color={
                  payloadResult.status === "safe"
                    ? "success"
                    : payloadResult.status === "caution"
                    ? "warning"
                    : "danger"
                }
                variant="flat"
                size="sm"
                className="mt-1 text-[10px] h-5"
              >
                {payloadResult.status === "overloaded" ? "Overloaded" : `${payloadResult.utilizationPercent}% Used`}
              </Chip>
            </div>
          </div>

          {/* Interactive Calculator Tabs */}
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
            variant="solid"
            color="primary"
            className="w-full"
            classNames={{
              tabList: "bg-slate-950/70 border border-slate-800 p-1 rounded-xl w-full flex",
              cursor: "bg-primary shadow-lg",
              tab: "text-slate-300 data-[selected=true]:text-white font-semibold text-xs sm:text-sm py-2",
            }}
          >
            {/* TAB 1: 80% Rule & Compatibility */}
            <Tab key="compatibility" title="1. 80% Safety & Categories">
              <div className="space-y-5 pt-3">
                {/* Interactive Slider & Status */}
                <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/80">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <span>Loaded Trailer Weight Simulation</span>
                        <Chip
                          color={
                            eightyPercent.status === "safe"
                              ? "success"
                              : eightyPercent.status === "caution"
                              ? "warning"
                              : "danger"
                          }
                          variant="flat"
                          size="sm"
                          className="font-semibold"
                        >
                          {eightyPercent.badgeText}
                        </Chip>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {eightyPercent.advice}
                      </p>
                    </div>

                    <div className="w-full sm:w-44 flex-shrink-0">
                      <Input
                        type="number"
                        label="Trailer Weight (lbs)"
                        value={trailerWeight.toString()}
                        onChange={(e) =>
                          setTrailerWeight(Math.max(0, parseInt(e.target.value, 10) || 0))
                        }
                        variant="bordered"
                        size="sm"
                        classNames={{
                          label: "text-slate-200 font-medium",
                          input: "text-white font-bold text-base",
                          inputWrapper:
                            "bg-slate-950/50 border-slate-700 data-[hover=true]:border-primary",
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-300 font-medium">
                      <span>0 lbs</span>
                      <span className="text-emerald-400 font-semibold">
                        80% Margin ({eightyPercent.safetyCeiling.toLocaleString()} lbs)
                      </span>
                      <span className="text-amber-400 font-semibold">
                        100% Rating ({maxTowingCapacity.toLocaleString()} lbs)
                      </span>
                    </div>
                    <Progress
                      value={Math.min(eightyPercent.utilizationPercent, 150)}
                      maxValue={100}
                      color={
                        eightyPercent.status === "safe"
                          ? "success"
                          : eightyPercent.status === "caution"
                          ? "warning"
                          : "danger"
                      }
                      className="h-3 rounded-full"
                    />
                    <div className="flex justify-between text-xs text-slate-400 pt-1">
                      <span>
                        Simulating:{" "}
                        <strong className="text-white">
                          {trailerWeight.toLocaleString()} lbs
                        </strong>
                      </span>
                      <span>
                        Current Load:{" "}
                        <strong className="text-white">
                          {eightyPercent.utilizationPercent}%
                        </strong>{" "}
                        of vehicle capacity
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compatible Trailer Categories Table */}
                <div>
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
                    Compatible Trailer Classes for {maxTowingCapacity.toLocaleString()} lbs
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRAILER_CATEGORIES.map((cat, idx) => {
                      const canTowFully = maxTowingCapacity >= cat.maxWeight;
                      const canTowPartially =
                        !canTowFully && maxTowingCapacity >= cat.minWeight;

                      let badgeColor: "success" | "warning" | "danger" = "danger";
                      let badgeText = "Exceeds Capacity";

                      if (canTowFully) {
                        badgeColor = "success";
                        badgeText = "Fully Compatible";
                      } else if (canTowPartially) {
                        badgeColor = "warning";
                        badgeText = "Light Models Only";
                      }

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border flex flex-col justify-between ${
                            canTowFully
                              ? "bg-slate-800/40 border-slate-700"
                              : canTowPartially
                              ? "bg-amber-950/20 border-amber-800/50"
                              : "bg-slate-900/30 border-slate-800/40 opacity-60"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-white flex items-center gap-2 text-sm">
                                <span>{cat.icon}</span>
                                <span>{cat.title}</span>
                              </span>
                              <Chip size="sm" color={badgeColor} variant="flat">
                                {badgeText}
                              </Chip>
                            </div>
                            <p className="text-xs text-amber-300 font-medium">
                              {cat.weightRange}
                            </p>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              {cat.examples}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Tab>

            {/* TAB 2: Tongue Weight & Hitch Class */}
            <Tab key="tongue_hitch" title="2. Tongue Weight & Hitch">
              <div className="space-y-5 pt-3">
                {/* Tongue Weight Explanation Card */}
                <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/80">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span>🎯 10%–15% Tongue Weight Target Range</span>
                    </h4>
                    <Chip
                      color={
                        tongueWeightResult.status === "optimal"
                          ? "success"
                          : tongueWeightResult.status === "sway_risk"
                          ? "danger"
                          : "warning"
                      }
                      variant="flat"
                      size="sm"
                      className="font-semibold"
                    >
                      {tongueWeightResult.statusText}
                    </Chip>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {tongueWeightResult.advice}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700">
                      <span className="text-xs text-slate-400 block font-bold">
                        Minimum 10% (Floor)
                      </span>
                      <p className="text-xl font-bold text-amber-400 mt-0.5">
                        {tongueWeightResult.minTongueWeight.toLocaleString()} lbs
                      </p>
                      <span className="text-[11px] text-slate-400">Below this = Sway Risk</span>
                    </div>

                    <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/60">
                      <span className="text-xs text-emerald-300 block font-bold">
                        Recommended (12% Target)
                      </span>
                      <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">
                        {tongueWeightResult.recommendedTongueWeight.toLocaleString()} lbs
                      </p>
                      <span className="text-[11px] text-emerald-300">Optimal Stability</span>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700">
                      <span className="text-xs text-slate-400 block font-bold">
                        Maximum 15% (Ceiling)
                      </span>
                      <p className="text-xl font-bold text-sky-400 mt-0.5">
                        {tongueWeightResult.maxTongueWeight.toLocaleString()} lbs
                      </p>
                      <span className="text-[11px] text-slate-400">Above this = Rear Squat</span>
                    </div>
                  </div>
                </div>

                {/* Hitch Receiver Specification Card */}
                <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/80">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span>🔩 Required Hitch Receiver Class: {hitchClassResult.hitchClass}</span>
                    </h4>
                    <Chip color="warning" variant="flat" size="sm" className="font-semibold">
                      {hitchClassResult.receiverSize}
                    </Chip>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {hitchClassResult.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-slate-900/70 rounded-lg border border-slate-700/60">
                      <span className="text-xs text-slate-400 block">Hitch Max GTW:</span>
                      <span className="font-bold text-white">
                        {hitchClassResult.maxGrossTrailerWeight.toLocaleString()} lbs
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900/70 rounded-lg border border-slate-700/60">
                      <span className="text-xs text-slate-400 block">Hitch Max Tongue Weight:</span>
                      <span className="font-bold text-white">
                        {hitchClassResult.maxTongueWeight.toLocaleString()} lbs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            {/* TAB 3: Payload & Passenger Allowance */}
            <Tab key="payload" title="3. Payload & Passenger Calc">
              <div className="space-y-5 pt-3">
                {/* Vehicle Payload Headroom Card */}
                <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/80">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <span>📦 Total Vehicle Payload Utilization</span>
                        <Chip
                          color={
                            payloadResult.status === "safe"
                              ? "success"
                              : payloadResult.status === "caution"
                              ? "warning"
                              : "danger"
                          }
                          variant="flat"
                          size="sm"
                          className="font-semibold"
                        >
                          {payloadResult.statusText}
                        </Chip>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {payloadResult.advice}
                      </p>
                    </div>

                    <div className="w-full sm:w-44 flex-shrink-0">
                      <Input
                        type="number"
                        label="Door Sticker Payload (lbs)"
                        value={maxPayload.toString()}
                        onChange={(e) =>
                          setMaxPayload(Math.max(1, parseInt(e.target.value, 10) || 1))
                        }
                        variant="bordered"
                        size="sm"
                        description="Check driver door tire placard"
                        classNames={{
                          label: "text-slate-200 font-medium",
                          input: "text-white font-bold text-base",
                          inputWrapper:
                            "bg-slate-950/50 border-slate-700 data-[hover=true]:border-primary",
                          description: "text-[10px] text-slate-400",
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-slate-300 font-medium">
                      <span>0 lbs</span>
                      <span className="text-slate-300">
                        Total Load:{" "}
                        <strong className="text-white">
                          {payloadResult.totalLoad.toLocaleString()} lbs
                        </strong>
                      </span>
                      <span className="text-amber-400 font-semibold">
                        GVWR Payload Limit: {maxPayload.toLocaleString()} lbs
                      </span>
                    </div>
                    <Progress
                      value={Math.min(payloadResult.utilizationPercent, 150)}
                      maxValue={100}
                      color={
                        payloadResult.status === "safe"
                          ? "success"
                          : payloadResult.status === "caution"
                          ? "warning"
                          : "danger"
                      }
                      className="h-3 rounded-full"
                    />
                    <div className="flex justify-between text-xs text-slate-400 pt-1">
                      <span>
                        Remaining Headroom:{" "}
                        <strong
                          className={
                            payloadResult.remainingPayload >= 0
                              ? "text-emerald-400"
                              : "text-rose-400"
                          }
                        >
                          {payloadResult.remainingPayload.toLocaleString()} lbs
                        </strong>
                      </span>
                      <span>
                        Utilization:{" "}
                        <strong className="text-white">
                          {payloadResult.utilizationPercent}%
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hybrid Inputs: Passenger Steppers & Cargo */}
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/80">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300 mb-3">
                    What&apos;s Inside Your Vehicle (Payload Breakdown)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Adults (175 lbs)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="8"
                        size="sm"
                        value={adultCount.toString()}
                        onChange={(e) =>
                          setAdultCount(Math.max(1, parseInt(e.target.value, 10) || 1))
                        }
                        classNames={{
                          input: "text-white font-bold",
                          inputWrapper: "bg-slate-950/60 border-slate-700",
                        }}
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        = {adultCount * 175} lbs
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Children (80 lbs)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="6"
                        size="sm"
                        value={childCount.toString()}
                        onChange={(e) =>
                          setChildCount(Math.max(0, parseInt(e.target.value, 10) || 0))
                        }
                        classNames={{
                          input: "text-white font-bold",
                          inputWrapper: "bg-slate-950/60 border-slate-700",
                        }}
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        = {childCount * 80} lbs
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Cargo / Luggage (lbs)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        size="sm"
                        value={cargoWeight.toString()}
                        onChange={(e) =>
                          setCargoWeight(Math.max(0, parseInt(e.target.value, 10) || 0))
                        }
                        classNames={{
                          input: "text-white font-bold",
                          inputWrapper: "bg-slate-950/60 border-slate-700",
                        }}
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Trunk & bed gear
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Hitch Gear / WDH
                      </label>
                      <Input
                        type="number"
                        min="0"
                        size="sm"
                        value={hitchEquipmentWeight.toString()}
                        onChange={(e) =>
                          setHitchEquipmentWeight(Math.max(0, parseInt(e.target.value, 10) || 0))
                        }
                        classNames={{
                          input: "text-white font-bold",
                          inputWrapper: "bg-slate-950/60 border-slate-700",
                        }}
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Hitch ball & bars
                      </span>
                    </div>
                  </div>

                  {/* Auto-synced tongue weight notice */}
                  <div className="mt-3 p-2.5 bg-blue-950/30 border border-blue-800/40 rounded-lg text-xs text-blue-200 flex items-center justify-between">
                    <span>
                      🔗 Trailer Tongue Weight automatically included:{" "}
                      <strong className="text-white">
                        {tongueWeightResult.recommendedTongueWeight.toLocaleString()} lbs
                      </strong>
                    </span>
                    <span className="text-[10px] text-blue-300">
                      Synced from Tab 1 & 2
                    </span>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
