import { z } from 'zod';

import { SessionMedium, SessionOrigin, SessionType } from 'states/practice/enums';

const apiRequestSchema = z.object({
  category: z.nativeEnum(SessionType),
  medium: z.nativeEnum(SessionMedium),
  origin: z.nativeEnum(SessionOrigin),
});

const apiResponseSchema = z.object({
  feedbackCategories: z.array(z.string()),
  overview: z.string(),
  preAnalysis: z.string(),
  postAnalysis: z.string(),
  confirmation: z.string(),
});

export type UploadInstructionsRequestSchema = z.infer<typeof apiRequestSchema>;
export type UploadInstructionsResponseSchema = z.infer<typeof apiResponseSchema>;
