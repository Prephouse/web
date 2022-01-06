import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const baseQuery =
  ({
    baseUrl,
  }: {
    baseUrl?: string;
  } = {}): BaseQueryFn<{
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
  }> =>
  async ({ url, method = 'get', data }) => {
    try {
      const config: AxiosRequestConfig = { url, method, data };
      if (baseUrl) {
        config.baseURL = baseUrl;
      }
      const result = await axios(config);
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default baseQuery;
