/**
 * The `SearchBySelection` component is a React component that allows users to search for vehicle information based on various selection criteria such as year, make, model, and trim.
 *
 * The component uses the `useReducer` hook to manage the state of the selection process, and the `useEffect` hook to fetch the initial data for the selection options.
 *
 * The component renders a series of `Select` components that allow the user to choose the year, make, model, and trim of the vehicle they are interested in. As the user makes selections, the component updates the state and fetches the corresponding options for the next selection.
 *
 * When the user clicks the "Find My Car Capacity" button, the component fetches the vehicle information based on the selected criteria and renders a `TowingTable` component with the details of the selected vehicle.
 *
 * The component also includes a `Loading` component that is displayed while the initial data is being fetched.
 */
"use client";
import React, { useEffect, useReducer, createContext } from "react";
import {
  fetchTrims,
  processingVehicles,
  fetchingVehicle,
} from "@/app/lib/utils/VehicleUtils";
import { Button, Select, SelectItem, Chip } from "@heroui/react";
import { CheckIcon } from "@/public/assets/CheckIcon";
import { Vehicles, VehicleContextType, State, Action } from "@/app/lib/Types";
import TowingTable from "./TowingTables";
import Loading from "./Loading";

export const VehicleContext = createContext<VehicleContextType | null>(null);

export default function SearchBySelection() {
  const initialState: State = {
    year: "",
    make: "",
    model: "",
    trim: "",
    trimIndex: 0,
    selectedVehicle: null,
    makeOptions: [],
    modelOptions: [],
    trimOptions: [],
    loading: true,
    data: processingVehicles(),
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "SET_YEAR":
        return { ...state, year: action.payload };
      case "SET_MAKE":
        return { ...state, make: action.payload };
      case "SET_MODEL":
        return { ...state, model: action.payload };
      case "SET_TRIM":
        return { ...state, trim: action.payload };
      case "SET_TRIM_INDEX":
        return { ...state, trimIndex: action.payload };
      case "SET_SELECTED_VEHICLE":
        return { ...state, selectedVehicle: action.payload };
      case "SET_MAKE_OPTIONS":
        return { ...state, makeOptions: action.payload };
      case "SET_MODEL_OPTIONS":
        return { ...state, modelOptions: action.payload };
      case "SET_TRIM_OPTIONS":
        return { ...state, trimOptions: action.payload };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "SET_DATA":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      const result = await fetchTrims();
      dispatch({ type: "SET_DATA", payload: result });
      dispatch({ type: "SET_LOADING", payload: false });
    };
    fetchData();
  }, []);

  const handleYearChange = (selectedYear: string) => {
    dispatch({ type: "SET_YEAR", payload: selectedYear });
    dispatch({ type: "SET_MAKE", payload: "" });
    dispatch({ type: "SET_MODEL", payload: "" });
    dispatch({ type: "SET_TRIM", payload: "" });

    if (selectedYear && state.data) {
      dispatch({
        type: "SET_MAKE_OPTIONS",
        payload: Array.from(state.data.makeMap[selectedYear]),
      });
      dispatch({ type: "SET_MODEL_OPTIONS", payload: [] });
      dispatch({ type: "SET_TRIM_OPTIONS", payload: [] });
    }
  };

  const handleMakeChange = (selectedMake: string) => {
    dispatch({ type: "SET_MAKE", payload: selectedMake });
    dispatch({ type: "SET_MODEL", payload: "" });
    dispatch({ type: "SET_TRIM", payload: "" });
    if (selectedMake && state.data) {
      dispatch({
        type: "SET_MODEL_OPTIONS",
        payload: Array.from(state.data.modelMap[state.year][selectedMake]),
      });
      dispatch({ type: "SET_TRIM_OPTIONS", payload: [] });
    }
  };

  const handleModelChange = (selectedModel: string) => {
    dispatch({ type: "SET_MODEL", payload: selectedModel });
    dispatch({ type: "SET_TRIM", payload: "" });
    if (selectedModel && state.data) {
      dispatch({
        type: "SET_TRIM_OPTIONS",
        payload: Array.from(
          state.data.trimOptionsMap[state.year][state.make][selectedModel]
        ),
      });
    }
  };

  const handleTrimChange = (selectedTrim: string) => {
    dispatch({ type: "SET_TRIM", payload: selectedTrim });
    dispatch({ type: "SET_TRIM_INDEX", payload: Number(selectedTrim) });
  };

  const handleSearch = async () => {
    const vehicle: Vehicles = {
      Year: parseInt(state.year),
      Make: state.make,
      Model: state.model,
      Trim: [
        { TrimName: state.trimOptions.map((trim) => trim)[state.trimIndex] },
      ],
    };
    const result: Vehicles[] = await fetchingVehicle(vehicle);
    vehicle.Trim = result?.[0]?.Trim;
    dispatch({ type: "SET_SELECTED_VEHICLE", payload: vehicle });
  };

  const renderValue = (items: any) => (
    <div className="overflow-scroll">
      {items.map((item: any) => (
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

  if (state.loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <VehicleContext.Provider value={{ state, dispatch }}>
      <div className="md:grid grid-cols-10 w-9/12 lg:w-7/12 mx-auto">
        <Select
          isRequired
          label="Year"
          variant="flat"
          color="primary"
          className="col-span-2"
          selectedKeys={[state.year]}
          onChange={(e) => handleYearChange(e.target.value)}
          renderValue={renderValue}
        >
          {Object.keys(state.data.makeMap).map((year) => (
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
          selectedKeys={[state.make]}
          onChange={(e) => handleMakeChange(e.target.value)}
          isDisabled={!state.year}
          renderValue={renderValue}
        >
          {state.makeOptions.map((make) => (
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
          selectedKeys={[state.model]}
          onChange={(e) => handleModelChange(e.target.value)}
          isDisabled={!state.make}
          renderValue={renderValue}
        >
          {state.modelOptions.map((model) => (
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
          selectedKeys={[state.trim]}
          onChange={(e) => handleTrimChange(e.target.value)}
          isDisabled={!state.model}
          renderValue={renderValue}
        >
          {state.trimOptions.map((trimName, index) => (
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
          isDisabled={!state.trim}
          className="w-full p-4 sm:col-span-10"
          size="lg"
          variant="shadow"
          onPress={handleSearch}
        >
          Find My Car Capacity
        </Button>
      </div>
      {state.selectedVehicle && <TowingTable vehicle={state.selectedVehicle} />}
    </VehicleContext.Provider>
  );
}
