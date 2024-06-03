/**
 * Defines JSON schemas for validating input:
 *
 * - TowingSchema validates objects with Year, Make, Model, and TrimName properties.
 *   Uses zod types like z.number(), z.string() to validate the types and values.
 *
 * - ContactSchema validates objects with name, email, and message properties.
 *   Also uses zod types to validate the input.
 */
import { z } from "zod";

export const TowingSchema = z.object({
  Year: z.number().int().min(2018, "Must be 2018 or later"),
  Make: z.string().trim().min(3, "Must be at least 3 characters"),
  Model: z.string().trim(),
  TrimName: z.string(),
});
export const ContactSchema = z.object({
  name: z.string().min(2, "Too short"),
  email: z.string().email("Not a valid email"),
  message: z.string().min(10, "Message too short"),
});
