import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from 'libs/query';

import { UserSignUpFormFields } from 'schemas/user/signUpFormSchema';

export const prephouseApi = createApi({
  reducerPath: 'prephouseApi',
  baseQuery: baseQuery(),
  tagTypes: ['Prephouse'],
  endpoints: builder => ({
    signUpUser: builder.mutation<unknown, Omit<UserSignUpFormFields, 'passwordConfirmation'>>({
      query: ({ firstName, lastName, email, password }) => {
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('password', password);
        return {
          url: '/user/sign-up',
          method: 'post',
          data: formData,
        };
      },
    }),
    getFeedback: builder.query<unknown, void>({
      query: () => ({ url: '/feedback/' }),
    }),
  }),
});

export const { useSignUpUserMutation } = prephouseApi;
