import { Env } from '@env';
import axios from 'axios';

import { getToken } from '@/lib/auth/utils';

export const client = axios.create({
  baseURL: Env.API_URL,
  paramsSerializer: (params) => {
    const cloned = { ...params };
    if (cloned.filters && typeof cloned.filters === 'object') {
      cloned.filters = JSON.stringify(cloned.filters);
    }
    if (cloned.sort && typeof cloned.sort === 'object') {
      cloned.sort = JSON.stringify(cloned.sort);
    }
    return new URLSearchParams(cloned as any).toString();
  },
});

client.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token?.token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
