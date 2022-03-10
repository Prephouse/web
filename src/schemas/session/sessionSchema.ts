import { z } from 'zod';

const sessionRequestSchema = z.object({
  session_id: z.string(),
});

const sessionResponseSchema = z.object({
  date: z.string(),
  sessionCategory: z.string(),
  cloudfrontUrl: z.string(),
  textSummary: z.string(),
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
  textFeedback: z.array(
    z.object({
      category: z.string(),
      comment: z.string(),
    })
  ),
  timestampFeedback: z.array(
    z.object({
      feedbackId: z.string(),
      category: z.string(),
      comment: z.string(),
      subcategory: z.string(),
      timeStart: z.number(),
      timeEnd: z.number(),
    })
  ),
});

export type SessionRequestSchema = z.infer<typeof sessionRequestSchema>;

export type SessionResponseSchema = z.infer<typeof sessionResponseSchema>;
