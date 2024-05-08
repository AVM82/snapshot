/* eslint-disable no-param-reassign */
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../common/api';

const snapshotApi = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async (): Promise<void> => {
  const response: { access_token: string, refresh_token: string } = await snapshotApi.post('/auth/refresh-token', {
    refresh_token: localStorage.getItem('refresh_token'),
  });
  localStorage.setItem('token', response.access_token);
  localStorage.setItem('refresh_token', response.refresh_token);
  snapshotApi.defaults.headers.Authorization = `Bearer ${response.access_token}`;
};

snapshotApi.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        refreshToken().catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
        });
      } else toast.error(error.message);
    }
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
