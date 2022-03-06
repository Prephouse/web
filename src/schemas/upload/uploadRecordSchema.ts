import { z } from 'zod';

import { SessionType } from 'states/practice/enums';

const apiRequestSchema = z.object({
  category: z.nativeEnum(SessionType),
});

const apiResponseSchema = z.object({
  id: z.string().uuid(),
});

export type UploadRecordRequestSchema = z.infer<typeof apiRequestSchema>;
export type UploadRecordResponseSchema = z.infer<typeof apiResponseSchema>;
