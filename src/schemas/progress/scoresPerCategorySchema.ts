import { z } from 'zod';

const apiResponseSchema = z.object({
  overallScores: z.array(z.number().nonnegative()),
  dates: z.array(z.string()),
  silentPausesScores: z.array(z.number().nonnegative()),
  volumeScores: z.array(z.number().nonnegative()),
  backgroundLightScores: z.array(z.number().nonnegative()),
  gazeDirectionScores: z.array(z.number().nonnegative()),
  emotionScores: z.array(z.number().nonnegative()),
  pitchScores: z.array(z.number().nonnegative()),
  fillerWordsScores: z.array(z.number().nonnegative()),
});

export type ScoresPerCategoryResponseSchema = z.infer<typeof apiResponseSchema>;
