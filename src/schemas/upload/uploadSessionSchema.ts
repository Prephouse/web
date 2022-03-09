import { z } from 'zod';

import { SessionType } from 'states/practice/enums';

const apiRequestSchema = z.object({
  category: z.nativeEnum(SessionType),
  token: z.optional(z.string()),
});

const apiResponseSchema = z.object({
  id: z.string().uuid(),
});

export type UploadSessionRequestSchema = z.infer<typeof apiRequestSchema>;
export type UploadSessionResponseSchema = z.infer<typeof apiResponseSchema>;
