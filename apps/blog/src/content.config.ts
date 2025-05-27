import { defineCollection, z } from "astro:content"

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.enum(["zeis"]),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((str) => new Date(str)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
  }),
})

export const collections = { posts }
