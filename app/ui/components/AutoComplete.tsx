"use client";
import React, { useState, useMemo } from "react";
import { Input, Card, CardBody, Chip, Button } from "@heroui/react";
import { SERVERLESS_VEHICLES } from "@/app/lib/data/vehicleData";
import { Vehicles } from "@/app/lib/Types";
import TowingTable from "./TowingTables";

const CATEGORIES = [
  { id: "all", label: "All Vehicles", icon: "🚗" },
  { id: "trucks", label: "Trucks", icon: "🛻", filter: ["f-150", "silverado", "ram", "tundra", "tacoma", "sierra", "colorado", "ranger", "titan", "frontier"] },
  { id: "suvs", label: "SUVs & Crossovers", icon: "🚙", filter: ["tahoe", "suburban", "expedition", "explorer", "yukon", "grand cherokee", "telluride", "palisade", "rav4", "cr-v", "highlander", "pilot", "4runner", "durango"] },
  { id: "compacts", label: "Sedans & Small Cars", icon: "🚘", filter: ["corolla", "civic", "camry", "accord", "jetta", "golf", "impreza", "crosstrek", "sentra", "elantra", "forte", "prius"] },
  { id: "evs", label: "EVs & Hybrids", icon: "⚡", filter: ["model 3", "model y", "model s", "model x", "lightning", "rivian", "mach-e", "hybrid", "powerboost", "phev"] },
];

export default function AutoCompleteSearch() {
  const [query, setQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicles | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredVehicles = useMemo(() => {
    const q = query.trim().toLowerCase();
    const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory);

    return SERVERLESS_VEHICLES.filter((v) => {
      const searchString = `${v.Year} ${v.Make} ${v.Model} ${v.Trim.map((t) => t.TrimName).join(" ")}`.toLowerCase();

      // Check category constraint if not 'all'
      if (currentCategory && currentCategory.filter) {
        const matchesCategory = currentCategory.filter.some((keyword) => searchString.includes(keyword));
        if (!matchesCategory) return false;
      }

      // Check query tokens
      if (!q || q.length < 2) return true;
      const tokens = q.split(/\s+/);
      return tokens.every((token) => searchString.includes(token));
    }).slice(0, 8);
  }, [query, selectedCategory]);

  const handleSelect = (v: Vehicles) => {
    setSelectedVehicle(v);
    setQuery(`${v.Year} ${v.Make} ${v.Model}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-8">
      <Card className="bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md p-4 sm:p-6">
        <CardBody className="gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Instant Vehicle Search
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Start typing your vehicle&apos;s year, make, or model, or select a category below to quickly discover towing specifications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-slate-800/80">
            <span className="text-xs text-slate-400 font-semibold mr-1">Category:</span>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.id ? "solid" : "flat"}
                color={selectedCategory === cat.id ? "primary" : "default"}
                className={`text-xs h-7 rounded-full font-medium ${
                  selectedCategory === cat.id ? "font-bold shadow" : "bg-slate-800 text-slate-300 hover:text-white"
                }`}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  if (selectedVehicle) setSelectedVehicle(null);
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </Button>
            ))}
          </div>

          <div className="relative">
            <Input
              type="text"
              label="Search Vehicles"
              placeholder="e.g. 2024 Ford F-150, Tahoe, Ram 1500, Telluride, Civic..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (selectedVehicle) setSelectedVehicle(null);
              }}
              variant="bordered"
              color="primary"
              size="lg"
              isClearable
              onClear={() => {
                setQuery("");
                setSelectedVehicle(null);
              }}
              className="text-base"
            />

            {/* Suggestions Dropdown */}
            {(query.length >= 2 || selectedCategory !== "all") && !selectedVehicle && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto divide-y divide-slate-800">
                {filteredVehicles.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-400">
                    No matching vehicles found for &quot;{query}&quot;. Try checking your spelling or use the Dropdown Selector tab.
                  </div>
                ) : (
                  filteredVehicles.map((v, idx) => {
                    const topCapacity = Math.max(...v.Trim.map((t) => t["Max Towing Capacity"] || 0));
                    return (
                      <button
                        key={`${v.Year}-${v.Make}-${v.Model}-${idx}`}
                        onClick={() => handleSelect(v)}
                        className="w-full text-left p-3.5 hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <p className="text-white font-semibold text-base">
                            {v.Year} {v.Make} {v.Model}
                          </p>
                          <p className="text-xs text-slate-400">
                            {v.Trim.length} trim configuration{v.Trim.length > 1 ? "s" : ""} available
                          </p>
                        </div>
                        <Chip color="warning" variant="flat" size="sm" className="font-bold">
                          Up to {topCapacity.toLocaleString()} lbs
                        </Chip>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Quick search suggestion pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
            <span>Popular:</span>
            {["Ford F-150", "Chevy Tahoe", "Ram 1500", "Toyota Tundra", "Subaru Outback", "Honda Civic", "Tesla Model Y"].map((term) => (
              <Button
                key={term}
                size="sm"
                variant="flat"
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs h-7"
                onPress={() => {
                  setQuery(term);
                  const matched = SERVERLESS_VEHICLES.find(
                    (v) => `${v.Make} ${v.Model}`.toLowerCase() === term.toLowerCase()
                  );
                  if (matched) setSelectedVehicle(matched);
                }}
              >
                {term}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Selected Vehicle Specs and Towing Table */}
      {selectedVehicle && (
        <div className="mt-6">
          <TowingTable vehicle={selectedVehicle} />
        </div>
      )}
    </div>
  );
}
