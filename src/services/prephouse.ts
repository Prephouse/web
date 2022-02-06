import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from 'libs/query';

export const prephouseApi = createApi({
  reducerPath: 'prephouseApi',
  baseQuery: baseQuery(),
  tagTypes: ['Prephouse'],
  endpoints: builder => ({
    getFeedback: builder.query<unknown, void>({
      query: () => ({ url: '/feedback/' }),
    }),
  }),
});

export const { useGetFeedbackQuery } = prephouseApi;
