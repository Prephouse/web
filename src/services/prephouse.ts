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
  QuestionCategoriesRequestSchema,
  QuestionCategoriesResponseSchema,
} from 'schemas/question/questionCategoriesSchema';
import type {
  QuestionRequestSchema,
  QuestionResponseSchema,
} from 'schemas/question/questionSchema';
import { SessionRequestSchema, SessionResponseSchema } from 'schemas/session/sessionSchema';
import type { UploadQuestionResponseSchema } from 'schemas/upload/uploadQuestionSchema';

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
    getSession: builder.query<SessionResponseSchema, SessionRequestSchema>({
      query: params => ({ url: '/progress/scores_for_session/', params }),
    }),
    getProgress: builder.query<ScoresPerCategoryResponseSchema, void>({
      query: () => ({ url: '/progress/scores_by_feature/' }),
    }),
    getProgressSessions: builder.query<ScoresPerSessionResponseSchema, void>({
      query: () => ({ url: '/progress/scores_by_session/' }),
    }),
    getQuestion: builder.query<QuestionResponseSchema, QuestionRequestSchema>({
      query: params => ({ url: '/question/', params }),
    }),
    getQuestionCategories: builder.query<
      QuestionCategoriesResponseSchema,
      QuestionCategoriesRequestSchema
    >({
      query: () => ({ url: '/question/categories/' }),
    }),
    addUploadQuestion: builder.mutation<UploadQuestionResponseSchema, void>({
      query: () => ({ url: '/upload/question/', method: 'POST' }),
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  useGetLeaderboardOverviewQuery,
  useGetSessionQuery,
  useGetProgressQuery,
  useGetProgressSessionsQuery,
  useGetQuestionQuery,
  useGetQuestionCategoriesQuery,
  useAddUploadQuestionMutation,
} = prephouseApi;
