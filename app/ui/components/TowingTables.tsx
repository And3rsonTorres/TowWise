"use client";

import React, { useState } from "react";
import { Chip, Button } from "@heroui/react";
import { Vehicles } from "../../lib/Types";
import * as motion from "motion/react-client";
import TrailerAdvisor from "./TrailerAdvisor";

interface TowingTableProps {
  vehicle: Vehicles;
}

const TowingTable: React.FC<TowingTableProps> = ({ vehicle }) => {
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");

  if (!vehicle || !Array.isArray(vehicle.Trim) || vehicle.Trim.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-900/80 rounded-xl max-w-xl mx-auto border border-slate-800 text-slate-300">
        No trim specifications found for this vehicle. Please try another selection or request via the contact form.
      </div>
    );
  }

  // Find max capacity among trims for the advisor
  const maxCapacityInTrims = Math.max(
    ...vehicle.Trim.map((t) => Number(t["Max Towing Capacity"]) || 0)
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Unit Toggle */}
      <div className="flex justify-end mb-3">
        <div className="bg-slate-900/80 p-1 rounded-lg border border-slate-800 flex items-center gap-1 text-xs">
          <Button
            size="sm"
            variant={unit === "lbs" ? "solid" : "light"}
            color={unit === "lbs" ? "primary" : "default"}
            onPress={() => setUnit("lbs")}
            className="h-7 text-xs font-semibold"
          >
            Pounds (lbs)
          </Button>
          <Button
            size="sm"
            variant={unit === "kg" ? "solid" : "light"}
            color={unit === "kg" ? "primary" : "default"}
            onPress={() => setUnit("kg")}
            className="h-7 text-xs font-semibold"
          >
            Kilograms (kg)
          </Button>
        </div>
      </div>

      {vehicle.Trim.map((trim, trimIdx) => {
        const { TrimName, _id, ...rest } = trim;

        const filteredEntries = Object.entries(rest).filter(
          ([_, value]) => value !== null && value !== undefined && value !== ""
        );

        if (filteredEntries.length === 0 && !TrimName) return null;

        const uniqueKey = _id || `${vehicle.Year}-${vehicle.Make}-${vehicle.Model}-${TrimName}-${trimIdx}`;

        return (
          <motion.div
            key={uniqueKey}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: trimIdx * 0.1 }}
            className="shadow-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-center items-center rounded-2xl p-6 sm:p-8 my-6 mx-auto backdrop-blur-md"
          >
            <div className="text-center w-full mb-6">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Vehicle Specifications
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1">
                {vehicle.Year} {vehicle.Make} {vehicle.Model}
              </h1>
              <h2 className="text-lg sm:text-xl font-semibold text-warning mt-2 px-4 py-1 bg-amber-500/10 rounded-full inline-block border border-amber-500/20">
                {TrimName}
              </h2>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {filteredEntries.map(([key, value], index) => {
                    return (
                      <tr
                        key={`${uniqueKey}-${key}-${index}`}
                        className={index % 2 === 0 ? "bg-slate-800/40" : "bg-slate-800/20"}
                      >
                        <td className="w-1/3 px-4 py-3.5 text-xs sm:text-sm md:text-base font-semibold text-slate-300 border-b border-slate-800/60">
                          <Chip size="sm" variant="flat" color="default" className="text-xs">
                            {key}
                          </Chip>
                        </td>
                        <td className="w-2/3 px-4 py-3.5 text-xs sm:text-sm md:text-base text-white border-b border-slate-800/60">
                          {(() => {
                            switch (key) {
                              case "Engine":
                                return (
                                  <span className="font-medium text-slate-100 flex items-center gap-1.5">
                                    <span className="text-primary font-bold">⚙️</span> {String(value)}
                                  </span>
                                );
                              case "Transmission":
                                return (
                                  <Chip size="sm" color="secondary" variant="flat" className="font-medium">
                                    {String(value)}
                                  </Chip>
                                );
                              case "Drivetrain":
                                return (
                                  <Chip size="sm" color="success" variant="flat" className="font-medium">
                                    {String(value)}
                                  </Chip>
                                );
                              case "Max Towing Capacity": {
                                const capacityLbs = parseInt(value.toString(), 10);
                                const capacityDisplay =
                                  unit === "lbs"
                                    ? `${capacityLbs.toLocaleString()} lbs`
                                    : `${Math.round(capacityLbs * 0.453592).toLocaleString()} kg`;

                                let badgeClass = "bg-blue-600 text-white";
                                if (capacityLbs <= 2000) {
                                  badgeClass = "bg-blue-600 text-white";
                                } else if (capacityLbs <= 3500) {
                                  badgeClass = "bg-emerald-600 text-white";
                                } else if (capacityLbs <= 7500) {
                                  badgeClass = "bg-amber-600 text-white";
                                } else if (capacityLbs <= 10000) {
                                  badgeClass = "bg-orange-600 text-white";
                                } else {
                                  badgeClass = "bg-red-600 text-white";
                                }

                                return (
                                  <div className="flex items-center gap-3">
                                    <span
                                      className={`px-3 py-1 rounded-full font-extrabold text-sm sm:text-base tracking-wide shadow-md ${badgeClass}`}
                                    >
                                      {capacityDisplay}
                                    </span>
                                    <span className="text-xs text-slate-400 hidden sm:inline">
                                      (Gross Trailer Weight)
                                    </span>
                                  </div>
                                );
                              }
                              case "Notes":
                                return (
                                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-prose">
                                    {String(value)}
                                  </p>
                                );
                              default:
                                return <span className="text-slate-200">{String(value)}</span>;
                            }
                          })()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 w-full text-center">
              <a
                href="#feedback-section"
                className="text-xs text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <span>💬</span> Have a question or missing trim for this {vehicle.Year} {vehicle.Make} {vehicle.Model}? Submit feedback below!
              </a>
            </div>
          </motion.div>
        );
      })}

      {/* Embedded Trailer Safety Advisor for this vehicle */}
      {maxCapacityInTrims > 0 && (
        <TrailerAdvisor
          maxTowingCapacity={maxCapacityInTrims}
          vehicleName={`${vehicle.Year} ${vehicle.Make} ${vehicle.Model}`}
        />
      )}
    </div>
  );
};

export default TowingTable;
