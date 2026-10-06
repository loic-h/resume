import { defineCollection } from "astro:content"
import { glob } from 'astro/loaders'
import resumeSchema from './schema/resume'

const resume = defineCollection({
  loader: glob({ base: './src/content/resume', pattern: '**/*.{yml,yaml}' }),
  schema: resumeSchema
})

export const collections = { resume }
