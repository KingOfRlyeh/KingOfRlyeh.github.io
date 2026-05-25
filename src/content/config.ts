import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    type: z.string(),
    image: z.string().optional(),
    alt: z.string().optional(),
    desc: z.string(),
    pubDate: z.date().optional(),
  }),
});

export const collections = { reviews };
