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
import type { SessionRequestSchema, SessionResponseSchema } from 'schemas/session/sessionSchema';
import type {
  UploadInstructionsRequestSchema,
  UploadInstructionsResponseSchema,
} from 'schemas/upload/uploadInstructionsSchema';
import type {
  UploadQuestionRequestSchema,
  UploadQuestionResponseSchema,
} from 'schemas/upload/uploadQuestionSchema';
import type {
  UploadSessionRequestSchema,
  UploadSessionResponseSchema,
} from 'schemas/upload/uploadSessionSchema';

export const prephouseApi = createApi({
  reducerPath: 'prephouseApi',
  baseQuery: baseQuery(),
  tagTypes: ['Prephouse'],
  endpoints: builder => ({
    getUploadInstructions: builder.query<
      UploadInstructionsResponseSchema,
      UploadInstructionsRequestSchema
    >({
      query: params => ({ url: '/upload/instructions', params }),
    }),
    getLeaderboard: builder.query<LeaderboardResponseSchema, LeaderboardRequestSchema>({
      query: params => ({ url: '/leaderboard', params }),
    }),
    getLeaderboardOverview: builder.query<
      LeaderboardOverviewResponseSchema,
      LeaderboardOverviewRequestSchema
    >({
      query: () => ({ url: '/leaderboard/overview' }),
    }),
    getSession: builder.query<SessionResponseSchema, SessionRequestSchema>({
      query: params => ({ url: '/progress/scores_for_session', params }),
    }),
    getProgress: builder.query<ScoresPerCategoryResponseSchema, void>({
      query: () => ({ url: '/progress/scores_by_feature' }),
    }),
    getProgressSessions: builder.query<ScoresPerSessionResponseSchema, void>({
      query: () => ({ url: '/progress/scores_by_session' }),
    }),
    getQuestion: builder.query<QuestionResponseSchema, QuestionRequestSchema>({
      query: params => ({ url: '/question', params }),
    }),
    getQuestionCategories: builder.query<
      QuestionCategoriesResponseSchema,
      QuestionCategoriesRequestSchema
    >({
      query: () => ({ url: '/question/categories' }),
    }),
    addUploadQuestion: builder.mutation<UploadQuestionResponseSchema, UploadQuestionRequestSchema>({
      query: params => ({ url: '/upload/question', method: 'POST', params }),
    }),
    addUploadSession: builder.mutation<UploadSessionResponseSchema, UploadSessionRequestSchema>({
      query: params => ({ url: '/upload/record', method: 'POST', params }),
    }),
  }),
});

export const {
  useGetUploadInstructionsQuery,
  useGetLeaderboardQuery,
  useGetLeaderboardOverviewQuery,
  useGetSessionQuery,
  useGetProgressQuery,
  useGetProgressSessionsQuery,
  useGetQuestionQuery,
  useGetQuestionCategoriesQuery,
  useAddUploadQuestionMutation,
  useAddUploadSessionMutation,
} = prephouseApi;
