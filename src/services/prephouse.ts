import { createApi } from '@reduxjs/toolkit/query/react';

import { UserSignUpFormFields } from '../schemas/user/signUpFormSchema';

import { baseQuery } from './query';

export const prephouseApi = createApi({
  reducerPath: 'prephouseApi',
  baseQuery: baseQuery(),
  tagTypes: ['Prephouse'],
  endpoints: builder => ({
    signUpUser: builder.mutation<unknown, Omit<UserSignUpFormFields, 'passwordConfirmation'>>({
      query: ({ firstName, lastName, email, password }) => {
        const bodyFormData = new FormData();
        bodyFormData.append('first_name', firstName);
        bodyFormData.append('last_name', lastName);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        return {
          url: '/user/sign-up',
          method: 'post',
          data: bodyFormData,
        };
      },
    }),
    getFeedback: builder.query<unknown, void>({
      query: () => ({ url: '/feedback/' }),
    }),
  }),
});

export const { useSignUpUserMutation, useGetFeedbackQuery } = prephouseApi;
