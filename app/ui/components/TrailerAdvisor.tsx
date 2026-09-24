"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, Progress, Chip, Input } from "@heroui/react";

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

export default function TrailerAdvisor({ maxTowingCapacity, vehicleName }: TrailerAdvisorProps) {
  const [testWeight, setTestWeight] = useState<number>(Math.round(maxTowingCapacity * 0.7));

  const safeEightyPercent = Math.round(maxTowingCapacity * 0.8);
  const minTongueWeight = Math.round(maxTowingCapacity * 0.1);
  const maxTongueWeight = Math.round(maxTowingCapacity * 0.15);

  const percentage = maxTowingCapacity > 0 ? Math.min(Math.round((testWeight / maxTowingCapacity) * 100), 150) : 0;

  const getSafetyStatus = () => {
    if (testWeight <= safeEightyPercent) {
      return {
        label: "Safe & Optimal (Under 80% Rule)",
        color: "success" as const,
        description: "Optimal configuration with plenty of safety margin for highway climbing, wind gusts, and passengers.",
      };
    } else if (testWeight <= maxTowingCapacity) {
      return {
        label: "Caution: Near Limit (80%–100%)",
        color: "warning" as const,
        description: "Within factory limits, but engine transmission temps and braking distance will be pushed. Exercise caution on grades.",
      };
    } else {
      return {
        label: "DANGER: Overloaded (> 100%)",
        color: "danger" as const,
        description: "Exceeds manufacturer safety rating! Risk of transmission failure, structural damage, and severe loss of braking control.",
      };
    }
  };

  const status = getSafetyStatus();

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <Card className="bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
        <CardHeader className="flex flex-col items-start gap-1 pb-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Towing Safety & Trailer Compatibility Guide
            </h3>
          </div>
          <p className="text-sm text-slate-300">
            Safety analysis and trailer categories for <span className="text-warning font-semibold">{vehicleName}</span> ({maxTowingCapacity.toLocaleString()} lbs capacity).
          </p>
        </CardHeader>

        <CardBody className="gap-6 pt-4">
          {/* 80% Rule Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                80% Safe Towing Limit
              </span>
              <p className="text-2xl font-extrabold text-success mt-1">
                {safeEightyPercent.toLocaleString()} <span className="text-sm font-normal text-slate-300">lbs</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Recommended loaded trailer weight to protect transmission & maintain steering control.
              </p>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Est. Tongue Weight (10–15%)
              </span>
              <p className="text-2xl font-extrabold text-primary mt-1">
                {minTongueWeight.toLocaleString()}–{maxTongueWeight.toLocaleString()} <span className="text-sm font-normal text-slate-300">lbs</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Downward force on hitch ball. Proper tongue weight prevents dangerous trailer sway.
              </p>
            </div>

            <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Max Factory Towing
              </span>
              <p className="text-2xl font-extrabold text-warning mt-1">
                {maxTowingCapacity.toLocaleString()} <span className="text-sm font-normal text-slate-300">lbs</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Maximum gross trailer weight rating specified by vehicle manufacturer.
              </p>
            </div>
          </div>

          {/* Interactive Weight Calculator */}
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/80">
            <h4 className="text-base font-semibold text-white mb-2 flex items-center justify-between">
              <span>Interactive Safety Calculator</span>
              <Chip color={status.color} variant="flat" size="sm">
                {status.label}
              </Chip>
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
              <div className="w-full sm:w-1/2">
                <Input
                  type="number"
                  label="Target Trailer + Cargo Weight (lbs)"
                  value={testWeight.toString()}
                  onChange={(e) => setTestWeight(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  variant="bordered"
                  size="sm"
                  className="max-w-xs"
                />
              </div>
              <div className="w-full sm:w-1/2 text-sm text-slate-300">
                <p>{status.description}</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>0 lbs</span>
                <span className="text-success font-semibold">80% Margin ({safeEightyPercent.toLocaleString()} lbs)</span>
                <span className="text-warning font-semibold">100% Limit ({maxTowingCapacity.toLocaleString()} lbs)</span>
              </div>
              <Progress
                value={percentage}
                maxValue={100}
                color={status.color}
                className="h-3 rounded-full"
              />
              <div className="text-right text-xs text-slate-400 pt-1">
                Current Load: <span className="font-bold text-white">{percentage}%</span> of vehicle capacity
              </div>
            </div>
          </div>

          {/* Small Car Specific Towing Guide */}
          {maxTowingCapacity <= 2500 && (
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs sm:text-sm text-blue-200">
              <div className="flex items-center gap-2 font-bold text-blue-100 text-sm mb-1">
                <span>🚗</span>
                <span>Compact & Small Car Towing Guidelines</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                Small cars and compact sedans utilize <strong>Class I hitch receivers (1.25-inch)</strong> with a maximum gross trailer limit of 1,000–2,000 lbs and tongue weight of 100–200 lbs. Ideal for lightweight teardrop campers, kayak trailers, single jet skis, or bicycle hitch carriers.
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-900/60 text-blue-200 px-2.5 py-0.5 rounded-full font-medium">✓ Class I 1.25&quot; Receiver</span>
                <span className="bg-blue-900/60 text-blue-200 px-2.5 py-0.5 rounded-full font-medium">✓ Trailer Brakes Recommended &gt; 1,000 lbs</span>
                <span className="bg-blue-900/60 text-blue-200 px-2.5 py-0.5 rounded-full font-medium">✓ Avoid Overdrive on Steep Grades</span>
              </div>
            </div>
          )}

          {/* Trailer Category Compatibility Table */}
          <div>
            <h4 className="text-base font-semibold text-white mb-3">
              Compatible Trailer Categories
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRAILER_CATEGORIES.map((cat, idx) => {
                const canTowFully = maxTowingCapacity >= cat.maxWeight;
                const canTowPartially = !canTowFully && maxTowingCapacity >= cat.minWeight;

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
                      <p className="text-xs text-warning font-medium">{cat.weightRange}</p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cat.examples}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
