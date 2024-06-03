/**
 * SearchBySelection component allows users to select vehicle year, make, model and trim in a stepwise manner.
 * It uses React state and handlers to update the options at each selection step.
 * The vehicle data is preprocessed from SupportedVehicles and passed in as props.
 * The component renders 4 Select dropdowns that are enabled/disabled based on previous selections.
 */

import React from "react";
import {
  Select,
  SelectItem,
  SelectedItems,
  Chip,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { SupportedVehicles } from "@/public/assets/SuportedModel";
import { CheckIcon } from "@/public/assets/CheckIcon";
import { VehicleLookupData } from "@/app/lib/Types";
import { preprocessVehicleData } from "@/app/lib/utils/VehicleUtils";
export default function SearchBySelection() {
  const [year, setYear] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [trim, setTrim] = useState<string>("");
  const [makeOptions, setMakeOptions] = useState<string[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [trimOptions, setTrimOptions] = useState<string[]>([]);
  const { makeMap, modelMap, trimOptionsMap }: VehicleLookupData =
    preprocessVehicleData(SupportedVehicles);

  const handleYearChange = (selectedYear: string) => {
    setYear(selectedYear);
    setMake("");
    setModel("");
    setTrim("");
    if (selectedYear) {
      setMakeOptions(Array.from(makeMap[selectedYear]));
      setModelOptions([]);
      setTrimOptions([]);
    }
  };

  const handleMakeChange = (selectedMake: string) => {
    setMake(selectedMake);
    setModel("");
    setTrim("");
    if (selectedMake) {
      setModelOptions(Array.from(modelMap[year][selectedMake]));
      setTrimOptions([]);
    }
  };

  const handleModelChange = (selectedModel: string) => {
    setModel(selectedModel);
    setTrim("");
    if (selectedModel) {
      setTrimOptions(Array.from(trimOptionsMap[year][make][selectedModel]));
    }
  };

  const handleTrimChange = (selectedTrim: string) => {
    setTrim(selectedTrim);
  };

  return (
    <>
      <div className=" md:grid grid-cols-10 w-9/12 lg:w-7/12 mx-auto">
        <Select
          isRequired
          label="Year"
          variant="flat"
          color="primary"
          className="col-span-2"
          selectedKeys={[year]}
          items={year}
          onChange={(e) => handleYearChange(e.target.value)}
          renderValue={(items: SelectedItems<string>) => {
            return (
              <div>
                {items.map((item) => (
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    color="success"
                    variant="shadow"
                    key={item.key}
                  >
                    {item.textValue}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          {Object.keys(makeMap).map((year) => (
            <SelectItem
              key={year}
              value={year}
              variant="shadow"
              color="warning"
            >
              {year}
            </SelectItem>
          ))}
        </Select>

        <Select
          isRequired
          label="Make"
          variant="flat"
          color="primary"
          className="col-span-2"
          selectedKeys={[make]}
          items={make}
          onChange={(e) => handleMakeChange(e.target.value)}
          isDisabled={!year}
          renderValue={(items: SelectedItems<string>) => {
            return (
              <div className="overflow-scroll">
                {items.map((item) => (
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    color="success"
                    variant="shadow"
                    key={item.key}
                  >
                    {item.textValue}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          {makeOptions.map((make) => (
            <SelectItem
              key={make}
              value={make}
              variant="shadow"
              color="warning"
              className="overflow-scroll"
            >
              {make}
            </SelectItem>
          ))}
        </Select>

        <Select
          isRequired
          label="Model"
          variant="flat"
          color="primary"
          className="col-span-3"
          selectedKeys={[model]}
          items={model}
          onChange={(e) => handleModelChange(e.target.value)}
          isDisabled={!make}
          renderValue={(items: SelectedItems<string>) => {
            return (
              <div className="overflow-scroll">
                {items.map((item) => (
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    color="success"
                    variant="shadow"
                    key={item.key}
                  >
                    {item.textValue}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          {modelOptions.map((model) => (
            <SelectItem
              key={model}
              value={model}
              variant="shadow"
              color="warning"
              className="overflow-scroll"
            >
              {model}
            </SelectItem>
          ))}
        </Select>

        <Select
          isRequired
          label="Trim"
          variant="flat"
          color="primary"
          className="col-span-3"
          selectedKeys={[trim]}
          items={trim}
          onChange={(e) => handleTrimChange(e.target.value)}
          isDisabled={!model}
          renderValue={(items: SelectedItems<string>) => {
            return (
              <div className="overflow-scroll">
                {items.map((item) => (
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    color="success"
                    variant="shadow"
                    key={item.key}
                  >
                    {item.textValue}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          {trimOptions.map((trimName, index) => (
            <SelectItem
              key={index}
              value={trimName}
              variant="shadow"
              color="warning"
              className="overflow-scroll"
            >
              {trimName}
            </SelectItem>
          ))}
        </Select>
        <Button
          color="primary"
          isDisabled={!trim}
          className="w-full p-4 sm:col-span-10"
          size="lg"
          variant="shadow"
        >
          Find My Car Capacity
        </Button>
      </div>
    </>
  );
}
