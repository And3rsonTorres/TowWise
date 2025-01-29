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
  Year: z.number().int().min(2017, "Must be 2018 or later"),
  Make: z.string().trim().min(3, "Must be at least 3 characters"),
  Model: z.string().trim(),
  TrimName: z.string().trim().optional(),
});
export const ContactSchema = z.object({
  Name: z.string().min(5, "Too short"),
  Email: z.string().email("Not a valid email"),
  Message: z.string().min(10, "Message too short"),
});
