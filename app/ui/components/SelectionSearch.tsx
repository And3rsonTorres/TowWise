"use client";
import React, { useEffect, useReducer, createContext, useState } from "react";
import {
  fetchTrims,
  processingVehicles,
  fetchingVehicle,
} from "@/app/lib/utils/VehicleUtils";
import { Button, Select, SelectItem, Chip, Tabs, Tab, Card, CardBody } from "@heroui/react";
import { CheckIcon } from "@/public/assets/CheckIcon";
import { Vehicles, VehicleContextType, State, Action } from "@/app/lib/Types";
import TowingTable from "./TowingTables";
import Loading from "./Loading";
import VinSearch from "./VinSearch";
import AutoCompleteSearch from "./AutoComplete";

export const VehicleContext = createContext<VehicleContextType | null>(null);

export default function SearchBySelection() {
  const [activeTab, setActiveTab] = useState<string>("dropdown");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

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
    let isMounted = true;
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const result = await fetchTrims();
        if (isMounted) {
          dispatch({ type: "SET_DATA", payload: result });
        }
      } catch (err) {
        console.error("Failed to load vehicle catalog:", err);
      } finally {
        if (isMounted) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleYearChange = (selectedYear: string) => {
    dispatch({ type: "SET_YEAR", payload: selectedYear });
    dispatch({ type: "SET_MAKE", payload: "" });
    dispatch({ type: "SET_MODEL", payload: "" });
    dispatch({ type: "SET_TRIM", payload: "" });
    dispatch({ type: "SET_SELECTED_VEHICLE", payload: null });
    setSearchError(null);

    if (selectedYear && state.data?.makeMap?.[selectedYear]) {
      dispatch({
        type: "SET_MAKE_OPTIONS",
        payload: Array.from(state.data.makeMap[selectedYear] || []),
      });
    } else {
      dispatch({ type: "SET_MAKE_OPTIONS", payload: [] });
    }
    dispatch({ type: "SET_MODEL_OPTIONS", payload: [] });
    dispatch({ type: "SET_TRIM_OPTIONS", payload: [] });
  };

  const handleMakeChange = (selectedMake: string) => {
    dispatch({ type: "SET_MAKE", payload: selectedMake });
    dispatch({ type: "SET_MODEL", payload: "" });
    dispatch({ type: "SET_TRIM", payload: "" });
    dispatch({ type: "SET_SELECTED_VEHICLE", payload: null });
    setSearchError(null);

    if (selectedMake && state.year && state.data?.modelMap?.[state.year]?.[selectedMake]) {
      dispatch({
        type: "SET_MODEL_OPTIONS",
        payload: Array.from(state.data.modelMap[state.year][selectedMake] || []),
      });
    } else {
      dispatch({ type: "SET_MODEL_OPTIONS", payload: [] });
    }
    dispatch({ type: "SET_TRIM_OPTIONS", payload: [] });
  };

  const handleModelChange = (selectedModel: string) => {
    dispatch({ type: "SET_MODEL", payload: selectedModel });
    dispatch({ type: "SET_TRIM", payload: "" });
    dispatch({ type: "SET_SELECTED_VEHICLE", payload: null });
    setSearchError(null);

    if (
      selectedModel &&
      state.year &&
      state.make &&
      state.data?.trimOptionsMap?.[state.year]?.[state.make]?.[selectedModel]
    ) {
      dispatch({
        type: "SET_TRIM_OPTIONS",
        payload: Array.from(state.data.trimOptionsMap[state.year][state.make][selectedModel] || []),
      });
    } else {
      dispatch({ type: "SET_TRIM_OPTIONS", payload: [] });
    }
  };

  const handleTrimChange = (selectedTrim: string) => {
    dispatch({ type: "SET_TRIM", payload: selectedTrim });
    const idx = state.trimOptions.indexOf(selectedTrim);
    dispatch({ type: "SET_TRIM_INDEX", payload: idx >= 0 ? idx : 0 });
    dispatch({ type: "SET_SELECTED_VEHICLE", payload: null });
    setSearchError(null);
  };

  const handleSearch = async () => {
    if (!state.year || !state.make || !state.model) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const vehicleQuery: Vehicles = {
        Year: parseInt(state.year, 10),
        Make: state.make,
        Model: state.model,
        Trim: state.trim ? [{ TrimName: state.trim }] : [],
      };

      const result: Vehicles[] = await fetchingVehicle(vehicleQuery);

      if (result && result.length > 0 && result[0]?.Trim && result[0].Trim.length > 0) {
        dispatch({ type: "SET_SELECTED_VEHICLE", payload: result[0] });
      } else {
        setSearchError(`No towing specs found for ${state.year} ${state.make} ${state.model} ${state.trim || ""}.`);
      }
    } catch (err) {
      setSearchError("Failed to retrieve towing specifications. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const renderValue = (items: any) => (
    <div className="overflow-hidden flex flex-wrap gap-1">
      {items.map((item: any) => (
        <Chip
          startContent={<CheckIcon size={16} />}
          color="success"
          variant="flat"
          key={item.key}
          size="sm"
        >
          {item.textValue}
        </Chip>
      ))}
    </div>
  );

  if (state.loading) {
    return (
      <div className="py-12">
        <Loading />
        <p className="text-center text-sm text-slate-300 mt-4 animate-pulse">
          Loading vehicle towing catalog...
        </p>
      </div>
    );
  }

  const availableYears = Object.keys(state.data?.makeMap || {}).sort((a, b) => Number(b) - Number(a));

  return (
    <VehicleContext.Provider value={{ state, dispatch }}>
      <div className="w-full max-w-4xl mx-auto px-4 mb-8">
        {/* Navigation Tabs for 3 Lookup Modes */}
        <div className="flex justify-center mb-6">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(String(key))}
            variant="solid"
            color="primary"
            size="lg"
            radius="full"
            className="shadow-xl"
          >
            <Tab
              key="dropdown"
              title={
                <div className="flex items-center gap-2">
                  <span>🚗</span>
                  <span>Vehicle Selector</span>
                </div>
              }
            />
            <Tab
              key="autocomplete"
              title={
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Quick Search</span>
                </div>
              }
            />
            <Tab
              key="vin"
              title={
                <div className="flex items-center gap-2">
                  <span>📋</span>
                  <span>US VIN Decoder</span>
                </div>
              }
            />
          </Tabs>
        </div>

        {/* Tab 1: Dropdown Selector */}
        {activeTab === "dropdown" && (
          <Card className="bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md p-4 sm:p-6 mb-8">
            <CardBody className="gap-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>🚗</span> Select Vehicle by Specifications
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Choose your vehicle&apos;s model year, manufacturer make, model, and trim package.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                  isRequired
                  label="1. Year"
                  placeholder="Select Year"
                  variant="bordered"
                  color="primary"
                  selectedKeys={state.year ? [state.year] : []}
                  onChange={(e) => handleYearChange(e.target.value)}
                  renderValue={renderValue}
                >
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year} textValue={year}>
                      {year}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  label="2. Make"
                  placeholder="Select Make"
                  variant="bordered"
                  color="primary"
                  selectedKeys={state.make ? [state.make] : []}
                  onChange={(e) => handleMakeChange(e.target.value)}
                  isDisabled={!state.year || state.makeOptions.length === 0}
                  renderValue={renderValue}
                >
                  {state.makeOptions.map((make) => (
                    <SelectItem key={make} value={make} textValue={make}>
                      {make}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  label="3. Model"
                  placeholder="Select Model"
                  variant="bordered"
                  color="primary"
                  selectedKeys={state.model ? [state.model] : []}
                  onChange={(e) => handleModelChange(e.target.value)}
                  isDisabled={!state.make || state.modelOptions.length === 0}
                  renderValue={renderValue}
                >
                  {state.modelOptions.map((model) => (
                    <SelectItem key={model} value={model} textValue={model}>
                      {model}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  label="4. Trim / Engine"
                  placeholder="Select Trim"
                  variant="bordered"
                  color="primary"
                  selectedKeys={state.trim ? [state.trim] : []}
                  onChange={(e) => handleTrimChange(e.target.value)}
                  isDisabled={!state.model || state.trimOptions.length === 0}
                  renderValue={renderValue}
                >
                  {state.trimOptions.map((trimName) => (
                    <SelectItem key={trimName} value={trimName} textValue={trimName}>
                      {trimName}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Button
                color="primary"
                isDisabled={!state.year || !state.make || !state.model || isSearching}
                isLoading={isSearching}
                className="w-full font-bold text-base py-6 tracking-wide shadow-lg"
                size="lg"
                variant="shadow"
                onPress={handleSearch}
              >
                Find My Vehicle Towing Capacity
              </Button>

              {searchError && (
                <div className="p-4 bg-danger-900/30 border border-danger-700/50 rounded-xl text-danger-300 text-sm text-center">
                  {searchError}
                </div>
              )}
            </CardBody>
          </Card>
        )}

        {/* Tab 2: Autocomplete Instant Search */}
        {activeTab === "autocomplete" && <AutoCompleteSearch />}

        {/* Tab 3: US VIN Decoder */}
        {activeTab === "vin" && <VinSearch />}
      </div>

      {/* Render Selected Vehicle Table */}
      {activeTab === "dropdown" && state.selectedVehicle && (
        <TowingTable vehicle={state.selectedVehicle} />
      )}
    </VehicleContext.Provider>
  );
}
