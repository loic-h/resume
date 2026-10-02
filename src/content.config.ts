import { defineCollection } from "astro:content"
import { glob, file } from 'astro/loaders'
import { z } from 'astro/zod'

const resume = defineCollection({
  loader: glob({ base: './src/content/resume', pattern: '**/*.{yml,yaml}' }),
    schema: z.object({
      id: z.string(),
      title: z.string(),
      name: z.string()
    })
})

export const collections = { resume }
