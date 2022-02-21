import { z } from 'zod';

const apiRequestSchema = z.object({
  category: z.array(z.number()),
  limit: z.number().int().positive(),
  randomize: z.boolean(),
});

const apiResponseSchema = z.array(z.object({
  id: z.number(),
  category: z.number(),
  question: z.string(),
  description: z.string(),
  sampleAnswer: z.string(),
  frequency: z.number(),
}));

export type QuestionRequestSchema = z.infer<typeof apiRequestSchema>;
export type QuestionResponseSchema = z.infer<typeof apiResponseSchema>;
