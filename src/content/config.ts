import { defineCollection, z } from 'astro:content'

const sections = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
})

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { sections, posts }
