import { defineCollection, z } from 'astro:content'

const sections = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = { sections }
