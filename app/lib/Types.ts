/**
 * Vehicles interface represents a vehicle with Year, Make and Model Trim
 */
export interface Vehicles {
  Year: number;
  Make: string;
  Model: string;
}

/**
 * Option interface represents additional Trim for a vehicle like
 * Drivetrain, Engine, Transmission, Max Towing Capacity and Notes
 */
export interface Trim {
  _id: string;
  Drivetrain?: string;
  Engine: string;
  Transmission?: string;
  Max_Towing_Capacity: number;
  Notes: string;
}
