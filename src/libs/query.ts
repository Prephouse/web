import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { BaseQueryFn } from '@reduxjs/toolkit/query/react';

import { getAuth } from 'firebase/auth';

const toCamelCaseKeys = (obj: Parameters<typeof camelcaseKeys>[0]) =>
  obj ? camelcaseKeys(obj) : obj;
const toSnakeCaseKeys = (obj: Parameters<typeof snakecaseKeys>[0]) =>
  obj ? snakecaseKeys(obj) : obj;

export const baseQuery =
  ({
    baseUrl = process.env.REACT_APP_PREPHOUSE_BASE_URL,
  }: {
    baseUrl?: string;
  } = {}): BaseQueryFn<{
    url: string;
    params?: AxiosRequestConfig['params'];
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
  }> =>
  async ({ method = 'get', url, params, data }) => {
    try {
      const idToken = await getAuth().currentUser?.getIdToken();

      const config: AxiosRequestConfig = {
        baseURL: baseUrl,
        data: toSnakeCaseKeys(data),
        params: toSnakeCaseKeys(params),
        headers: {
          authorization: `Bearer ${idToken}`,
        },
        method,
        url,
      };
      const result = await axios(config);
      return { data: toCamelCaseKeys(result.data) };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: toCamelCaseKeys(err.response?.data) },
      };
    }
  };

export const rawBaseQuery =
  ({
    baseUrl = process.env.REACT_APP_PREPHOUSE_BASE_URL,
  }: {
    baseUrl?: string;
  } = {}): BaseQueryFn<{
    url: string;
    params?: AxiosRequestConfig['params'];
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
  }> =>
  async ({ method = 'get', url, params, data }) => {
    try {
      const config: AxiosRequestConfig = {
        baseURL: baseUrl,
        data,
        params,
        method,
        url,
      };
      const result = await axios(config);
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
