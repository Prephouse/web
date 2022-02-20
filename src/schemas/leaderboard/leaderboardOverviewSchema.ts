import { z } from 'zod';

const apiResponseSchema = z.object({
  latestOverallScore: z.nullable(z.number().nonnegative()),
  averageOverallScoreUser: z.nullable(z.number().nonnegative()),
  averageOverallScoreGlobal: z.nullable(z.number().nonnegative()),
});

export type LeaderboardOverviewRequestSchema = void;
export type LeaderboardOverviewResponseSchema = z.infer<typeof apiResponseSchema>;
