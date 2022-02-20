import { z } from 'zod';

const apiRequestSchema = z.object({
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
});

const apiResponseSchema = z.object({
  nextPage: z.number().int().positive(),
  hasNext: z.boolean(),
  totalPages: z.number().int().positive(),
  uploads: z.array(
    z.object({
      standing: z.number().int().positive(),
      sessionId: z.string(),
      username: z.string(),
      category: z.number(),
      categoryName: z.string(),
      dateUploaded: z.date(),
      score: z.number().nonnegative(),
      engineVersion: z.nullable(z.string()),
    })
  ),
});

export type LeaderboardRequestSchema = z.infer<typeof apiRequestSchema>;
export type LeaderboardResponseSchema = z.infer<typeof apiResponseSchema>;
