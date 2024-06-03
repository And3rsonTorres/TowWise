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
 * Trim interface represents additional Trim for a vehicle like
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
 * VehicleLookupData interface represents lookup data for vehicle makes,
 * models, and trim options organized hierarchically.
 */
export interface VehicleLookupData {
  makeMap: Record<string, Set<string>>;
  modelMap: Record<string, Record<string, Set<string>>>;
  trimOptionsMap: Record<string, Record<string, Record<string, Set<string>>>>;
}
export interface AnimatedTextProps {
  textLines: string[];
}
export interface TrimTable {
  Trims: Trim[];
}
export interface Column {
  key: string;
  label?: string;
}
