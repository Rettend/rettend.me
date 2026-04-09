import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const sections = defineCollection({
  loader: glob({ base: './src/content/sections', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
  }),
})

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { sections, posts }
