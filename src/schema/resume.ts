import { z } from 'astro/zod'

const envString = z.string().transform((val, ctx) => {
  if (!val.startsWith('env:')) return val

  const key = val.slice('env:'.length)
  const value = process.env[key] ?? import.meta.env[key]

  if (value === undefined) {
    ctx.addIssue({
      code: 'custom',
      message: `Missing environment variable: ${key}`,
    })
    return z.NEVER
  }
  return value
})

export default z.object({
  title: z.string(),
  name: z.string(),
  description: z.string(),
  contact: z.object({
    place: z.string(),
    phone: envString,
    email: envString,
    links: z.array(z.string()),
  }),
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
