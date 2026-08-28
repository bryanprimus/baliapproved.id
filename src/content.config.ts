import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  places: defineCollection({
    loader: glob({ base: "./src/data/places", pattern: "**/index.md" }),
    schema: ({ image }) =>
      z.object({
        approvalNumber: z.number().int().positive(),
        title: z.string(),
        description: z.string(),
        sealArea: z.string(),
        cover: image(),
        coverAlt: z.string(),
        mapsUrl: z.url(),
        address: z.string(),
        spending: z.string(),
        overallRating: z.number().min(0).max(5),
        approvedAt: z.coerce.date(),
      }),
  }),
};
