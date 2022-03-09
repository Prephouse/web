import { z } from 'zod';

const apiRequestSchema = z.object({
  uploadId: z.string().uuid(),
});

const apiResponseSchema = z.object({
  id: z.string().uuid(),
});

export type UploadQuestionRequestSchema = z.infer<typeof apiRequestSchema>;
export type UploadQuestionResponseSchema = z.infer<typeof apiResponseSchema>;
