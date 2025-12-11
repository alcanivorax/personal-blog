import { z } from "zod";

export const postCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  categories: z.array(z.string()).optional(),
  expectedReadTime: z.number().optional(),
});

export const postUpdateSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  categories: z.array(z.string()).optional(),
  expectedReadTime: z.number().optional(),
});
