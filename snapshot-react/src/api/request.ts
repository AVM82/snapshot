import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '../common/api';

const snapshotApi = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
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
