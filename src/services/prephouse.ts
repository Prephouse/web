import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './query';

export const prephouseApi = createApi({
  reducerPath: 'prephouseApi',
  baseQuery: baseQuery(),
  endpoints: builder => ({
    getFeedback: builder.query<unknown, void>({
      query: () => ({ url: '/feedback/' }),
    }),
  }),
});

export const { useGetFeedbackQuery } = prephouseApi;
