/**
 * Vehicles interface represents a vehicle with Year, Make and Model Trim
 */
export interface Vehicles {
  Year: number;
  Make: string;
  Model: string;
  Trim: Trim[];
}
/**
 * Trim interface represents  vehicle configurations like
 * Drivetrain, Engine, Transmission, Max Towing Capacity and Notes
 */
export interface Trim {
  _id?: string;
  TrimName: string;
  Drivetrain?: string;
  Engine?: string;
  Transmission?: string;
  "Max Towing Capacity"?: number;
  Notes?: string;
}
/**
 * VehicleLookup interface represents lookup data for vehicle makes,
 * models, and trim options organized hierarchically.
 */
export interface VehicleLookup {
  makeMap: Record<string, Set<string>>;
  modelMap: Record<string, Record<string, Set<string>>>;
  trimOptionsMap: Record<string, Record<string, Record<string, Set<string>>>>;
}
/**
 * Represents the props for an animated text component.
 * @property {string[]} textLines - An array of strings representing the lines of text to be animated.
 */
export interface AnimatedTextProps {
  textLines: string[];
}

/**
 * Represents the state of the vehicle selection process.
 * @property {string} year - The selected year of the vehicle.
 * @property {string} make - The selected make of the vehicle.
 * @property {string} model - The selected model of the vehicle.
 * @property {string} trim - The selected trim of the vehicle.
 * @property {number} trimIndex - The index of the selected trim.
 * @property {any} selectedVehicle - The selected vehicle object.
 * @property {string[]} makeOptions - The available make options.
 * @property {string[]} modelOptions - The available model options.
 * @property {string[]} trimOptions - The available trim options.
 * @property {boolean} loading - Indicates whether the vehicle data is currently loading.
 * @property {object} data - The vehicle lookup data, including make, model, and trim options.
 */
export interface State {
  year: string;
  make: string;
  model: string;
  trim: string;
  trimIndex: number;
  selectedVehicle: any;
  makeOptions: string[];
  modelOptions: string[];
  trimOptions: string[];
  loading: boolean;
  data: {
    makeMap: Record<string, Set<string>>;
    modelMap: Record<string, Record<string, Set<string>>>;
    trimOptionsMap: Record<string, Record<string, Record<string, Set<string>>>>;
  };
}
/**
 * Represents the context for the vehicle selection process, including the current state and a dispatch function to update the state.
 * @property {State} state - The current state of the vehicle selection process.
 * @property {React.Dispatch<Action>} dispatch - A function to dispatch actions to update the state.
 */
export interface VehicleContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
/**
 * Represents the different actions that can be dispatched to update the vehicle selection state.
 * - `SET_YEAR`: Updates the selected year of the vehicle.
 * - `SET_MAKE`: Updates the selected make of the vehicle.
 * - `SET_MODEL`: Updates the selected model of the vehicle.
 * - `SET_TRIM`: Updates the selected trim of the vehicle.
 * - `SET_TRIM_INDEX`: Updates the index of the selected trim.
 * - `SET_SELECTED_VEHICLE`: Updates the selected vehicle object.
 * - `SET_MAKE_OPTIONS`: Updates the available make options.
 * - `SET_MODEL_OPTIONS`: Updates the available model options.
 * - `SET_TRIM_OPTIONS`: Updates the available trim options.
 * - `SET_LOADING`: Updates the loading state.
 * - `SET_DATA`: Updates the vehicle lookup data.
 */
export type Action =
  | { type: "SET_YEAR"; payload: string }
  | { type: "SET_MAKE"; payload: string }
  | { type: "SET_MODEL"; payload: string }
  | { type: "SET_TRIM"; payload: string }
  | { type: "SET_TRIM_INDEX"; payload: number }
  | { type: "SET_SELECTED_VEHICLE"; payload: any }
  | { type: "SET_MAKE_OPTIONS"; payload: string[] }
  | { type: "SET_MODEL_OPTIONS"; payload: string[] }
  | { type: "SET_TRIM_OPTIONS"; payload: string[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_DATA"; payload: State["data"] };
