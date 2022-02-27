import { z } from 'zod';

const apiRequestSchema = z.object({
  category: z.optional(z.array(z.number())),
  limit: z.optional(z.number().int().positive()),
  randomize: z.optional(z.boolean()),
});

const apiResponseSchema = z.array(
  z.object({
    id: z.number(),
    category: z.number(),
    categoryName: z.string(),
    question: z.string(),
    description: z.optional(z.string()),
    sampleAnswer: z.optional(z.string()),
    frequency: z.optional(z.number()),
  })
);

export type QuestionRequestSchema = z.infer<typeof apiRequestSchema> | void;
export type QuestionResponseSchema = z.infer<typeof apiResponseSchema>;
