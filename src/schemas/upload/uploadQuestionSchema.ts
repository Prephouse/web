import { z } from 'zod';

const apiResponseSchema = z.object({
  id: z.string().uuid(),
});

export type UploadQuestionResponseSchema = z.infer<typeof apiResponseSchema>;
