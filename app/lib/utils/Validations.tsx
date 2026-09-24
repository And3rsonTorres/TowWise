/**
 * Zod schemas for input validation:
 * - TowingSchema: Validates vehicle lookup criteria (Year, Make, Model, TrimName).
 * - ContactSchema: Validates user feedback submissions with optional category, rating, and vehicleContext.
 */
import { z } from "zod";

export const TowingSchema = z.object({
  Year: z.number().int().min(1970, "Must be a valid model year"),
  Make: z.string().trim().min(2, "Must be at least 2 characters"),
  Model: z.string().trim(),
  TrimName: z.string().trim().optional(),
});

export const ContactSchema = z.object({
  Name: z.string().min(2, "Name must be at least 2 characters"),
  Email: z.string().email("Please provide a valid email address"),
  FeedbackType: z
    .enum(["missing_vehicle", "incorrect_spec", "feature_request", "general"])
    .optional()
    .default("general"),
  Rating: z.number().int().min(1).max(5).optional(),
  VehicleContext: z
    .object({
      Year: z.number().optional(),
      Make: z.string().optional(),
      Model: z.string().optional(),
      Trim: z.string().optional(),
      VIN: z.string().optional(),
    })
    .optional(),
  Message: z.string().min(5, "Message must be at least 5 characters"),
});
