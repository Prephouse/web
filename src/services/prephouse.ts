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
  }),
});

export const { useGetLeaderboardQuery, useGetLeaderboardOverviewQuery } = prephouseApi;
