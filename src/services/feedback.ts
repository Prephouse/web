import { createApi } from '@reduxjs/toolkit/query/react';

import baseQuery from './baseQuery';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: baseQuery(),
  endpoints: builder => ({
    getFeedback: builder.query({
      query: () => ({ url: '/feedback/' }),
    }),
  }),
});

export const { useGetFeedbackQuery } = feedbackApi;
