/* eslint-disable no-param-reassign */
import axios from 'axios';
import { toast } from 'react-toastify';

import api from '../common/api';

const snapshotApi = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async (): Promise<void | null> => {
  if (!refreshToken.isRefreshing) {
    refreshToken.isRefreshing = true;

    try {
      const response: { access_token: string, refresh_token: string } = await snapshotApi.post('/auth/refresh-token', {
        refresh_token: localStorage.getItem('refresh_token'),
      });
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      snapshotApi.defaults.headers.Authorization = `Bearer ${response.access_token}`;

      return await Promise.resolve();
    } catch (error) {
      return await Promise.reject(error);
    } finally {
      refreshToken.isRefreshing = false;
    }
  }

  return null;
};

refreshToken.isRefreshing = false;

snapshotApi.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        await refreshToken();

        return await snapshotApi(originalRequest);
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message || 'Помилка входу, перелогінтесь');
        window.location.href = 'sign-in';
      }
    } else {
      toast.error(error.message);
    }

    return Promise.reject(error);
  },
);

snapshotApi.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    toast.error(error.message);
  },
);

export default snapshotApi;
