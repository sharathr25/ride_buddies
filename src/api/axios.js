import axios from 'axios';
import { API_URL } from '../configs/api';
import { getIdToken } from './auth';

const baseURL = `${API_URL}/api`;

export const authAxios = axios.create({
  baseURL,
});

authAxios.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = await getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const publicAxios = axios.create({
  baseURL,
});
