import { z } from 'zod';

const apiRequestSchema = z.object({
  upload_id: z.string().uuid(),
});

const apiResponseSchema = z.object({
  id: z.string().uuid(),
});

export type UploadQuestionResponseSchema = z.infer<typeof apiResponseSchema>;
export type UploadQuestionRequestSchema = z.infer<typeof apiRequestSchema>;
