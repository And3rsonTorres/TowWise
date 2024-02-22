/**
 * SelectionSearch component
 *
 * Allows user to select a vehicle year, make, and model from dropdowns.
 *
 * Uses React hooks:
 * - useState - to manage selected year, make, and model values in state
 * - useEffect - could be used to fetch data initially and on year change
 *
 * Leverages SelectionMap constant to populate dropdown options.
 *
 * Select components from NextUI library for styled dropdowns.
 */

import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { SelectionMap } from "../../lib/Convertions";

export default function SelectionSearch() {
  const [year, setYear] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMake(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  return (
    <div className="flex">
      <Select
        isRequired
        label="Year"
        placeholder="Select a Year"
        variant="flat"
        color="primary"
        selectedKeys={[year]}
        onChange={handleYearChange}
      >
        {[...SelectionMap.keys()].map((year) => (
          <SelectItem key={year} value={year} variant="shadow" color="warning">
            {year.toString()}
          </SelectItem>
        ))}
      </Select>

      <Select
        isRequired
        label="Make"
        placeholder="Select a Make"
        variant="flat"
        color="primary"
        selectedKeys={[make]}
        onChange={handleMakeChange}
        isDisabled={!year}
      >
        {Array.from(SelectionMap.get(Number(year))?.keys() ?? []).map(
          (make) => (
            <SelectItem
              key={make}
              value={make}
              variant="shadow"
              color="warning"
            >
              {make}
            </SelectItem>
          )
        )}
      </Select>

      <Select
        isRequired
        label="Model"
        placeholder="Select a Model"
        variant="flat"
        color="primary"
        selectedKeys={[model]}
        onChange={handleModelChange}
        isDisabled={!make}
      >
        {(SelectionMap.get(Number(year))?.get(make) ?? []).map((model) => (
          <SelectItem
            key={model}
            value={model}
            variant="shadow"
            color="warning"
          >
            {model}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
