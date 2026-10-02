import { defineCollection } from "astro:content"
import { glob, file } from 'astro/loaders'
import { z } from 'astro/zod'

const resume = defineCollection({
  loader: glob({ base: './src/content/resume', pattern: '**/*.{yml,yaml}' }),
    schema: z.object({id: z.string(),
  title: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  contact: z.object({
    place: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    links: z.array(z.string()),
  }).optional(),
  skills: z.object({
    title: z.string(),
    list: z.array(z.object({
      title: z.string(),
      items: z.array(z.string()),
    })),
  }),
  experience: z.object({
    title: z.string(),
    items: z.array(z.object({
      company: z.string(),
      position: z.string(),
      place: z.string(),
      time: z.object({
        start: z.string(),
        end: z.union([z.string(), z.literal('Present')]),
      }),
      description: z.string().optional(),
      responsibilities: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
      })),
    })),
  }).optional(),
  education: z.object({
    title: z.string(),
    items: z.array(z.object({
      institute: z.string(),
      title: z.string(),
      place: z.string(),
      time: z.string()
    })),
  }).optional(),
})
})
export const collections = { resume }
