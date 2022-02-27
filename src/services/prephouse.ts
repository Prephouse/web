import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from 'libs/query';

import type {
  LeaderboardOverviewRequestSchema,
  LeaderboardOverviewResponseSchema,
} from 'schemas/leaderboard/leaderboardOverviewSchema';
import type {
  LeaderboardRequestSchema,
  LeaderboardResponseSchema,
} from 'schemas/leaderboard/leaderboardSchema';
import type {
  ScoresPerCategoryResponseSchema,
  ScoresPerSessionResponseSchema,
} from 'schemas/progress/scoresPerCategorySchema';
import type {
  QuestionRequestSchema,
  QuestionResponseSchema,
} from 'schemas/question/questionSchema';

export const prephouseApi = createApi({
  reducerPath: 'prephouseApi',
  baseQuery: baseQuery(),
  tagTypes: ['Prephouse'],
  endpoints: builder => ({
    getLeaderboard: builder.query<LeaderboardResponseSchema, LeaderboardRequestSchema>({
      query: params => ({ url: '/leaderboard/', params }),
    }),
    getLeaderboardOverview: builder.query<
      LeaderboardOverviewResponseSchema,
      LeaderboardOverviewRequestSchema
    >({
      query: () => ({ url: '/leaderboard/overview/' }),
    }),
    getProgress: builder.query<ScoresPerCategoryResponseSchema, void>({
      query: () => ({ url: '/progress/scores_per_category/' }),
    }),
    getProgressSessions: builder.query<ScoresPerSessionResponseSchema, void>({
      query: () => ({ url: '/progress/scores_per_session/' }),
    }),
    getQuestion: builder.query<QuestionResponseSchema, QuestionRequestSchema>({
      query: params => ({ url: '/question/', params }),
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  useGetLeaderboardOverviewQuery,
  useGetProgressQuery,
  useGetProgressSessionsQuery,
  useGetQuestionQuery,
} = prephouseApi;
