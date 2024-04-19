import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../common/api';

const token = localStorage.getItem('token');

const snapshotApi = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

snapshotApi.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (isAxiosError(error)) {
      toast.error(error.message);
    }
  },
);

export default snapshotApi;
