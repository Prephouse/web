import { z } from 'zod';

const apiResponseSchema = z.object({
  categories: z.record(z.string()),
});

export type QuestionCategoriesRequestSchema = void;
export type QuestionCategoriesResponseSchema = z.infer<typeof apiResponseSchema>;
