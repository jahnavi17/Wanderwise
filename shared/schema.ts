import { z } from "zod";

export const travelPreferencesSchema = z.object({
  budget: z.number().min(0),
  duration: z.number().min(1).max(365),
  month: z.string(),
  mood: z.enum(["Relaxing", "Adventurous", "Cultural", "Romantic"]),
});

export type TravelPreferences = z.infer<typeof travelPreferencesSchema>;

export const destinationSchema = z.object({
  name: z.string(),
  country: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  activities: z.array(z.string()),
  estimatedCost: z.number(),
  bestTime: z.string(),
  imageUrl: z.string(),
});

export type Destination = z.infer<typeof destinationSchema>;

export const recommendationsResponseSchema = z.object({
  destinations: z.array(destinationSchema),
});

export type RecommendationsResponse = z.infer<typeof recommendationsResponseSchema>;
