"use client";
import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  Chip,
  Input,
  Button,
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
import {
  calculateHitchDrop,
  getVehicleDefaultHitchHeight,
} from "@/app/lib/utils/HitchDropCalculator";

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

  // Hitch Drop & Leveling inputs
  const defaultHitchHeight = useMemo(
    () => getVehicleDefaultHitchHeight(vehicleName),
    [vehicleName]
  );
  const [hitchHeight, setHitchHeight] = useState<number>(defaultHitchHeight);
  const [couplerHeight, setCouplerHeight] = useState<number>(17);
  const [accountForSquat, setAccountForSquat] = useState<boolean>(true);

  const hitchDropResult = useMemo(
    () =>
      calculateHitchDrop({
        hitchReceiverHeight: hitchHeight,
        trailerCouplerHeight: couplerHeight,
        accountForSquat,
        grossTrailerWeight: trailerWeight,
      }),
    [hitchHeight, couplerHeight, accountForSquat, trailerWeight]
  );

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

            {/* TAB 4: Hitch Drop & Leveling Calculator */}
            <Tab key="hitch_drop" title="4. Hitch Drop & Leveling">
              <div className="space-y-5 pt-3">
                {/* Result Banner & Ball Mount Recommendation */}
                <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/80">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <span>📐 Ball Mount Requirement:</span>
                        <Chip
                          color={
                            hitchDropResult.mountType === "level"
                              ? "success"
                              : hitchDropResult.mountType === "drop"
                              ? "warning"
                              : "secondary"
                          }
                          variant="flat"
                          size="sm"
                          className="font-bold text-sm"
                        >
                          {hitchDropResult.recommendedMountSize}
                        </Chip>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {hitchDropResult.stanceAdvice}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700">
                      <span className="text-xs text-slate-400 block font-semibold">
                        Hitch Ball Size:
                      </span>
                      <Chip color="primary" variant="solid" size="sm" className="font-extrabold text-sm">
                        {hitchDropResult.ballDiameterRecommendation} Ball
                      </Chip>
                    </div>
                  </div>

                  {/* Dynamic Visual Leveling Graphic */}
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                        Trailer Level Stance Simulation
                      </span>
                      <Chip
                        size="sm"
                        variant="dot"
                        color={
                          hitchDropResult.trailerStance === "level"
                            ? "success"
                            : hitchDropResult.trailerStance === "nose_high"
                            ? "warning"
                            : "danger"
                        }
                        className="text-xs font-semibold"
                      >
                        {hitchDropResult.trailerStance === "level"
                          ? "Level Towing (Optimal)"
                          : hitchDropResult.trailerStance === "nose_high"
                          ? "Nose-High (Requires Drop)"
                          : "Nose-Low (Requires Rise)"}
                      </Chip>
                    </div>

                    {/* SVG Diagram showing Truck Hitch & Trailer Frame */}
                    <div className="w-full flex justify-center py-2">
                      <svg
                        viewBox="0 0 500 120"
                        className="w-full max-w-lg h-28 overflow-visible"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Ground Line */}
                        <line x1="20" y1="105" x2="480" y2="105" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
                        <text x="485" y="108" fill="#64748b" fontSize="9" fontFamily="sans-serif">Ground</text>

                        {/* Vehicle Receiver (Left) */}
                        <rect x="50" y={95 - hitchDropResult.effectiveHitchHeight * 2.8} width="55" height="18" rx="2" fill="#334155" stroke="#0284c7" strokeWidth="2" />
                        <text x="54" y={90 - hitchDropResult.effectiveHitchHeight * 2.8} fill="#94a3b8" fontSize="9" fontWeight="bold">
                          Hitch ({hitchDropResult.effectiveHitchHeight}&quot;)
                        </text>

                        {/* Ball Mount Drop/Rise Shank */}
                        {hitchDropResult.mountType === "drop" ? (
                          <path
                            d={`M 105 ${104 - hitchDropResult.effectiveHitchHeight * 2.8} L 130 ${104 - hitchDropResult.effectiveHitchHeight * 2.8} L 130 ${104 - hitchDropResult.trailerCouplerHeight * 2.8} L 145 ${104 - hitchDropResult.trailerCouplerHeight * 2.8}`}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        ) : hitchDropResult.mountType === "rise" ? (
                          <path
                            d={`M 105 ${104 - hitchDropResult.effectiveHitchHeight * 2.8} L 130 ${104 - hitchDropResult.effectiveHitchHeight * 2.8} L 130 ${104 - hitchDropResult.trailerCouplerHeight * 2.8} L 145 ${104 - hitchDropResult.trailerCouplerHeight * 2.8}`}
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        ) : (
                          <line
                            x1="105"
                            y1={104 - hitchDropResult.effectiveHitchHeight * 2.8}
                            x2="145"
                            y2={104 - hitchDropResult.trailerCouplerHeight * 2.8}
                            stroke="#10b981"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        )}

                        {/* Hitch Ball */}
                        <circle cx="145" cy={98 - hitchDropResult.trailerCouplerHeight * 2.8} r="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />

                        {/* Trailer Coupler (Right) */}
                        <path
                          d={`M 145 ${104 - hitchDropResult.trailerCouplerHeight * 2.8} L 200 ${104 - hitchDropResult.trailerCouplerHeight * 2.8} L 380 ${104 - (hitchDropResult.trailerCouplerHeight) * 2.8}`}
                          stroke={hitchDropResult.trailerStance === "level" ? "#10b981" : "#e2e8f0"}
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <text x="205" y={92 - hitchDropResult.trailerCouplerHeight * 2.8} fill="#94a3b8" fontSize="9" fontWeight="bold">
                          Coupler ({hitchDropResult.trailerCouplerHeight}&quot;)
                        </text>

                        {/* Trailer Box Body */}
                        <rect x="230" y={40 - (hitchDropResult.trailerCouplerHeight - 17) * 2} width="160" height="55" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="275" y={72 - (hitchDropResult.trailerCouplerHeight - 17) * 2} fill="#94a3b8" fontSize="11" fontWeight="bold">
                          Trailer Box
                        </text>

                        {/* Trailer Tires */}
                        <circle cx="280" cy="98" r="10" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                        <circle cx="330" cy="98" r="10" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      <span>Vehicle: Ground to Inside Receiver Roof</span>
                      <span>Trailer: Ground to Coupler When Frame is Level</span>
                    </div>
                  </div>

                  {/* Measurement Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                      <label className="text-xs font-semibold text-slate-200 block mb-1">
                        1. Hitch Receiver Height (H)
                      </label>
                      <Input
                        type="number"
                        step="0.5"
                        min="10"
                        max="32"
                        size="sm"
                        value={hitchHeight.toString()}
                        onChange={(e) =>
                          setHitchHeight(Math.max(10, parseFloat(e.target.value) || 10))
                        }
                        endContent={<span className="text-xs text-slate-400">in</span>}
                        classNames={{
                          input: "text-white font-bold",
                          inputWrapper: "bg-slate-950/60 border-slate-700",
                        }}
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Ground to top inside receiver
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                      <label className="text-xs font-semibold text-slate-200 block mb-1">
                        2. Level Trailer Coupler (C)
                      </label>
                      <Input
                        type="number"
                        step="0.5"
                        min="10"
                        max="30"
                        size="sm"
                        value={couplerHeight.toString()}
                        onChange={(e) =>
                          setCouplerHeight(Math.max(10, parseFloat(e.target.value) || 10))
                        }
                        endContent={<span className="text-xs text-slate-400">in</span>}
                        classNames={{
                          input: "text-white font-bold",
                          inputWrapper: "bg-slate-950/60 border-slate-700",
                        }}
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Ground to bottom of level coupler (std ~17&quot;)
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60 flex flex-col justify-between">
                      <div>
                        <label className="text-xs font-semibold text-slate-200 block mb-1">
                          3. Suspension Squat Under Load
                        </label>
                        <span className="text-[10px] text-slate-400 block mb-2">
                          Pickups & SUVs squat ~1.25&quot; under tongue weight
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant={accountForSquat ? "solid" : "bordered"}
                        color={accountForSquat ? "primary" : "default"}
                        onPress={() => setAccountForSquat(!accountForSquat)}
                        className="w-full text-xs font-semibold"
                      >
                        {accountForSquat ? "✓ Squat Compensated (-1.25\")" : "Off (Unladen Height Only)"}
                      </Button>
                    </div>
                  </div>

                  {/* Pro Tip Box */}
                  <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs text-slate-300 leading-relaxed">
                    💡 <strong>How to measure:</strong> Park vehicle and trailer on level concrete. Level your trailer frame using the tongue jack and a bubble level. Measure from the ground to the bottom of the coupler. Then measure from the ground to the top inside edge of your vehicle receiver tube. The difference equals your required drop or rise.
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
