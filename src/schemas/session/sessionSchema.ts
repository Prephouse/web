import { z } from 'zod';

const sessionRequestSchema = z.object({
  session_id: z.string(),
});

const sessionResponseSchema = z.object({
  date: z.string(),
  sessionCategory: z.string(),
  scores: z.object({
    overallScore: z.number().nonnegative(),
    silentPausesScore: z.number().nonnegative(),
    volumeScore: z.number().nonnegative(),
    backgroundLightScore: z.number().nonnegative(),
    gazeDirectionScore: z.number().nonnegative(),
    emotionScore: z.number().nonnegative(),
    pitchScore: z.number().nonnegative(),
    fillerWordsScore: z.number().nonnegative(),
  }),
});

export type SessionRequestSchema = z.infer<typeof sessionRequestSchema>;

export type SessionResponseSchema = z.infer<typeof sessionResponseSchema>;
