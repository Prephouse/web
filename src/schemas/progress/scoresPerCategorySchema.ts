import { z } from 'zod';

const scoresPerCategorySchema = z.object({
  dates: z.array(z.string()),
  scores: z.object({
    overallScores: z.array(z.number().nonnegative()),
    silentPausesScores: z.array(z.number().nonnegative()),
    volumeScores: z.array(z.number().nonnegative()),
    backgroundLightScores: z.array(z.number().nonnegative()),
    gazeDirectionScores: z.array(z.number().nonnegative()),
    emotionScores: z.array(z.number().nonnegative()),
    pitchScores: z.array(z.number().nonnegative()),
    fillerWordsScores: z.array(z.number().nonnegative()),
  }),
});

const scoresPerSessionSchema = z.object({
  sessions: z.array(
    z.object({
      date: z.string(),
      sessionId: z.string(),
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
    })
  ),
});

export type ScoresPerCategoryResponseSchema = z.infer<typeof scoresPerCategorySchema>;

export type ScoresPerSessionResponseSchema = z.infer<typeof scoresPerSessionSchema>;
